import logo from '@assets/Andarilho.svg';
import Column from '@components/Column';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { post } from '@services/api';
import { toast } from 'sonner';

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

const Index = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const res = await post({
        path: '/auth/login',
        data,
      });
      console.clear();
      localStorage.setItem('token', res.data.token);
      toast.success('Login efetuado com sucesso!');
      navigate('/home');
    } catch (error: unknown) {
      const e = error as ApiError;
      toast.error(`${e.response.data.message}`);
    }
  };
  return (
    <Column className="w-full h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center w-10/12 p-8"
      >
        <img src={logo} className="w-3/4 my-4" alt="Logo Andarilho" />
        <Column className="gap-4 w-full">
          <Column className="gap-2 w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
            />
          </Column>
          <Column className="gap-2 w-full">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="*****"
              {...register('password')}
            />
          </Column>
        </Column>
        <Button className="w-full mt-4">Entrar</Button>
        <Column className="w-full gap-2 text-center">
          <p className="text-sm">Não possui uma conta?</p>
          <Button
            variant="outline"
            type="button"
            className="text-primary w-full"
            onClick={() => console.log('cadastro')}
          >
            Cadastre-se
          </Button>
        </Column>
      </form>
    </Column>
  );
};

export default Index;
