"use client";

import { useState, useEffect } from "react";
import MyPurchasesContent from "@/app/components/dashboard/mypurchases/purchase";
import { Payment } from "@/app/types/payment"; // Assuming you move types to a central file

export default function PurchasesPage() {
    const [purchases, setPurchases] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Authentication token not found. Please log in again.');
                }
                
                // Get the backend URL from environment variables
                const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
                if (!baseUrl) {
                    throw new Error('Backend URL is not configured.');
                }

                const response = await fetch(`${baseUrl}/payments/my-payments`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                     throw new Error('You are not authorized. Please log in again.');
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch purchase data.');
                }

                const data = await response.json();
                if (data.success) {
                    setPurchases(data.payments);
                } else {
                    throw new Error(data.message || 'API returned an error.');
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, []);

    if (loading) {
        return <div className="p-6 text-center">Loading your purchases...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-600">Error: {error}</div>;
    }

    return <MyPurchasesContent purchases={purchases} />;
}

