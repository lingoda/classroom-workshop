import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { slides } from "..";
import { useSlideNavigation } from "../hooks/useSlideNavigation";

export const SlideNavigation = () => {
  const {
    currentSlideIndex,
    goForward,
    goBackward,
    forwardEnabled,
    backwardEnabled,
  } = useSlideNavigation();

  const totalSlides = slides.length;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={goBackward}
        disabled={!backwardEnabled}
      >
        <ArrowBackIcon />
      </Button>
      <Box
        sx={{
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
        }}
      >
        <Typography variant="body1">
          {currentSlideIndex + 1} / {totalSlides}
        </Typography>
      </Box>
      <Button variant="outlined" onClick={goForward} disabled={!forwardEnabled}>
        <ArrowForwardIcon />
      </Button>
    </Box>
  );
};
