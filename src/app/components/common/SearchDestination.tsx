import { useState, useRef } from "react";
import Modal from "@/app/components/common/Modal";
import { useFilter } from "@/app/context/FilterContext";

export default function SearchDestination() {
    const { selectedCountry, setSelectedCountry } = useFilter();
    const [openModal, setModal] = useState<boolean>(false);
    const toggleButtonRef = useRef<HTMLDivElement | null>(null);

    const handleModal = () => {
        setModal((prev) => !prev);
    };

    const handleItemClick = (value: string) => {
        setSelectedCountry(value);
        setModal(false); // Close the modal after selecting a value
    };

    const destinations = ["Sweden", "Malawi"]; // Array of values

    const menuContent = (
        <ul className="text-md font-medium text-gray-700 w-full">
            {destinations.map((destination, index) => (
                <li
                    key={destination}
                    className={`w-full pl-5 py-2 ${index !== destinations.length - 1 ? 'border-b border-custom-grey' : ''} hover:bg-custom-grey block cursor-pointer`}
                    onClick={() => handleItemClick(destination)}
                >
                    {destination}
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <div
                ref={toggleButtonRef}
                onClick={handleModal}
                className={`flex-grow min-w-0 pr-5 pl-7 flex flex-col text-left justify-center cursor-pointer 
    ${openModal ? 'bg-custom-grey rounded-[32px] border-transparent h-full' : 'hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full'}`}
                style={{ maxWidth: '250px' }}  // Restrict the width of the parent container
            >
                <b>Where</b>
                <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {selectedCountry ? selectedCountry : "Search destinations"}
                </p>
            </div>

            <Modal
                open={openModal}
                onClose={handleModal}
                size="lg"
                content={menuContent}
                toggleButtonRef={toggleButtonRef}
                className="absolute top-full left-5 mt-2 w-72"
            />
        </>
    );
}