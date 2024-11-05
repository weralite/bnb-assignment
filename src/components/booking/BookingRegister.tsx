import { useState, useRef } from "react";
import { useUser } from "@/context/user";
import AuthModal from "@/components/auth/AuthModal";

interface BookingRegisterProps {
    formData: {
        checkInDate: string;
        checkOutDate: string;
        dailyRate: number;
        totalPrice: number;
        listingId: string;
    };
    onSubmitSuccess: () => void;
}

const BookingRegister: React.FC<BookingRegisterProps> = ({ formData, onSubmitSuccess }) => {
    const user = useUser();
    const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
    const toggleButtonRef = useRef<HTMLDivElement>(null);

    const handleBookingSubmit = async () => {
        if (!user.token) {
            setOpenAuthModal(true);
        } else {
            await submitBooking(formData);
            onSubmitSuccess();
        }
    };

    const submitBooking = async (data: typeof formData) => {
        console.log("Submitting booking data:", data);
    };

    const handleLoginSuccess = async () => {
        setOpenAuthModal(false);
        await submitBooking(formData);
        onSubmitSuccess();
    };

    return (
        <>
            <button onClick={handleBookingSubmit} className="your-submit-button-class">
                Submit Booking
            </button>

            {openAuthModal && (
                <AuthModal
                    open={openAuthModal}
                    modalContent="login" // Pass 'login' to render the LoginForm
                    toggleButtonRef={toggleButtonRef} // Make sure to pass the ref
                    onClose={() => setOpenAuthModal(false)}
                />
            )}
        </>
    );
};

export default BookingRegister;
