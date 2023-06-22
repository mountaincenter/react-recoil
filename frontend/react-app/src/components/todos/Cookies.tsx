import React from 'react';
import Cookies from 'js-cookie';
import { Typography } from '@mui/material';

const CookieTest = () => {
  return (
    <>
      <Typography>
        access-token: {Cookies.get('_access_token') ?? 'undefined'}
      </Typography>
      <Typography>clinet: {Cookies.get('_client') ?? 'undefined'}</Typography>
      <Typography>uid: {Cookies.get('_uid') ?? 'undefined'}</Typography>
    </>
  );
};

export default CookieTest;
