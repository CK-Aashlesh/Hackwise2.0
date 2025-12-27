import PrivacyPolicyContent from "./PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy | Hackwise 2.0",
  description: "Privacy Policy for Hackwise 2.0. Learn how we collect, use, and protect your personal information.",
  keywords: ["privacy policy", "data protection", "Hackwise 2.0 privacy", "information collection"],
  openGraph: {
    title: "Privacy Policy | Hackwise 2.0",
    description: "Privacy Policy for Hackwise 2.0. Learn how we collect, use, and protect your personal information.",
    images: ["/assets/Hackloho.png"],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
