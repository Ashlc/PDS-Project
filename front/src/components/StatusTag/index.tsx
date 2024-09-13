import { statusColors } from '@utils/statusColors';

type Props = {
  status: 'pending' | 'evaluating' | 'ongoing' | 'finished';
};

const index = ({ status }: Props) => {
  const statusTranslation = {
    pending: 'Pendente',
    evaluating: 'Em análise',
    ongoing: 'Em andamento',
    finished: 'Finalizado',
  };
  return (
    <div
      className={`border px-6 py-2 rounded-full font-medium text-sm ${statusColors[status].background} ${statusColors[status].text} ${statusColors[status].border}`}
    >
      {statusTranslation[status]}
    </div>
  );
};

export default index;
