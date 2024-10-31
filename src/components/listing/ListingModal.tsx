"use client";

import { useState, ReactNode } from "react";
import ListingRegister from "./ListingRegister";
import ListingByUser from "./ListingByUser";

interface Tab {
  label: string;
  content: ReactNode;
}

export default function ListingModal({ onClose }: { onClose: () => void }) {
  const tabs: Tab[] = [
    { label: "Active Listings", content: <ListingByUser /> },
    { label: "Add Listing", content: <ListingRegister onClose={onClose} /> },
  ];

  const [activeTab, setActiveTab] = useState(0); 

  return (
    <div className="modal h-175 flex flex-col justify-center">
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
