/**
 * schedule.d.ts — 时间感知与闹铃系统模块
 */
declare const schedule: {
    /**
     * 在系统的未来指定时间点触发一条文本提醒消息。
     * 
     * @param dateOrCron 可被解析的 ISO 时间字符串或标准 Cron 表达式。
     * @param message 时间到达时刻，需要打印或通知给模型和群友的核心提示语文本。
     * @returns 返回执行回调设定是否成功（成功信息或异常错误原因）。
     * 
     * @example
     * // 例如群友说：十分钟后叫我去开会。假定当前是 10:00
     * const futureTime = new Date(Date.now() + 10 * 60000).toISOString();
     * const resultMsg = await schedule.setReminder(futureTime, "十分钟到了，该去开会了！");
     * console.log(resultMsg);
     */
    setReminder(dateOrCron: string, message: string): string;
};
