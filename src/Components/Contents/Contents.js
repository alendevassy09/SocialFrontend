import { Box } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Feeds from '../Feeds/feeds'

function Contents() {
  return (
    <Box width={"100%"} >
      <Stack width={"100%"} sx={{marginTop:{md:8}}} spacing={{md:3}} justifyContent="space-between">
      <Feeds></Feeds>
       {/* <RightBar></RightBar> */}
        </Stack>
       
    </Box>
  )
}

export default Contents
