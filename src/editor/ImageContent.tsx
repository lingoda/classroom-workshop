import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

interface Props {
    updatePageContent: (content: string) => void;
    pageContent: string | null;
}

export const ImageContent = ({updatePageContent, pageContent}: Props) => {
  console.log('pageContent', pageContent);
  const [selectedImage, setSelectedImage] = useState<string | null>(pageContent);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setSelectedImage(newImage);
        updatePageContent(newImage);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('Please select a valid image file.');
    }
  };

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setSelectedImage(pageContent);
  }, [pageContent]);

  return (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {selectedImage ? (
              <>
                <Box
                  component="img"
                  src={selectedImage}
                  alt="Selected Image"
                  sx={{ maxWidth: '100%', maxHeight: '500px', mb: 2 }}
                />
                <Button variant="contained" onClick={handleChooseImage}>
                  Update Image
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={handleChooseImage}>
                Choose Image
              </Button>
            )}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
            />
          </Box>
        )
}