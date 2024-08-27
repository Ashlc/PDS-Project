import { Input } from '@components/ui/input';
import { RiSearch2Line } from 'react-icons/ri';

const Index = () => {
  return (
    <div className="relative w-full">
      <RiSearch2Line size={14} className="absolute left-2 top-3 h-4 w-4" />
      <Input placeholder="Pesquisar" className="pl-8 border-border" />
    </div>
  );
};

export default Index;
