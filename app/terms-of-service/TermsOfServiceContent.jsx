"use client";
import React from "react";
import DecryptedText from "../components/DecryptedText";

export default function TermsOfServiceContent() {
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
          Terms of <span className="text-orange-500">Service</span>
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
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">1. Acceptance of Terms</h3>
                    <p>
                        By participating in Hackwise 2.0, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not participate in the event.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">2. Eligibility</h3>
                    <p>
                        Participants must be a student or a recent graduate to participate in the student track.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">3. Intellectual Property</h3>
                    <p>
                        Participants retain ownership of all intellectual property rights to their submissions. However, by participating, you grant Hackwise 2.0 and Sphere Hive a non-exclusive, royalty-free license to use, reproduce, and display your project for promotional and marketing purposes.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">4. Liability</h3>
                    <p>
                        Hackwise 2.0 and its organizers are not responsible for any personal injury, loss, or damage to property incurred during the event. Participants are responsible for their own belongings and safety.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">5. Privacy</h3>
                    <p>
                        We respect your privacy. Any personal information collected during registration will be used solely for the purpose of organizing the hackathon and communicating with participants. We will not share your data with third parties without your consent, except as required by law.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl text-white font-mono font-bold mb-4 uppercase text-orange-500">6. Modifications</h3>
                    <p>
                        Hackwise 2.0 reserves the right to modify these Terms of Service at any time. Participants will be notified of any significant changes. Continued participation constitutes acceptance of the modified terms.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

