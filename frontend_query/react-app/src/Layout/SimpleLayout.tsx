import React from 'react';
import { Container, Grid, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';
import theme from 'theme';

interface OtherLayoutProps {
  children: React.ReactElement;
}

const SimpleLayout = ({ children }: OtherLayoutProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  return (
    <>
      <Container maxWidth="desktop">
        <Grid container justifyContent="center">
          {!isMobile && (
            <Grid item tablet={2}>
              {' '}
              <Sidebar />
            </Grid>
          )}
          <Grid item mobile={12} tablet={10}>
            {' '}
            {children}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default SimpleLayout;
