import { useSyncDemo } from '@tldraw/sync';
import { AssetRecordType, Editor, Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { useCallback } from 'react';
import { ImageSlideToolbar } from './ImageSlideToolbar';

interface ImageSlideProps {
  isTeacher?: boolean;
}

export const ImageSlide = ({ isTeacher = false }: ImageSlideProps) => {
  const store = useSyncDemo({ roomId: 'classroom-workshop-room-1' });

  const handleMount = useCallback((editor: Editor) => {
    const existingAsset = editor
      .getAssets()
      .find((asset) => asset.props.src === '/presentation/student/img_1.png');

    if (!existingAsset) {
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
            src: '/presentation/student/img_1.png',
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
  }, []);

  return (
    <div
      style={{ position: 'fixed', inset: 0, width: '100%', height: '800px' }}
    >
      <Tldraw store={store} hideUi onMount={handleMount}>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1000,
          }}
        >
          <ImageSlideToolbar isTeacher={isTeacher} />
        </div>
      </Tldraw>
    </div>
  );
};
