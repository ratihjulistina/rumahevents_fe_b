/** @format */

import { getEvent } from "@/app/helpers/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const slug = (await params).slug;
  const event = await getEvent(slug);
  console.log("ini slug", slug);
  console.log("======ini isi eventnyaa===", event);
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-screen-xl w-full mt-14">
        <div className="flex gap-2 mb-2 mx-3">
          <Link href="/">Home</Link>
          <span className="grey">{"/"}</span>
          <Link href="#">{event.name}</Link>
        </div>
        <div className="flex p-3 md:border md:shadow-md rounded-md  flex-col md:flex-row">
          <div className="w-full flex justify-center items-start ">
            <Image
              src={"/tes.jpg"}
              alt="img"
              width={1000}
              height={900}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="w-full">
            <div className="p-6">
              <h1 className="font-bold text-xl mb-5">{event.name}</h1>
              <div className="flex gap-2 my-2">
                <Image
                  src={"/date-icon.png"}
                  alt="date-icon"
                  width={20}
                  height={20}
                />
                <p>{formatDate(event.start_date)}</p>
                <span>-</span>
                <p>{formatDate(event.end_date)}</p>
              </div>
              <div className="flex gap-2 mb-2">
                <Image
                  src={"/time-icon.png"}
                  alt="date-icon"
                  width={20}
                  height={20}
                />
                <p>{formatDate(event.start_date)}</p>
                <span>-</span>
                <p>{formatDate(event.end_date)}</p>
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/place-icon.png"}
                  alt="date-icon"
                  width={20}
                  height={20}
                />
                <p>{event.location}</p>
              </div>
              <div className="flex justify-between mb-4">
                <h1 className="font-bold text-xl ">
                  {/* IDR {Number(event.price).toLocaleString()} */}
                </h1>
              </div>
              <div className="mb-6">
                <h2 className="font-bold mb-4">
                  Share this product to your friends!
                </h2>
                <div className="mt-2 flex gap-6">
                  {/* <button>
                      <Image
                        width={24}
                        height={24}
                        alt=""
                        // src={
                        //   // "https://www.kickavenue.com/static/media/instagram30.00ab54c2.png"
                        // }
                      />
                    </button>
                    <button>
                      <Image
                        width={24}
                        height={24}
                        alt=""
                        src={
                          "https://www.kickavenue.com/static/media/facebook30.6532adef.png"
                        }
                      />
                    </button>
                    <button>
                      <Image
                        width={24}
                        height={24}
                        alt=""
                        src={
                          "https://www.kickavenue.com/static/media/twitter30.a04dbd22.png"
                        }
                      />
                    </button>
                    <button>
                      <Image
                        width={24}
                        height={24}
                        alt=""
                        src={
                          "https://www.kickavenue.com/static/media/mail30.76ff49e5.png"
                        }
                      />
                    </button>
                    <button>
                      <Image
                        width={24}
                        height={24}
                        alt=""
                        src={
                          "https://www.kickavenue.com/static/media/copy30.84ed7d37.png"
                        }
                      />
                    </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
