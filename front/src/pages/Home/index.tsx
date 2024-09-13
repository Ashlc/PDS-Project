import { markers } from '@assets/markers/markers';
import Column from '@components/Column';
import Search from '@components/Search';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { useGeolocation } from '@hooks/useGeolocation';
import { reports } from '@services/mock';
import { maptilerKey } from '@utils/environment';
import { Map } from 'leaflet';
import { useEffect, useRef } from 'react';
import { MdMenu, MdNotAccessible } from 'react-icons/md';
import {
  RiEyeOffFill,
  RiFilter2Fill,
  RiFocus3Line,
  RiMegaphoneFill,
} from 'react-icons/ri';
import { CircleMarker, MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { location, getLocation } = useGeolocation();
  const navigate = useNavigate();
  const mapRef = useRef<Map>(null);

  const navigateToReport = () => {
    console.log('navigate to report');
  };

  const triggerLocation = () => {
    getLocation();
  };

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
        <div className="w-full items-center justify-center flex flex-row gap-2">
          <Search />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 border border-border">
                <RiFilter2Fill size={18} />
                <p>Filtros</p>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={8} className="p-2">
              <DropdownMenuItem className="flex flex-row gap-2">
                <MdNotAccessible size={20} />
                <p>Inacessível para cadeira de rodas</p>
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <RiEyeOffFill size={20} />
                <p>Inacessível para deficientes visuais</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
              icon={markers[report.type][report.status]}
              eventHandlers={{
                click: () => openReport(report.id),
              }}
            />
          ))}
        </MapContainer>
      </div>
      <div className="fixed bottom-10 left-8 right-8 flex flex-col gap-10 z-10">
        <div className="flex flex-row justify-end rounded-full">
          <Button
            variant={'outline'}
            size={'icon'}
            className="border-2 border-border rounded-full"
            onClick={triggerLocation}
          >
            <RiFocus3Line size={20} />
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Button
            className="rounded-full aspect-square bg-background text-black border-2 border-border shadow-sm"
            size="icon"
          >
            <MdMenu />
          </Button>
          <Button
            className="w-fit gap-2 px-8 py-6 items-center border-2 border-border shadow-sm rounded-full"
            onClick={navigateToReport}
          >
            <p>Novo reporte</p>
            <RiMegaphoneFill size={21} />
          </Button>
        </div>
      </div>
    </Column>
  );
};

export default Index;
