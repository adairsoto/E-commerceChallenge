"use client";

import { useFetchProductsQuery } from "./catalogApi";
import ProductCard from "./ProductCard";

export default function CatalogPage() {
  const { data, isLoading } = useFetchProductsQuery();

  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
      {data.map((product) => (
        <ProductCard key={product.title} product={product} />
      ))}
    </div>
  );
}
