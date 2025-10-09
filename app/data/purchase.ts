export interface Purchase {
  id: string;
  date: string;
  time: string;
  paymentMode: string;
  amount: string;
  status: "Success" | "Failed";
}

export const purchases: Purchase[] = [
  { id: "#12341", date: "11/11/24", time: "07:00:19 PM (IST)", paymentMode: "UPI", amount: "₹499", status: "Success" },
  { id: "#45765", date: "11/11/24", time: "07:00:19 PM (IST)", paymentMode: "Credit Card", amount: "₹499", status: "Failed" },
  { id: "#56212", date: "11/11/24", time: "07:00:19 PM (IST)", paymentMode: "UPI", amount: "₹499", status: "Success" },
];
