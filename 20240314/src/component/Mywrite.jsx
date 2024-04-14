import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import Mypost from './Mypost';
import Mycomment from './Mycomment';

export default () => {

  return (
    <Grid templateColumns="1fr 1fr"  justifyItems="center" margin="100px 0">
      <Mypost />
      <Mycomment />
    </Grid>
  );
};
