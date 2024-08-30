// With `output: 'hybrid'` configured:
// export const prerender = false;
import {type APIRoute} from "astro";
import {supabase} from "../../../lib/supabase";

export const POST: APIRoute = async ({cookies, request, redirect}) => {
  const formData = await request.formData();
  const {email, password} = Object.fromEntries(formData);

  if (!email || !password) {
    return new Response("Email and password are required", {status: 400});
  }

  const {data, error} = await supabase.auth.signInWithPassword({
    email: email.toString(),
    password: password.toString()
  });

  if (error) {
    return new Response(error.message, {status: 500});
  }

  const {access_token, refresh_token} = data.session;

  cookies.set("sb-access-token", access_token, {
    path: "/",
  });
  cookies.set("sb-refresh-token", refresh_token, {
    path: "/",
  });

  return redirect("/home");
}