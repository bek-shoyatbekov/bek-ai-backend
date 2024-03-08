import { registerAs } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export enum ConfigKey {
  App = 'APP',
  Db = 'DB',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  Testing = 'testing',
}

const APPConfig = registerAs(ConfigKey.App, () => ({
  env:
    Environment[process.env.NODE_ENV as keyof typeof Environment] ||
    'development',
  port: Number(process.env.APP_PORT),
  appName: process.env.APP_NAME,
  apiKey: process.env.API_KEY,

  model: genAI.getGenerativeModel({
    model: process.env.MODEL,
  }),
}));

const DBConfig = registerAs(ConfigKey.Db, () => ({
  uri: process.env.DB_URI,
}));

export const configurations = [APPConfig, DBConfig];
