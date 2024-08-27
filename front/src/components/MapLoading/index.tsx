import { RiLoader2Line } from 'react-icons/ri';

const Index = () => {
  return (
    <div className="backdrop-blur-md backdrop-brightness-75 flex flex-col items-center justify-center h-full w-full absolute top-0 right-0 left-0 bottom-0">
      <RiLoader2Line size={32} className="animate-spin text-white" />
    </div>
  );
};

export default Index;
