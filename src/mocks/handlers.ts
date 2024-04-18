import { http, HttpResponse } from "msw";
import posts from "./posts.json";
import feeds from "./feed.json";

export const handlers = [
  http.get("/posts/:id", ({ params }) => {
    const { id } = params;
    const post = posts.filter((post) => post.postId === Number(id));
    return HttpResponse.json(post);
  }),
  http.post("/post", async ({ request }) => {
    const info = await request.json();
    posts.push(info);
    return HttpResponse.json({ success: true });
  }),
  http.get("/feeds", () => {
    return HttpResponse.json(feeds);
  }),
  http.post("/feed", async ({ request }) => {
    const feed = await request.json();
    feeds.push(feed);
    return HttpResponse.json({ success: true });
  }),
];
