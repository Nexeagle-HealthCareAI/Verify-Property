"use client";
import dynamic from "next/dynamic";

const FavouritesClient = dynamic(() => import("./FavouritesClient"), { ssr: false });

export default function FavouritesClientWrapper() {
  return <FavouritesClient />;
}
