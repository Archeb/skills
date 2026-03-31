/**
 * weather.d.ts — 全球天气查询（weather-js）
 *
 * 查询任意城市的实时天气与多日预报。免 API Key。
 */

interface WeatherCurrent {
    temperature: string;
    skycode: string;
    skytext: string;
    date: string;
    observationtime: string;
    observationpoint: string;
    feelslike: string;
    humidity: string;
    winddisplay: string;
    day: string;
    shortday: string;
    windspeed: string;
    imageUrl: string;
}

interface WeatherForecast {
    low: string;
    high: string;
    skycodeday: string;
    skytextday: string;
    date: string;
    day: string;
    shortday: string;
    precip: string;
}

interface WeatherLocation {
    name: string;
    lat: string;
    long: string;
    timezone: string;
    alert: string;
    degreetype: string;
    imagerelativeurl: string;
}

interface WeatherResult {
    location: WeatherLocation;
    current: WeatherCurrent;
    forecast: WeatherForecast[];
}

declare const weather: {
    /**
     * 查询指定城市的实时天气与预报数据。基于回调，结果在 callback 的第二个参数中。
     *
     * @param options 查询选项
     * @param callback 回调函数，(err, result) => void
     *
     * @example
     * weather.find({ search: "Tokyo, Japan", degreeType: "C" }, (err, result) => {
     *     if (err) { console.error(err); return; }
     *     const data = result[0];
     *     console.log(data.location.name, data.current.temperature + "°C", data.current.skytext);
     *     data.forecast.forEach(f => console.log(f.date, f.skytextday, f.low + "~" + f.high));
     * });
     */
    find(
        options: { search: string; degreeType?: "C" | "F" },
        callback: (err: any, result: WeatherResult[]) => void
    ): void;
};
