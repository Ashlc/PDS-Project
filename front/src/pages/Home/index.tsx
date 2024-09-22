import { markers } from '@assets/markers/markers';
import Column from '@components/Column';
import Row from '@components/Row';
import Search from '@components/Search';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useGeolocation } from '@hooks/useGeolocation';
import { maptilerKey } from '@utils/environment';
import { Map } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import { MdAccountCircle, MdMenu, MdNotAccessible } from 'react-icons/md';
import {
  RiEyeOffFill,
  RiFilter2Fill,
  RiFocus3Line,
  RiMegaphoneFill,
} from 'react-icons/ri';
import { CircleMarker, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { get } from '@services/api';
import { toast } from 'sonner';

interface Report {
  id: number;
  location: [number, number];
  type: 'wheelchair' | 'blind';
  status: 'pending' | 'evaluating' | 'ongoing' | 'finished';
  resource?: string;
  address?: string;
  complement?: string;
}

const Index = () => {
  const { location, getLocation } = useGeolocation();
  const navigate = useNavigate();
  const mapRef = useRef<Map>(null);

  const [reports, setReports] = useState<Report[]>([]);

  const navigateToReport = () => {
    navigate('/reporte');
  };

  const triggerLocation = () => {
    getLocation();
  };

  const getReports = async () => {
    try {
      const res = await get({
        path: '/report',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const reports = res.map((report: any) => ({
        id: report.id,
        location: [report.location.latitude, report.location.longitude],
        type: 'wheelchair',
        status: report.status.toLowerCase(),
        resource: report.resource,
        address: report.location.address,
        complement: report.location.complement,
      }));
      setReports(reports);

    } catch (error: unknown) {
      const e = error as Error;
      toast.error(e.message);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.flyTo(location, 15);
    }
  }, [location]);

  const openReport = (id: number) => {
    navigate(`/reporte/${id}`);
  };

  return (
    <Column className="justify-between h-full w-full relative">
      <Column className="gap-2 fixed top-10 left-8 right-8 z-10">
        <Row className="w-full items-center justify-center gap-2">
          <Search />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border border-border">
                <RiFilter2Fill size={18} />
                <p>Filtros</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="p-2">
              <DropdownMenuItem className="gap-2">
                <MdNotAccessible size={20} />
                <p>Inacessível para cadeira de rodas</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <RiEyeOffFill size={20} />
                <p>Inacessível para deficientes visuais</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Row>
      </Column>
      <div className="fixed top-0 left-0 h-screen w-screen overflow-clip bg-blue-400">
        <MapContainer
          ref={mapRef}
          center={location}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`}
          />
          <CircleMarker
            center={location}
            pathOptions={{ color: 'black' }}
            radius={10}
          />
          {reports.map((report) => (
            <Marker
              key={report.id}
              position={report.location}
              icon={markers['wheelchair'][report.status]}
              eventHandlers={{
                click: () => openReport(report.id),
              }}
            />
          ))}
        </MapContainer>
      </div>
      <div className="fixed bottom-10 left-8 right-8 flex flex-col gap-10 z-10">
        <Row className="justify-end rounded-full">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg border-border"
            onClick={triggerLocation}
          >
            <RiFocus3Line size={20} />
          </Button>
        </Row>
        <Row className="items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                className="rounded-full aspect-square border-border shadow-lg"
                size="icon"
              >
                <MdMenu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={12} className="p-2 ml-2">
              <DropdownMenuItem
                className="gap-4"
                onClick={() => navigate('/meus-reportes')}
              >
                <RiMegaphoneFill size={17} />
                <p>Meus reportes</p>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-4"
                onClick={() => navigate('/conta')}
              >
                <MdAccountCircle size={17} />
                <p>Minha conta</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="w-fit gap-2 px-8 py-6 items-center border-2 border-border shadow-sm rounded-full"
            onClick={navigateToReport}
          >
            <p>Novo reporte</p>
            <RiMegaphoneFill size={21} />
          </Button>
        </Row>
      </div>
    </Column>
  );
};

export default Index;
