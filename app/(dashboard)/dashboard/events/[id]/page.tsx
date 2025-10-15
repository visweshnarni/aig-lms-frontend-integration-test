"use client";

import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Search, ChevronDown, Play, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegisterModal from "@/app/components/dashboard/Events/RegisterModal";
import type { EventDetails, Session, Topic } from "@/app/types"; // Using centralized types
import toast from "react-hot-toast";

const formatDateRange = (startDateStr: string, endDateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  const startDate = new Date(startDateStr).toLocaleDateString("en-GB", options);
  const endDate = new Date(endDateStr).toLocaleDateString("en-GB", options);
  return `${startDate} - ${endDate}`;
};

export default function EventDetailsPage() {
  const [id, setId] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NEW: track open/closed sessions
  const [openSessions, setOpenSessions] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const eventId = pathSegments.find(segment => /^[0-9a-fA-F]{24}$/.test(segment));
    setId(eventId || null);
  }, []);

  useEffect(() => {
    if (!id) {
        setLoading(false);
        setError("Could not find a valid Event ID in the URL.");
        return;
    }


    const fetchEventData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = { 'Content-Type': 'application/json' };
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'http://localhost:5000/api';
        const response = await fetch(`${baseUrl}/events/public/details/${id}`, { headers });

        if (!response.ok) {
           const errorData = await response.json();
          throw new Error(errorData.error || `An error occurred. Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.success) {
          setEventDetails(result.data);
        } else {
          throw new Error(result.error || 'Failed to load event details.');
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);
  
   // --- NEW: API Handler for Registration ---
  const handleRegisterSubmit = async (name: string, email: string) => {
    if (!id) {
      throw new Error("Event ID is missing. Cannot register.");
    }
    
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to register.");
      // Optionally redirect to login page here
      throw new Error("User is not authenticated.");
    }

    const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/enrollments/register/free`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          event_id: id,
          fullName: name,
          email: email
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // This error message will be caught by the modal's catch block
        throw new Error(data.error || 'Failed to register for the event.');
      }

      // --- Optimistic UI Update on Success ---
      // If API call is successful, update the local state to reflect enrollment
      setEventDetails(prevDetails => {
        if (!prevDetails) return null;
        return { ...prevDetails, isEnrolled: true };
      });
      setIsModalOpen(false); // Close the modal from the parent

    } catch (err: any) {
      // Re-throw the error so the modal can display it
      throw err;
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
        <span className="ml-4 text-xl">Loading Event Details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-2xl mx-auto mt-10">
        <p><strong>Error:</strong> {error}</p>
        <p className="mt-2">Please check the URL or try again later.</p>
      </div>
    );
  }

  if (!eventDetails) {
    return <div className="p-8 text-center text-gray-600">Event not found.</div>;
  }

  const filteredSessions = eventDetails.sessions
    .map(session => ({
      ...session,
      topics: session.topics.filter(topic =>
        topic.topic.toLowerCase().includes(search.toLowerCase()) ||
        topic.speakerName?.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter(session => session.topics.length > 0);

  // Toggle session open/close
  const toggleSession = (sessionId: string) => {
    setOpenSessions(prev => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-white">
      <div className="flex items-center text-sm">
        <a href="/dashboard/events" className="text-orange-600 hover:underline">Events</a>
        <span className="mx-2 text-gray-400">{'>'}</span>
        <span className="font-medium text-orange-600">{eventDetails.fullName}</span>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-36 h-36 relative rounded-lg overflow-hidden shrink-0 shadow-md">
            <img src={eventDetails.image} alt={eventDetails.fullName} className="object-cover w-full h-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-blue-900 mb-3">{eventDetails.fullName}</h1>
            <div className="flex items-center text-black-700 mb-2">
              <CalendarDays className="w-4 h-4 mr-2 text-black-400" />
              <span>{formatDateRange(eventDetails.start_date, eventDetails.end_date)}</span>
            </div>
            <div className="flex items-center text-black-700">
              <MapPin className="w-4 h-4 mr-2 text-black-400" />
              <span>{eventDetails.venue}</span>
            </div>
          </div>
        </div>
        
        {!eventDetails.isEnrolled && (
          eventDetails.regType === 'FREE' ? (
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#00A651] hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg w-full md:w-auto"
            >
              Register Free
            </Button>
          ) : (
            <a href={`/dashboard/events/${id}/checkout`}>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg w-full md:w-auto flex items-center justify-center"
              >
                <span className="border-r border-orange-300 pr-3 mr-3 text-base">₹ {eventDetails.amount}</span>
                <span className="text-base">Buy Now</span>
              </Button>
            </a>
          )
        )}

      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Contents</h2>
        <p className="text-gray-600 mb-6">
          {eventDetails.totalSessions} Sessions • {eventDetails.totalVideos} Videos • {eventDetails.duration} mins total length
        </p>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Videos by title or speaker"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredSessions.map((session) => (
          <div key={session._id}>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => toggleSession(session._id)}>
              <h3 className="text-lg font-semibold text-gray-800">{session.name}</h3>
              <ChevronDown
                className={`w-5 h-5 text-orange-500 transition-transform duration-200 ${openSessions[session._id] ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
            {openSessions[session._id] && (
              <div className="space-y-4">
                {session.topics.map((topic, index) => (
                  <div
                    key={topic._id}
                    onClick={() => !eventDetails.isEnrolled && setIsModalOpen(true)}
                    className={`group flex items-center gap-4 p-2 border-b border-gray-200 ${
                      eventDetails.isEnrolled ? 'hover:bg-gray-50' : 'cursor-pointer'
                    } rounded-lg transition-colors duration-200`}
                  >
                    <span className="text-gray-500 font-medium w-8 text-center">{index + 1}</span>
                    <div className="w-32 h-20 relative rounded-md overflow-hidden shrink-0 bg-black">
                      <img src={topic.thumbnail} alt={topic.topic} className="w-full h-full object-cover" />
                      {eventDetails.isEnrolled ? (
                        <a href={`/dashboard/events/${id}/video/${topic._id}`} className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-8 h-8 text-white fill-white" />
                        </a>
                      ) : (
                         <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 leading-snug">{topic.topic}</p>
                      <p className="text-sm text-gray-500 mt-1">Speaker - <span className="font-semibold text-orange-600">{topic.speakerName}</span></p>
                    </div>
                    <span className="text-black-500 text-sm font-mono whitespace-nowrap">Video - {topic.video_duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

       {/* --- UPDATED: Pass the new handler to the modal --- */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        eventTitle={eventDetails.fullName}
        onRegister={handleRegisterSubmit}
      />
    </div>
  );
}
