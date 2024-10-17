import { Card, CardContent, CardMedia, Typography } from '@mui/material';

export const Presentation = () => {
  return (
    <Card sx={{ maxWidth: 648, margin: 'auto', mt: 4 }}>
      <CardMedia
        component="img"
        height="300"
        image="images/saved_presentation.png"
        alt="Presentation image"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Introduce yourself
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your presentation has been saved and is ready to use.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Presentation;
