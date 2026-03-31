/**
 * qrcode.d.ts — 二维码生成与识别工具集
 *
 * 包含三个原始库：QRCode（生成）、jsQR（解码）、Jimp（图片读取）。
 */

declare const qrcode: {
    /** qrcode npm 库。用于将文本/URL 生成为二维码图片。 */
    QRCode: {
        /**
         * 将文本生成为 Base64 Data URI 格式的二维码图片。
         *
         * @example
         * const dataUrl = await qrcode.QRCode.toDataURL("https://github.com");
         */
        toDataURL(text: string): Promise<string>;

        /**
         * 将文本生成为 PNG Buffer。
         *
         * @example
         * const buf = await qrcode.QRCode.toBuffer("hello");
         */
        toBuffer(text: string): Promise<Buffer>;

        /**
         * 将二维码保存为文件。
         *
         * @example
         * await qrcode.QRCode.toFile("/tmp/qr.png", "https://github.com");
         */
        toFile(path: string, text: string): Promise<void>;
    };

    /** jsQR 库。解码 RGBA 像素数据中的二维码。 */
    jsQR: {
        /**
         * 从 RGBA 像素数据中解码二维码。
         *
         * @param data RGBA 像素的 Uint8ClampedArray
         * @param width 图片宽度
         * @param height 图片高度
         * @returns 解码结果对象（含 .data 字段），未找到则返回 null
         *
         * @example
         * const image = await qrcode.Jimp.read("/path/to/qr.png");
         * const { width, height, data } = image.bitmap;
         * const result = qrcode.jsQR(new Uint8ClampedArray(data), width, height);
         * if (result) console.log("二维码内容:", result.data);
         */
        (data: Uint8ClampedArray, width: number, height: number): { data: string } | null;
    };

    /** Jimp 图像处理库。用于读取图片文件获取像素数据。 */
    Jimp: {
        /**
         * 读取图片文件（本地路径或 URL），返回图片对象。
         *
         * @param pathOrUrl 本地文件绝对路径或公开网络 URL
         * @returns 图片对象，通过 .bitmap 获取 { width, height, data }
         *
         * @example
         * const image = await qrcode.Jimp.read("/path/to/image.png");
         * console.log(image.bitmap.width, image.bitmap.height);
         */
        read(pathOrUrl: string): Promise<{ bitmap: { width: number; height: number; data: Buffer } }>;
    };
};
