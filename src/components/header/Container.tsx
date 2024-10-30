import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="px-5 w-full flex flex-col justify-center items-center">{children}</div>;
};

export default Container;