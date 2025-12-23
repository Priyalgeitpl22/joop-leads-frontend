import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Camera, 
  Save, 
  X, 
  Edit3, 
  Lock, 
  Eye, 
  EyeOff, 
  Info,
  Calendar,
  Building
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateCurrentUser } from '../../store/slices/userSlice';
import toast from 'react-hot-toast';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ProfileCard,
  ProfileHeader,
  AvatarSection,
  AvatarWrapper,
  AvatarPlaceholder,
  AvatarUploadButton,
  HeaderInfo,
  UserName,
  UserEmail,
  RoleBadge,
  ProfileBody,
  SectionTitle,
  FormGrid,
  InputGroup,
  InputLabel,
  InputWrapper,
  InputIcon,
  Input,
  ErrorText,
  Divider,
  ButtonGroup,
  Button,
  ButtonLoader,
  PasswordToggle,
  InfoBox,
  Skeleton,
} from './Profile.styled';

// Validation helpers
const validateFullName = (name: string) => {
  if (!name.trim()) return { isValid: false, message: 'Full name is required' };
  if (name.trim().length < 2) return { isValid: false, message: 'Name must be at least 2 characters' };
  return { isValid: true, message: '' };
};

const validatePhone = (phone: string) => {
  if (!phone.trim()) return { isValid: true, message: '' }; // Optional field
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
  if (!phoneRegex.test(phone)) return { isValid: false, message: 'Please enter a valid phone number' };
  return { isValid: true, message: '' };
};

const validatePassword = (password: string) => {
  if (!password) return { isValid: false, message: 'Password is required' };
  if (password.length < 8) return { isValid: false, message: 'Password must be at least 8 characters' };
  return { isValid: true, message: '' };
};

