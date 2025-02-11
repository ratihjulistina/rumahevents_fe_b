"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import CategoryList from "@/components/category.events";
import LatestEvent from "@/components/featured.event";
import { api_url } from "@/app/helpers/api";
import Link from "next/link";
import Image from "next/image";

interface Event {
  name: string;
  slug: string;
  image_src: string;
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(api_url + `/events/q?search=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="absolute sm:top-[-10%] md:top-[30%] z-10 sm:right-[10%] md:right-[50%]">
      <div className=" mt-9 p-4 bg-white w-full mx-auto sm:w-full">
        <h2 className=" font-semibold sm:text-0.5xl md:text-xl">
          Search Results for "{query}"
        </h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : results.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {results.map((event) => (
              <li key={event.slug} className="border-b py-2">
                <Link
                  href={"/events/" + event.slug}
                  className="hover:text-purple-700"
                >
                  <div className="flex justify-start items-center gap-4">
                    <Image
                      src={"/tes.jpg"}
                      alt="event-image"
                      height={20}
                      width={65}
                      className=""
                    />
                    <div>{event.name}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-4">No events found.</p>
        )}
      </div>
    </div>
  );
}
