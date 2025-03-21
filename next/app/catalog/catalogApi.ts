import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Product } from "@/models/product";

export const catalogApi = createApi({
  reducerPath: "catalogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com" }),
  endpoints: (builder) => ({
    fetchProducts: builder.query<Product[], void>({
      query: () => "products",
    }),
    fetchProductDetails: builder.query<Product, number>({
      query: (productId) => `products/${productId}`,
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductDetailsQuery } =
  catalogApi;
