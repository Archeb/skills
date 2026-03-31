/**
 * saucenao.d.ts — SauceNAO 以图搜图引擎（sagiri）
 *
 * 通过图片反向搜索原画师、作品来源及社交媒体链接。
 * 已预初始化，直接调用即可。传入 URL 字符串或本地文件的 Buffer。
 */

interface SaucenaoResult {
    url: string;
    site: string;
    index: number;
    similarity: number;
    thumbnail: string;
    authorName: string;
    authorUrl: string;
    raw: {
        data: {
            ext_urls: string[];
            title: string;
            author_name: string;
            author_url: string;
            pixiv_id?: string;
            member_id?: string;
            member_name?: string;
            twitter_user_handle?: string;
            source?: string;
        };
        header: {
            index_id: string;
            index_name: string;
            similarity: number;
            thumbnail: string;
        };
    };
}

/**
 * 传入图片的公开 URL 或 Buffer，返回匹配结果数组。
 * 如果 SAUCENAO_API_KEY 未配置则为 null。
 *
 * @param file 图片的公开 URL 字符串，或通过 fs.readFileSync() 读取的本地文件 Buffer。
 * @returns 按相似度排序的匹配结果数组
 *
 * @example
 * // 使用 URL
 * const results = await saucenao("https://example.com/image.jpg");
 * console.log(results[0].authorName, results[0].url, results[0].similarity);
 *
 * @example
 * // 使用本地文件
 * import fs from "fs";
 * const buf = fs.readFileSync("/path/to/local/image.png");
 * const results = await saucenao(buf);
 */
declare const saucenao: ((file: string | Buffer) => Promise<SaucenaoResult[]>) | null;
