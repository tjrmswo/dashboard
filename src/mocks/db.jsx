import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  sign: {
    userSubscribeStoryId: primaryKey(Number),
    sign: String,
  },
  ebook: {
    userSubscribeStoryId: primaryKey(Number),
    ebook: String,
  },
});
export const datadb = factory({
  ebook: {
    userSubscribeStoryId: primaryKey(Number),
    ebook: String,
  },
});
db.sign.create({
  userSubscribeStoryId: "95",
  sign: "https://inklink-bucket.s3.ap-northeast-2.amazonaws.com/AdminBookCover/userSubscribeStoryId_id(95)20240314_153057)",
});
db.sign.create({
  userSubscribeStoryId: "53",
  sign: "https://inklink-bucket.s3.ap-northeast-2.amazonaws.com/AdminBookCover/userSubscribeStoryId_id(53)date(20240301_152755)",
});

db.ebook.create({
  userSubscribeStoryId: "95",
  ebook:
    "https://inklink-bucket.s3.ap-northeast-2.amazonaws.com/EBooks/userSubscribeStoryId_id%2895%29.pdf",
});
datadb.ebook.create({
  userSubscribeStoryId: "95",
  ebook:
    "https://inklink-bucket.s3.ap-northeast-2.amazonaws.com/EBooks/userSubscribeStoryId_id%2895%29.pdf",
});
