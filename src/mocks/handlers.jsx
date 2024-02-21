import { http, HttpResponse } from "msw";
import { BList } from "../constans/BuyerList_Constants/BList";
export const handlers = [
  http.get("/fetchData", () => {
    return HttpResponse.json(BList);
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
