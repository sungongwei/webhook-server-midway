"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const midway_1 = require("midway");
const child_process_1 = require("child_process");
let WebHookController = class WebHookController {
    constructor() {
        this.webhookGitEvent = ['ping', 'push'];
        this.event2Path = {
            kaldorei: {
                path: '/data/node_wwb/ghost/current/content/themes/ghost-theme-kaldorei-master',
                ref: 'master'
            }
        };
    }
    async gitPull(path) {
        return new Promise((resolve, reject) => {
            const child = child_process_1.exec(`cd ${path} git pull  origin master `, (err, stdout, stderr) => {
                child.kill('SIGHUP');
                console.log(child.killed);
                resolve(stdout);
            });
        });
    }
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
};
__decorate([
    midway_1.inject(),
    __metadata("design:type", Object)
], WebHookController.prototype, "ctx", void 0);
__decorate([
    midway_1.post('/'),
    midway_1.get('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WebHookController.prototype, "index", null);
WebHookController = __decorate([
    midway_1.provide(),
    midway_1.controller('/webhook')
], WebHookController);
exports.WebHookController = WebHookController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci93ZWJob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTBFO0FBQzFFLGlEQUFxQztBQUlyQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUE5QjtRQUlVLG9CQUFlLEdBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsZUFBVSxHQUFXO1lBQzNCLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUseUVBQXlFO2dCQUMvRSxHQUFHLEVBQUUsUUFBUTthQUNkO1NBQ0YsQ0FBQztJQW9ESixDQUFDO0lBbkRTLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSTtRQUN4QixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sS0FBSyxHQUFHLG9CQUFJLENBQUMsTUFBTSxJQUFJLDJCQUEyQixFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtnQkFDaEYsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUdELEtBQUssQ0FBQyxLQUFLO1FBQ1QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsYUFBYSxD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