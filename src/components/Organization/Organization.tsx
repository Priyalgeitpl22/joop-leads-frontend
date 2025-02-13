import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrganization, updateOrganization } from '../../redux/slice/organizationSlice';
import {
  FormContainer,
  FormTitle,
  StyledTextField,
  StyledButton
} from './organization.styled';
import { AppDispatch, RootState } from '../../redux/store/store';

interface Field {
  label: string;
  key: string;
  xs: number;
  sm: number;
  multiline?: boolean;
  rows?: number;
}

const fields: Field[] = [
  { label: 'Name', key: 'name', xs: 12, sm: 6 },
  { label: 'Phone', key: 'phone', xs: 12, sm: 6 },
  { label: 'Address', key: 'address', xs: 12, sm: 8 },
  { label: 'Zip', key: 'zip', xs: 12, sm: 4 },
  { label: 'City', key: 'city', xs: 12, sm: 4 },
  { label: 'State', key: 'state', xs: 12, sm: 4 },
  { label: 'Country', key: 'country', xs: 12, sm: 4 },
  { label: 'Company (Description)', key: 'description', xs: 12, sm: 12, multiline: true, rows: 4 },
  { label: 'Industry', key: 'industry', xs: 12, sm: 6 },
  { label: 'Domain', key: 'domain', xs: 12, sm: 6 }
];

interface OrganizationData {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number | null;
  description: string;
  industry: string;
  domain: string;
}

const OrganizationForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { data, loading } = useSelector((state: RootState) => state.organization);

  // Initialize state with empty values
  const [values, setValues] = useState<OrganizationData>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: null,
    description: '',
    industry: '',
    domain: ''
  });

  // Fetch organization data
  useEffect(() => {
    if (user) {
      dispatch(fetchOrganization(user.orgId));
    }
  }, [dispatch, user]);

  // Once data is fetched, update state
  useEffect(() => {
    if (data) {
      setValues({
        name: data.name || '',
        phone: data.phone || '',
        address: data.address || '',
        city: data.city || '',
        state: data.state || '',
        country: data.country || '',
        zip: data.zip || null,
        description: data.description || '',
        industry: data.industry || '',
        domain: data.domain || ''
      });
    }
  }, [data]);

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = async (event: React.FormEvent) => {
    console.log(values)
    event.preventDefault();
    if (!user) return;

    const response = await dispatch(updateOrganization({ orgId: user.orgId, data: {...values, aiOrgId: user.aiOrgId} }));

    if (updateOrganization.fulfilled.match(response)) {
      alert("Organization updated successfully!");
    } else {
      alert(`Update failed: ${response.payload}`);
    }
  };

  if (loading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <FormContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <FormTitle>Organization Form</FormTitle>
        <StyledButton type="submit" form="org-form">
          Update
        </StyledButton>
      </Box>
      <Box component="form" id="org-form" noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {fields.map((field, index) => (
            <Grid size={field.sm} key={index}>
              <StyledTextField
                fullWidth
                name={field.key}
                label={field.label}
                variant="outlined"
                value={
                  field.key === "zip"
                    ? values.zip === null
                      ? ""
                      : values.zip.toString()
                    : values[field.key as keyof OrganizationData]
                }
                onChange={handleChange}
                {...(field.multiline ? { multiline: true, rows: field.rows } : {})}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </FormContainer>
  );
};

export default OrganizationForm;
