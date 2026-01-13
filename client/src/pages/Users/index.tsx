import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  Stack,
} from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import { PersonAdd, Delete, MoreVert } from "@mui/icons-material";

import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { CreateUserModal } from "../../components/Modals/CreateUserModal";
import { GET_USERS } from "../../graphql/queries";
import { DeleteUserModal } from "../../components/Modals/DeleteUserModal";

interface SelectedUser {
  firstName: string;
  lastName: string;
  id: string;
}

export const UsersPage = () => {
  const [showCreateUserModal, setShowCreateUserModal] =
    useState<boolean>(false);
  const [showDeleteUserModal, setShowDeleteUserModal] =
    useState<boolean>(false);
  const [chosenUser, setChosenUser] = useState<SelectedUser>({
  firstName: "",
  lastName: "",
  id: "",
  });

  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const navigateToUserDetails = (user: SelectedUser) => {
    navigate(`/course-results/${user.id}`, { state: { user } });
  };

  const handleDeleteUser = (chosenUser: SelectedUser) => { 
    setChosenUser(chosenUser)
    setShowDeleteUserModal(true)
  }

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "User",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          onClick={() => navigateToUserDetails(params.row)}
          m={1}
        >
          <Avatar />
          <Typography
            fontWeight={600}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {params.row.firstName} {params.row.lastName}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "email",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "courseCount",
      headerName: "Courses Completed",
      flex: 0.7,
      renderCell: (params) => (
        <Chip label={params.row.courseResults.length} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      align: "right",
      headerAlign: "right",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteUser(params.row)}
          >
            <Delete />
          </IconButton>
          <IconButton size="small">
            <MoreVert />
          </IconButton>
        </>
      ),
    },
  ];

  const handleCreateNewUser = () => setShowCreateUserModal(true);
  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        <Header />

        <Box p={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ md: "center" }}
            mb={2}
          >
            <Box>
              <Typography variant="h4" fontWeight={800}>
                User Management
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={handleCreateNewUser}
              sx={{ mt: { xs: 2, md: 0 } }}
            >
              Create New User
            </Button>
          </Stack>

          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="caption" color="text.secondary">
                    Total Users
                  </Typography>
                  <Typography variant="h5" fontWeight={700}>
                    {data.usersCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <DataGrid
            rows={data.users}
            columns={columns}
            getRowId={(row) => row.id}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "grey.100",
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover",
              },
              "& .MuiDataGrid-row": {
                alignItems: "center",
                alignContent: "center",
              },
            }}
          />
        </Box>
      </Box>

      {showCreateUserModal && (
        <CreateUserModal
          open={showCreateUserModal}
          onClose={() => setShowCreateUserModal(false)}
        />
      )}

      {showDeleteUserModal && (
        <DeleteUserModal
          open={showDeleteUserModal}
          onClose={() => setShowDeleteUserModal(false)}
          name={chosenUser.firstName}
          userId={chosenUser.id}
        />
      )}
    </>
  );
};

export default UsersPage;
