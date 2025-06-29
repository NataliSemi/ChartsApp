// components/AdminOrdersTable.tsx
"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  arrangementId: string;
  title: string;
  price: number;
};

type OrderType = {
  _id: string;
  items: OrderItem[];
  total: number;
  email: string;
  status: "pending" | "paid" | "failed";
  createdAt: string;
};

export default function AdminOrdersTable() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="bg-neutral-800 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-300 border-b border-neutral-600">
              <th>ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Total</th>
              <th>Items</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b border-neutral-700">
                <td>{order._id.slice(-6)}</td>
                <td>{order.email}</td>
                <td>{order.status}</td>
                <td>${(order.total / 100).toFixed(2)}</td>
                <td>
                  <ul>
                    {order.items.map((item, i) => (
                      <li key={i}>{item.title} (${(item.price / 100).toFixed(2)})</li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
