"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { EventDetails } from "@/app/types";
import { Button } from "@/components/ui/button";

const TAX_RATE = 0.10; // 10%

export default function CheckoutPage() {
  const [id, setId] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const eventId = pathSegments[pathSegments.length - 2];
    if (/^[0-9a-fA-F]{24}$/.test(eventId)) {
        setId(eventId);
    } else {
        setError("Invalid Event ID in URL.");
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

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
            throw new Error(errorData.error || `An error occurred: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setEventDetails(result.data);
        } else {
          throw new Error(result.error || 'Could not load event data.');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-blue-900" />
      </div>
    );
  }

  if (error || !eventDetails) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg max-w-2xl mx-auto">
        <p><strong>Error:</strong> {error || "Event could not be found."}</p>
      </div>
    );
  }

  const subTotal = eventDetails.amount;
  const taxes = subTotal * TAX_RATE;
  const payableAmount = subTotal + taxes;

  // 👇 UPDATED: Removed full-screen layout classes and refined internal structure
  return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 bg-gray-50">
    {/* Header */}
    <div className="flex items-center text-sm">
      <a
        href="/dashboard/events"
        className="text-gray-600 hover:underline"
      >
        Events
      </a>
      <span className="mx-2 text-gray-400">{'>'}</span>
      <a
        href={`/dashboard/events/${id}`}
        className="text-gray-600 hover:underline"
      >
        {eventDetails.fullName}
      </a>
      <span className="mx-2 text-gray-400">{'>'}</span>
      <span className="font-medium text-orange-600">Checkout</span>
    </div>

    {/* Page Title */}
    <div className="flex items-center gap-2">
      <ArrowLeft className="w-5 h-5 text-gray-700 cursor-pointer" onClick={() => window.history.back()} />
      <h1 className="text-2xl font-bold text-blue-900">Checkout</h1>
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Order Details Card */}
      <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Order Details
        </h2>
        <hr className="border-gray-200 mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={eventDetails.image}
              alt={eventDetails.fullName}
              className="w-16 h-16 rounded-lg object-cover border"
            />
            <span className="font-semibold text-lg text-gray-800">
              {eventDetails.fullName}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total</p>
            <p className="font-bold text-lg text-gray-900">
              ₹ {subTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Summary
        </h2>
        <hr className="border-gray-200 mb-4" />
        <div className="space-y-3">
          <div className="flex justify-between text-gray-700">
            <span>Sub Total</span>
            <span>₹ {subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Taxes</span>
            <span>₹ {taxes.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-200 pt-3 mt-3">
            <span>Payable Amount</span>
            <span>₹ {payableAmount.toFixed(2)}</span>
          </div>
        </div>
        <Button className="w-full mt-6 bg-[#00A651] hover:bg-green-700 text-white font-bold py-6 text-base rounded-lg shadow-md">
          Proceed to Pay ₹ {payableAmount.toFixed(2)}
        </Button>
      </div>
    </div>
  </div>
);
}