"use client";

import { useState } from "react";
import BuyTicketModal from "@/components/ticket.modal";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import { formatDate } from "./utilities/formDate";

interface Event {
  id: number;
  name: string;
  image_src: string;
  start_date: string;
  end_date: string;
  location: string;
  price: number;
  description: string;
}

interface EventDetailClientProps {
  event: Event;
}

const EventDetailClient: React.FC<EventDetailClientProps> = ({ event }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-screen-xl w-full mt-14">
          <div className="flex gap-2 mb-2 mx-3">
            <Link href="/">Home</Link>
            <span className="grey">{"/"}</span>
            <Link href="#">{event.name}</Link>
          </div>
          <div className="flex p-5 md:border md:shadow-md rounded-md flex-col md:flex-row gap-0 md:gap-5">
            <div className="w-full flex justify-center items-start">
              <Image
                src={event.image_src}
                alt="img"
                width={1000}
                height={900}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="w-full px-5">
              <div className="p-6 flex flex-col">
                <h1 className="font-bold text-xl mb-5">{event.name}</h1>
                <div className="flex gap-2 my-2 items-center">
                  <Image
                    src={"/date-icon.png"}
                    alt="date-icon"
                    width={19}
                    height={19}
                    layout="responsive"
                    style={{ width: "100%", maxWidth: "26px" }}
                  />
                  <p>{formatDate(event.start_date)}</p>
                  <span>-</span>
                  <p>{formatDate(event.end_date)}</p>
                </div>
                <div className="flex gap-2 mb-2 items-center">
                  <Image
                    src={"/time-icon.png"}
                    alt="date-icon"
                    width={19}
                    height={19}
                    layout="responsive"
                    style={{ width: "100%", maxWidth: "26px" }}
                  />
                  <p>{formatDate(event.start_date)}</p>
                  <span>-</span>
                  <p>{formatDate(event.end_date)}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Image
                    src={"/place-icon.png"}
                    alt="date-icon"
                    width={19}
                    height={19}
                    layout="responsive"
                    style={{ width: "100%", maxWidth: "26px" }}
                  />
                  <p>{event.location}</p>
                </div>
                <div className="flex justify-between my-10 items-center">
                  <h1 className="font-bold text-0.5xl md:text-xl">
                    IDR {Number(event.price).toLocaleString()}
                  </h1>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="bg-purple-300 font-semibold text-0.5xl px-5 md:px-10 py-2 rounded-md tracking-tight md:text-xl"
                  >
                    BELI TIKET
                  </button>
                  {isModalOpen && (
                    <BuyTicketModal
                      eventId={event.id}
                      onClose={() => setModalOpen(false)}
                    />
                  )}
                </div>
                <div className="mb-6">
                  <h2 className="font-bold mb-4">
                    Share this product to your friends!
                  </h2>
                  <div className="mt-2 flex gap-6">
                    {/* Social media buttons */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" max-w-screen-xl w-[80%] md:w-[90%] mt-14 flex flex-col justify-center items-start m-auto">
            <h1 className="text-xl font-semibold text-purple-900 mb-5">
              Description
            </h1>
            <p className="mb-10">{event.description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EventDetailClient;
