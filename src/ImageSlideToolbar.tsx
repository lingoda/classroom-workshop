import { TextFields } from '@mui/icons-material';
import { Create } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { DefaultColorStyle, useEditor } from 'tldraw';
import { track } from 'tldraw';

interface ImageSlideToolbarProps {
  isTeacher: boolean;
}

export const ImageSlideToolbar = track(
  ({ isTeacher }: ImageSlideToolbarProps) => {
    const editor = useEditor();

    return (
      <Stack
        spacing={2}
        sx={{
          backgroundColor: 'black',
          padding: '12px',
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            editor.setStyleForNextShapes(
              DefaultColorStyle,
              isTeacher ? 'red' : 'blue'
            );
            editor.setCurrentTool('draw');
          }}
          startIcon={<Create />}
        >
          Annotation
        </Button>
        <Button
          variant="contained"
          onClick={() => editor.setCurrentTool('text')}
          startIcon={<TextFields />}
        >
          Text
        </Button>
      </Stack>
    );
  }
);
