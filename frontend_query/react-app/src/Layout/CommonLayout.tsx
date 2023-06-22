import React from 'react';
import Header from './Header';
import { Container, Grid } from '@mui/material';

interface CommonLayoutProps {
  children: React.ReactElement;
}

const CommonLayout = ({ children }: CommonLayoutProps): React.ReactElement => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="xl" sx={{ marginTop: '3rem' }}>
          <Grid container justifyContent="center" spacing={0}>
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};
export default CommonLayout;
