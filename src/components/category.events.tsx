/** @format */
"use client";
import { getEvents, getNearestEvents } from "@/app/helpers/api";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ICard } from "@/interfaces/card.interface";
import CardSkeletonList from "./skeleton/card.skeleton";
import { Card } from "./card";

export default function CategoryEvent({ filterkey }: { filterkey: string }) {
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
    <div id="category" className="flex flex-col max-w-screen-2xl m-auto my-6">
      <div className="m-auto text-2xl lg:text-3xl text-purple-950 font-bold mt-5 mb-8 flex justify-start w-[90%]">
        Kategori {filterkey}!
      </div>
      <div className="m-auto grid grid-cols-2 text-xs md:text-sm md:grid-cols-3  lg:grid-cols-5 lg:w-[90%] px-6 lg:px-3 gap-4 lg:gap-5">
        {isLoading ? (
          <CardSkeletonList />
        ) : (
          events
            .filter((post) => post.category === filterkey)
            .map((card, key) => <Card {...card} key={key} />)
        )}
      </div>
    </div>
  );
}
