import { useSyncDemo } from '@tldraw/sync';
import { AssetRecordType, Editor, Tldraw, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { useCallback, useEffect } from 'react';
import { ImageSlideToolbar } from './ImageSlideToolbar';
import { Box } from '@mui/material';
import { ImageSlideHint } from './ImageSlideHint';

interface ImageSlideProps {
  isTeacher?: boolean;
  slideIndex: number;
  imageUrl: string;
  teacherHint?: string;
}

export const ImageSlide = ({
  isTeacher = false,
  slideIndex,
  imageUrl,
  teacherHint,
}: ImageSlideProps) => {
  const store = useSyncDemo({
    roomId: `classroom-workshop-room-totaly-new-xxxx`,
  });

  const handleMount = useCallback((editor: Editor) => {
    for (let i = 0; i < 7; i++) {
      editor.createPage({ name: `slide-${i}` });
    }
  }, []);

  return (
    <div
      style={{ position: 'fixed', inset: 0, width: '100%', height: '800px' }}
    >
      <Tldraw store={store} hideUi onMount={handleMount}>
        <EditorContext
          slideIndex={slideIndex}
          imageUrl={imageUrl}
          isTeacher={isTeacher}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <ImageSlideToolbar isTeacher={isTeacher} />
        </Box>

        {teacherHint && <ImageSlideHint teacherHint={teacherHint} />}
      </Tldraw>
    </div>
  );
};

const EditorContext = ({
  slideIndex,
  imageUrl,
  isTeacher,
}: {
  slideIndex: number;
  imageUrl: string;
  isTeacher: boolean;
}) => {
  const editor = useEditor();
  useEffect(() => {
    const pageInfo = editor
      .getPages()
      .find((page) => page.name === `slide-${slideIndex + 1}`);

    if (pageInfo) {
      editor.setCurrentPage(pageInfo.id);
    }
    const existingAsset = editor
      .getAssets()
      .find((asset) => asset.props.src === imageUrl);

    if (!existingAsset && isTeacher) {
      const assetId = AssetRecordType.createId();
      const originalWidth = 1990;
      const originalHeight = 1495;
      const targetHeight = 800;
      const scaleFactor = targetHeight / originalHeight;
      const scaledWidth = originalWidth * scaleFactor;

      editor.createAssets([
        {
          id: assetId,
          type: 'image',
          typeName: 'asset',
          props: {
            name: 'presentation.png',
            src: imageUrl,
            w: originalWidth,
            h: originalHeight,
            mimeType: 'image/png',
            isAnimated: false,
          },
          meta: {},
        },
      ]);

      editor.createShape({
        type: 'image',
        x: (editor.getViewportScreenBounds().width - scaledWidth) / 2,
        y: 0,
        props: {
          assetId,
          w: scaledWidth,
          h: targetHeight,
        },
        isLocked: true,
      });

      editor.zoomToFit();
      editor.resetZoom();
    }
  }, [editor, slideIndex, imageUrl, isTeacher]);

  return null;
};
