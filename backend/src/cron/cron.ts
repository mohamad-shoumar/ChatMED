import { analyzeByChat } from "../controllers/analyze.controllers";

const CronJob = require("cron").CronJob;
const job = new CronJob("0 0 * * *", analyzeByChat, null, true);
export default job;
