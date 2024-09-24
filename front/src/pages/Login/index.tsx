import logo from '@assets/Andarilho.svg';
import Column from '@components/Column';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { post } from '@services/api';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type ErrorResponse = {
  response?: {
    status: number;
  };
};

const Index = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const signIn = useSignIn();

  const onSubmit = async (data: Record<string, unknown>) => {
    toast.message('Fazendo login...');
    try {
      const res = await post({
        path: '/auth/login',
        data,
      });
      console.log(res);
      console.clear();
      signIn({
        auth: {
          token: res.data.token,
          type: 'Bearer',
        },
        userState: res.data,
      });
      toast.success('Login efetuado com sucesso!');
      navigate('/home');
    } catch (e: unknown) {
      const error = e as ErrorResponse;
      if (error.response?.status === 401) {
        toast.error('Email ou senha incorretos');
      } else {
        toast.error('Erro ao fazer login');
      }
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
