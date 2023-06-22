import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useRecoilValue } from 'recoil';
import { todoListStatsState } from 'components/recoil/States/todoState';

const StatsTodo = () => {
  const { totalNum, totalCompletedNum, totalUncompletedNum, percentCompleted } =
    useRecoilValue(todoListStatsState);
  return (
    <>
      <Grid container justifyContent="space-around">
        <List>
          <ListSubheader>Total Tasks: {totalNum}</ListSubheader>
          <ListItem>
            <ListItemText>Completed Tasks: {totalCompletedNum}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Uncompleted Tasks: {totalUncompletedNum}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              Percent Completed: {percentCompleted * 100}%
            </ListItemText>
          </ListItem>
        </List>
        {/* <Typography variant="h6">Total Tasks: {totalNum}</Typography>
        <Typography variant="h6">
          Completed Tasks: {totalCompletedNum}
        </Typography>
        <Typography variant="h6">
          Uncompleted Tasks: {totalUncompletedNum}
        </Typography>
        <Typography variant="h6">
          Percent Completed: {percentCompleted * 100}%
        </Typography> */}
      </Grid>
    </>
  );
};

export default StatsTodo;
