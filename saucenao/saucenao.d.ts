/**
 * saucenao.d.ts — 原版插画及画师溯源引擎 (Sagiri Wrapper)
 */
declare const saucenao: {
    /**
     * 通过图片（支持本地路径或公开网址）在全网原画图库中反向搜索原画师、作品名及社交媒体原始链接。
     * 
     * @param imagePathOrUrl 需要反查的插画的本地绝对文件物理路径或公开网络图片 URL。
     * @returns [string] 查找到的源网页作者、对应网站 URL 解析列表等高度结构化总结数据。
     * 
     * @example
     * const resultData = await saucenao.search("http://example.com/anime-girl-unknown.jpg");
     * console.log(resultData);
     */
    search(imagePathOrUrl: string): Promise<string>;
};
