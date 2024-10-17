import React from 'react';
import { Box, Tooltip } from '@mui/material';
import { styled } from '@mui/system';

interface StudentProgressBarProps {
  totalQuestionsAmount: number;
  answers: (boolean | null)[];
}

const ProgressContainer = styled(Box)({
  display: 'flex',
  width: '400px',
  height: '10px',
  backgroundColor: '#e0e0e0',
  borderRadius: '5px',
  overflow: 'hidden',
});

const ProgressSegment = styled(Box)<{ status: 'correct' | 'incorrect' | 'unanswered' }>(({ status }) => ({
  height: '100%',
  flexGrow: 1,
  backgroundColor: 
    status === 'correct' ? '#4caf50' :
    status === 'incorrect' ? '#f44336' :
    '#9e9e9e',
  transition: 'background-color 0.3s',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '1px',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  '&:last-child::after': {
    display: 'none',
  },
}));

export const StudentProgressBar: React.FC<StudentProgressBarProps> = ({ totalQuestionsAmount, answers }) => {
  const segments = Array(totalQuestionsAmount).fill(null).map((_, index) => answers[index] ?? null);

  return (
    <ProgressContainer>
      {segments.map((status, index) => (
        <Tooltip 
          key={index} 
          title={
            status === true ? 'Correct' :
            status === false ? 'Incorrect' :
            'Not answered yet'
          }
          arrow
        >
          <ProgressSegment 
            status={
              status === true ? 'correct' :
              status === false ? 'incorrect' :
              'unanswered'
            }
          />
        </Tooltip>
      ))}
    </ProgressContainer>
  );
};
