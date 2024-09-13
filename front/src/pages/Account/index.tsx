import Column from '@components/Column';
import { Button } from '@components/ui/button';
import { RiArrowDropLeftLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';

export default function Index() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
  };
  return (
    <>
      <Column>
        <div className="flex flex-row w-full px-4 justify-between items-center font-semibold border-b pb-5">
          <Button variant="ghost" size="icon" onClick={goHome}>
            <RiArrowDropLeftLine size={24} />
          </Button>
          <h2>CONTA E CONFIGURAÇÕES</h2>
        </div>
        <Column className="space-y-8 ml-3 mt-5 items-start">
          <button className="font-semibold text-lg w-full items-center space-x-2 flex flex-row">
            <div>SAIR</div>
            <RiLogoutBoxRLine size={24} />
          </button>
          <button>ALTERAR EMAIL</button>
          <button>ALTERAR SENHA</button>
          <button>POLÍTICA DE PRIVACIDADE</button>
          <button>TERMOS DE USO</button>
          <Dialog>
            <DialogTrigger className="text-red-500 font-semibold">
              APAGAR CONTA
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="text-left">
                <DialogTitle>APAGAR CONTA?</DialogTitle>
                <DialogDescription>
                  Você tem certeza que deseja apagar sua conta? Essa ação é
                  irreversível.
                </DialogDescription>
                <DialogDescription className=" flex flex-row justify-around">
                  <Button variant={'destructive'}>SIM</Button>
                  <Button variant={'default'}>NÃO</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Column>
      </Column>
    </>
  );
}
