import React, { useState, useEffect } from 'react';
import { 
  User, 
  Shield, 
  Eye, 
  EyeOff, 
  X, 
  Camera,
  Palette,
  Sun,
  Moon,
  Check
} from 'lucide-react';
import { useTheme } from '../../context';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateCurrentUser } from '../../store/slices/userSlice';
import { changePassword } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';
import {
  PageContainer,
  Sidebar,
  SidebarSection,
  SidebarNav,
  SidebarNavItem,
  MainContent,
  ContentCard,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  ProfileHeader,
  ProfileInfo,
  ProfileAvatar,
  ProfileDetails,
  ProfileName,
  ProfileEmail,
  EditProfileButton,
  ProfileGrid,
  ProfileField,
  FieldLabel,
  FieldValue,
  Divider,
  SecurityForm,
  InputGroup,
  InputLabel,
  InputWrapper,
  Input,
  PasswordToggle,
  ErrorText,
  SubmitButton,
  ButtonLoader,
  // TwoFactorSection,
  // TwoFactorTitle,
  // TwoFactorDescription,
  // CheckboxWrapper,
  // Checkbox,
  // CheckboxLabel,
  ThemeSection,
  ThemeModeToggle,
  ModeButton,
  ModeIcon,
  ModeLabel,
  ColorGrid,
  ColorOption,
  ColorSwatch,
  ColorName,
  CheckIcon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  CancelButton,
  SaveButton,
  AvatarUpload,
  AvatarPreview,
  AvatarImage,
  AvatarUploadButton,
} from './Settings.styled';

type SettingsTab = 'profile' | 'security' | 'theme';

const colorThemes = [
  { id: 'indigo', name: 'Indigo', color: '#6366f1' },
  { id: 'ocean', name: 'Ocean', color: '#0ea5e9' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'rose', name: 'Rose', color: '#f43f5e' },
  { id: 'amber', name: 'Amber', color: '#f59e0b' },
];

