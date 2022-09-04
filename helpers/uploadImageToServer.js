import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase/config";

export const uploadImageToServer = async (image, folder) => {
  const response = await fetch(image);
  const file = await response.blob();

  const fileName = uuidv4();
  const dataRef = ref(storage, folder + "/" + fileName);
  await uploadBytes(dataRef, file);
  const imageURL = await getDownloadURL(ref(storage, dataRef));

  return imageURL;
};
