import logo from '@assets/Andarilho.svg';
import illustration from '@assets/landing_illustration.svg';
import Column from '@components/Column';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Separator } from '@components/ui/separator';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Index = (props: Props) => {
  const navigate = useNavigate();
  return (
    <Column className="w-full min-h-screen">
      <Column className="p-8 gap-12">
        <img src={logo} className="h-6 w-fit" alt="Logo Andarilho" />
        <img
          src={illustration}
          className="h-fit w-full object-contain"
          alt="Ilustração de um homem cego com uma bengala atravessando a rua na faixa de pedestres."
        />
        <Column className="gap-2">
          <h1 className="text-2xl">
            Participe da luta por uma cidade mais acessível.
            <br />
            <b>Torne-se um Andarilho.</b>
          </h1>
          <Button className="w-full mt-4" onClick={() => navigate('/login')}>
            Entrar
          </Button>
        </Column>
      </Column>
      <Separator className="border border-border" />
      <Column className="gap-12 px-8 py-12">
        <h2 className="text-center font-bold uppercase">Sobre nós</h2>
        <p className="text-justify tracking-wide">
          A ausência de infraestrutura adequada não só impede o direito de ir e
          vir, mas também perpetua a exclusão social, limitando a cidadania das
          pessoas que necessitam de recursos de acessibilidade urbana. A
          descentralização das plataformas de denúncia, a insuficiência de
          recursos financeiros destinados a programas de acessibilidade, e a
          falta de conscientização e planejamento urbano adequado agravam essa
          situação. Enquanto a realidade do pleno planejamento urbano não é
          tangível, trazemos o Andarilho, centralizando todas as queixas no
          mesmo lugar.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Como funciona?</CardTitle>
            <CardDescription>Entenda o passo a passo</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside">
              <li>Registre-se na plataforma;</li>
              <li>Registre uma ocorrência de acessibilidade;</li>
              <li>
                Acompanhe o andamento da sua ocorrência e de outras próximas a
                você.
              </li>
            </ol>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Você sabia?</CardDescription>
            <CardTitle>
              Mais de 18,6 milhões de brasileiros possuem algum tipo de
              deficiência.
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-justify">
              Isto conforme estimado pelo IBGE na Pnad Contínua 2022 — que,
              inclusive, se mostra ser a primeira edição a agrupar dados
              referentes a pessoas com deficiência em uma categoria própria de
              análise no período avaliado (2016-2022). Dentre as diferentes
              dificuldades exploradas pela pesquisa, a mais frequente foi a
              dificuldade para andar ou subir degraus (3,4%), seguida por
              enxergar (3,1%).
            </p>
          </CardContent>
        </Card>
      </Column>
    </Column>
  );
};

export default Index;
