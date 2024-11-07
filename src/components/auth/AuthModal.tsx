import React, { useState, ReactNode } from "react";
import Modal from "../common/Modal"; 
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

interface AuthModalProps {
    open: boolean;
    onClose: () => void;
    toggleButtonRef: React.RefObject<HTMLDivElement>;
    onLoginSuccess?: () => void;
}

interface Tab {
    label: string;
    content: ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose, toggleButtonRef, onLoginSuccess }) => {
    const tabs: Tab[] = [
        { label: "Login", content: <LoginForm onClose={onClose} onLoginSuccess={onLoginSuccess} /> },
        { label: "Register", content: <RegisterForm onClose={onClose} /> },
    ];

    const [activeTab, setActiveTab] = useState(0);

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="lg"
            toggleButtonRef={toggleButtonRef}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
            content={
                <div className="w-flex flex-col items-center">
                    <button className="absolute mt-2 ml-3 text-xxl h-10 w-10 rounded-xl hover:bg-gray-200 hover:rounded-xl transition-all"
                    onClick={onClose}>
                        X
                    </button>
                    <ul className="w-full flex flex-row justify-evenly border-b p-4">
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

                </div >
            }
        />
    );
};

export default AuthModal;
