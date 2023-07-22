import SearchBox from 'components/common/SearchBox';
import { Grid, Divider } from '@mui/material';
import { useTrends } from 'hooks/trend/useTrends';
import LoadingAndErrorComponent from 'components/utils/LoadingAndErrorComponent';
import TrendList from 'components/trend/TrendList';

const Explore = () => {
  const { trends, isLoading, error } = useTrends();

  return (
    <LoadingAndErrorComponent isLoading={isLoading} error={error}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        direction="column"
      >
        <Grid item>
          <SearchBox />
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>{trends && <TrendList trends={trends} />}</Grid>
      </Grid>
    </LoadingAndErrorComponent>
  );
};

export default Explore;
