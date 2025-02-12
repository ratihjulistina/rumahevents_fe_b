"use client";

import { useState, useEffect } from "react";
import { api_url, fetchCategories, uploadToCloudinary } from "../helpers/api";

export interface Category {
  id: number;
  category_name: string;
}

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    available_seats: 0,
    created_by: 0,
    price: 0,
    image_src: "",
    start_date: "",
    end_date: "",
    category_ids: [] as number[],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(api_url + "/categories/");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        console.log("Fetched categories:", data); // Debugging
        setCategories(data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories"
        );
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(api_url + "/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const result = await response.json();
      alert("Event created successfully!");
      console.log("Event created:", result);

      // Reset the form
      setFormData({
        name: "",
        description: "",
        location: "",
        available_seats: 0,
        price: 0,
        created_by: 1,
        image_src: "",
        start_date: "",
        end_date: "",
        category_ids: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Available Seats */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Seats
            </label>
            <input
              type="number"
              name="available_seats"
              value={formData.available_seats}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Event Photo
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const imageUrl = await uploadToCloudinary(file);
                  setFormData((prev) => ({
                    ...prev,
                    image_src: imageUrl,
                  }));
                }
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="datetime-local"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="datetime-local"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <select
              name="categoryIds"
              multiple
              value={formData.category_ids.map(String)}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions);
                const selectedIds = selectedOptions.map((option) =>
                  parseInt(option.value)
                );
                console.log("Selected category IDs:", selectedIds); // Debugging
                setFormData((prev) => ({
                  ...prev,
                  category_ids: selectedIds,
                }));
              }}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
            </select>
          </div>

          {/* Display Selected Categories */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Selected Categories
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {formData.category_ids.map((categoryId) => {
                const selectedCategory = categories.find(
                  (category) => category.id === categoryId
                );

                return (
                  selectedCategory && (
                    <span
                      key={categoryId}
                      className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
                    >
                      {selectedCategory.category_name}
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            categoryIds: prev.category_ids.filter(
                              (id) => id !== categoryId
                            ),
                          }));
                        }}
                        className="ml-2 text-indigo-600 hover:text-indigo-900"
                      >
                        &times;
                      </button>
                    </span>
                  )
                );
              })}
            </div>
          </div>
          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
