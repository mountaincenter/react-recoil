import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { Box, Container, Grid } from '@mui/material';
import { isSignedInState } from '../atoms/authAtoms';
import { useRecoilValue } from 'recoil';

interface CommonLayoutProps {
  children: React.ReactElement;
}

const CommonLayout = ({ children }: CommonLayoutProps): React.ReactElement => {
  const signedIn = useRecoilValue(isSignedInState);
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100dvh"
      >
        <Container maxWidth="xl">
          <Grid container justifyContent="center" spacing={0}>
            <Grid item xs={12} sm={3} lg={2}>
              <Sidebar />
            </Grid>
            <Grid
              item
              xs={12}
              sm={9}
              lg={10}
              sx={{ overflowY: 'auto', maxHeight: '100dvh' }}
            >
              {children}
            </Grid>
          </Grid>
        </Container>
        {!signedIn && <Footer />}
      </Box>
    </>
  );
};
export default CommonLayout;
