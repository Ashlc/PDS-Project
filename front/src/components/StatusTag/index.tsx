import { statusColors } from '@utils/statusColors';

type Props = {
  status: 'PENDING' | 'EVALUATING' | 'ONGOING' | 'FINISHED';
  className?: string;
};

const index = ({ status, className }: Props) => {
  const statusTranslation = {
    PENDING: 'Pendente',
    EVALUATING: 'Em análise',
    ONGOING: 'Em andamento',
    FINISHED: 'Finalizado',
  };
  return (
    <div
      className={`border px-4 py-1 w-fit rounded-full font-medium text-xs ${statusColors[status].background} ${statusColors[status].text} ${statusColors[status].border} ${className}`}
    >
      {statusTranslation[status]}
    </div>
  );
};

export default index;
