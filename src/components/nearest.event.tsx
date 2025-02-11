/** @format */
"use client";
import { getEvents } from "@/app/helpers/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ICard } from "@/interfaces/card.interface";
import CardSkeletonList from "./skeleton/card.skeleton";
import { Card } from "./card";

export default function NearEvent() {
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
    <div className="flex flex-col items-center max-w-screen-2xl m-auto my-6">
      <div className="text-2xl text-purple-950 font-bold my-5">
        Event Terdekat!
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
