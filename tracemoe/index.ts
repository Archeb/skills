import { Client } from "trace.moe.ts";

const traceClient = new Client();

const api = {
    search: async (imageUrl: string): Promise<string> => {
        const searchResults = await traceClient.getSimilarFromURL(imageUrl);
        
        if (!searchResults || searchResults.length === 0) {
            return "未能找到匹配的动画来源。";
        }

        const bestMatch = searchResults[0];
        const { anilist, episode, from, to, similarity } = bestMatch;
        
        if (similarity < 0.8) {
            return "找到了一些结果，但匹配度较低，可能不是规范的动画截图。";
        }

        const formatTime = (seconds: number) => {
            const m = Math.floor(seconds / 60);
            const s = Math.floor(seconds % 60);
            return `${m}分${s}秒`;
        };

        return `为您找到啦！
📺 动画：${anilist.title.native || anilist.title.romaji}
🎬 剧集：第 ${episode} 集
⏱️ 时间点：${formatTime(from as number)} ~ ${formatTime(to as number)}
✨ 匹配度：${(similarity * 100).toFixed(2)}%`;
    }
};

export default api;
