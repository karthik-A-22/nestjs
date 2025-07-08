// src/config/config.type.ts
export interface AppConfig {
  jwt: {
    secret: string;
    expiresIn: string;
  };
  mongoUri: string;
  port: number;
}
