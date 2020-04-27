import { Context } from 'midway';
export declare class WebHookController {
    ctx: Context;
    private webhookGitEvent;
    private event2Path;
    private gitPull;
    index(): Promise<void>;
}
