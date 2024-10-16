import { Button, Stack } from '@mui/material';
import { Create, TextFields } from '@mui/icons-material';
import { useSyncDemo } from '@tldraw/sync';
import { DefaultColorStyle, Tldraw, track, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';

interface PresentationProps {
  isTeacher?: boolean;
}

export const Presentation = ({ isTeacher = false }: PresentationProps) => {
  const store = useSyncDemo({ roomId: 'classroom-workshop-room' });

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100%', height: 600 }}>
      <Tldraw store={store} hideUi>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <PresentationToolbar isTeacher={isTeacher} />
        </div>
      </Tldraw>
    </div>
  );
};

interface PresentationToolbarProps {
  isTeacher: boolean;
}

const PresentationToolbar = track(({ isTeacher }: PresentationToolbarProps) => {
  const editor = useEditor();

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        backgroundColor: 'black',
        padding: '8px',
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
});
