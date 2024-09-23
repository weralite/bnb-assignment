import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-5 md:px-10 lg:px-20 xl:px-30 2xl:px-40 w-full flex flex-col justify-center items-center">{children}</div>;
};

export default Container;