import { Box, List, useMediaQuery, Dialog } from '@mui/material';

import SidebarOption from './SidebarOption';
import SidebarFooter from './SidebarFooter';

import TweetButton from 'components/common/TweetButton';
import useMenuItems from 'hooks/useMenuItems';

import BreakpointsTheme from '../theme';

import { useRecoilState } from 'recoil';
import { dialogState } from '../atoms/dialogState';
import DialogManager from '../atoms/dialogManager';

import DarkModeSwitch from 'components/common/DarkModeSwitch';

const Sidebar = () => {
  const [dialogOpen, setDialogOpen] = useRecoilState(dialogState);
  const isTablet = useMediaQuery(
    BreakpointsTheme.breakpoints.between('tablet', 'desktop')
  );
  const isMobile = useMediaQuery(BreakpointsTheme.breakpoints.down('tablet'));

  const menuItems = useMenuItems();

  const TweetButtonConfig = {
    text: 'ツイートする',
    onClick: () => setDialogOpen({ isOpen: true, type: 'post' }),
    isTablet: isTablet,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100svh',
        postion: 'fixed',
        minWidth: {
          desktop: 259,
          laptop: 72,
          tablet: 'none',
        },
        overflow: 'hidden',
        px: 2,
      }}
    >
      <List
        sx={{
          flexGrow: 1,
          pt: 2,
          minWidth: { desktop: 259, laptop: 72, tablet: 'none', mobile: 259 },
        }}
      >
        {menuItems.map((item, i) => (
          <SidebarOption key={i} {...item} />
        ))}
        <TweetButton {...TweetButtonConfig} />
        <DarkModeSwitch />
        <Dialog
          open={dialogOpen.isOpen}
          onClose={() => setDialogOpen({ isOpen: false, type: null })}
        >
          <DialogManager />
        </Dialog>
      </List>
      {!isMobile && <SidebarFooter />}
    </Box>
  );
};

export default Sidebar;
