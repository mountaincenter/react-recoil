import { Grid } from '@mui/material';

interface WidgetWrapperProps {
  children: React.ReactElement;
  isTablet: boolean;
}

const WidgetWrapper = ({ children, isTablet }: WidgetWrapperProps) => {
  return (
    !isTablet && (
      <Grid item sx={{ overflowY: 'auto', maxHeight: '100dvh' }}>
        {children}
      </Grid>
    )
  );
};

export default WidgetWrapper;
