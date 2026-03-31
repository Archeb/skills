import weather from 'weather-js';

const api = {
    find: (search: string, degreeType: 'C' | 'F' = 'C'): Promise<string> => {
        return new Promise((resolve, reject) => {
            weather.find({search: search, degreeType: degreeType}, function(err: any, result: any[]) {
                if(err) {
                    return reject(err);
                }
                if (!result || result.length === 0) {
                    return resolve(`未找到城市 "${search}" 的天气信息。`);
                }
                const data = result[0];
                const current = data.current;
                const location = data.location;
                
                let report = `🌡️ ${location.name} 当前实时天气：\n`;
                report += `- 温度：${current.temperature}°${degreeType}\n`;
                report += `- 体感温度：${current.feelslike}°${degreeType}\n`;
                report += `- 天气状况：${current.skytext}\n`;
                report += `- 湿度：${current.humidity}%\n`;
                report += `- 风力：${current.winddisplay}\n\n📅 近期天气预报：\n`;
                
                data.forecast.slice(0, 3).forEach((f: any) => {
                    report += `[${f.date} 星期${f.day}] ${f.skytextday}, ${f.low}°${degreeType} ~ ${f.high}°${degreeType}\n`;
                });
                
                resolve(report);
            });
        });
    }
};

export default api;
