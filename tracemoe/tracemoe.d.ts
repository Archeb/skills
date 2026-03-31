/**
 * tracemoe.d.ts — 动漫番剧截图反查引擎（trace.moe.ts）
 *
 * 通过动画截图反查番剧名、集数及精确时间点。已预初始化的 TraceMoe 实例。
 */

interface TraceMoeResult {
    anilist: {
        id: number;
        idMal: number;
        title: { native: string; romaji: string; english: string };
        synonyms: string[];
        isAdult: boolean;
    } | any;
    filename: string;
    episode: number | null;
    from: number;
    to: number;
    similarity: number;
    video: string;
    image: string;
}

interface TraceMoeSearchResponse {
    frameCount: number;
    error: string;
    result: TraceMoeResult[];
}

declare const tracemoe: {
    /**
     * 通过图片 URL 搜索匹配的动画场景。
     *
     * @param imageURL 截图的公开网络 URL
     * @returns 包含 result 数组的搜索响应
     *
     * @example
     * const res = await tracemoe.fetchAnime("https://example.com/screenshot.jpg");
     * const best = res.result[0];
     * console.log(best.anilist.title.native, `第${best.episode}集`, best.similarity);
     */
    fetchAnime(imageURL: string): Promise<TraceMoeSearchResponse>;

    /**
     * 通过本地图片文件的 Buffer 搜索匹配的动画场景。限制 25MB。
     *
     * @param buffer 通过 fs.readFileSync() 读取的图片 Buffer
     * @returns 包含 result 数组的搜索响应
     *
     * @example
     * import fs from "fs";
     * const buf = fs.readFileSync("/path/to/screenshot.png");
     * const res = await tracemoe.fetchAnimeFromBuffer(buf);
     * console.log(res.result[0].anilist.title.native);
     */
    fetchAnimeFromBuffer(buffer: Buffer): Promise<TraceMoeSearchResponse>;
};
