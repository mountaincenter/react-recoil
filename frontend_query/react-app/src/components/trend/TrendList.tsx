import React from 'react';
import { type Trend } from 'interfaces';
import { List, ListItem, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface TrendListProps {
  trends: Trend[];
}

const TrendList = ({ trends }: TrendListProps) => {
  return (
    <>
      <List>
        {trends.map((trend: Trend, index) => (
          <React.Fragment key={index}>
            <ListItem
              component={Link}
              to={`/searches/${encodeURIComponent('#' + trend.name)}`}
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Typography variant="body1">#{trend.name}</Typography>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default TrendList;
