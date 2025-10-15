"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Payment } from "@/app/types/payment"; 

import OrderDetailsModal from "./orderdetails" // <-- Impor  new modal component

interface MyPurchasesContentProps {
  purchases: Payment[];
}

export default function MyPurchasesContent({ purchases }: MyPurchasesContentProps) {
    const [search, setSearch] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<Payment | null>(null);

    // Filter purchases based on the transactionId
    const filtered = purchases.filter((p) =>
        p.transactionId.toLowerCase().includes(search.toLowerCase())
    );
    
    // Function to format date and time for display
    const formatDateTime = (isoString: string) => {
        const date = new Date(isoString);
        return {
            date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        };
    };

    // Function to determine status badge color
    const getStatusClass = (status: Payment['status']) => {
        switch (status) {
            case "SUCCESS": return "bg-green-100 text-green-700";
            case "FAILED": return "bg-red-100 text-red-600";
            case "PENDING": return "bg-yellow-100 text-yellow-700";
            case "REFUNDED": return "bg-blue-100 text-blue-700";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">My Purchases</h2>

            {/* Filter + Search */}
            <div className="flex items-center gap-3 mb-4">
                <button className="p-2 border rounded-lg hover:bg-gray-100"><Filter size={18} /></button>
                <div className="flex items-center border rounded-lg px-2 w-64">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by Transaction ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 w-full outline-none text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600 text-left border-b">
                            <th className="p-3">TRANSACTION ID</th>
                            <th className="p-3">DATE AND TIME</th>
                            <th className="p-3">PAYMENT MODE</th>
                            <th className="p-3">AMOUNT</th>
                            <th className="p-3">STATUS</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr><td colSpan={6} className="text-center p-6 text-gray-500">No purchases found.</td></tr>
                        ) : (
                            filtered.map((p) => {
                                const { date, time } = formatDateTime(p.paymentDate);
                                return (
                                    <tr key={p._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium text-gray-800">{p.transactionId}</td>
                                        <td className="p-3">{date}<br /><span className="text-xs text-gray-500">{time}</span></td>
                                        <td className="p-3">{p.paymentMode}</td>
                                        <td className="p-3">₹{p.amount.toFixed(2)}</td>
                                        <td className="p-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(p.status)}`}>
                                                {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="p-3 text-orange-500 font-medium cursor-pointer hover:underline" onClick={() => setSelectedOrder(p)}>
                                            Order Details
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                <p>Showing {filtered.length} of {purchases.length} results</p>
            </div>

            {/* Render the imported modal component */}
            {selectedOrder && <OrderDetailsModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
        </div>
    );
}

