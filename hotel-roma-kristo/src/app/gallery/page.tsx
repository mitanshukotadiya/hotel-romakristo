import type { Metadata } from "next";
import GalleryPageContent from "./GalleryPageContent";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse our gallery showcasing the elegant rooms, lobby, dining areas, and exteriors of Hotel Roma Kristo in Dwarka.",
  openGraph: {
    title: "Gallery | Hotel Roma Kristo",
    description: "Visual tour of Hotel Roma Kristo, Dwarka.",
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
