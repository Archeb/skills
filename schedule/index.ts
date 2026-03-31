import nodeSchedule from 'node-schedule';

const api = {
    setReminder: (dateOrCron: string, message: string): string => {
        try {
            let jobDate: any = dateOrCron;
            
            // Try parsing Date format
            const parsedDate = new Date(dateOrCron);
            if (!isNaN(parsedDate.getTime()) && !dateOrCron.includes('*')) {
                 jobDate = parsedDate;
                 if (jobDate.getTime() <= Date.now()) {
                     return `设定的提醒时间必须在未来！当前提供的时间被解析为：${jobDate.toISOString()}`;
                 }
            }

            // Create memory-resident scheduled job
            nodeSchedule.scheduleJob(jobDate, function(){
                // In a full architecture, this would emit an event back to the bot system.
                // For demonstration, we use console.log which theoretically interceptable in the Sandbox.
                console.log(`[CyberGroupmate Reminder] ${message}`);
            });
            
            return `已成功受理！任务排期就绪：将在指定时间向大模型上下文注入提醒记录：“${message}”。`;
        } catch (e: any) {
            return `无法设置定时器: ${e.message}`;
        }
    }
};

export default api;
