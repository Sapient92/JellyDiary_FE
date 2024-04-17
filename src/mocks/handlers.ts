import { http, HttpResponse } from "msw";
import posts from "./posts.json";

export const handlers = [
  http.get("/posts", () => {
    return HttpResponse.json(posts);
  }),
  http.post("/post", async ({ request }) => {
    const info = await request.json();
    posts.push(info);
    return HttpResponse.json({ success: true });
  }),
];
