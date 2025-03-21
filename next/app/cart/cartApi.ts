import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Cart, CartRequest } from "@/models/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/api" }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    fetchCart: builder.query<Cart, number>({
      query: (cartId) => `cart/${cartId}`,
      providesTags: ["Cart"],
    }),
    addCartItem: builder.mutation<number, CartRequest>({
      query: (cart) => ({
        url: "cart",
        method: "POST",
        body: cart,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation<
      void,
      { cartId: number; productId: number; quantity: number }
    >({
      query: ({ cartId, productId, quantity }) => ({
        url: `cart?cartId=${cartId}&productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchCartQuery,
  useAddCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;
