"use client";

import { useState, useRef } from "react";
import Modal from "@/components/common/Modal";
import { useFilter } from "@/context/FilterContext";

export default function SearchGuests() {
    const { selectedGuests, setSelectedGuests } = useFilter();
    const [openModal, setModal] = useState<boolean>(false);
    const toggleButtonRef = useRef<HTMLDivElement | null>(null);
    const [guestCount, setGuestCount] = useState<number>(selectedGuests ?? 0); 

    const handleModal = () => {
        setModal((prev) => !prev);
    };

    const increaseGuests = () => {
        setGuestCount((prev) => {
            const newCount = prev + 1;
            setSelectedGuests(newCount); 
            return newCount; 
        });
    };

    const decreaseGuests = () => {
        setGuestCount((prev) => {
            const newCount = Math.max(0, prev - 1); 
            setSelectedGuests(newCount); 
            return newCount; 
        });
    };

    const modalContent = (
        <div className="flex flex-row justify-center items-center gap-18 p-4">
            <div className="flex flex-col">
                <b className="text-lg font-semibold">Adults:</b>
                <p className="text-sm text-gray-500">Ages 13 or above</p>
            </div>

            <div className="flex justify-center items-center">
                <button onClick={decreaseGuests} className="w-8 h-8 border rounded-full">
                    -
                </button>
                <p className="mx-4">{guestCount}</p>
                <button onClick={increaseGuests} className="w-8 h-8 border rounded-full">
                    +
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div
                ref={toggleButtonRef}
                onClick={handleModal}
                className={`flex-grow pr-15 pl-6 border-l border-custom-grey h-[60%] flex items-center relative
        ${openModal ? 'header-item-active' : 'header-item-hover'}`}
            >
                <div>
                    <b>Who</b>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {(selectedGuests ?? 0) > 0 ? `${selectedGuests} Guests` : "Add guests"}
                    </p>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
                </div>
            </div>

            <Modal
                open={openModal}
                onClose={handleModal}
                size="lg"
                content={modalContent}
                toggleButtonRef={toggleButtonRef}
                className="absolute top-full right-5 mt-2 w-96"
            />
        </>
    );
}
