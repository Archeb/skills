import sagiri from 'sagiri';
import fs from 'fs';

const apiKey = process.env.SAUCENAO_API_KEY;

if (!apiKey) {
    console.warn("[saucenao skill] SAUCENAO_API_KEY 未配置，该引擎目前处于未激活状态。需要在环境变量填入才能反查画师！");
}

const client = apiKey ? sagiri(apiKey) : null;

const api = {
    search: async (imagePathOrUrl: string): Promise<string> => {
        if (!client) {
            return "[Error] 系统未能配置 SAUCENAO_API_KEY，无法调用反查引擎查找画师出处。你可以向用户反馈此配置问题。";
        }
        
        try {
            let fileData: string | Buffer = imagePathOrUrl;
            if (!imagePathOrUrl.startsWith("http://") && !imagePathOrUrl.startsWith("https://")) {
                fileData = fs.readFileSync(imagePathOrUrl);
            }
            
            const results = await client(fileData);
            
            if (!results || results.length === 0) {
                return "未能在 SauceNAO 的数据库里找到匹配的画师或该图出处。";
            }
            
            // 筛选相似度较高且有明确来源链接的 Top 2
            const highConfidence = results.filter((r: any) => r.similarity > 75).slice(0, 2);
            
            if (highConfidence.length === 0) {
                return `找到了一些结果，但匹配度（最高 ${results[0].similarity}%）太低，该原图可能已被过度修改或是局部截图。`;
            }
            
            let output = `🎨 成功溯源画作信息：\n`;
            highConfidence.forEach((res: any, i: number) => {
                output += `\n【原版来源 ${i+1}】\n`;
                output += `🔗 平台：${res.site}\n`;
                output += `👤 作者/名称：${res.authorName || '未知'}\n`;
                output += `🏷️ 原网页地址：${res.url}\n`;
                output += `✨ 相似置信度：${res.similarity}%\n`;
            });
            return output;

        } catch (err: any) {
            return `SauceNAO 引擎发生抓取错误：${err.message}`;
        }
    }
};

export default api;
