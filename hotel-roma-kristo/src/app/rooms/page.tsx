import type { Metadata } from "next";
import RoomsPageContent from "./RoomsPageContent";

export const metadata: Metadata = {
  title: "Our Rooms",
  description:
    "Explore our range of premium rooms at Hotel Roma Kristo — from Standard to Deluxe to our luxurious Suite. Every room is designed for ultimate comfort.",
  openGraph: {
    title: "Rooms | Hotel Roma Kristo",
    description: "Discover our premium room categories in Dwarka, Gujarat.",
  },
};

export default function RoomsPage() {
  return <RoomsPageContent />;
}
