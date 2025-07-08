// src/config/configuration.ts
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  mongoUri: process.env.DATABASE_URL,
  port: process.env.PORT || 3000,
});
