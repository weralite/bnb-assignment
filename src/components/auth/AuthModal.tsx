// components/AuthModal.tsx
import React from "react";
import Modal from "../common/Modal"; // Adjust the import path as needed
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    modalContent: string | React.ReactNode | null;
    toggleButtonRef: React.RefObject<HTMLDivElement>;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, modalContent, toggleButtonRef }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            size="lg"
            content={modalContent === "login" ? <LoginForm onClose={onClose} /> : modalContent === "register" ? <RegisterForm /> : modalContent}
            toggleButtonRef={toggleButtonRef} // Pass it down here
            className="absolute w-full h-[100vh] top-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        />
    );
};

export default AuthModal;
