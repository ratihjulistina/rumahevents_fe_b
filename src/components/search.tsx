// import { useEffect, useState } from "react";

// interface Event {
//   id: number;
//   name: string;
//   start_date: string;
// }

// const EventsList = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   // Fetch events with search query
//   const fetchEvents = async (query: string = "") => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/events?search=${query}`);
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Debounce the fetchEvents function
//   const debouncedFetchEvents = debounce(fetchEvents, 300);

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     debouncedFetchEvents(query);
//   };

//   // Fetch events on initial load
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Format date
//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Events</h1>

//       {/* Search Bar */}
//       <input
//         type="text"
//         placeholder="Search events..."
//         value={searchQuery}
//         onChange={handleSearchChange}
//         className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       {/* Loading State */}
//       {loading && <p className="text-gray-600">Loading...</p>}

//       {/* Events List */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {events.map((event) => (
//           <div key={event.id} className="border p-4 rounded-lg shadow-md">
//             <h2 className="text-xl font-semibold">{event.name}</h2>
//             <p className="text-gray-600 mt-2">
//               Date: {formatDate(event.start_date)}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* No Results Found */}
//       {!loading && events.length === 0 && (
//         <p className="text-gray-600">No events found.</p>
//       )}
//     </div>
//   );
// };

// // Debounce function
// const debounce = (func: Function, delay: number) => {
//   let timeoutId: NodeJS.Timeout;
//   return (...args: any[]) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(this, args), delay);
//   };
// };

// export default EventsList;
