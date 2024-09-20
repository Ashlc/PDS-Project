import Files from '@components/Files';
import Row from '@components/Row';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { Textarea } from '@components/ui/textarea';
import { reverseGeocode } from '@services/nominatim';
import { center } from '@utils/center';
import { maptilerKey } from '@utils/environment';
import { getLocation } from '@utils/getLocation';
import { Map } from 'leaflet';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  RiArrowDropLeftLine,
  RiErrorWarningLine,
  RiFocus3Line,
} from 'react-icons/ri';
import { CircleMarker, MapContainer, TileLayer } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}

interface ILocation {
  address: string;
  complement: string;
  lat: number;
  long: number;
}

interface IReport {
  resource: string;
  description: string;
  photos: File[];
  locationId: number;
  userId: number;
}

const Index = () => {
  const [location, setLocation] = useState<[number, number]>(center);
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const mapRef = useRef<Map>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const goHome = () => {
    navigate('/home');
  };

  const getLocationAddress = async () => {
    setLoading(true);

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
        13,
      );

      setLocation(currentLocation);
      const address = await reverseGeocode(
        currentLocation[0],
        currentLocation[1],
      );
      setAddress(address);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast('Erro ao buscar endereço', { icon: <RiErrorWarningLine /> });
      setLoading(false);
    }
  };

  const createAdress = async (address: string, complement: string) => {
    const data = {
      address: address,
      complement: complement,
      latitude: location[0],
      longitude: location[1],
    };

    try {
      const res = await post({
        path: '/location',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return res.data.id;
    } catch (error: unknown) {
      const e = error as ApiError;
      toast.error(`${e.response.data.message}`);
    }
  };

  const createReport = async (
    resource: string,
    description: string,
    images: File[],
    locationId: number,
  ) => {
    const data = {
      resource: resource,
      description: description,
      photos: images,
      locationId: locationId,
      userId: localStorage.getItem('userId'),
      status: 'PENDING',
    };

    try {
      const res = await post({
        path: '/report',
        data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res);
      toast.success(res.data.message);
    } catch (error: unknown) {
      const e = error as ApiError;
      toast.error(`${e.response.data.message}`);
    }
  };

  const onSubmit = async (data: unknown) => {
    const { address, complement } = data as ILocation;

    const adressId = await createAdress(address, complement);

    const { resource, description, photos } = data as IReport;

    await createReport(resource, description, photos, adressId);

    console.log(data);
    toast('Seu relatório foi enviado com sucesso.', {
      description: 'Obrigado por contribuir com a acessibilidade!',
    });
    // goHome();
  };

  return (
    <div className="flex flex-col gap-5 min-h-full w-full">
      <Row className="w-full px-4 justify-between items-center font-semibold">
        <Button variant="ghost" size="icon" onClick={goHome}>
          <RiArrowDropLeftLine size={24} />
        </Button>
        <h2>REPORTAR ACESSIBILIDADE</h2>
      </Row>
      <div className="border-t border-b border-border h-[160px] bg-blue-400">
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
          //@ts-ignore
          loadingControl={true}
        >
          <TileLayer
            url={`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${maptilerKey}`}
          />
          {location && (
            <CircleMarker
              center={location}
              pathOptions={{ color: 'black' }}
              radius={10}
            />
          )}
        </MapContainer>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-4 flex flex-col gap-8 pb-8"
      >
        <div className="grid items-center gap-2">
          <Label htmlFor="localização">Localização</Label>
          <Row className="gap-4 items-center h-fit">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="address"
                  {...field}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            <Button
              variant="outline"
              size="icon"
              type="button"
              className="rounded-full aspect-square"
              onClick={getLocationAddress}
            >
              <RiFocus3Line />
            </Button>
          </Row>
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="complemento">Complemento</Label>
          <Input
            id="complement"
            placeholder="Complemento"
            {...register('complement')}
          />
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="ocorrência">Ocorrência</Label>
          <div className="text-muted-foreground text-xs">
            Selecione o(s) recurso(s) não encontrado(s) ou com defeito(s)
          </div>
          <Controller
            name="resource"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                onValueChange={(v) => {
                  console.log(v);
                  field.onChange(v);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o(s) recurso(s)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RAMP">Rampa de acesso</SelectItem>
                  <SelectItem value="elevador">Elevador</SelectItem>
                  <SelectItem value="corrimão">Corrimão</SelectItem>
                  <SelectItem value="sonora">Sinalização sonora</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="grid items-center gap-2">
          <Label htmlFor="observações">Observações</Label>
          <Textarea
            id="description"
            placeholder="Digite aqui"
            {...register('description')}
          />
        </div>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <div className="grid items-center gap-2">
              <Label htmlFor="fotos">Fotos(opcional)</Label>
              <Files {...field} setImages={field.onChange} />
            </div>
          )}
        />
        <Row className=" flex justify-center">
          <Button variant={'default'} className="w-full" type="submit">
            ENVIAR DENÚNCIA
          </Button>
        </Row>
      </form>
    </div>
  );
};

export default Index;
