import { TraceMoe } from "trace.moe.ts";
import fs from "fs";

const traceClient = new TraceMoe();

const api = {
    search: async (imagePathOrUrl: string): Promise<string> => {
        try {
            let searchResults;
            if (imagePathOrUrl.startsWith("http://") || imagePathOrUrl.startsWith("https://")) {
                searchResults = await traceClient.fetchAnime(imagePathOrUrl);
            } else {
                const buffer = fs.readFileSync(imagePathOrUrl);
                searchResults = await traceClient.fetchAnimeFromBuffer(buffer);
            }
            
            if (!searchResults || !searchResults.result || searchResults.result.length === 0) {
                return "未能找到匹配的动画来源。";
            }

            const bestMatch = searchResults.result[0];
            // @ts-ignore Anilist type is complex
            const { anilist, episode, from, to, similarity } = bestMatch;
            
            if (similarity < 0.8) {
                return `找到了一些结果，但匹配度较低（${(similarity*100).toFixed(1)}%），可能不是规范的动画截图。`;
            }

            const formatTime = (seconds: number) => {
                const m = Math.floor(seconds / 60);
                const s = Math.floor(seconds % 60);
                return `${m}分${s}秒`;
            };

            // anilist is either an object or ID, we just print the raw response or cast it
            let title = typeof anilist === 'object' ? (anilist as any).title?.native || (anilist as any).title?.romaji || '未知动画' : anilist;

            return `为您找到啦！
📺 动画：${title}
🎬 剧集：第 ${episode} 集
⏱️ 时间点：${formatTime(from as number)} ~ ${formatTime(to as number)}
✨ 匹配度：${(similarity * 100).toFixed(2)}%`;
        } catch (err: any) {
            return `引擎提取发生错误: ${err.message}`;
        }
    }
};

export default api;
