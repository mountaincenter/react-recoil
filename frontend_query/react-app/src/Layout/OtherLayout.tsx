import React from 'react';
import { Container, Grid } from '@mui/material';

interface OtherLayoutProps {
  children: React.ReactElement;
}

const OtherLayout = ({ children }: OtherLayoutProps) => {
  return (
    <>
      <Container maxWidth="sm">
        <Grid container justifyContent="center">
          <Grid item> {children}</Grid>
        </Grid>
      </Container>
    </>
  );
};

export default OtherLayout;
