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
            },
            webhook: {
                path: '/data/node_wwb/webhook-server-midway',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViaG9vay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29udHJvbGxlci93ZWJob29rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQTBFO0FBQzFFLGlEQUFxQztBQUlyQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUE5QjtRQUlVLG9CQUFlLEdBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsZUFBVSxHQUFXO1lBQzNCLFFBQVEsRUFBRTtnQkFDUixJQUFJLEVBQUUseUVBQXlFO2dCQUMvRSxHQUFHLEVBQUUsUUFBUTthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxzQ0FBc0M7Z0JBQzVDLEdBQUcsRUFBRSxRQUFRO2FBQ2Q7U0FDRixDQUFDO0lBb0RKLENBQUM7SUFuRFMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJO1FBQ3hCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsTUFBTSxLQUFLLEdBQUcsb0JBQUksQ0FBQyxNQUFNLElBQUksMkJBQTJCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNoRixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0QsS0FBSyxDQUFDLEtBQUs7UUFDVCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFL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