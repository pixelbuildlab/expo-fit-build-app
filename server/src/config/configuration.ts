import {API_KEY_ENV_VAR} from '../constants';

export default () => ({
  port: parseInt(process.env.PORT ?? '0', 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiToken: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-02-06',
  },

  ai: {
    openRouterApiKey: process.env.OPENROUTER_API_KEY,
    defaultModel: 'openai/gpt-oss-20b:free',
    baseURL: 'https://openrouter.ai/api/v1',
  },

  apiKey: process.env[API_KEY_ENV_VAR],
});
