export type RepeaterCallback<T> = (i: number) => T | Promise<T>;

export class Repeater {
    constructor(
        private readonly callback: RepeaterCallback<void>
    ) {}

    async repeatFor(length: number) {
        for (let i = 0; i < length; i++) {
            await this.callback(i);
        }
    }

    repeatEvery(interval: number) {
        let i = 0;
        const intervalId = setInterval(async () => {
            await this.callback(i);
            i++;
        }, interval);

        return intervalId;
    }

    async repeatUntil(condition: () => boolean) {
        let i = 0;
        while (condition()) {
            await this.callback(i);
            i++;
        }
    }
}
