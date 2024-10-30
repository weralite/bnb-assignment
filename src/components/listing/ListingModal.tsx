"use client";

import { useState, ReactNode } from "react";
import ListingPostForm from "./ListingPostForm";
import ListingByUser from "./ListingByUser";

interface Tab {
  label: string;
  content: ReactNode;
}

export default function ListingModal({ onClose }: { onClose: () => void }) {
  const tabs: Tab[] = [
    { label: "Active Listings", content: <ListingByUser /> },
    { label: "Add Listing", content: <ListingPostForm onClose={onClose} /> },
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
      <div className="relative h-full overflow-y-auto flex flex-col">
      <div className="my-auto">
        {tabs[activeTab].content}
        </div>
      </div>
    </div>
  );
}
