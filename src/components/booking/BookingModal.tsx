"use client";

import { useState, ReactNode } from "react";
import BookingByUser from "./BookingByUser";
// import ListingRegister from "./ListingRegister";
// import ListingByUser from "./ListingByUser";

interface Tab {
  label: string;
  content: ReactNode;
}

export default function ListingModal({ onClose }: { onClose: () => void }) {
  const tabs: Tab[] = [
    { label: "My Bookings", content: <BookingByUser/> },
    // { label: "Add Listing", content: <><h2>Hello</h2></> },
  ];

  const [activeTab, setActiveTab] = useState(0); 

  return (
    <div className="modal">
      <ul className="flex flex-row justify-evenly border-b p-4">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`text-lg hover:underline cursor-pointer ${activeTab === index ? "underline" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
        {tabs[activeTab].content}
    </div>
  );
}
