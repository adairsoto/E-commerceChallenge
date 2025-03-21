"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { format } from "date-fns";

import { useFetchOrdersQuery } from "./orderApi";

export default function OrdersPage() {
  const { data: orders, isLoading } = useFetchOrdersQuery("bob@email.com");

  if (isLoading) return <div>Loading orders...</div>;

  if (!orders) return <div>No orders available</div>;

  return (
    <div className="mt-10 w-3/5 mx-auto space-y-10">
      <h1 className="text-3xl font-semibold text-center">My orders</h1>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>PRODUCTS</TableColumn>
          <TableColumn>TOTAL</TableColumn>
          <TableColumn>DATE</TableColumn>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="min-w-16"># {order.id}</TableCell>
              <TableCell className="flex flex-col min-w-96">
                {order.orderItems.map((item) => (
                  <span key={item.productTitle}>{item.productTitle}</span>
                ))}
              </TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell>{format(order.createdAt, "dd/MM/yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
