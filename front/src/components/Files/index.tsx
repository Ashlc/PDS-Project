import Row from '@components/Row';
import { Button } from '@components/ui/button';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import { useState } from 'react';
import { RiCloseLine, RiImageAddFill } from 'react-icons/ri';

type Props = {
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
};

const Index = ({ setImages }: Props) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages((prevImages) => [...prevImages, ...Array.from(files)]);
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex space-x-2">
        <label className="w-16 h-16 flex items-center justify-center border aspect-square border-gray-300 rounded-md cursor-pointer">
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageUpload}
          />
          <RiImageAddFill />
        </label>
        <ScrollArea className="w-full h-20">
          {' '}
          <Row className="gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative flex-shrink-0">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded preview ${index}`}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover border border-gray-300 rounded-md"
                />
                <Button
                  onClick={() => handleRemoveImage(index)}
                  variant={'destructive'}
                  size={'icon'}
                  className="absolute top-0 right-0 h-5 w-5"
                >
                  <RiCloseLine className="text-sm" />
                </Button>
              </div>
            ))}
          </Row>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Index;
