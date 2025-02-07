import React from 'react';
import { Box, Grid } from '@mui/material';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  StyledButton
} from './organization.styled';

const fields = [
  { label: 'Name', xs: 12, sm: 6 },
  { label: 'Phone', xs: 12, sm: 6 },
  { label: 'Address', xs: 12, sm: 12 },
  { label: 'City', xs: 12, sm: 6 },
  { label: 'State', xs: 12, sm: 6 },
  { label: 'Country', xs: 12, sm: 6 },
  { label: 'Zip', xs: 12, sm: 6 },
  { label: 'Industry', xs: 12, sm: 6 },
  { label: 'Domain', xs: 12, sm: 6 }
];

const OrganizationForm: React.FC = () => {
  return (
    <FormContainer>
      <FormTitle>Organization Form</FormTitle>
      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid item xs={field.xs} sm={field.sm} key={index}>
              <StyledTextField
                fullWidth
                label={field.label}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <StyledButton type="submit" fullWidth>
              Submit
            </StyledButton>
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default OrganizationForm;
