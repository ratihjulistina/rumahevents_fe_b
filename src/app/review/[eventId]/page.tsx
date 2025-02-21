// app/review/[eventId]/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { use } from "react"; // Import the `use` hook
import { api_url } from "@/app/helpers/api";

export default function ReviewPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState<number | "">(0); // Allow empty string for initial state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Unwrap the `params` Promise using `use`
  const { eventId } = use(params);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(api_url + "/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          rating: (rating || 0).toString,
          event_id: parseInt(eventId),
          user_id: 3,
        }),
      });
      console.log("RESPON", response);
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      // Redirect to the tickets page after successful submission
      router.push("/tickets");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 w-[90%] m-auto">
      <h1 className="text-2xl font-bold mb-6">Review Event</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Rating</label>
          <input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => {
              const value = e.target.value;
              // If the input is empty, set rating to an empty string
              // Otherwise, parse it as a number
              setRating(value === "" ? "" : parseFloat(value));
            }}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Review</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-purple-600 text-white rounded-md"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
