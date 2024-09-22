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
import { RiErrorWarningLine } from 'react-icons/ri';
import { getLocation } from '@utils/getLocation';

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
  const { location } = useGeolocation();
  const [yourLocation, setYourLocation] = useState<[number, number]>([
    -9.648927, -35.706977,
  ]);
  const navigate = useNavigate();
  const mapRef = useRef<Map>(null);

  const [reports, setReports] = useState<Report[]>([]);

  const navigateToReport = () => {
    navigate('/reporte');
  };

  const triggerLocation = () => {
    getLocationAddress();
  };

  const getLocationAddress = async () => {
    try {
      const currentLocation = (await getLocation()) as [number, number];

      if (!currentLocation) {
        return;
      }

      mapRef.current?.flyTo(
        {
          lat: currentLocation[0],
          lng: currentLocation[1],
        },
        15,
      );

      setYourLocation(currentLocation);

      console.clear();
      console.log('currentLocation', currentLocation);
      console.log('location', location);
    } catch (error) {
      console.error(error);
      toast('Erro ao buscar endereço', { icon: <RiErrorWarningLine /> });
    }
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
      console.log(e);
      if (e.response.data.error.message === 'jwt expired') {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
      }

      toast.error(e.message);
    }
  };

  useEffect(() => {
    getReports();
    getLocationAddress();
  }, []);
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
          center={yourLocation}
          zoom={15}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`}
          />
          <CircleMarker
            center={yourLocation}
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
