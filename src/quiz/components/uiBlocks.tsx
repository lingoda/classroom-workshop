import { Box, Button, Grid2, Stack, styled } from "@mui/material";

export const QuizLayerContainer = styled(Box)`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  background: #153bff47;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const QuestionTitle = styled("h2")`
  font-size: 24px;
  font-weight: bold;
  color: #153bff;
  text-align: center;
  margin: 0;
`;

export const UserHeader = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  padding: 16px;
  color: #153bff;
`;
