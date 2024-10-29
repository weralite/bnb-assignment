import SearchDestination from "../common/SearchDestination";
import CheckInCalender from "../common/CheckInCalender";
import CheckOutCalender from "../common/CheckOutCalender";
import SpecifyGuests from "../common/SpecifyGuests";

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
  