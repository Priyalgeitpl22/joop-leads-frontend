import styled from '@emotion/styled';
import { Box, Typography, TextField, Button } from '@mui/material';

export const FormContainer = styled(Box)(`
  width: min-content;
  min-width: 960px;
  height: 98%;
  padding: 20px;
  border-radius: 8px;
  overflow: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  // background: var(--white-fade-gradient);
`);

export const FormTitle = styled(Typography)({
  marginBottom: '30px',
  fontSize: '2rem',
  fontWeight: 700,
  color: '#333',
});

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    background: 'var(--background-light)',
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
  width:'150px',
  borderRadius: '30px',
  padding: '12px 24px',
  background: `linear-gradient(135deg, var(--theme-color), var(--theme-color))`,
  color: 'var(--background-light)',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.01)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  }
});
