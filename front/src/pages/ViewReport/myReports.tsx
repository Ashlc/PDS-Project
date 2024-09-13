import { Button } from '@components/ui/button';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import Column from '@components/Column';
import Search from '@components/Search';
import { RiFilter2Fill, RiArrowDropRightFill } from 'react-icons/ri';
import { myReports } from '@services/mock';
import { Badge } from '@components/ui/badge';
import ReportType from '@components/ReportType';

export default function Index() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/home');
  };

  const formatDate = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const reports = myReports;

  return (
    <>
      <Column>
        <div className="flex flex-row w-full px-4 justify-between items-center font-semibold border-b pb-5">
          <Button variant="ghost" size="icon" onClick={goHome}>
            <RiArrowDropLeftLine size={24} />
          </Button>
          <h2>MEUS REPORTES</h2>
        </div>
        <div className="flex flex-row justify-between px-3 gap-5 border-b py-5">
          <Search />
          <Button variant="outline" className="border border-border">
            <RiFilter2Fill size={18} />
            Filtros
          </Button>
        </div>
        <Column>
          {reports.map((report) => (
            <div key={report.id} className="border-b border-border">
              <div className="flex flex-row py-3 px-3 items-center space-x-3">
                <ReportType type={report.type} />
                <Column className="w-full space-y-1">
                  <div className="flex flex-row space-x-5 items-center">
                    <div className="font-bold">{report.resource}</div>
                    <Badge
                      className={
                        report.status === 'pending'
                          ? 'border-red-600 bg-red-300 text-red-800'
                          : report.status === 'evaluating'
                            ? 'border-yellow-600 bg-yellow-200 text-yellow-800'
                            : report.status === 'ongoing'
                              ? 'border-purple-600 bg-purple-300 text-purple-800'
                              : 'border-green-600 bg-green-300 text-green-800'
                      }
                    >
                      <div className="font-medium p-1 px-0">
                        {report.status === 'pending'
                          ? 'Pendente'
                          : report.status === 'evaluating'
                            ? 'Análise'
                            : report.status === 'ongoing'
                              ? 'Andamento'
                              : 'Resolvido'}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <div className=" text-muted-foreground text-xs">
                      Reporte realizado em {formatDate(report.date)}
                    </div>
                  </div>
                </Column>
                <Button size={'icon'} variant={'ghost'}>
                  <RiArrowDropRightFill size={20} />
                </Button>
              </div>
            </div>
          ))}
        </Column>
        <div className="w-full p-4 bg-background sticky bottom-0">
          <Button
            onClick={() => navigate('/reporte')}
            className="w-full"
            variant="default"
          >
            Novo reporte
          </Button>
        </div>
      </Column>
    </>
  );
}
