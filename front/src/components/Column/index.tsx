import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Column = ({ children, className }: Props) => {
  return <div className={'flex flex-col ' + className}>{children}</div>;
};

export default Column;
