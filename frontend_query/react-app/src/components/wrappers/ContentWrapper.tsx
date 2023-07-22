import { Grid } from '@mui/material';

interface ContentWrapperProps {
  children: React.ReactElement;
  isMobile: boolean;
}

const ContentWrapper = ({ children, isMobile }: ContentWrapperProps) => {
  return (
    <Grid
      item
      sx={{
        overflowY: 'auto',
        maxHeight: '100dvh',
        width: '600px',
        maxWidth: '100%',
        '--Grid-borderWidth': '1px',
        borderLeft: isMobile ? 'none' : 'var(--Grid-borderWidth) solid',
        borderRight: isMobile ? 'none' : 'var(--Grid-borderWidth) solid',
        borderColor: isMobile ? 'none' : 'divider',
      }}
    >
      {children}
    </Grid>
  );
};

export default ContentWrapper;
