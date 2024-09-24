import { useFilter } from "@/app/context/FilterContext";

const MobileContent = () => {
  const { selectedCountry } = useFilter();

    return (
      <div className="1-md:hidden h-full flex flex-col px-7 justify-center">
        <b>Where are you going?</b>
        <div className="hidden 1-xs:flex flex-row space-x-2">
          <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">{selectedCountry ? selectedCountry : "Anywhere"}</p>
          <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Anytime</p>
          <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Guests</p>
        </div>
        <div className="1-xs:hidden flex flex-row space-x-2">
          <p className="dot-separator whitespace-nowrap text-ellipsis overflow-hidden ...">{selectedCountry ? selectedCountry : "Anywhere"}</p>
          <p className="dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Anytime</p>
          <p className="hidden xxs:block dot-separator whitespace-nowrap overflow-hidden text-ellipsis">Guests</p>
        </div>
  
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
        </div>
      </div>
    );
  };
  
  export default MobileContent;
  