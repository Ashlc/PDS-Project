import { markers } from '@assets/markers/markers';
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
import { useEffect, useRef } from 'react';
import { MdNotAccessible } from 'react-icons/md';
import {
  RiEyeOffFill,
  RiFilter2Fill,
  RiFocus3Line,
  RiMegaphoneFill,
} from 'react-icons/ri';
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from 'react-leaflet';

const Index = () => {
  const { location, getLocation } = useGeolocation();
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

  return (
    <div className="flex flex-col justify-between h-full w-full relative">
      <div className="flex flex-col gap-2 fixed top-10 left-8 right-8 z-10">
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
      </div>
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
          <Marker position={[-9.648927, -35.706977]} icon={markers.wheelchair}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Marker position={[-9.651206, -35.71166]} icon={markers.blind}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="fixed bottom-10 left-8 right-8 flex flex-col gap-10 z-10">
        <div className=" flex flex-row justify-end rounded-full">
          <Button
            variant={'outline'}
            size={'icon'}
            className="border border-border rounded-full"
            onClick={triggerLocation}
          >
            <RiFocus3Line size={20} />
          </Button>
        </div>
        <div className="flex flex-row gap-2 bg-background items-center border border-border rounded-full px-5 py-3 relative">
          <div className="text-sm">Reportar acessibilidade</div>
          <Button
            size="icon"
            className="absolute backdrop-blur-lg right-0 rounded-full aspect-square w-14 h-14 -rotate-45 hover:-rotate-12 transition-transform"
            onClick={navigateToReport}
          >
            <RiMegaphoneFill size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
