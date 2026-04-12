import { MailtrapClient } from 'mailtrap';
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const INBOX_ID = Number(process.env.MAILTRAP_INBOX_ID);
const ACCOUNT_ID = Number(process.env.MAILTRAP_ACCOUNT_ID);

if (!TOKEN) {
  throw new Error('MAILTRAP_TOKEN is not set in your .env file.');
}

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
  testInboxId: INBOX_ID,
  accountId: ACCOUNT_ID,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

