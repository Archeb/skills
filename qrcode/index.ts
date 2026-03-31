import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { Jimp } from 'jimp';

const api = {
    generate: async (text: string): Promise<string> => {
        try {
            const dataUrl = await QRCode.toDataURL(text);
            return dataUrl;
        } catch (err) {
            return `二维码生成失败: ${(err as Error).message}`;
        }
    },
    
    read: async (imagePathOrUrl: string): Promise<string> => {
        try {
            const image = await Jimp.read(imagePathOrUrl);
            const { width, height, data } = image.bitmap;
            
            // Encode the 8-bit RGBA pixel array to what jsQR expects
            const qrCodeData = jsQR(new Uint8ClampedArray(data), width, height);
            
            if (qrCodeData && qrCodeData.data) {
                return `已成功识别二维码内容：\n${qrCodeData.data}`;
            } else {
                return "抱歉，无法从该图片中提取二维码信息。原因可能是二维码被遮挡、分辨率过低或图片中根本没有合规的二维码。";
            }
        } catch (e: any) {
             return `读取图片解析二维码失败: ${e.message}`;
        }
    }
};

export default api;
