import React, { useEffect, useState, useMemo, useCallback } from "react";
import { UserPlus, X, Users as UsersIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteUser } from "../../store/slices/userSlice";
import type { IUser, CreateUserData } from "../../types/user.types";
import { DataTable, type Column } from "../../components/common";
import {
  PageContainer,
  UserAvatar,
  UserInfo,
  UserDetails,
  UserName,
  UserEmail,
  RoleBadge,
  StatusIndicator,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  Button,
  AddUserButton,
} from "./Users.styled";
import { UserRole } from "../../types/enums";
import { userService } from "../../services/user.service";

const ITEMS_PER_PAGE = 10;

const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<IUser[]>([]);
  const { currentUser } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateUserData>({
    fullName: "",
    email: "",
    phone: "",
    role: UserRole.MEMBER,
  });

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const users = await userService.getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await userService.createUser(formData);
      if (response.code === 201 && response.data) {
        toast.success(response.message || "User created successfully");
        setUsers([...users, response.data]);
        setIsAddModalOpen(false);
        setIsSubmitting(false);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          role: UserRole.MEMBER as UserRole,
        });
      }
    } catch (error) {
      console.error("Failed to create user:", error);
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (row: Record<string, unknown>) => {
    const user = row as unknown as IUser;
    if (window.confirm(`Are you sure you want to delete ${user.fullName}?`)) {
      try {
        await dispatch(deleteUser(user.id)).unwrap();
        toast.success("User deleted successfully");
        // Refresh users list
        await fetchUsers();
      } catch (error) {
        toast.error(
          typeof error === "string" ? error : "Failed to delete user"
        );
      }
    }
  };

  const handleBulkDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedUsers.size} users?`
      )
    ) {
      try {
        const deletePromises = Array.from(selectedUsers).map((id) =>
          dispatch(deleteUser(id)).unwrap()
        );
        await Promise.all(deletePromises);
        toast.success(`Deleted ${selectedUsers.size} users`);
        setSelectedUsers(new Set());
        // Refresh users list
        await fetchUsers();
      } catch {
        toast.error("Failed to delete some users");
      }
    }
  };

  const columns: Column[] = useMemo(
    () => [
      {
        key: "user",
        label: "User",
        render: (_value: unknown, row: Record<string, unknown>) => {
          const user = row as unknown as IUser;
          return (
            <UserInfo>
              <UserAvatar>
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.fullName} />
                ) : (
                  getInitials(user.fullName)
                )}
              </UserAvatar>
              <UserDetails>
                <UserName>{user.fullName}</UserName>
                <UserEmail>{user.email}</UserEmail>
              </UserDetails>
            </UserInfo>
          );
        },
      },
      {
        key: "role",
        label: "Role",
        render: (_value: unknown, row: Record<string, unknown>) => {
          const user = row as unknown as IUser;
          return <RoleBadge $role={user.role}>{user.role}</RoleBadge>;
        },
      },
      {
        key: "phone",
        label: "Phone",
        render: (_value: unknown, row: Record<string, unknown>) => {
          const user = row as unknown as IUser;
          return user.phone || "—";
        },
      },
      {
        key: "active",
        label: "Active",
        render: (_value: unknown, row: Record<string, unknown>) => {
          const user = row as unknown as IUser;
          return (
            <StatusIndicator $online={user?.isVerified}>
              {user?.isVerified ? "Verified" : "Unverified"}
            </StatusIndicator>
          );
        },
      },
      {
        key: "createdAt",
        label: "Joined",
        render: (_value: unknown, row: Record<string, unknown>) => {
          const user = row as unknown as IUser;
          return new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        },
      },
    ],
    []
  );

  const handleOpenAddModal = useCallback(() => {
    setIsAddModalOpen(true);
  }, []);

  const headerActions = useMemo(
    () => (
      <AddUserButton onClick={handleOpenAddModal}>
        <UserPlus size={18} />
        Add User
      </AddUserButton>
    ),
    [handleOpenAddModal]
  );

  const tableData = useMemo(
    () => users as unknown as Record<string, unknown>[],
    [users]
  );

  return (
    <PageContainer>
      <DataTable
        columns={columns}
        data={tableData}
        title="Team Members"
        showCount={true}
        loading={isLoading}
        // searchable={true}
        // searchPlaceholder="Search users..."
        // searchKeys={["fullName", "email"]}
        selectable={true}
        selectedRows={Array.from(selectedUsers)}
        onSelectionChange={(ids: string[]) => setSelectedUsers(new Set(ids))}
        showRowActions={currentUser?.role === UserRole.ADMIN ? true : false}
        onDelete={
          currentUser?.role === UserRole.ADMIN ? handleDeleteUser : undefined
        }
        onBulkDelete={handleBulkDelete}
        paginated={true}
        pageSize={ITEMS_PER_PAGE}
        pageSizeOptions={[10, 25, 50]}
        totalItems={users.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sortable={true}
        defaultSort={{ key: "createdAt", direction: "desc" }}
        emptyTitle="No team members found"
        emptyMessage="Add team members to collaborate on your campaigns."
        emptyIcon={<UsersIcon size={40} />}
        headerActions={currentUser?.role === UserRole.ADMIN ? headerActions : undefined}
        showSaveButton={false}
        handleSaveSenderAccounts={() => {}}
      />

      {/* Add User Modal */}
      <ModalOverlay
        $open={isAddModalOpen}
        onClick={() => setIsAddModalOpen(false)}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Add Team Member</ModalTitle>
            <ModalCloseButton onClick={() => setIsAddModalOpen(false)}>
              <X size={20} />
            </ModalCloseButton>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <FormLabel>Full Name *</FormLabel>
              <FormInput
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Email Address *</FormLabel>
              <FormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Phone Number</FormLabel>
              <FormInput
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                disabled={isSubmitting}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Role *</FormLabel>
              <FormSelect
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                {Object.values(UserRole).map(
                  (role) =>
                    role !== UserRole.ADMIN && (
                      <option value={role}>
                        {role.charAt(0).toUpperCase() +
                          role.slice(1).toLowerCase()}
                      </option>
                    )
                )}
              </FormSelect>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              $variant="secondary"
              onClick={() => setIsAddModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            {currentUser?.role === UserRole.ADMIN && (
              <AddUserButton onClick={handleAddUser} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Add User"}
              </AddUserButton>
            )}
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </PageContainer>
  );
};

export default Users;
