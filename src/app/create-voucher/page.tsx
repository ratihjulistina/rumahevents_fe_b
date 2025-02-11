"use client";
import { useState } from "react";

const CreateVoucherForm = ({ eventId }: { eventId: number }) => {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTo, setValidTo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/vouchers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        discount: parseFloat(discount),
        valid_from: validFrom,
        valid_to: validTo,
        event_id: eventId,
      }),
    });

    if (response.ok) {
      setMessage("Voucher created successfully!");
    } else {
      setMessage("Failed to create voucher.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Voucher Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="number"
        placeholder="Discount (%)"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="datetime-local"
        placeholder="Valid From"
        value={validFrom}
        onChange={(e) => setValidFrom(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      />
      <input
        type="datetime-local"
        placeholder="Valid To"
        value={validTo}
        onChange={(e) => setValidTo(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-lg"
      >
        Create Voucher
      </button>
      {message && <p className="text-center">{message}</p>}
    </form>
  );
};

export default CreateVoucherForm;
