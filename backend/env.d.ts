declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORTAL: Number;
      Secret_key: string;
      DB_URL: string;
    }
  }
}
export {};
