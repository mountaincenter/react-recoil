import Footer from './Footer';
import Sidebar from './Sidebar';
import Widget from './Widget';
import { Box, Container, Grid, useMediaQuery } from '@mui/material';
import theme from '../theme';
import { useCurrentUser } from '../hooks/currentUser/useCurrentUser';
import FooterMenu from './FooterMenu';

import SidebarWrapper from 'components/wrappers/SidebarWrapper';
import ContentWrapper from 'components/wrappers/ContentWrapper';
import WidgetWrapper from 'components/wrappers/WidgetWrapper';

import MobileAddFab from './MobileAddFab';

interface CommonLayoutProps {
  children: React.ReactElement;
}

const CommonLayout = ({ children }: CommonLayoutProps): React.ReactElement => {
  const { currentUser } = useCurrentUser();
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  const isTablet = useMediaQuery(theme.breakpoints.down('laptop'));

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
        <Container maxWidth="desktop" sx={{ m: 0, p: 0 }}>
          <Grid container justifyContent="center" spacing={0}>
            <SidebarWrapper isMobile={isMobile}>
              <Sidebar />
            </SidebarWrapper>
            <ContentWrapper isMobile={isMobile}>{children}</ContentWrapper>
            <WidgetWrapper isTablet={isTablet}>
              <Widget />
            </WidgetWrapper>
          </Grid>
        </Container>
        {isMobile && <MobileAddFab />}
        {!currentUser && !isMobile && <Footer />}
        {currentUser && isMobile && <FooterMenu />}
      </Box>
    </>
  );
};
export default CommonLayout;
