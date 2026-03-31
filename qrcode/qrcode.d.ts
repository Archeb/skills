/**
 * qrcode.d.ts — 动态生成与识别二维码的实体动作型 Skill
 */
declare const qrcode: {
    /**
     * 将任意文本或 URL 转换成 Base64 格式的二维码图像数据。
     * 
     * @param text 需要被转换成二维码的数据。
     * @returns 带有图像内容的 base64 字符串（如果成功的话）。
     */
    generate(text: string): Promise<string>;

    /**
     * 读取二维码图片（支持本地绝对路径或公开网络 URL）并解析出提取的文本信息。
     * 
     * @param imagePathOrUrl 包含二维码的本地物理文件路径或图片公开网络 URL。
     * @returns 解码提取出来的纯文本结果，或是识别失败的原因。
     */
    read(imagePathOrUrl: string): Promise<string>;
};
