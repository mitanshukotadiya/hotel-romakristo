import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Hotel Roma Kristo. Book your stay, inquire about rooms, or reach us for any assistance. Located in Dwarka, Gujarat.",
  openGraph: {
    title: "Contact | Hotel Roma Kristo",
    description: "Book your stay at Hotel Roma Kristo, Dwarka.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
