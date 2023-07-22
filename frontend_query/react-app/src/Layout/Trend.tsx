import { useTrends } from 'hooks/trend/useTrends';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';
import TrendList from 'components/trend/TrendList';
import { Paper, Box, List, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Trend = () => {
  const { trends, isLoading, error } = useTrends();

  const trendsSlice = trends?.slice(0, 5);
  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <Box sx={{ mt: 2, mx: 2 }}>
        <Paper
          variant="outlined"
          sx={{
            boxShadow: 'none',
            borderRadius: '20px',
          }}
        >
          <Box p={2}>
            <Typography variant="h6">いまどうしてる？</Typography>
            {trendsSlice && <TrendList trends={trendsSlice} />}
            <Typography
              variant="body1"
              component={Link}
              to="/explore"
              sx={{ textDecoration: 'none' }}
            >
              さらに表示
            </Typography>
          </Box>
        </Paper>
      </Box>
    </LoadingAndErrorComponent>
  );
};

export default Trend;
