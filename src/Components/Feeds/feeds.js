import { Box, Checkbox } from '@mui/material'
import React from 'react'
import Posts from '../Posts/Post'

function feeds() {

  return (
    <Box flex={3} p={2}>
       <Posts></Posts>
       <Posts></Posts>
       <Posts></Posts>
       <Posts></Posts>
       <Posts></Posts>
       <Posts></Posts>

    </Box>
  )
}

export default feeds
