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

import { useAppSelector } from "@/store/store";

export default function OrdersPage() {
  const { userEmail } = useAppSelector((state) => state.auth);
  const { data: orders, isLoading } = useFetchOrdersQuery(userEmail!);

  if (isLoading) return <div>Loading orders...</div>;

  if (!orders || orders?.length === 0)
    return (
      <h1 className="mt-10 text-3xl font-semibold text-center">
        No orders available
      </h1>
    );

  return (
    <div className="mt-10 w-3/5 mx-auto space-y-10">
      <h1 className="text-3xl font-semibold text-center">My orders</h1>
      <Table aria-label="Orders table">
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
              <TableCell>{format(order.createdAt!, "dd/MM/yyyy")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
