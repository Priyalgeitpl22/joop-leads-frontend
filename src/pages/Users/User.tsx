import { Box, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { Toaster, toast } from "react-hot-toast";
import { UserHeader, UsersContainer, UserTable } from "./User.styled";
import { SectionTitle } from "../../styles/layout.styled";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { Button } from "../../styles/global.styled";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { DeleteIcon } from "../Contacts/ContactTable.styled";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddUserDialog from "./AddUser/AddUserDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  deleteUser,
  getAllUsers,
} from "../../redux/slice/userSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConfirmDeleteDialog from "../ConfirmDeleteDialog";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const [rows, setRows] = useState<any[]>([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  
  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        toast.error(error || "Failed to fetch users");
      });
  }, [dispatch, addUser]);

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedUser(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteUser = async () => {
    if (selectedUser === null) {
      toast.error("No user selected for deletion");
      return;
    }

    try {
      const updatedRows = rows.filter((row) => row.id !== selectedUser);
      setRows(updatedRows);

      const response = await dispatch(deleteUser(selectedUser)).unwrap();
      if (response?.code === 200) {
        toast.success(
          response?.message || "User has been deactivated successfully."
        );
      } else {
        toast.error("Failed to deactivate user.");
      }

      handleCloseDeleteDialog();
    } catch (error: any) {
      console.error("Failed to delete user:", error);
      toast.error(error || "Error occurred while deleting the user.");
      setRows(rows);
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "fullName",
        headerName: "Full Name",
        width: 250,
        renderCell: (params) => (
          <Box sx={{ display: "flex", gap: "6%" }}>
            <Box>
              {params?.row?.profilePicture ? (
                <img
                  src={params.row.profilePicture}
                  alt="Profile"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    objectFit: "cover",
                    position: "relative",
                    top: "10px",
                  }}
                />
              ) : (
                <AccountCircleIcon
                  sx={{ fontSize: 30, position: "relative", top: "10px" }}
                />
              )}
            </Box>
            <Box>{params?.row?.fullName || "N/A"}</Box>
          </Box>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 350,
        renderCell: (params) => <Box>{params?.row?.email || "N/A"}</Box>,
      },
      {
        field: "phone_number",
        headerName: "Phone",
        width: 200,
        renderCell: (params) => <Box>{params?.row?.phone || "N/A"} </Box>,
      },
      {
        field: "role",
        headerName: "Role",
        width: 150,
        renderCell: (params) => <Box>{params?.row?.role || "N/A"} </Box>,
      },
      {
        field: "view",
        headerName: "View",
        width: 100,
        renderCell: (_params) => (
          <Tooltip title="View User Detail" arrow>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        ),
      },
      {
        field: "delete",
        headerName: "Delete",
        width: 100,
        renderCell: (_params) => (
          <Tooltip title="Delete User" arrow>
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteDialog(_params?.row?.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    []
  );

  return (
    <UsersContainer>
      <Toaster position="top-right" />
      <UserHeader>
        <SectionTitle>Users</SectionTitle>
        <Box
          sx={{
            display: "flex",
            gap: "15px",
            width: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SearchBar>
            <Search size={20} />
            <input placeholder="Search by Email or Name" />
          </SearchBar>
          <AddUserDialog open={addUser} onClose={() => setAddUser(false)} />
          <Button onClick={() => setAddUser(true)}>Add User</Button>
        </Box>
      </UserHeader>

      <Box sx={{ height: "500px", overflow: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <UserTable>
            <CustomDataTable
              columns={columns}
              rows={rows}
              pageSizeOptions={[15, 10, 5]}
              enableCheckboxSelection={false}
            />
          </UserTable>
        )}
      </Box>

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleDeleteUser}
        title="Delete User?"
        message="Are you sure you want to delete this user?"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </UsersContainer>
  );
};

export default Users;
