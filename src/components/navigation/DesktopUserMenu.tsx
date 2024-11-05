import { useState, useRef } from "react";
import HamburgerIcon from "../header/HamburgerIcon";
import profilePic from "@/assets/no-profile.svg";
import Image from "next/image";
import Modal from "../common/Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { useUser } from "@/context/user";
import ListingModal from "@/components/listing/ListingModal";
import AuthModal from "@/components/auth/AuthModal";

export default function DesktopMenu() {
  const user = useUser();
  const [openModal, setModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | React.ReactNode | null>(null); // For determining which content to show
  const toggleButtonRef = useRef<HTMLDivElement>(null);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  const onClose = () => {
    setModalContent(null);
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

  // Open login modal
  const openAddListingModal = () => {
    setModal(true);
    setModalContent(<ListingModal onClose={onClose} />);
  };

  // Menu content with login and register options

  const menuContent = user.token ? (
    <div>
      <h1 className="text-sm font-light text-gray-400 text-center border-b p-2">{user.user?.firstName} {user.user?.lastName}</h1>
      <ul className="text-sm font-medium text-gray-700">
        <li className="pl-5 pr-15 py-4 border-b border-custom-grey hover:bg-custom-grey hover:rounded-md block cursor-pointer">
          Bookings
        </li>

        <li className="pl-5 pr-15 py-4 border-b border-custom-grey hover:bg-custom-grey hover:rounded-md block cursor-pointer"
          onClick={openAddListingModal}
        >
          Listings
        </li>
        <li
          className="pl-5 pr-15 py-4 border-b border-custom-grey hover:bg-custom-grey hover:rounded-md block cursor-pointer"
          onClick={user.actions.logout}
        >
          Logout
        </li>
      </ul>
    </div>
  ) : (
    <ul className="text-sm font-medium text-gray-700">
      <li
        className="pl-5 pr-15 py-4 border-b border-custom-grey hover:bg-custom-grey block cursor-pointer"
        onClick={openLoginModal}
      >
        Login
      </li>
      <li
        className="pl-5 pr-15 py-4 hover:bg-custom-grey block cursor-pointer"
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
          className="absolute top-full right-0 z-50 py-2"
        />
      </div>

      {/* Login or Register Modal */}
      <AuthModal
        open={!!modalContent}
        onClose={() => setModalContent(null)}
        modalContent={modalContent}
        toggleButtonRef={toggleButtonRef} // Pass the reference here
      />
    </>
  );
}
