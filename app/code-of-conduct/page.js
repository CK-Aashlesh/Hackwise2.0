import CodeOfConductContent from "./CodeOfConductContent";

export const metadata = {
  title: "Code of Conduct | Hackwise 2.0",
  description: "Community guidelines and code of conduct for Hackwise 2.0. We are dedicated to providing a harassment-free hackathon experience for everyone.",
  keywords: ["hackathon code of conduct", "community guidelines", "harassment-free event", "Hackwise 2.0 rules"],
  openGraph: {
    title: "Code of Conduct | Hackwise 2.0",
    description: "Community guidelines and code of conduct for Hackwise 2.0.",
    images: ["/assets/Hackloho.png"],
  },
};

export default function CodeOfConductPage() {
  return <CodeOfConductContent />;
}
