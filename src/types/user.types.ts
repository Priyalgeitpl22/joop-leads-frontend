export type UserRole = "OWNER" | "ADMIN" | "MEMBER" | "VIEWER";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
  profilePicture?: string;
  orgId: string;
  aiOrgId?: string;
  online?: boolean;
  isActive?: boolean;
  isVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
  planDetails?: any;
}

export interface UpdateUserData {
  id: string;
  fullName?: string;
  phone?: string;
  profilePicture?: File;
  removeProfilePicture?: boolean;
}

export interface CreateUserData {
  fullName: string;
  email: string;
  phone?: string;
  role: UserRole;
}

export interface UserState {
  currentUser: IUser | null;
  users: IUser[];
  isFetchingCurrentUser: boolean;
  isFetchingUsers: boolean;
  isUpdatingUser: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}
