import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addToast } from "@heroui/toast";
import { redirect } from "next/navigation";

import { removeCartId } from "../cart/cartSlice";

import { Order } from "@/models/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    fetchOrders: builder.query<Order[], string>({
      query: (userEmail) => `orders?userEmail=${userEmail}`,
      providesTags: ["Order"],
    }),
    addOrder: builder.mutation<void, Order>({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Order"],
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(removeCartId());
          addToast({
            title: "Order created successfully",
            color: "success",
          });
        } catch {
          addToast({
            title: "Problem creating order",
            color: "danger",
          });
        }
        redirect("/orders");
      },
    }),
  }),
});

export const { useFetchOrdersQuery, useAddOrderMutation } = orderApi;
