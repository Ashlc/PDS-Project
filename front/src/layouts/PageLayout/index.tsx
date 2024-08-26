import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    };

const Index = ({ children } : Props) => (
  <div className="w-9/12 py-6 mx-auto">
    {children}
  </div>
);

export default Index;
