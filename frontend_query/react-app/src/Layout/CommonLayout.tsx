import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import FooterMenu from './FooterMenu';
import Sidebar from './Sidebar';
import Widget from './Widget';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import { isSignedInState } from '../atoms/authAtoms';
import { useRecoilValue } from 'recoil';
import theme from '../theme';

interface CommonLayoutProps {
  children: React.ReactElement;
}

const CommonLayout = ({ children }: CommonLayoutProps): React.ReactElement => {
  const signedIn = useRecoilValue(isSignedInState);
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.down('laptop'));
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(bottom);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100dvh"
        sx={{
          overflowY: 'hidden',
        }}
      >
        <Container maxWidth="desktop">
          <Grid container justifyContent="center" spacing={0}>
            {!isMobile && (
              <>
                <Grid
                  item
                  sx={{
                    overflowY: 'auto',
                    maxHeight: '100dhv',
                  }}
                  tablet={1}
                  laptop={1}
                  desktop={2}
                >
                  <Sidebar />
                </Grid>
              </>
            )}
            <Grid
              item
              sx={{ overflowY: 'auto', maxHeight: '100dvh' }}
              mobile={12}
              tablet={10}
              laptop={6}
              desktop={6}
            >
              {children}
            </Grid>
            {!isTablet && (
              <Grid
                item
                sx={{ overflowY: 'auto', maxHeight: '100dvh' }}
                laptop={3}
                desktop={4}
              >
                <Widget />
              </Grid>
            )}
          </Grid>
        </Container>
        {!signedIn && <Footer />}
        {signedIn && showFooter && <FooterMenu />}
      </Box>
    </>
  );
};
export default CommonLayout;
