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
import { IAuthUser } from '@interfaces/IAuthUser';
import { Report } from '@interfaces/IReport';
import { get } from '@services/api';
import { center } from '@utils/center';
import { maptilerKey } from '@utils/environment';
import { LatLngExpression, Map } from 'leaflet';
import { useEffect, useRef, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';

export function Index() {
  const navigate = useNavigate();
  const authUser = useAuthUser<IAuthUser>();
  const token = authUser?.token;
  const mapRef = useRef<Map>(null);
  const reportId = window.location.pathname.split('/').pop();
  const [reportData, setReportData] = useState<Report | null>(null);

  const goHome = () => {
    navigate('/home');
  };

  const getReport = async () => {
    const response = await get({
      path: `/reports/${reportId}`,
      token,
    });

    setReportData(response as unknown as Report);
  };

  const getLatLng = (): LatLngExpression => {
    const latitude = reportData?.location.latitude;
    const longitude = reportData?.location.longitude;
    if (latitude && longitude) {
      return [latitude, longitude];
    }
    return center;
  };

  useEffect(() => {
    getReport();
  }, [reportId]);

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
          center={getLatLng()}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          //@ts-expect-error: Workaround for leaflet typings
          loadingControl={true}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`}
          />
          {reportData && (
            <Marker
              position={getLatLng()}
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
            <div>{reportData?.location.address}</div>
            <Separator className="border border-border" />
            <div>{reportData?.location.complement}</div>
          </Column>
        </Column>
      </Column>
    </div>
  );
}

export default Index;
