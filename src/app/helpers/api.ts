/** @format */
import { ICard } from "@/interfaces/card.interface";

export const api_url = process.env.NEXT_PUBLIC_API_URL || "";
export const getEvents = async (eventName: string) => {
  console.log("******************** API_URL ************* " + api_url);
  const res = await fetch(api_url + "/events/newest");
  const data = await res.json();

  console.log(data.data);
  return data.data;
};

export const getEvent = async (slug: string) => {
  console.log("-------ini url ------", api_url + "/events/slug?slug=" + slug);
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
