import SearchDestination from "../header/SearchDestination";
import CheckInCalender from "../header/CheckInCalender";
import CheckOutCalender from "../header/CheckOutCalender";
import SpecifyGuests from "../header/SpecifyGuests";

const NonScrolledContent = () => {
    return (
      <div className="hidden 1-md:flex md:items-center h-full">
        <SearchDestination />
        <CheckInCalender />
        <CheckOutCalender />
        <SpecifyGuests />
      </div>
    );
  };
  
  export default NonScrolledContent;
  