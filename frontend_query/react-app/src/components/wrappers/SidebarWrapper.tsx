import { Box } from '@mui/material';

interface SidebarWrapperProps {
  children: React.ReactElement;
  isMobile: boolean;
}

const SidebarWrapper = ({ children, isMobile }: SidebarWrapperProps) => {
  return (
    !isMobile && (
      <Box
        sx={{
          overflowY: 'auto',
          height: '100dvh',
          width: {
            desktop: 259,
            loptop: 72,
            tablet: 'none',
          },
        }}
      >
        {children}
      </Box>
    )
  );
};

export default SidebarWrapper;
