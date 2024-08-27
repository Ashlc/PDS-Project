import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Index = ({ children }: Props) => (
  <div className="sm:w-screen md:w-10/12 py-6 mx-auto h-screen">{children}</div>
);

export default Index;
