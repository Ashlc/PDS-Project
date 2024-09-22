import { markers } from '@assets/markers/markers';
import Column from '@components/Column';
import ReportType from '@components/ReportType';
import Row from '@components/Row';
import StatusTag from '@components/StatusTag';
import { Button } from '@components/ui/button';
import { Card } from '@components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@components/ui/carousel';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Separator } from '@components/ui/separator';
import { center } from '@utils/center';
import { maptilerKey } from '@utils/environment';
import { Map } from 'leaflet';
import { useRef } from 'react';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

export function Index() {
  const navigate = useNavigate();
  const mapRef = useRef<Map>(null);
  const reportId = window.location.pathname.split('/').pop();

  const goHome = () => {
    navigate('/home');
  };

  const reportData = reports.find((report) => report.id === Number(reportId));

  return (
    <div className="h-screen flex flex-col gap-5">
      <Row className="w-full px-4 justify-between items-center font-semibold">
        <Button variant="ghost" size="icon" onClick={goHome}>
          <RiArrowDropLeftLine size={24} />
        </Button>
        <h2>REPORTE</h2>
      </Row>
      <div className="relative border-t border-b border-border h-[160px] w-full bg-blue-400">
        <MapContainer
          ref={mapRef}
          center={reportData?.location || center}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          //@ts-ignore
          loadingControl={true}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`}
          />
          {reportData && (
            <Marker
              position={reportData.location || center}
              icon={markers[reportData.type][reportData.status]}
            ></Marker>
          )}
        </MapContainer>
        <div className="absolute w-full flex flex-col items-center -bottom-5 z-10">
          {reportData && (
            <Popover>
              <PopoverTrigger>
                <StatusTag status={reportData.status} />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col space-y-2">
                  <div>Nome: João</div>
                  <div>Localização: Rua dos Bobos, 0</div>
                  <div>Distância: 0.5 km</div>
                  <div>
                    Descrição: O local não possui acessibilidade para
                    cadeirantes.
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <Column className="px-4 pt-4 pb-8 gap-8">
        <Row className="items-center gap-4 w-full">
          <ReportType type={reportData?.type} />
          <Column>
            <div className="text-sm text-muted-foreground">
              Recurso não encontrado ou com defeito
            </div>
            <div className=" text-base font-medium">{reportData?.resource}</div>
          </Column>
        </Row>
        <Column className="gap-2">
          <Label htmlFor="fotos" className=" text-muted-foreground">
            Fotos
          </Label>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="basis-1/3">
                <Card>
                  <div className="py-14 text-center">Foto 1</div>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <div className="py-14 text-center">Foto 2</div>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <div className="py-14 text-center">Foto 3</div>
                </Card>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <Card>
                  <div className="py-14 text-center">Foto 4</div>
                </Card>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </Column>
        <Column className="gap-2">
          <Label htmlFor="local" className=" text-muted-foreground">
            Local
          </Label>
          <Column className="gap-1">
            <div>{reportData?.address}</div>
            <Separator className="border border-border" />
            <div>{reportData?.complement}</div>
          </Column>
        </Column>
      </Column>
    </div>
  );
}

export default Index;
