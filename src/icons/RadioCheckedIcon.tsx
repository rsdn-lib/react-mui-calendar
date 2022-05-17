import { Box } from '@mui/material'
import React from 'react'

const RadioIconChecked = () => {
  return (
    <Box
      sx={{
        width: '16px',
        height: '16px',
        border: '1px solid #D88C8C',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#D88C8C'
        }}
      />
    </Box>
  )
}

export default RadioIconChecked
