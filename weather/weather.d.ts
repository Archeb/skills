/**
 * weather.d.ts — 全球天气查询模块
 */
declare const weather: {
    /**
     * 查询指定全球城市的当前实时天气与多日预报数据。
     * 
     * @param search 城市名称，支持中英文，如 "Shanghai, China" 或 "Tokyo"
     * @param degreeType 温度单位，'C' 为摄氏度，'F' 为华氏度。默认使用 'C'。
     * @returns 包含当前气温、体感、湿度、风力及多日预报详情的文本字符串
     * 
     * @example
     * const weatherData = await weather.find("Tokyo, Japan");
     * console.log(weatherData);
     */
    find(search: string, degreeType?: 'C' | 'F'): Promise<string>;
};
