"use client";

import { useState, useEffect } from "react";
import { api_url } from "@/app/helpers/api";
import { ITicket } from "@/app/tickets/page";

interface PaymentModalProps {
  ticket: ITicket;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  ticket,
  onClose,
  onPaymentSuccess,
}) => {
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) {
      // Automatically expire the ticket if time runs out
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
      const response = await fetch(api_url + `/tickets/${ticket.id}/expire`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to expire ticket");
      }

      onClose();
      onPaymentSuccess(); // Refresh the ticket list
    } catch (err) {
      console.error("Error expiring ticket:", err);
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
      const response = await fetch(api_url + `/tickets/${ticket.id}/pay`, {
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

      const data = await response.json();

      if (data.success) {
        onPaymentSuccess(); // Refresh the ticket list
        onClose(); // Close the modal
      }
    } catch (err) {
      setError("Failed to process payment. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Bayar Tiket</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Jumlah Pembayaran
            </label>
            <p className="mt-1 text-lg font-semibold">
              IDR {Number(ticket.price).toLocaleString()}
            </p>
          </div>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sisa Waktu
            </label>
            <p className="mt-1 text-lg font-semibold text-red-600">
              {formatTime(timeLeft)}
            </p>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
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
    </div>
  );
};

export default PaymentModal;
