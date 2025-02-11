/** @format */
"use client";
import { getEvents } from "@/app/helpers/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ICard } from "@/interfaces/card.interface";
import CardSkeletonList from "./skeleton/card.skeleton";
// import CardSkeletonList from "./skeleton/card.skeleton";

export default function CardList() {
  const [events, setEvents] = useState<Array<ICard>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";
  useEffect(() => {
    console.log("MASUK SINI???");
    setIsLoading(true);
    getEvents(search)
      .then((res) => setEvents(res))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [search]);
  return (
    <div className="flex t items-center flex-col max-w-screen-2xl m-auto my-6">
      <div className="text-2xl text-purple-950 font-bold my-5">
        New Entry Events
      </div>
      <div className="grid grid-cols-2 text-xs md:text-sm md:grid-cols-3  lg:grid-cols-4 lg:w-[80%] px-6 gap-4">
        {isLoading ? (
          <CardSkeletonList />
        ) : (
          events.map((card, key) => <Card {...card} key={key} />)
        )}
      </div>
    </div>
  );
}

export function Card(props: ICard) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  return (
    <Link href={"/events/" + props.slug}>
      <div className="w-full  max-w-[230px] bg-purple-100 rounded-lg shadow-xl">
        <div className=" w-full ">
          <div className="w-full">
            <div className=" relative">
              <Image
                width={216}
                height={100}
                className=" w-full rounded-t-lg"
                src={"/tes.jpg"}
                alt=""
              />
              <Image
                width={60}
                height={60}
                alt=""
                className={`w-[45px] h-[45px] absolute right-[15%] top-[10%] ${
                  !(props.available_seats == 0) ? "hidden" : "block"
                } `}
                src="/sold-icon.png"
              />

              <div className="absolute left-0 top-0 bg-purple-50 px-2 py-1 font-medium rounded-br-lg">
                {formatDate(props.start_date)}
              </div>
            </div>
          </div>

          <div className="px-2 md:px-5 mt-4 flex flex-col  ">
            <b className="h-8 md:h-10 mb-1 w-full overflow-hidden ">
              {props.name}
            </b>
            <b className="h-8 md:h-10 mb-2 w-full overflow-hidden text-gray-500">
              {props.location}
            </b>

            <b className="text-[#159953] overflow-hidden mb-2">
              {props.price == 0
                ? "Free"
                : `IDR ${props.price.toLocaleString()}`}
            </b>
          </div>
        </div>
      </div>
    </Link>
  );
}
