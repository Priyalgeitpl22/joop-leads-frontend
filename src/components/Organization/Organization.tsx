import React, { useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganization } from '../../redux/slice/organizationSlice';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  StyledButton
} from './organization.styled';
import { AppDispatch, RootState } from '../../redux/store/store';

const fields = [
  { label: 'Name', key: 'name', xs: 12, sm: 6 },
  { label: 'Phone', key: 'phone', xs: 12, sm: 6 },
  { label: 'Address', key: 'address', xs: 12, sm: 12 },
  { label: 'City', key: 'city', xs: 12, sm: 6 },
  { label: 'State', key: 'state', xs: 12, sm: 6 },
  { label: 'Country', key: 'country', xs: 12, sm: 6 },
  { label: 'Zip', key: 'zip', xs: 12, sm: 6 },
  { label: 'Industry', key: 'industry', xs: 12, sm: 6 },
  { label: 'Domain', key: 'domain', xs: 12, sm: 6 }
];

const OrganizationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { data, loading } = useSelector((state: RootState) => state.organization);
  console.log("Organization data:", data);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrganization(user.orgId));
    }
  }, [dispatch, user]);

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  const initialValues = {
    name: data.name || '',
    phone: data.phone || '',
    address: '',
    city: '',
    state: '',
    country: data.country || '',
    zip: '',
    industry: '',
    domain: data.domain || ''
  };

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
                defaultValue={initialValues[field.key as keyof typeof initialValues]}
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
