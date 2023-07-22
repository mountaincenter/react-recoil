import React from 'react';
import { Container, Grid } from '@mui/material';

interface OtherLayoutProps {
  children: React.ReactElement;
}

const AuthLayout = ({ children }: OtherLayoutProps) => {
  return (
    <>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AuthLayout;
