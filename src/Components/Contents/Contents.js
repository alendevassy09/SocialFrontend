import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Feeds from '../Feeds/feeds'
import RightBar from '../RightBar/rightBar'
function Contents() {
  return (
    <Box>
      <Stack flex={3} direction="row" spacing={{md:3}} justifyContent="space-between">
      <Feeds></Feeds>
       <RightBar></RightBar>
        </Stack>
       
    </Box>
  )
}

export default Contents
