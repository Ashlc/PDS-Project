'use client';

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
import { useRouter } from 'next/navigation';
import { RiArrowDropLeftLine } from 'react-icons/ri';

export function Index() {
  const router = useRouter();
  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center mt-6 mx-4 font-semibold">
        <Button variant={'ghost'} onClick={navigateToHome}>
          <RiArrowDropLeftLine />
        </Button>
        <div className="">REPORTE</div>
      </div>
      <div className="border-t border-b py-20 text-center relative flex items-center justify-center">
        <div>MAPA</div>
        <div className="absolute -bottom-5">
          <Popover>
            <PopoverTrigger>
              <Button variant={'outline'}>Não visualizado</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col space-y-2">
                <div>Nome: João</div>
                <div>Localização: Rua dos Bobos, 0</div>
                <div>Distância: 0.5 km</div>
                <div>
                  Descrição: O local não possui acessibilidade para cadeirantes.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mx-4 flex flex-col space-y-6 pb-5">
        <div className="flex items-center flex-row space-x-4">
          <Card>
            <IconComponent
              icon="guidance:no-wheelchair-access"
              className="text-2xl p-3"
            />
          </Card>
          <div className="flex flex-col text-sm">
            <div className="text-muted-foreground">
              Recurso não encontrado ou com defeito
            </div>
            <div className=" text-base font-medium">Rampa de acesso</div>
          </div>
        </div>
      </div>
      <div className="mx-4 flex flex-col space-y-6">
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
      </div>
      <div className="mx-4 flex flex-col space-y-3">
        <Label htmlFor="local" className=" text-muted-foreground">
          Local
        </Label>
        <div className=" flex flex-col text-sm space-y-1">
          <div>Rua dos Bobos 0,Farol, Maceió - AL,570085-952</div>
          <Separator />
          <div>Próximo a rua dos Bobos, 1</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
