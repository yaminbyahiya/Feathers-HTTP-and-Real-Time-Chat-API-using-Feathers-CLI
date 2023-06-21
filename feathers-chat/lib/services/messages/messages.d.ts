import type { Application } from '../../declarations';
import { MessageService } from './messages.class';
import { messagePath } from './messages.shared';
export * from './messages.class';
export * from './messages.schema';
export declare const message: (app: Application) => void;
declare module '../../declarations' {
    interface ServiceTypes {
        [messagePath]: MessageService;
    }
}
