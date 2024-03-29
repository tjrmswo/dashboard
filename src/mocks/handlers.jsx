import { http, HttpResponse } from "msw";
import { BList } from "../constans/BuyerList_Constants/userMockData/BList";

export const handlers = [
  http.get("/fetchData", () => {
    return HttpResponse.json(BList);
  }),
  http.get("/getImg/:userSubscribeStory", ({ params }) => {
    const { userSubscribeStory } = params;
    const searchimg = BList.filter((data) => {
      return String(data.userSubscribeStory) === userSubscribeStory;
    });
    return HttpResponse.json({ data: searchimg, status: 200 });
  }),
  http.post("/upload", async ({ request }) => {
    const data = await request.json();
    const file = data.picture;

    if (!file) {
      return new HttpResponse.json("Missing document", { status: 401 });
    }

    return HttpResponse.json({
      file,
    });
  }),
];
