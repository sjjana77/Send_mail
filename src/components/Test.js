import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function App() {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <TextField
        label="Multiline Textarea"
        multiline
        rows={20}
        variant="outlined"
        fullWidth
        placeholder="Enter your text here"
        value={value}
        onChange={handleChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'primary.main',
            },
            '&:hover fieldset': {
              borderColor: 'primary.light',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.dark',
            },
          },
        }}
      />
    </>
  );
}

export default App;
