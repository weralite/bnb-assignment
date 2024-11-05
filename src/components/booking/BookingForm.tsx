import React, { useState, useEffect } from "react";

interface BookingFormProps {
  formData: {
    checkInDate: string;
    checkOutDate: string;
    dailyRate: number;
    totalPrice: number;
    listingId: string;
  };
  onSubmit: (data: {
    checkInDate: string;
    checkOutDate: string;
    dailyRate: number;
    totalPrice: number;
    listingId: string;
  }) => void;
  submitButtonRef: React.RefObject<HTMLDivElement>;
}

const BookingForm: React.FC<BookingFormProps> = ({ formData, onSubmit, submitButtonRef }) => {
  const [checkInDate, setCheckInDate] = useState(formData.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(formData.checkOutDate);
  const [totalPrice, setTotalPrice] = useState(formData.totalPrice);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      if (checkInDate && checkOutDate) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
        setNights(nights);
        if (nights > 0) {
          setTotalPrice(nights * formData.dailyRate);
        } else {
          setTotalPrice(0);
        }
      } else {
        setTotalPrice(0);
      }
    };

    calculateTotalPrice();
  }, [checkInDate, checkOutDate, formData.dailyRate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      checkInDate,
      checkOutDate,
      dailyRate: formData.dailyRate,
      totalPrice,
      listingId: formData.listingId,
    });
  };

  return (
    <form className="md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg space-y-4" onSubmit={handleSubmit}>
      <div className="flex justify-evenly items-center">
        <p className="text-2xl font-bold">{formData.dailyRate} USD</p>
        <p className="text-gray-600">per night</p>
      </div>

      <div className="border-t border-b py-4 space-y-2">
        <div className="flex justify-between">
          <label className="text-gray-600">Check-in</label>
          <input
            type="date"
            className="border rounded px-3 py-1 w-1/2"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            min={formData.checkInDate}
            max={formData.checkOutDate}
            required
          />
        </div>
        <div className="flex justify-between">
          <label className="text-gray-600">Check-out</label>
          <input
            type="date"
            className="border rounded px-3 py-1 w-1/2"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate}
            max={formData.checkOutDate}
            required
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg">
        Reserve
      </button>
      <p className="text-gray-500 text-center">You won’t be charged yet</p>

      <div className="flex justify-between">
        <p className="text-md text-gray-500 font-semibold underline">{formData.dailyRate} USD x {nights} nights</p>
        <p className="text-md text-gray-500 font-semibold">{totalPrice} USD</p>
      </div>
      <div className="flex justify-between">
        <p className="text-md text-gray-500 font-semibold underline">Service Fee</p>
        <p className="text-md text-gray-500 font-semibold">Free</p>
      </div>

      <div className="border-t py-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-lg font-semibold">Total:</p>
          <p className="text-lg font-semibold">{totalPrice} USD</p>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
