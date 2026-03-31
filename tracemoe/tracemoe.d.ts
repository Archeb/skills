/**
 * tracemoe.d.ts — 动漫番剧截图反查引擎
 * 用于通过图片 URL 查找该截图出自哪一部日本动画。
 */
declare const tracemoe: {
    /**
     * 通过动画截图的 URL 反查包含该画面的番剧名、对应集数及精确时间点。
     * 
     * @param imageUrl 用户所发送截图的公开 URL 链接
     * @returns 包含动画中文名/罗马音、集数、时间段以及匹配度的汇总文本
     * 
     * @example
     * // 当群友想知道一张动漫截图的出处时
     * const sourceInfo = await tracemoe.search("https://example.com/anime-screenshot.jpg");
     * console.log(sourceInfo);
     */
    search(imageUrl: string): Promise<string>;
};
