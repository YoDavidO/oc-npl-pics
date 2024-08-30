// With `output: 'hybrid'` configured:
// export const prerender = false;
import { type APIRoute } from "astro";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("sb-access-token");
  cookies.delete("sb-refresh-token");

  return redirect("/signin");
}