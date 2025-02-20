/** @format */
import { ICard } from "@/interfaces/card.interface";
import { Category } from "../create-event/page";

export const api_url = process.env.NEXT_PUBLIC_API_URL || "";
export const cloudinary_url = process.env.CLOUDINARY_URL || "";
export const getEvents = async (eventName: string) => {
  const res = await fetch(api_url + "/events/newest");
  const data = await res.json();

  console.log(data.data);
  return data.data;
};

export const getNearestEvents = async (eventName: string) => {
  const res = await fetch(api_url + "/events/nearest");
  const data = await res.json();

  console.log(data.data);
  return data.data;
};

export const getEvent = async (slug: string) => {
  const res = await fetch(api_url + "/events/slug?slug=" + slug);
  console.log("ini resnya----------====", res);
  const data = await res.json();
  console.log("ini datanya----------====", data);
  return data.data as ICard;
};

// export const createEvent = async () => {
//   const res = await fetch(api_url + "/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(FormData),
//   });
//   if (!res.ok) {
//     throw new Error("Failed to create event");
//   }
//   const result = await res.json();
//   alert("Event created successfully!");
//   console.log("Event created:", result);

//   return result;
// };

export const fetchCategories = async () => {
  const response = await fetch(api_url + "/categories/");
  const data = await response.json();
  console.log("++++++dataCATEGORI", data.data);
  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return data.data as Category;
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("upload_preset", "event_images"); // Replace with your Cloudinary upload preset

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dgpeoeiiz/image/upload`, // Replace with your Cloudinary cloud name
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    console.log("ini URL IMAGE", data.secure_url);
    return data.secure_url; // Return the Cloudinary image URL
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
