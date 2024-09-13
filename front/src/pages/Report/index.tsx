import Files from '@components/Files';
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

  const onSubmit = (data: unknown) => {
    data.address = address;
    console.log(data);
    toast('Seu relatório foi enviado com sucesso.', {
      description: 'Obrigado por contribuir com a acessibilidade!',
    });
    goHome();
  };

  return (
    <div className="flex flex-col gap-5 min-h-full w-full">
      <div className="flex flex-row w-full px-4 justify-between items-center font-semibold">
        <Button variant="ghost" size="icon" onClick={goHome}>
          <RiArrowDropLeftLine size={24} />
        </Button>
        <h2>REPORTAR ACESSIBILIDADE</h2>
      </div>
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
          <div className="flex flex-row gap-4 items-center h-fit">
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
          </div>
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
            name="type"
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
                  <SelectItem value="rampa">Rampa de acesso</SelectItem>
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
          <Textarea placeholder="Digite aqui" {...register} />
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
        <div className=" flex justify-center flex-row">
          <Button variant={'default'} className="w-full" type="submit">
            ENVIAR DENÚNCIA
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;
