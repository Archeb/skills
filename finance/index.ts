import yahooFinance from 'yahoo-finance2';

const api = {
    quote: async (symbol: string): Promise<string> => {
        try {
            // 屏蔽静默日志以防污染标准输出
            yahooFinance.suppressNotices(['yahooSurvey']);
            
            const result = await yahooFinance.quote(symbol);
            if (!result) {
                return `无法获取到股票或货币代码为 "${symbol}" 的任何行情数据。`;
            }
            
            const name = result.longName || result.shortName || symbol;
            const price = result.regularMarketPrice;
            const changePercent = result.regularMarketChangePercent;
            const currency = result.currency || "";
            
            let trend = "平盘";
            if (changePercent && changePercent > 0) trend = "📈 上涨";
            if (changePercent && changePercent < 0) trend = "📉 下跌";
            
            return `📊 ${name} (${symbol}) 实时盘面快照：
- 当前价格：${price} ${currency}
- 当日变动：${trend} (${changePercent ? changePercent.toFixed(2) : 0}%)
- 昨日收盘价：${result.regularMarketPreviousClose} ${currency}
- 成交量：${result.regularMarketVolume}
- 快照市场：${result.marketState}`;
            
        } catch (err: any) {
            return `引擎遭遇上游错误：${err.message}`;
        }
    }
};

export default api;