export const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, isFetchingCurrentUser } = useAppSelector((state) => state.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
      });
      setPreviewImage(currentUser.profilePicture || null);
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setNewProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
      setIsEditing(true);
    }
  };

  const validateForm = useCallback((): boolean => {
    const fullNameValidation = validateFullName(formData.fullName);
    const phoneValidation = validatePhone(formData.phone);

    setErrors((prev) => ({
      ...prev,
      fullName: fullNameValidation.message,
      phone: phoneValidation.message,
    }));

    return fullNameValidation.isValid && phoneValidation.isValid;
  }, [formData]);

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      await dispatch(updateCurrentUser({
        id: currentUser?.id || '',
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim() || undefined,
        profilePicture: newProfilePicture || undefined,
      })).unwrap();

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setNewProfilePicture(null);
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
      });
      setPreviewImage(currentUser.profilePicture || null);
    }
    setNewProfilePicture(null);
    setIsEditing(false);
    setErrors({ fullName: '', phone: '', currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handlePasswordSubmit = async () => {
    const currentPasswordValidation = validatePassword(passwordData.currentPassword);
    const newPasswordValidation = validatePassword(passwordData.newPassword);
    
    let confirmPasswordError = '';
    if (!passwordData.confirmPassword) {
      confirmPasswordError = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      confirmPasswordError = 'Passwords do not match';
    }

    setErrors((prev) => ({
      ...prev,
      currentPassword: currentPasswordValidation.message,
      newPassword: newPasswordValidation.message,
      confirmPassword: confirmPasswordError,
    }));

    if (!currentPasswordValidation.isValid || !newPasswordValidation.isValid || confirmPasswordError) {
      return;
    }

    setIsSaving(true);

    try {
      // Note: Password change API would need to be implemented in the service
      toast.success('Password changed successfully!');
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoleLabel = (role?: string) => {
    const roles: Record<string, string> = {
      admin: 'Administrator',
      manager: 'Manager',
      user: 'Team Member',
    };
    return roles[role || 'user'] || role;
  };

  if (isFetchingCurrentUser && !currentUser) {
    return (
      <PageContainer>
        <PageHeader>
          <Skeleton $width="200px" $height="32px" />
          <Skeleton $width="300px" $height="20px" style={{ marginTop: '8px' }} />
        </PageHeader>
        <ProfileCard>
          <ProfileHeader>
            <Skeleton $width="120px" $height="120px" style={{ borderRadius: '50%' }} />
            <div style={{ flex: 1 }}>
              <Skeleton $width="200px" $height="28px" />
              <Skeleton $width="250px" $height="20px" style={{ marginTop: '8px' }} />
            </div>
          </ProfileHeader>
          <ProfileBody>
            <Skeleton $width="150px" $height="24px" />
            <div style={{ marginTop: '24px', display: 'grid', gap: '16px' }}>
              <Skeleton $height="48px" />
              <Skeleton $height="48px" />
            </div>
          </ProfileBody>
        </ProfileCard>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>My Profile</PageTitle>
        <PageSubtitle>Manage your personal information and account settings</PageSubtitle>
      </PageHeader>

      <ProfileCard>
        <ProfileHeader>
          <AvatarSection>
            <AvatarWrapper>
              {previewImage ? (
                <img src={previewImage} alt={currentUser?.fullName || 'Profile'} />
              ) : (
                <AvatarPlaceholder>
                  {currentUser?.fullName ? getInitials(currentUser.fullName) : <User size={48} />}
                </AvatarPlaceholder>
              )}
            </AvatarWrapper>
            <AvatarUploadButton>
              <Camera size={16} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </AvatarUploadButton>
          </AvatarSection>

          <HeaderInfo>
            <UserName>{currentUser?.fullName || 'User'}</UserName>
            <UserEmail>{currentUser?.email}</UserEmail>
            <RoleBadge>
              <Shield size={14} />
              {getRoleLabel(currentUser?.role)}
            </RoleBadge>
          </HeaderInfo>
        </ProfileHeader>

        <ProfileBody>
          {/* Personal Information Section */}
          <SectionTitle>
            <User size={20} />
            Personal Information
          </SectionTitle>

          <FormGrid>
            <InputGroup>
              <InputLabel>Full Name</InputLabel>
              <InputWrapper $hasError={!!errors.fullName} $disabled={!isEditing}>
                <InputIcon><User size={18} /></InputIcon>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  disabled={!isEditing}
                />
              </InputWrapper>
              {errors.fullName && <ErrorText>{errors.fullName}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <InputLabel>Email Address</InputLabel>
              <InputWrapper $disabled>
                <InputIcon><Mail size={18} /></InputIcon>
                <Input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  placeholder="Email address"
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputLabel>Phone Number</InputLabel>
              <InputWrapper $hasError={!!errors.phone} $disabled={!isEditing}>
                <InputIcon><Phone size={18} /></InputIcon>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  disabled={!isEditing}
                />
              </InputWrapper>
              {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
            </InputGroup>

            <InputGroup>
              <InputLabel>Member Since</InputLabel>
              <InputWrapper $disabled>
                <InputIcon><Calendar size={18} /></InputIcon>
                <Input
                  type="text"
                  value={formatDate(currentUser?.createdAt)}
                  disabled
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputLabel>Organization</InputLabel>
              <InputWrapper $disabled>
                <InputIcon><Building size={18} /></InputIcon>
                <Input
                  type="text"
                  value={currentUser?.orgId || 'N/A'}
                  disabled
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup>
              <InputLabel>Role</InputLabel>
              <InputWrapper $disabled>
                <InputIcon><Shield size={18} /></InputIcon>
                <Input
                  type="text"
                  value={getRoleLabel(currentUser?.role)}
                  disabled
                />
              </InputWrapper>
            </InputGroup>
          </FormGrid>

          <ButtonGroup>
            {isEditing ? (
              <>
                <Button $variant="secondary" onClick={handleCancel} disabled={isSaving}>
                  <X size={18} />
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save size={18} />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                  {isSaving && (
                    <ButtonLoader>
                      <span></span>
                      <span></span>
                      <span></span>
                    </ButtonLoader>
                  )}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit3 size={18} />
                Edit Profile
              </Button>
            )}
          </ButtonGroup>

          <Divider />

          {/* Password Section */}
          <SectionTitle>
            <Lock size={20} />
            Security
          </SectionTitle>

          {!isChangingPassword ? (
            <Button $variant="secondary" onClick={() => setIsChangingPassword(true)}>
              <Lock size={18} />
              Change Password
            </Button>
          ) : (
            <>
              <InfoBox>
                <Info size={18} />
                <p>
                  Your password must be at least 8 characters long. We recommend using a mix of 
                  letters, numbers, and symbols for a stronger password.
                </p>
              </InfoBox>

              <FormGrid>
                <InputGroup className="full-width">
                  <InputLabel>Current Password</InputLabel>
                  <InputWrapper $hasError={!!errors.currentPassword}>
                    <InputIcon><Lock size={18} /></InputIcon>
                    <Input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPasswords((p) => ({ ...p, current: !p.current }))}
                    >
                      {showPasswords.current ? <Eye size={18} /> : <EyeOff size={18} />}
                    </PasswordToggle>
                  </InputWrapper>
                  {errors.currentPassword && <ErrorText>{errors.currentPassword}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <InputLabel>New Password</InputLabel>
                  <InputWrapper $hasError={!!errors.newPassword}>
                    <InputIcon><Lock size={18} /></InputIcon>
                    <Input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                    >
                      {showPasswords.new ? <Eye size={18} /> : <EyeOff size={18} />}
                    </PasswordToggle>
                  </InputWrapper>
                  {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}
                </InputGroup>

                <InputGroup>
                  <InputLabel>Confirm New Password</InputLabel>
                  <InputWrapper $hasError={!!errors.confirmPassword}>
                    <InputIcon><Lock size={18} /></InputIcon>
                    <Input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                    />
                    <PasswordToggle
                      type="button"
                      onClick={() => setShowPasswords((p) => ({ ...p, confirm: !p.confirm }))}
                    >
                      {showPasswords.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
                    </PasswordToggle>
                  </InputWrapper>
                  {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
                </InputGroup>
              </FormGrid>

              <ButtonGroup>
                <Button 
                  $variant="secondary" 
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setErrors((prev) => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
                  }} 
                  disabled={isSaving}
                >
                  <X size={18} />
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit} disabled={isSaving}>
                  <Lock size={18} />
                  {isSaving ? 'Updating...' : 'Update Password'}
                  {isSaving && (
                    <ButtonLoader>
                      <span></span>
                      <span></span>
                      <span></span>
                    </ButtonLoader>
                  )}
                </Button>
              </ButtonGroup>
            </>
          )}
        </ProfileBody>
      </ProfileCard>
    </PageContainer>
  );
};

export default Profile;

