import sagiri from 'sagiri';

const apiKey = process.env.SAUCENAO_API_KEY;

if (!apiKey) {
    console.warn("[saucenao skill] SAUCENAO_API_KEY 未配置，该技能不可用。");
}

const client = apiKey ? sagiri(apiKey) : null;

export default client;
