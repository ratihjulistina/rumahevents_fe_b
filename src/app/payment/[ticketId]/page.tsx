"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api_url } from "@/app/helpers/api";

interface PaymentPageProps {
  params: { ticketId: string };
}

const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const router = useRouter();
  const ticketId = params.ticketId;
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [selectedBank, setSelectedBank] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch ticket details
  const [ticket, setTicket] = useState<{
    id: number;
    event_name: string;
    price: number;
    quantity: number;
  } | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(api_url + `/tickets/${ticketId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket details");
        }
        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError("Failed to load ticket details. Please try again.");
        console.error(err);
      }
    };

    fetchTicket();
  }, [ticketId]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Automatically expire the ticket if the countdown reaches 0
      handleExpireTicket();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleExpireTicket = async () => {
    try {
      const response = await fetch(api_url + `/tickets/${ticketId}/expire`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to expire ticket");
      }

      // Redirect to the tickets page
      router.push("/tickets");
    } catch (err) {
      setError("Failed to expire ticket. Please try again.");
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (!selectedBank || !paymentProof) {
        throw new Error("Please select a bank and upload payment proof.");
      }

      // Upload payment proof to Cloudinary
      const formData = new FormData();
      formData.append("file", paymentProof);
      formData.append("upload_preset", "payment_image"); // Replace with your Cloudinary upload preset

      const cloudinaryResponse = await fetch(
        "https://api.cloudinary.com/v1_1/dgpeoeiiz/image/upload", // Replace with your Cloudinary cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryResponse.ok) {
        throw new Error("Failed to upload payment proof.");
      }

      const cloudinaryData = await cloudinaryResponse.json();
      const paymentProofUrl = cloudinaryData.secure_url;

      // Update the transaction status
      const response = await fetch(api_url + `/tickets/${ticketId}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bank: selectedBank,
          payment_proof: paymentProofUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction status.");
      }

      router.push("/tickets");
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!ticket) {
    return <div>Loading ticket details...</div>;
  }

  return (
    <div className="p-6 w-[90%] m-auto">
      <h1 className="text-2xl font-bold mb-6">Bayar Tiket</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold">{ticket.event_name}</h2>
        <p className="text-gray-600">
          Jumlah Pembayaran: IDR{" "}
          {Number(ticket.price * ticket.quantity).toLocaleString()}
        </p>
        <p className="text-gray-600">Sisa Waktu: {formatTime(timeLeft)}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Pilih Bank
          </label>
          <select
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="" disabled>
              Pilih Bank
            </option>
            <option value="BCA">BCA</option>
            <option value="Mandiri">Mandiri</option>
            <option value="BNI">BNI</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Bukti Pembayaran
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => setPaymentProof(e.target.files?.[0] || null)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
          >
            {isLoading ? "Memproses..." : "Bayar"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper function to format time (HH:MM:SS)
const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")}`;
};

export default PaymentPage;
