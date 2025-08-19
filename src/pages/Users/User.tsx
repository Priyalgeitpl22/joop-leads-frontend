import {
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  MenuItem,
  Link,
  Typography,
  Menu,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {toast } from "react-hot-toast";
import {
  FilterIcon,
  UserHeader,
  UsersContainer,
  UserTable,
} from "./User.styled";
import { Button2, SectionTitle } from "../../styles/layout.styled";
import { SearchBar } from "../../components/Header/header.styled";
import { Search } from "lucide-react";
import { CustomDataTable } from "../../assets/Custom/customDataGrid";
import { Button } from "../../styles/global.styled";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { DeleteIcon } from "../Contacts/ContactTable.styled";
import AddUserDialog from "./AddUser/AddUserDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import {
  deleteUser,
  filterUsers,
  getAllUsers,
  SearchUsers,
  updateUserDetails,
} from "../../redux/slice/userSlice";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { SelectChangeEvent } from "@mui/material";import ConfirmDeleteDialog from "../ConfirmDeleteDialog";
import { formatDateTime } from "../../utils/utils";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import EditUserDialog from "./EditUser/EditUserRoleDialogue";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import ActiveFilters from "../Email-Campaign/ActiveFilters";


const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { loading } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.user);

  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    role: "",
  });
  const filterOptions: Record<"Role", string[]> = {
    Role: ["Admin", "User"],
  };

  const [dateFilters, setDateFilters] = useState<{ 
        startDate: Dayjs | null; 
        endDate: Dayjs | null; 
        [key: string]: string | Dayjs | null; 
      }>({
        startDate: null,
        endDate: null,
    
      });
   
      const [openEditDialog, setOpenEditDialog] = useState(false);
      const [editUserData, setEditUserData] = useState<any>(null);
      

  const handleOpenEditDialog = (userData: any) => {
    setEditUserData(userData);
    setOpenEditDialog(true);
  };
      
  const handleSaveEdit = async (updatedUserData: {
    id: string;
    role: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append("id", updatedUserData.id);
      formData.append("role", updatedUserData.role);

      const response = await dispatch(
        updateUserDetails({ userData: formData })
      ).unwrap();

      if (response?.code === 200) {
        toast.success(response?.message ||"User details updated successfully!");
        handleCloseEditDialog()
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to update user details.");
    } finally {
      setOpenEditDialog(false);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditUserData(null);
  };
            
  const handleFilterChange =
    (field: keyof typeof filters) => (event: SelectChangeEvent<string>) => {
      setFilters((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleDateChange =
    (field: "startDate" | "endDate") => (value: Dayjs | null) => {
      setDateFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleClearFilters = () => { 
    setFilters({ role: ""});
    setDateFilters({ startDate: null, endDate: null });
    dispatch(getAllUsers())   
    .unwrap()             
    .then((response) => {
      setRows(response.data);       
      setFilteredRows(response.data); 
      handleMenuClose()
    })
    .catch((error) => {
      console.error("Error fetching users:", error);  
      toast.error("Failed to fetch users.");
    });
  };

  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<{
      status: string;
      startDate: string | null;
      endDate: string | null;
    }>({
      status: "",
      startDate: null,
      endDate: null,
    });

  useEffect(() => {
    dispatch(getAllUsers())
      .unwrap()
      .then((response) => {
        setRows(response.data);
        setFilteredRows(response.data);
      })
      .catch(() => {});
  }, [dispatch, addUser,editUserData]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRows(rows);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      dispatch(SearchUsers({ query: searchTerm, orgId: user?.orgId || "" }))
        .unwrap()
        .then((response) => setFilteredRows(response))
        .catch(() => setFilteredRows([]));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, dispatch, rows, user?.orgId]);

  const handleOpenDeleteDialog = (id: string) => {
    setSelectedUser(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedUser(null);
    setOpenDeleteDialog(false);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) {
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
      toast.error(error?.message || "Error occurred while deleting the user.");
      setRows(rows);
    }
  };


  const handleApplyFilter = async () => {
    try {
      const roleStatus = filters.role;

      const startDateForApi = dateFilters.startDate
        ? dateFilters.startDate.format("YYYY-MM-DD")
        : "";
      const endDateForApi = dateFilters.endDate
        ? dateFilters.endDate.format("YYYY-MM-DD")
        : "";

      const filterData = await dispatch(
        filterUsers({
          query: roleStatus,
          startDate: startDateForApi,
          endDate: endDateForApi,
        })
      );

      setAppliedFilters({
        status: roleStatus,
        startDate: startDateForApi || null,
        endDate: endDateForApi || null,
      });

      setFilteredRows(filterData.payload.data);
      handleMenuClose();
    } catch (error) {
      console.error("Error applying filter:", error);
    }
  };

  const columns: GridColDef[] = useMemo(() => {
    const baseColumns: GridColDef[] = [
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
        renderCell: (params) => {
          const role = params?.row?.role;
          const formattedRole = role
            ? role.charAt(0).toUpperCase() + role.slice(1)
            : "N/A";
          return <Box>{formattedRole}</Box>;
        },
      },
      {
        field: "createdAt",
        headerName: "Uploaded Date",
        width: 150,
        valueGetter: (params: any) => (params ? formatDateTime(params) : "N/A"),
      },
    ];
    
    if (user?.role === "Admin" || user?.role === "admin") {
      baseColumns.push({
        field: "edit",
        headerName: "Edit",
        width: 100,
        renderCell: (params) => (
          <Tooltip title="Edit User" arrow>
            <IconButton
              color="primary"
              onClick={() => handleOpenEditDialog(params.row)}
            >
              <ModeEditOutlineOutlined />
            </IconButton>
          </Tooltip>
        ),
      });

      baseColumns.push({
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
      });
    }
  
    return baseColumns;
  }, [user?.role, handleOpenEditDialog, handleOpenDeleteDialog]);

  const activeFilters = useMemo(
    () => ({
      status: appliedFilters.status,
      startDate: appliedFilters.startDate,
      endDate: appliedFilters.endDate,
    }),
    [appliedFilters]
  );
  
  const handleRemoveFilter = (key: keyof typeof activeFilters) => {
    let newRole = filters.role;
    let newStartDate = dateFilters.startDate;
    let newEndDate = dateFilters.endDate;

    switch (key) {
      case "status":
        newRole = "";
        setFilters((prev) => ({ ...prev, role: "" }));
        break;

      case "startDate":
      case "endDate":
        newStartDate = null;
        newEndDate = null;
        setDateFilters({ startDate: null, endDate: null });
        break;

      default:
        break;
    }

    const startDateForApi = newStartDate
      ? newStartDate.format("YYYY-MM-DD")
      : "";
    const endDateForApi = newEndDate ? newEndDate.format("YYYY-MM-DD") : "";

    const statusForApi = newRole;

    setAppliedFilters({
      status: newRole,
      startDate: startDateForApi || null,
      endDate: endDateForApi || null,
    });

    const allCleared = !newRole && !startDateForApi && !endDateForApi;

    if (allCleared) {
      dispatch(getAllUsers())
        .unwrap()
        .then((res) => {
          setRows(res.data);
          setFilteredRows(res.data);
        });
    } else {
      dispatch(
        filterUsers({
          query: statusForApi,
          startDate: startDateForApi,
          endDate: endDateForApi,
        })
      )
        .unwrap()
        .then((res) => {
          setFilteredRows(res.data);
        });
    }
  };

  return (
    <UsersContainer>
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
            <input
              placeholder="Search by Email or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <Tooltip title="Filter" arrow>
            <FilterIcon onClick={handleMenuOpen}>
              <FilterAltOutlinedIcon />
            </FilterIcon>
          </Tooltip>
          <AddUserDialog open={addUser} onClose={() => setAddUser(false)} />
          <Button onClick={() => setAddUser(true)}>Add User</Button>
        </Box>
      </UserHeader>
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{ "aria-labelledby": "profile-menu-button" }}
        sx={{
          "& .MuiMenu-paper": {
            minWidth: "320px",
            padding: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography fontWeight="bold" fontSize={14}>
            Filter
          </Typography>
          <Link
            href="#"
            underline="hover"
            onClick={handleClearFilters}
            sx={{ color: "var(--theme-color)", fontSize: "14px" }}
          >
            Clear all
          </Link>
        </Box>

        <Box sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start Date *"
              value={dateFilters.startDate}
              onChange={handleDateChange("startDate")}
            />
          </LocalizationProvider>

          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="End Date *"
                value={dateFilters.endDate}
                onChange={handleDateChange("endDate")}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {Object.keys(filterOptions).map((label) => (
          <FormControl key={label} fullWidth sx={{ mt: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={filters[label.toLowerCase() as keyof typeof filters] || ""}
              onChange={handleFilterChange(
                label.toLowerCase() as keyof typeof filters
              )}
              sx={{ background: "white!important", borderRadius: "4px" }}
              label={label}
            >
              {filterOptions[label as keyof typeof filterOptions]?.map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        ))}

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button2 onClick={handleMenuClose} color={""} background={""}>
            Cancel
          </Button2>
          <Button onClick={handleApplyFilter}>Apply</Button>
        </Box>
      </Menu>
      <Box sx={{ background: "var(--input-bg)" }}>
        <ActiveFilters
          filters={activeFilters}
          onRemove={handleRemoveFilter}
          statusLabel="Role"
        />
      </Box>

      <Box sx={{ height: "100%", overflow: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : filteredRows.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            No records found
          </Box>
        ) : (
          <UserTable>
            <CustomDataTable
              columns={columns}
              rows={filteredRows}
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

      <EditUserDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        user={editUserData}
        loading={loading}
        onSave={handleSaveEdit}
      />
    </UsersContainer>
  );
};

export default Users;


