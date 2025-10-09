"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Purchase } from "@/app/data/purchase";

interface MyPurchasesContentProps {
  purchases: Purchase[];
}

export default function MyPurchasesContent({ purchases }: MyPurchasesContentProps) {
  const [search, setSearch] = useState("");

  const filtered = purchases.filter((p) =>
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">My Purchases</h2>

      {/* Filter + Search */}
      <div className="flex items-center gap-3 mb-4">
        <button className="p-2 border rounded-lg hover:bg-gray-100">
          <Filter size={18} />
        </button>
        <div className="flex items-center border rounded-lg px-2 w-64">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
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
              <th className="p-3"><input type="checkbox" /></th>
              <th className="p-3">ORDER ID</th>
              <th className="p-3">DATE AND TIME</th>
              <th className="p-3">PAYMENT MODE</th>
              <th className="p-3">AMOUNT</th>
              <th className="p-3">STATUS</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" />
                </td>
                <td className="p-3 font-medium">{p.id}</td>
                <td className="p-3">
                  {p.date}
                  <br />
                  <span className="text-xs text-gray-500">{p.time}</span>
                </td>
                <td className="p-3">{p.paymentMode}</td>
                <td className="p-3">{p.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-3 text-orange-500 font-medium cursor-pointer hover:underline">
                  Order Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
        <p>
          Showing {filtered.length} of {purchases.length}
        </p>
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="border rounded px-2 py-1 text-sm">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
