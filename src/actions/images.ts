import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { supabase } from "../lib/supabase";

export const images = {
  getImages: defineAction({
    input: z.object({
      bucket: z.string(),
      path: z.string().optional()
    }),
    handler: async ({ bucket, path = '' }, ctx) => {
      if (!ctx.cookies.has("sb-access-token")) {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to access this resource"
        });
      }

      const { data, error } = await supabase.storage.from(bucket).list(path);

      if (error) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An error occurred while fetching images"
        });
      }

      const images = data.map((image) => {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucket).getPublicUrl(`${path}/${image.name}`);

        return publicUrl;
      });

      return images;
    }
  })
}