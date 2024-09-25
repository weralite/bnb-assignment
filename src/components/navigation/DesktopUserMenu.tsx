import { useState, useRef } from "react";
import HamburgerIcon from "../common/HamburgerIcon";
import profilePic from "@/assets/no-profile.svg";
import Image from "next/image";
import Modal from "../common/Modal";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

export default function DesktopMenu() {
  const [openModal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null); // For determining which content to show
  const toggleButtonRef = useRef<HTMLDivElement | null>(null);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  // Open login modal
  const openLoginModal = () => {
    setModal(true);
    setModalContent("login");
  };

  // Open register modal
  const openRegisterModal = () => {
    setModal(true);
    setModalContent("register");
  };

  // Menu content with login and register options
  const menuContent = (
    <ul className="text-md font-medium text-gray-700">
      <li
        className="pl-5 pr-15 border-b border-custom-grey hover:bg-custom-grey block cursor-pointer"
        onClick={openLoginModal}
      >
        Login
      </li>
      <li
        className="pl-5 pr-15 py-2 hover:bg-custom-grey block cursor-pointer"
        onClick={openRegisterModal}
      >
        Register
      </li>
    </ul>
  );

  return (
    <>
      <div
        onClick={handleModal}
        className="hidden sm:flex gap-4 items-center px-4 shadow-custom border hover:shadow-hover transition-shadow duration-300 border-custom-grey rounded-[32px] h-14 relative cursor-pointer z-10"
        ref={toggleButtonRef}
      >
        <HamburgerIcon />
        <Image src={profilePic} alt="profile picture" width={40} height={40} className="rounded-full" />

        {/* DesktopUser Modal */}
        <Modal
          open={openModal}
          onClose={handleModal}
          size="sm"
          content={menuContent}
          toggleButtonRef={toggleButtonRef} // Passing the reference here
          className="absolute top-full right-0 z-50"
        />
      </div>

      {/* Login or Register Modal */}
      {modalContent && (
        <Modal
          open={!!modalContent} 
          onClose={() => setModalContent(null)} 
          size="lg"
          content={modalContent === "login" ? <LoginForm /> : <RegisterForm />} 
          toggleButtonRef={toggleButtonRef} 
           className="absolute w-full h-[100vh] top-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        />
      )}
    </>
  );
}
