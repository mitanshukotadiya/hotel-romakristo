import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover our premium services including restaurant, Wi-Fi, parking, housekeeping, event hall, and 24/7 reception at Hotel Roma Kristo.",
  openGraph: {
    title: "Services | Hotel Roma Kristo",
    description: "Premium hotel services in Dwarka, Gujarat.",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
