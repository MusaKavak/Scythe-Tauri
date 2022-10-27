import { NotificationAction } from "./notificationAction";

export class NotificationContent {
    constructor(
        public actionList: NotificationAction[] | null = null,
        public appIcon: string | null = null,
        public appName: string | null = null,
        public key: string | null = null,
        public largeIcon: string | null = null,
        public packageName: string | null = null,
        public text: string | null = null,
        public title: string | null = null,
    ) { }
}