"use client";

import { api_url } from "@/app/helpers/api";
import { useState } from "react";

interface BuyTicketModalProps {
  eventId: number;

  onClose: () => void;
}

const BuyTicketModal: React.FC<BuyTicketModalProps> = ({
  eventId,

  onClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [couponId, setCouponId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(api_url + "/tickets/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 3,
          event_id: eventId,
          quantity,
          coupon_id: couponId || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to purchase ticket");
      }

      const data = await response.json();

      if (data) {
        alert("Ticket purchased successfully!");
        onClose();
      }
    } catch (err) {
      setError("Failed to purchase ticket. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Confirm</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="couponId"
              className="block text-sm font-medium text-gray-700"
            >
              Coupon Code (Optional)
            </label>
            <input
              type="text"
              id="couponId"
              value={couponId}
              onChange={(e) => setCouponId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
            >
              {isLoading ? "Purchasing..." : "Order Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyTicketModal;
