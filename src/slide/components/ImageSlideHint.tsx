import { Typography, Box } from '@mui/material';

interface ImageSlideHintProps {
  teacherHint: string;
}

export const ImageSlideHint = ({ teacherHint }: ImageSlideHintProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        padding: 2,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'white',
          textShadow: `
            -1px -1px 0 #000,  
             1px -1px 0 #000,
            -1px  1px 0 #000,
             1px  1px 0 #000
          `,
          textAlign: 'center',
        }}
      >
        {teacherHint}
      </Typography>
    </Box>
  );
};
