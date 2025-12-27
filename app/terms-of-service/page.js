import TermsOfServiceContent from "./TermsOfServiceContent";

export const metadata = {
  title: "Terms of Service | Hackwise 2.0",
  description: "Terms of Service for participating in Hackwise 2.0. Information on eligibility, intellectual property, liability, and more.",
  keywords: ["terms of service", "hackathon rules", "participation agreement", "Hackwise 2.0 legal"],
  openGraph: {
    title: "Terms of Service | Hackwise 2.0",
    description: "Terms of Service for participating in Hackwise 2.0.",
    images: ["/assets/Hackloho.png"],
  },
};

export default function TermsOfServicePage() {
  return <TermsOfServiceContent />;
}
