"use client";

import { useState, useEffect } from "react";
import { api_url } from "@/app/helpers/api";
import Link from "next/link";
import { formatDate } from "@/components/utilities/formDate";
import PaymentModal from "@/components/payment.modal";

export interface ITicket {
  id: number;
  no_invoice: string;
  event_id: number;
  event_name: string;
  event_date: string;
  price: number;
  status: string;
  quantity: number;
}

const TicketsPage = () => {
  const [activeTickets, setActiveTickets] = useState<ITicket[]>([]);
  const [pastTickets, setPastTickets] = useState<ITicket[]>([]);
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const fetchTickets = async () => {
    try {
      const response = await fetch(api_url + "/tickets/user/3");
      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      const data = await response.json();
      console.log("MANATIKETNYABOSQU", data.data);
      const now = new Date();
      const active = data.data.filter(
        (ticket: ITicket) => new Date(ticket.event_date) >= now
      );
      console.log("ACtive mana aktif", active);
      const past = data.data.filter(
        (ticket: ITicket) => new Date(ticket.event_date) < now
      );
      console.log("PASt mana lalu", past);
      setActiveTickets(active);
      setPastTickets(past);
    } catch (err) {
      setError("Failed to load tickets. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTickets();
  }, []);

  if (isLoading) {
    return <div className="w-[90%] m-auto">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  const handlePaymentSuccess = () => {
    fetchTickets();
  };
  return (
    <div className="p-6 w-[90%] m-auto">
      <h1 className="text-2xl font-bold mb-6">Tiket Kamu</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("active")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "active"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Tiket Aktif
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={`px-4 py-2 rounded-md ${
            activeTab === "past"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Tiket Lalu
        </button>
      </div>

      {/* Ticket List */}
      <div>
        {activeTab === "active" ? (
          activeTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="border p-4 rounded-lg shadow-md flex flex-col items-start justify-between"
                >
                  <h2 className="text-xl font-semibold">{ticket.event_name}</h2>
                  <div className="flex flex-col items-start justify-between">
                    <p className="text-gray-600">{ticket.no_invoice}</p>
                    <p className="text-gray-600">
                      Tanggal Event: {formatDate(ticket.event_date)}
                    </p>
                    <div className="flex flex-row items-center gap-10 bg-slate-300">
                      <div className="flex items-center gap-1">
                        <p className="text-gray-600">Price: </p>

                        <p className="text-purple-900 font-semibold">
                          IDR {Number(ticket.price).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <p className="text-gray-600">{ticket.quantity} tiket</p>
                    </div>
                    <div className="text-gray-600 font-semibold">
                      Status: {ticket.status}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="mt-4 inline-block text-purple-600 hover:underline"
                  >
                    Bayar Tiket
                  </button>
                  {selectedTicket && (
                    <PaymentModal
                      ticket={selectedTicket}
                      onClose={() => setSelectedTicket(null)}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-start">
              <p>Kamu belum punya tiket nih.</p>
              <Link href={"/"} className="text-purple-600 hover:underline">
                Cari di sini ya
              </Link>
            </div>
          )
        ) : pastTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {pastTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="border p-4 rounded-lg shadow-md flex flex-col items-start justify-between"
              >
                <h2 className="text-xl font-semibold">{ticket.event_name}</h2>
                <div className="flex flex-col items-start justify-between">
                  <p className="text-gray-600">{ticket.no_invoice}</p>
                  <p className="text-gray-600">
                    Tanggal Event: {formatDate(ticket.event_date)}
                  </p>
                  <div className="flex items-center gap-10 ">
                    <div className="flex items-center gap-1">
                      <p className="text-gray-600">Price: </p>

                      <p className="text-purple-900 font-semibold">
                        IDR {Number(ticket.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <p className="text-gray-600">{ticket.quantity} tiket</p>
                  </div>

                  <p className="text-gray-600 font-semibold">
                    Status: {ticket.status}
                  </p>
                </div>
                {ticket.status === "Done" ? (
                  <Link
                    href={`/review/${ticket.event_id}`}
                    className="mt-4 inline-block text-purple-600 hover:underline"
                  >
                    Review Event
                  </Link>
                ) : (
                  <Link
                    href={`/`}
                    className="mt-4 inline-block text-purple-600 hover:underline"
                  >
                    Lihat Event Terbaru
                  </Link>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Tiket yang dulu belum ada.</p>
        )}
      </div>
    </div>
  );
};

export default TicketsPage;
