import React from "react";
import DecryptedText from "../components/DecryptedText";

const BrochurePage = () => {
  return (
    <section className="section-container border-t border-white/10 flex flex-col items-center justify-center py-20 min-h-[50vh]">
      <div className="w-full max-w-4xl flex flex-col items-center text-center gap-8 relative z-10">
         <div className="inline-flex items-center gap-2 mb-4">
             <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"/>
             <span className="font-mono text-sm md:text-base text-orange-500 uppercase tracking-widest">
               Event Details
             </span>
          </div>
          
          <h2 className="font-hackwise text-4xl md:text-6xl text-white uppercase tracking-wide">
            Get the <span className="text-orange-500">Brochure</span>
          </h2>

          <p className="text-white/70 font-sans text-lg md:text-xl max-w-2xl">
            Everything you need to know about Hackwise 2.0. Themes, tracks, timeline, and guidelines - all in one document.
          </p>

          <a
              href="/brochure.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="w-fit px-8 py-4 text-black font-bold font-mono bg-orange-500 hover:brightness-110 transition-all duration-300 rounded-none cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]"
              style={{
                  clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)"
              }}
          >
              <DecryptedText text="Download Brochure" sequential speed={40} />
          </a>
      </div>
      
      {/* Optional decorative background elements similar to other sections */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default BrochurePage;

