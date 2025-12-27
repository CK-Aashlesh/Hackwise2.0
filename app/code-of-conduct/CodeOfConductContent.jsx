"use client";
import React from "react";
import DecryptedText from "../components/DecryptedText";

export default function CodeOfConductContent() {
  return (
    <section className="relative w-full min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm text-orange-500 uppercase tracking-widest">
            Community Guidelines
          </span>
        </div>
        <h1 className="font-hackwise text-4xl md:text-6xl text-white tracking-wide uppercase mb-4">
          Code of <span className="text-orange-500">Conduct</span>
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
                    <h3 className="text-xl font-mono font-bold mb-4 uppercase text-orange-500">1. Purpose</h3>
                    <p>
                        Hackwise 2.0 is dedicated to providing a harassment-free hackathon experience for everyone, regardless of gender, gender identity and expression, sexual orientation, disability, physical appearance, body size, race, age, or religion. We do not tolerate harassment of conference participants in any form.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-mono font-bold mb-4 uppercase text-orange-500">2. Expected Behavior</h3>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Be respectful and inclusive to all participants, mentors, judges, and volunteers.</li>
                        <li>Collaborate openly and help others when possible.</li>
                        <li>Respect the equipment and facilities of the venue.</li>
                        <li>Follow the instructions of the event organizers.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-mono font-bold mb-4 uppercase text-orange-500">3. Unacceptable Behavior</h3>
                    <p className="mb-2">Harassment includes, but is not limited to:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Offensive verbal comments related to gender, sexual orientation, disability, physical appearance, body size, race, or religion.</li>
                        <li>Sexual images in public spaces.</li>
                        <li>Deliberate intimidation, stalking, or following.</li>
                        <li>Harassing photography or recording.</li>
                        <li>Sustained disruption of talks or other events.</li>
                        <li>Inappropriate physical contact or unwelcome sexual attention.</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-mono font-bold mb-4 uppercase text-orange-500">4. Consequences</h3>
                    <p>
                        Participants asked to stop any harassing behavior are expected to comply immediately. If a participant engages in harassing behavior, the conference organizers may take any action they deem appropriate, including warning the offender or expulsion from the conference with no refund (if applicable).
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-mono font-bold mb-4 uppercase text-orange-500">5. Reporting</h3>
                    <p>
                        If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact a member of the conference staff immediately. Conference staff can be identified by special badges/t-shirts.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

