import { get, Context, inject, post, controller, provide, } from 'midway';
import { exec } from 'child_process';

@provide()
@controller('/webhook')
export class WebHookController {

  @inject()
  ctx: Context;
  private webhookGitEvent: string[] = ['ping', 'push'];
  private event2Path: object = {
    kaldorei: {
      path: '/data/node_wwb/ghost/current/content/themes/ghost-theme-kaldorei-master',
      ref: 'master'
    },
    webhook: {
      path: '/data/node_wwb/webhook-server-midway',
      ref: 'master'
    }
  };
  private async gitPull(path) {
    return new Promise((resolve, reject) => {
      const child = exec(`cd ${path} git pull  origin master `, (err, stdout, stderr) => {
        child.kill('SIGHUP');
        console.log(child.killed);
        resolve(stdout);
      });
    });
  }
  @post('/')
  @get('/')
  async index() {
    const headers = this.ctx.req.headers['user-agent'];
    if (!headers.match(/Coding.net Hook|GitHub-Hookshot\//)) {
      console.log(headers, 'err headers');
      this.ctx.res.statusCode = 403;
      this.ctx.res.statusMessage = 'err headers' + headers;
      return;
    }
    const gitEvent = this.ctx.headers[headers === 'Coding.net Hook' ? 'x-coding-event' : 'x-github-event'];
    if (!gitEvent || !this.webhookGitEvent.includes(gitEvent)) {
      console.log(gitEvent, 'err gitEvent');
      this.ctx.res.statusCode = 403;
      this.ctx.res.statusMessage = 'err gitEvent ' + gitEvent;
      return;
    }
    switch (gitEvent) {
      case 'ping':
        this.ctx.body = 'pong';
        break;
      case 'push':
        const { event } = this.ctx.query;
        const { ref } = this.ctx.body;
        if (!event || !this.event2Path[event]) {
          console.log(event, 'err event ');
          this.ctx.res.statusCode = 403;
          this.ctx.res.statusMessage = 'err event ' + event;
          return;
        }
        if (!ref || !ref.match(this.event2Path[event].ref)) {
          this.ctx.res.statusCode = 403;
          this.ctx.res.statusMessage = 'ref no need pull ' + ref;
          return;
        }
        const info = await this.gitPull(this.event2Path[event].path);
        this.ctx.body = info;
        break;
      default:
        this.ctx.body = 'no event to do ';
    }
  }
}