export const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { isDarkMode, toggleDarkMode, themeColor, setThemeColor } = useTheme();

  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    phone: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newProfilePicture, setNewProfilePicture] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  // const [enable2FA, setEnable2FA] = useState(false);
  useEffect(() => {
    if (currentUser) {
      setEditFormData({
        fullName: currentUser.fullName || '',
        phone: currentUser.phone || '',
      });
      setPreviewImage(currentUser.profilePicture || null);
    }
  }, [currentUser]);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setNewProfilePicture(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    if (!editFormData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(updateCurrentUser({
        id: currentUser?.id || '',
        fullName: editFormData.fullName.trim(),
        phone: editFormData.phone.trim() || undefined,
        profilePicture: newProfilePicture || undefined,
      })).unwrap();
      
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
      setNewProfilePicture(null);
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditFormData({
      fullName: currentUser?.fullName || '',
      phone: currentUser?.phone || '',
    });
    setPreviewImage(currentUser?.profilePicture || null);
    setNewProfilePicture(null);
  };

  // Security Handlers
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;
    const errors = { currentPassword: '', newPassword: '' };

    if (!passwordData.currentPassword) {
      errors.currentPassword = 'Current password is required';
      hasError = true;
    }

    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
      hasError = true;
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
      hasError = true;
    }

    if (hasError) {
      setPasswordErrors(errors);
      return;
    }

    setIsChangingPassword(true);
    try {
      await dispatch(changePassword({
        email: currentUser?.email || '',
        existingPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error: unknown) {
      const err = error as string;
      toast.error(err || 'Failed to change password');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // const handle2FAToggle = async () => {
  //   const newValue = !enable2FA;
  //   setEnable2FA(newValue);
  //   // API call would go here
  //   toast.success(newValue ? '2FA enabled successfully!' : '2FA disabled');
  // };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <ContentCard>
            <SectionHeader>
              <SectionTitle>Profile</SectionTitle>
              <SectionDescription>
                Change your name, profile picture, role etc.
              </SectionDescription>
            </SectionHeader>

            <ProfileHeader>
              <ProfileInfo>
                <ProfileAvatar>
                  {currentUser?.profilePicture ? (
                    <img src={currentUser.profilePicture} alt={currentUser.fullName} />
                  ) : (
                    <span>{getInitials(currentUser?.fullName)}</span>
                  )}
                </ProfileAvatar>
                <ProfileDetails>
                  <ProfileName>{currentUser?.fullName || 'User'}</ProfileName>
                  <ProfileEmail>{currentUser?.email || 'user@email.com'}</ProfileEmail>
                </ProfileDetails>
              </ProfileInfo>
              <EditProfileButton onClick={() => setIsEditModalOpen(true)}>
                Edit profile
              </EditProfileButton>
            </ProfileHeader>

            <ProfileGrid>
              <ProfileField>
                <FieldLabel>Full name</FieldLabel>
                <FieldValue>{currentUser?.fullName || 'NA'}</FieldValue>
              </ProfileField>
              <ProfileField>
                <FieldLabel>Email address</FieldLabel>
                <FieldValue>{currentUser?.email || 'NA'}</FieldValue>
              </ProfileField>
              <ProfileField>
                <FieldLabel>Designation</FieldLabel>
                <FieldValue>{currentUser?.role || 'NA'}</FieldValue>
              </ProfileField>
            </ProfileGrid>
          </ContentCard>
        );

      case 'security':
        return (
          <ContentCard>
            <SectionHeader>
              <SectionTitle>Security</SectionTitle>
              <SectionDescription>
                Change your authentication password for better security
              </SectionDescription>
            </SectionHeader>

            <SecurityForm onSubmit={handlePasswordSubmit}>
              <InputGroup>
                <InputLabel>Current password</InputLabel>
                <InputWrapper $hasError={!!passwordErrors.currentPassword}>
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="Current password"
                    disabled={isChangingPassword}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPasswords((p) => ({ ...p, current: !p.current }))}
                  >
                    {showPasswords.current ? <Eye size={18} /> : <EyeOff size={18} />}
                  </PasswordToggle>
                </InputWrapper>
                {passwordErrors.currentPassword && (
                  <ErrorText>{passwordErrors.currentPassword}</ErrorText>
                )}
              </InputGroup>

              <InputGroup>
                <InputLabel>New Password</InputLabel>
                <InputWrapper $hasError={!!passwordErrors.newPassword}>
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    disabled={isChangingPassword}
                  />
                  <PasswordToggle
                    type="button"
                    onClick={() => setShowPasswords((p) => ({ ...p, new: !p.new }))}
                  >
                    {showPasswords.new ? <Eye size={18} /> : <EyeOff size={18} />}
                  </PasswordToggle>
                </InputWrapper>
                {passwordErrors.newPassword && (
                  <ErrorText>{passwordErrors.newPassword}</ErrorText>
                )}
              </InputGroup>

              <SubmitButton type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? 'Updating...' : 'Update'}
                {isChangingPassword && (
                  <ButtonLoader>
                    <span></span>
                    <span></span>
                    <span></span>
                  </ButtonLoader>
                )}
              </SubmitButton>
            </SecurityForm>

            <Divider />

            {/* <TwoFactorSection>
              <TwoFactorTitle>Two-Factor Authentication (2FA)</TwoFactorTitle>
              <TwoFactorDescription>
                Enable two-factor authentication for enhanced security. This will apply to you and 
                your team members, but not to clients.
              </TwoFactorDescription>

              <CheckboxWrapper>
                <Checkbox
                  checked={enable2FA}
                  onChange={handle2FAToggle}
                />
                <CheckboxLabel>Enable 2FA</CheckboxLabel>
              </CheckboxWrapper>

              <SubmitButton type="button" onClick={handle2FAToggle}>
                Update
              </SubmitButton>
            </TwoFactorSection> */}
          </ContentCard>
        );

      case 'theme':
        return (
          <ContentCard>
            <SectionHeader>
              <SectionTitle>Appearance</SectionTitle>
              <SectionDescription>
                Customize how Jooper Leads looks on your device
              </SectionDescription>
            </SectionHeader>

            <ThemeSection>
              <div>
                <InputLabel style={{ marginBottom: '12px', display: 'block' }}>
                  Mode
                </InputLabel>
                <ThemeModeToggle>
                  <ModeButton $active={!isDarkMode} onClick={() => isDarkMode && toggleDarkMode()}>
                    <ModeIcon><Sun size={18} /></ModeIcon>
                    <ModeLabel>Light</ModeLabel>
                  </ModeButton>
                  <ModeButton $active={isDarkMode} onClick={() => !isDarkMode && toggleDarkMode()}>
                    <ModeIcon><Moon size={18} /></ModeIcon>
                    <ModeLabel>Dark</ModeLabel>
                  </ModeButton>
                </ThemeModeToggle>
              </div>

              <div>
                <InputLabel style={{ marginBottom: '12px', display: 'block' }}>
                  Color Theme
                </InputLabel>
                <ColorGrid>
                  {colorThemes.map((theme) => (
                    <ColorOption
                      key={theme.id}
                      $active={themeColor === theme.id}
                      onClick={() => setThemeColor(theme.id)}
                    >
                      <ColorSwatch $color={theme.color}>
                        {themeColor === theme.id && (
                          <CheckIcon><Check size={18} /></CheckIcon>
                        )}
                      </ColorSwatch>
                      <ColorName>{theme.name}</ColorName>
                    </ColorOption>
                  ))}
                </ColorGrid>
              </div>
            </ThemeSection>
          </ContentCard>
        );

      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Sidebar>
        <SidebarSection>
          <SidebarNav>
            <SidebarNavItem
              $active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              <User size={20} />
              Your profile
            </SidebarNavItem>
            <SidebarNavItem
              $active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={20} />
              Security
            </SidebarNavItem>
            <SidebarNavItem
              $active={activeTab === 'theme'}
              onClick={() => setActiveTab('theme')}
            >
              <Palette size={20} />
              Appearance
            </SidebarNavItem>
          </SidebarNav>
        </SidebarSection>
      </Sidebar>

      <MainContent>
        {renderContent()}
      </MainContent>

      <ModalOverlay $isOpen={isEditModalOpen} onClick={handleCloseEditModal}>
        <ModalContent $isOpen={isEditModalOpen} onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Edit Profile</ModalTitle>
            <ModalCloseButton onClick={handleCloseEditModal}>
              <X size={20} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <AvatarUpload>
              <AvatarPreview>
                <AvatarImage>
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" />
                  ) : (
                    <span>{getInitials(editFormData.fullName)}</span>
                  )}
                </AvatarImage>
                <AvatarUploadButton>
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </AvatarUploadButton>
              </AvatarPreview>
            </AvatarUpload>

            <InputGroup style={{ marginBottom: '16px' }}>
              <InputLabel>Full Name</InputLabel>
              <InputWrapper>
                <Input
                  type="text"
                  name="fullName"
                  value={editFormData.fullName}
                  onChange={handleEditInputChange}
                  placeholder="Enter your full name"
                  disabled={isSaving}
                />
              </InputWrapper>
            </InputGroup>

            <InputGroup style={{ marginBottom: '16px' }}>
              <InputLabel>Email Address</InputLabel>
              <InputWrapper>
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
              <InputWrapper>
                <Input
                  type="tel"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditInputChange}
                  placeholder="Enter your phone number"
                  disabled={isSaving}
                />
              </InputWrapper>
            </InputGroup>
          </ModalBody>

          <ModalFooter>
            <CancelButton onClick={handleCloseEditModal} disabled={isSaving}>
              Cancel
            </CancelButton>
            <SaveButton onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </SaveButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default Settings;
