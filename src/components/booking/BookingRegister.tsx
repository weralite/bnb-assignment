import { useState, useRef } from "react";
import { useUser } from "@/context/user";
import AuthModal from "@/components/auth/AuthModal";
import BookingForm from "./BookingForm";

interface ListingData {
  dailyRate: number;
  id: string;
}

interface BookingRegisterProps {
  listing: ListingData;
  availableFrom: string;
  availableTo: string;
  onSubmitSuccess: () => void;
}

const BookingRegister: React.FC<BookingRegisterProps> = ({ listing, availableFrom, availableTo, onSubmitSuccess }) => {
  const user = useUser();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const toggleButtonRef = useRef<HTMLDivElement>(null);

  const formData = {
    checkInDate: availableFrom,
    checkOutDate: availableTo,
    dailyRate: listing.dailyRate,
    totalPrice: 0, 
    listingId: listing.id,
  };

  const handleBookingSubmit = async (data: typeof formData) => {
    if (!user.token) {
      setOpenAuthModal(true); 
    } else {
      await submitBooking(data); 
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
      <BookingForm
        formData={formData}
        onSubmit={handleBookingSubmit} 
        submitButtonRef={toggleButtonRef}
      />
      {openAuthModal && (
        <AuthModal
          open={openAuthModal}
          toggleButtonRef={toggleButtonRef} 
          onClose={() => setOpenAuthModal(false)}
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
    </>
  );
};

export default BookingRegister;
