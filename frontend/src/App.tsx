import { Container, ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from 'react-query';

import { Header } from '~/components/header';
import { Body } from '~/components/body/Body';
import { queryClient } from '~/config/queryClient';
import { theme } from '~/theme';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Header />
          <Body />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
