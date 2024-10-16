import React, { useState, useRef } from 'react';
import { Grid2, List, Typography, Button, Box, Pagination, IconButton, Tooltip } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImageIcon from '@mui/icons-material/Image';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import PollIcon from '@mui/icons-material/Poll';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { ImageContent } from '@/editor/ImageContent';
import { Page, PageType, PageContent } from '@/editor/types';
import { VideoContent } from '@/editor/VideoContent';

const Editor = () => {
  const [pages, setPages] = useState<Page[]>([{ type: 'Image', content: null }]);
  const [currentPage, setCurrentPage] = useState(1);
  const theme = useTheme();
  const currentPageData = pages[currentPage - 1];

  const sidebarItems: { text: Page['type']; icon: JSX.Element; disabled: boolean }[] = [
    { text: 'Image', icon: <ImageIcon />, disabled: false },
    { text: 'Video', icon: <VideoLibraryIcon />, disabled: false },
    { text: 'Quiz', icon: <QuizIcon />, disabled: false },
    { text: 'Poll', icon: <PollIcon />, disabled: false },
  ];

  const updatePageContent = (content: PageContent) => {
    setPages(prevPages =>
      prevPages.map((page, index) =>
        index === currentPage - 1 ? { ...page, content: content as any } : page
      )
    );
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleAddPage = () => {
    setPages(prevPages => [...prevPages, { type: 'Image', content: null }]);
    setCurrentPage(pages.length + 1);
  };

  const handleSidebarItemClick = (type: PageType) => {
    setPages(prevPages =>
      prevPages.map((page, index) =>
        index === currentPage - 1 ? { ...page, type, content: null } : page
      )
    );
  };

  const handleRemovePage = () => {
    if (pages.length > 1) {
      const newPages = pages.filter((_, index) => index !== currentPage - 1);
      setPages(newPages);
      setCurrentPage(prev => (prev > newPages.length ? newPages.length : prev));
    }
  };

  return (
    <Grid2 container >
      <Grid2 size={10}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2, backgroundColor: theme.palette.secondary.light }}>
          <Typography variant="h4" component="h1" color={theme.palette.secondary.contrastText} sx={{ fontWeight: 'bold' }}>
            Lesson Editor - Page {currentPage}
          </Typography>
          {pages.length > 1 && (
            <Tooltip title="Remove Page">
              <IconButton
                onClick={handleRemovePage}
                size="small"
                sx={{
                  color: theme.palette.error.main,
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box sx={{ width: '100%', p: 2 }}>
          {currentPageData.type === 'Image' && <ImageContent updatePageContent={updatePageContent} pageContent={currentPageData.content} />}
          {currentPageData.type === 'Video' && <VideoContent updatePageContent={updatePageContent} pageContent={currentPageData.content} />}
          {currentPageData.type === 'Quiz' && <Typography>Quiz Content</Typography>}
          {currentPageData.type === 'Poll' && <Typography>Poll Content</Typography>}
        </Box>
      </Grid2>
      <Grid2 size={2} sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'space-between', px: 2, backgroundColor: theme.palette.grey[100] }}>
        <List sx={{ flexGrow: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={pages[currentPage - 1].type === item.text}
                onClick={() => handleSidebarItemClick(item.text)}
                disabled={item.disabled}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.contrastText,
                    },
                  },
                  '&.Mui-disabled': {
                    opacity: 0.5,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.text.disabled,
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: pages[currentPage - 1].type === item.text && !item.disabled
                      ? theme.palette.primary.contrastText
                      : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center', pt: 2, minHeight: '80px' }}>
          <Pagination
            shape="rounded"
            count={pages.length}
            page={currentPage}
            onChange={handlePageChange}
            size="small"
            siblingCount={0}
            boundaryCount={1}
            hideNextButton={currentPage === pages.length}
            hidePrevButton={currentPage === 1}
          />
          {currentPage === pages.length && currentPageData.content !== null ? (
              <IconButton onClick={handleAddPage} size="small" sx={{ ml: 1 }}>
                <Tooltip title="Add Page">
                  <AddIcon />
                </Tooltip>
              </IconButton>
          ) : <Box />}
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Editor;
