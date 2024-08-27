import logo from '@assets/Andarilho.svg';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useForm } from 'react-hook-form';
type Props = {};

const Index = (props: Props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: unknown) => console.log(data);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-muted">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 items-center w-10/12 p-8 bg-background border border-border rounded-md"
      >
        <img src={logo} className="w-3/4 my-4" alt="Logo Andarilho" />
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            placeholder="*****"
            {...register('password')}
          />
        </div>
        <Button className="w-full mt-4">Entrar</Button>
        <div className="w-full flex flex-col gap-2 text-center">
          <p className="text-sm">Não possui uma conta?</p>
          <Button
            variant="outline"
            type="button"
            className="text-primary w-full"
            onClick={() => console.log('cadastre-se')}
          >
            Cadastre-se
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
