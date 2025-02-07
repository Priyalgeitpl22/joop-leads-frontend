import styled from '@emotion/styled';
import { Box, Typography, TextField, Button } from '@mui/material';

export const FormContainer = styled(Box)({
  maxWidth: '600px',
  margin: '0.5rem auto',
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
});

export const FormTitle = styled(Typography)({
  marginBottom: '30px',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#333'
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: '#ffffff',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ddd',
      borderWidth: '2px'
    }
  }
});

export const StyledButton = styled(Button)({
  borderRadius: '30px',
  padding: '12px 24px',
  background: `linear-gradient(135deg, #7ed8d6, #4ca4a5)`,
  color: '#ffffff',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  }
});
