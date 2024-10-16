import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '../src/Link';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/student" color="secondary">
          STUDENT
        </Link>
        <Link href="/teacher" color="secondary">
          TEACHER
        </Link>
        <Link href="/editor" color="secondary">
          EDITOR
        </Link>
      </Box>
    </Container>
  );
}
