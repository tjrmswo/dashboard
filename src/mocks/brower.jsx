import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { db } from "./db";

export const worker = setupWorker(
  ...handlers,
  // Generate REST API request handlers
  // based on the "user" model.
  ...db.sign.toHandlers("rest"),
  ...db.ebook.toHandlers("rest")
  // ...datadb.ebook.toHandlers("rest")
);
