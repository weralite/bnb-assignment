export default function Header() {
  return (
    <header className="flex flex-col">
      <div className="bg-black"><h1>hej</h1></div>
      <div>
        <div className="shadow-custom border border-custom-grey rounded-[32px] max-w-[860px] h-16 relative">
          <div className="flex items-center h-full">

            <div className="flex-grow pr-5 pl-7 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex flex-col text-left justify-center">
              <b>
                Var
              </b>
              <p>
                Sök Destinationer
              </p>
            </div>
            <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
              <div>
                <b>
                  Incheckning
                </b>
                <p>
                  Ange datum
                </p>
              </div>
            </div>
            <div className="flex-grow-0.5 border-l border-custom-grey pl-6 pr-6 hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center">
              <div>
                <b>
                  Utcheckning
                </b>
                <p>
                  Ange datum
                </p>
              </div>
            </div>
            <div className="flex-grow pr-15 pl-6 border-l border-custom-grey hover:bg-custom-grey hover:rounded-[32px] hover:border-transparent hover:h-full h-[60%] flex items-center relative">
              <div>
                <b>
                  Vem
                </b>
                <p>
                  Lägg till gäster
                </p>
              </div>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <div className="w-12 h-12 bg-header-brand rounded-full border"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}