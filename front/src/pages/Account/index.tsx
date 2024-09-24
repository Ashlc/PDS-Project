import Column from '@components/Column';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { RiArrowDropLeftLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

export default function Index() {
  const navigate = useNavigate();
  const signOut = useSignOut();

  const goHome = () => {
    navigate('/home');
  };

  const logout = () => {
    signOut();
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
          <button
            onClick={logout}
            className="font-semibold text-lg w-full items-center space-x-2 flex flex-row"
          >
            <p>SAIR</p>
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
                <DialogTitle className="text-red-500 font-medium">
                  APAGAR CONTA?
                </DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Você tem certeza que deseja apagar sua conta? Essa ação é
                irreversível.
              </DialogDescription>
              <DialogDescription className="flex flex-row justify-around pt-3">
                <Button variant={'destructive'}>SIM</Button>
                <Button variant={'default'}>NÃO</Button>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </Column>
      </Column>
    </>
  );
}
