import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
    }),
  }),
});

export const { useFetchOrdersQuery, useAddOrderMutation } = orderApi;
