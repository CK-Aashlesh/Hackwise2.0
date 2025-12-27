"use client";
import React from "react";
import DecryptedText from "../components/DecryptedText";

export default function PrivacyPolicyContent() {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm text-orange-500 uppercase tracking-widest">
            Legal
          </span>
        </div>
        <h1 className="font-hackwise text-4xl md:text-6xl text-white tracking-wide uppercase mb-4">
          Privacy <span className="text-orange-500">Policy</span>
        </h1>
      </div>

      <div className="w-full max-w-4xl relative z-10">
        <div className="border border-white/10 bg-[#0A090F]/80 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            {/* Decorative corners */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500"/>
            <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500"/>
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500"/>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500"/>

            <div className="space-y-8 text-white/80 font-sans leading-relaxed">
                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">1. Information Collection</h3>
                    <p>
                        We collect information you provide directly to us when you register for the hackathon, including your name, email address, phone number, academic details, and team information. We may also collect information automatically when you visit our website, such as your IP address and browser type.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">2. Use of Information</h3>
                    <p>
                        We use the information we collect to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                        <li>Facilitate your participation in Hackwise 2.0.</li>
                        <li>Communicate with you about event updates, schedules, and logistics.</li>
                        <li>Provide support and respond to your inquiries.</li>
                        <li>Analyze usage trends to improve our event and website.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">3. Information Sharing</h3>
                    <p>
                        We do not sell your personal information. We may share your information with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                        <li>Sponsors and partners for recruitment or promotional purposes (only if you opt-in).</li>
                        <li>Service providers who help us organize the event (e.g., platform hosting).</li>
                        <li>Legal authorities if required by law or to protect our rights.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">4. Data Security</h3>
                    <p>
                        We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">5. Photography and Video</h3>
                    <p>
                        By attending Hackwise 2.0, you acknowledge that you may be photographed or video recorded. These images and recordings may be used for marketing and promotional purposes by Sphere Hive and its partners.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">6. Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at <a href="mailto:spherehive@kvgce.ac.in" className="text-orange-500 hover:underline">spherehive@kvgce.ac.in</a>.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

