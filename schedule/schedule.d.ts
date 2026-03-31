/**
 * schedule.d.ts — 定时任务调度器（node-schedule）
 *
 * 在指定的未来时间点或 Cron 表达式触发回调。常驻内存，重启即失效。
 */

interface ScheduleJob {
    readonly name: string;
    cancel(reschedule?: boolean): boolean;
    cancelNext(reschedule?: boolean): boolean;
    reschedule(spec: string | Date): boolean;
    nextInvocation(): Date | null;
    invoke(): void;
}

declare const schedule: {
    /**
     * 创建一个定时任务。
     *
     * @param spec 触发时间。支持 Date 对象、ISO 时间字符串、Cron 表达式。
     * @param callback 到达时间时执行的回调函数
     * @returns Job 对象，可用于取消或查询下次触发时间
     *
     * @example
     * // 10 分钟后触发
     * const job = schedule.scheduleJob(new Date(Date.now() + 10 * 60000), () => {
     *     console.log("时间到！");
     * });
     *
     * @example
     * // 每天早上 8 点触发（Cron 表达式）
     * schedule.scheduleJob("0 8 * * *", () => { console.log("早安！"); });
     */
    scheduleJob(spec: Date | string | number, callback: (fireDate: Date) => void): ScheduleJob;

    /**
     * 创建一个带名称的定时任务。
     *
     * @param name 任务名称标识符
     * @param spec 触发时间
     * @param callback 回调函数
     */
    scheduleJob(name: string, spec: Date | string | number, callback: (fireDate: Date) => void): ScheduleJob;

    /**
     * 取消一个定时任务。
     */
    cancelJob(job: ScheduleJob | string): boolean;

    /** 查看所有已注册的定时任务字典。 */
    scheduledJobs: { [jobName: string]: ScheduleJob };

    /** 优雅地关闭所有任务。 */
    gracefulShutdown(): Promise<void>;
};
