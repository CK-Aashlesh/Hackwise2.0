import React from "react";
// import Partner from "../components/PartnersCarousel";
import NavBar from "../components/CardNav.jsx";
import DecryptedText from "../components/DecryptedText.jsx";

export default function Home() {
  const navItems = [
    {
      label: "About",
      bgColor: "#ff7a1a",
      textColor: "#fff",
      links: [
        { label: "Our Story", href: "#", ariaLabel: "Learn about our story" },
        { label: "Team", href: "#", ariaLabel: "Meet our team" },
      ],
    },
    {
      label: "Events",
      bgColor: "#1a1a1a",
      textColor: "#fff",
      links: [
        { label: "Upcoming", href: "#", ariaLabel: "View upcoming events" },
        { label: "Past Events", href: "#", ariaLabel: "View past events" },
      ],
    },
    {
      label: "Resources",
      bgColor: "#2a2a2a",
      textColor: "#fff",
      links: [
        { label: "Blog", href: "#", ariaLabel: "Read our blog" },
        { label: "Docs", href: "#", ariaLabel: "View documentation" },
      ],
    },
  ];

  return (
    <>
      {/* <NavBar
        logoAlt="HackWise Logo"
        items={navItems}
        baseColor="#fff"
        menuColor="#fff"
        buttonBgColor="#ff7a1a"
        buttonTextColor="#fff"
      /> */}
      <div className="roll-txt"></div>
      <div>
        <h5 className="text-white font-mono ml-[120px] z-10 text-xl relative top-100 ">
          Empowering the next wave of SaaS <br />
          innovators — turning bold ideas <br />
          into scalable impact.
        </h5>
        <button
          type="button"
          className="explore-btn relative top-[430px] ml-40 text-white font-mono font-extralight px-[60px] py-3 border-2 rounded-[5px] border-orange-500 bg-black transition"
        >
          <DecryptedText text="Register Now" sequential />
        </button>
      </div>
    </>
  );
}
