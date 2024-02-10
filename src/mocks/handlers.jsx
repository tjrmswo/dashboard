import { http, HttpResponse } from "msw";
import { BList } from "../constans/BList";
export const handlers = [
  http.get("fetchData", () => {
    return HttpResponse.json(BList);
  }),
];
