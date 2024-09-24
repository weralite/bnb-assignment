import { useState, useRef } from "react";
import HamburgerIcon from "../common/HamburgerIcon";
import profilePic from "@/app/assets/no-profile.svg";
import Image from "next/image";
import Modal from "../common/Modal";

export default function DesktopMenu() {
  const [openModal, setModal] = useState<boolean>(false);
  const toggleButtonRef = useRef<HTMLDivElement | null>(null); 

  const handleModal = () => {
    setModal((prev) => !prev); 
  };

  const menuContent = (
    <ul className="text-md font-medium text-gray-700">
      <li className="pr-10 py-2 border-b border-gray-300">Login</li>
      <li className="pr-10 py-2">Register</li>
    </ul>
  );

  return (
    <>
      <div
        onClick={handleModal}
        className="hidden sm:flex gap-4 items-center px-4 shadow-custom border border-custom-grey rounded-[32px] h-14 relative z-10 cursor-pointer"
        ref={toggleButtonRef} 
      >
        <HamburgerIcon />
        <Image src={profilePic} alt="profile picture" width={40} height={40} className="rounded-full" />

        <Modal
          open={openModal}
          onClose={handleModal} 
          size="sm"
          content={menuContent}
          toggleButtonRef={toggleButtonRef} 
        />
      </div>
    </>
  );
}
