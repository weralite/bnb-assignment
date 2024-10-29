import { useFilter } from "@/context/FilterContext";
import { formatDate } from "@/utils/dateUtils";

const ScrolledContent = () => {
  const { selectedCountry } = useFilter();
  const { selectedCheckIn } = useFilter();
  const { selectedCheckOut } = useFilter();
  const { selectedGuests } = useFilter();



  const getSelectedDates = () => {
    const formattedCheckIn = selectedCheckIn ? formatDate(selectedCheckIn) : null;
    const formattedCheckOut = selectedCheckOut ? formatDate(selectedCheckOut) : null;

    if (formattedCheckIn && formattedCheckOut) {
        return `${formattedCheckIn} - ${formattedCheckOut}`;
    }
    if (formattedCheckIn) {
        return `${formattedCheckIn} -`;
    }
    if (formattedCheckOut) {
        return `- ${formattedCheckOut}`;
    }
    return "Anytime"; // Default value
};

    return (
      <div className="hidden 1-md:flex flex-col h-full px-7 justify-center">
        <div className="flex flex-row justify-center space-x-2 pr-5">
          <b className="text-lg pr-6 grey whitespace-nowrap overflow-hidden text-ellipsis"> {selectedCountry ? selectedCountry : "Anywhere"}</b>
          <b className="text-lg border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">{getSelectedDates()}</b>
          <b className="text-lg border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">{selectedGuests ? `${selectedGuests} Guests` : "Guests"}</b>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
        </div>
      </div>
    );
  };
  
  export default ScrolledContent;
  