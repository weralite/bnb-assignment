import SearchDestination from "../common/SearchDestination";
import CheckInCalender from "../common/CheckInCalender";
import CheckOutCalender from "../common/CheckOutCalender";

const NonScrolledContent = () => {
    return (
      <div className="hidden 1-md:flex md:items-center h-full">
        <SearchDestination />
        <CheckInCalender />
        <CheckOutCalender />

        <div className="flex-grow pr-15 pl-6 border-l border-custom-grey hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center relative">
          <div>
            <b>Who</b>
            <p className="whitespace-nowrap overflow-hidden text-ellipsis">Add guests</p>
          </div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default NonScrolledContent;
  