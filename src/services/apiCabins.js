import supabase, { CABIN_PHOTOS_STORAGE_URL } from "./supabase";

const uploadImage = async (image) => {
  const imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
  const imagePath = `${CABIN_PHOTOS_STORAGE_URL}${imageName}`;

  // 1. Upload image to storage bucket
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  if (storageError) {
    console.error(storageError);
    throw new Error("Cabin image could not be uploaded");
  }

  return imagePath;
};

const deleteImage = async (imageName) => {
  const { error: imageError } = await supabase.storage
    .from("cabin-images")
    .remove([imageName]);

  if (imageError) {
    console.log(imageError);
    throw new Error("Failed to delete image");
  }
};

export const getCabins = async () => {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};

export const createCabin = async (newCabinData) => {
  // 1. Upload image to storage bucket
  const imagePath = await uploadImage(newCabinData.image);

  // 1. Create Cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabinData, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
};

export const updateCabin = async (updatedCabinData) => {
  let { id, image, ...cabinData } = updatedCabinData;
  let newImageUploaded = false;
  // Upload image if the value is not a string url
  if (typeof image === "object") {
    image = await uploadImage(image);
    newImageUploaded = true;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinData, image })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Cabin update failed");
  }

  if (newImageUploaded) {
    // TODO - Delete old image from storage bucket
  }

  return data;
};

export const deleteCabin = async ({ cabinId, imageName }) => {
  const { data, error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", cabinId);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  // Delete the image from the storage bucket
  await deleteImage(imageName);

  return data;
};
