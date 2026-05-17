import { File } from "expo-file-system";
import { supabase } from "./client";

export const uploadProfileImage = async (userId: string, imgUri: string) => {
  try {
    const fileExtention = imgUri.split(".").pop() || "jpg";
    const fileName = `${userId}/profile.${fileExtention}`;
    const file = new File(imgUri);
    const byte = await file.bytes();

    const { error } = await supabase.storage
      .from("profiles")
      .upload(fileName, byte, {
        contentType: `image/${fileExtention}`,
        upsert: true,
      });

    if (error) throw error;

    const { data } = supabase.storage.from("profiles").getPublicUrl(fileName);

    return data.publicUrl;

  } catch (error) {
    console.error("error:", error);
    throw error
  }
};
