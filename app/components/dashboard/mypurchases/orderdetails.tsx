"use client";

import { X } from "lucide-react";
import { Payment } from "@/app/types/payment"; 

interface OrderDetailsModalProps {
    order: Payment;
    onClose: () => void;
}

export default function OrderDetailsModal({ order, onClose }: OrderDetailsModalProps) {
    const { date, time } = {
        date: new Date(order.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: new Date(order.paymentDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white rounded-md w-[90%] sm:w-[400px] shadow-lg relative animate-fade-in-up">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold">Order Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                
                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    {/* Event Details Section */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Event Information</h4>
                        <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-md">
                            <p><strong>Name:</strong> {order.event_id.fullName}</p>
                            <p><strong>Short Name:</strong> {order.event_id.shortName}</p>
                            <p><strong>Registration:</strong> {order.event_id.regType}</p>
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Payment Details</h4>
                        <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-md">
                            <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                            <p><strong>Total Amount:</strong> <span className="font-bold">₹{order.amount.toFixed(2)}</span></p>
                            <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p><strong>Gateway:</strong> {order.paymentGateway}</p>
                            <p><strong>Date:</strong> {date} at {time}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t bg-gray-50 rounded-b-md flex justify-between items-center">
                     <a 
                        href={`/dashboard/events/${order.event_id._id}`} 
                        className="text-sm bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                     >
                        View Event Page
                     </a>
                    <button
                        onClick={onClose}
                        className="text-sm bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
            {/* Simple animation */}
            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
}

