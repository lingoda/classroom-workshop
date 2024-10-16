import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';
import { VideoPage } from './types';

interface Props {
  updatePageContent: (content: string) => void;
  pageContent: VideoPage['content'];
}

enum VideoType {
  YouTube,
  Vimeo,
  Direct,
  Unknown
}

export const VideoContent = ({ updatePageContent, pageContent }: Props) => {
  const [videoUrl, setVideoUrl] = useState<string>(pageContent || '');
  const [videoType, setVideoType] = useState<VideoType>(VideoType.Unknown);

  useEffect(() => {
    setVideoUrl(pageContent || '');
    setVideoType(getVideoType(pageContent || ''));
  }, [pageContent]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setVideoUrl(value);
    const videoType = getVideoType(value);
    setVideoType(videoType);

    if (videoType !== VideoType.Unknown) {
        updatePageContent(value);
    }
  };

  const getVideoType = (url: string): VideoType => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return VideoType.YouTube;
    } else if (url.includes('vimeo.com')) {
      return VideoType.Vimeo;
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return VideoType.Direct;
    }
    return VideoType.Unknown;
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    const videoId = url.split('v=')[1] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const getVimeoEmbedUrl = (url: string): string => {
    const videoId = url.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}`;
  };

  const renderVideoPlayer = () => {
    switch (videoType) {
      case VideoType.YouTube:
        return (
          <iframe
            width="100%"
            height="315"
            src={getYouTubeEmbedUrl(videoUrl)}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      case VideoType.Vimeo:
        return (
          <iframe
            src={getVimeoEmbedUrl(videoUrl)}
            width="100%"
            height="315"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      case VideoType.Direct:
        return (
          <video width="100%" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return <p>Please provide a valid video URL to preview it.</p>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <Box sx={{ width: '100%', maxWidth: '640px', mb: 2 }}>
          <TextField
            fullWidth
            label="Video URL"
            value={videoUrl}
            onChange={handleUrlChange}
            sx={{ mb: 2 }}
          />
        </Box>
          <Box sx={{ width: '100%', maxWidth: '640px', mb: 2 }}>
            {renderVideoPlayer()}
          </Box>
    </Box>
  );
};
