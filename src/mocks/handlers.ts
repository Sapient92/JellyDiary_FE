import { http, HttpResponse } from "msw";
import posts from "./posts.json";

export const handlers = [
  http.get("posts", () => {
    return HttpResponse.json(posts);
  }),
];
