const ScrolledContent = () => {
    return (
      <div className="hidden 1-md:flex flex-col h-full px-7 justify-center">
        <div className="flex flex-row justify-center space-x-2 pr-5">
          <b className="text-xl pr-6 grey whitespace-nowrap overflow-hidden text-ellipsis">Anywhere</b>
          <b className="text-xl border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">Anytime</b>
          <b className="text-xl border-l pl-6 pr-6 border-custom-grey whitespace-nowrap overflow-hidden text-ellipsis">Guests</b>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
        </div>
      </div>
    );
  };
  
  export default ScrolledContent;
  