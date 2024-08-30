import type {APIRoute} from "astro";
import {supabase} from "../../../lib/supabase.ts";

export const GET: APIRoute = async ({cookies, request}) => {
  const url = new URL(request.url);
  const bucketName = url.searchParams.get('bucket') || '';

  try {
    const {data =, error} = await supabase.storage.from(bucketName).list('/', {
      limit: 100,
      offset: 0,
      sortBy: {column: 'name', order: 'asc'}
    });

    const images = data?.map((image) => {
      const {publicURL, error} = supabase.storage.from(bucketName).getPublicUrl(image.name);

      if (error) {
        throw error;
      }

      return publicURL
    }) || [];
    console.log(images);
    return new Response(JSON.stringify({images}), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error retrieving images', error);

    return new Response(JSON.stringify({error: 'Internal Server Error'}), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}