declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORTAL: Number;
      Secret_key: string;
      DB_URL: string;
      OPEN_AI_KEY: string;
    }
  }
}
export {};
