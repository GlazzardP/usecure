import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { Delete, Edit, PersonAdd } from "@mui/icons-material";
import { useQuery, useMutation } from "@apollo/client";
import { useLocation, useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import EditUserCourseResultModal from "../../components/Modals/EditUserCourseResultModal";
import CreateUserCourseResultModal from "../../components/Modals/CreateUserCourseResultModal";
import DeleteUserCourseResultModal from "../../components/Modals/DeleteUserCourseResultModal";
import type { SelectedCourse } from "../../types";
import { GET_COURSE_RESULTS_BY_USER, GET_USER_BY_ID } from "../../graphql/queries";
import { UPDATE_USER } from "../../graphql/mutations";


export const UserDetailsPage = () => {
  const { userId } = useParams();
  const location = useLocation();
  const preloadedUser = location.state?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse>({
    name: "",
    score: 0,
    id: "",
  });
  const [showDeleteCourseResultModal, setShowDeleteCourseResultModal] =
    useState(false);
  const [showEditCourseResultModal, setShowEditCourseResultModal] =
    useState(false);

  const [showAddResultModal, setShowAddResultModal] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { data, loading, error } = useQuery(GET_USER_BY_ID, {
    variables: { id: userId },
    fetchPolicy: "cache-and-network",
  });

  const { data: userResults } = useQuery(GET_COURSE_RESULTS_BY_USER, {
    variables: { userId },
  });

  const [updateUser, { loading: updateUserLoading }] =
    useMutation(UPDATE_USER);

  const handleSaveUpdatedUser = async () => {
    await updateUser({
      variables: {
        id: user.id,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
      },
    }).then((res) => { 
      
    }).catch((err) => { 
      console.error({err});
    })

    setIsEditing(false);
  };

  const user = data?.user ?? preloadedUser;

  useEffect(() => {
    if (isEditing && user) {
      setForm({
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: user.email ?? "",
      });
    }
  }, [isEditing, user]);

  const handleChange =
    (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  if (loading) return <p>Loading...</p>;
  if (error || !user) return <p>Error loading user</p>;

  const handleEditResultModal = (result: SelectedCourse) => {
    setSelectedCourse({
      name: result.name,
      score: result.score,
      id: result.id,
    });
    setShowEditCourseResultModal(true);
  };

  const handleDeleteResultModal = (result: SelectedCourse) => {
    setSelectedCourse({
      name: result.name,
      score: result.score,
      id: result.id,
    });
    setShowDeleteCourseResultModal(true);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Header />

        <Box p={4}>
          <Typography variant="h4" fontWeight={800} mb={3}>
            {user.firstName} {user.lastName}
          </Typography>

          <Grid container spacing={4}>
            <Grid item width={"45%"}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                User Details
              </Typography>

              <Stack spacing={3}>
                <TextField
                  label="First name"
                  value={isEditing ? form.firstName : user.firstName}
                  onChange={handleChange("firstName")}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="Last name"
                  value={isEditing ? form.lastName : user.lastName}
                  onChange={handleChange("lastName")}
                  disabled={!isEditing}
                  fullWidth
                />

                <TextField
                  label="Email"
                  value={isEditing ? form.email : user.email}
                  onChange={handleChange("email")}
                  disabled={!isEditing}
                  fullWidth
                />

                {!isEditing ? (
                  <Button
                    variant="contained"
                    onClick={() => setIsEditing(true)}
                    sx={{ alignSelf: "flex-end" }}
                  >
                    Edit
                  </Button>
                ) : (
                  <Stack direction="row" spacing={2} alignSelf="flex-end">
                    <Button
                      variant="outlined"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSaveUpdatedUser}>
                      Save
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Grid>

            <Grid item width={"45%"}>
              <Typography variant="h6" fontWeight={700} mb={3}>
                Course Results
              </Typography>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {userResults?.courseResultsByUser?.map((result) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.score}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => handleEditResultModal(result)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteResultModal(result)}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  startIcon={<PersonAdd />}
                  onClick={() => setShowAddResultModal(true)}
                >
                  Add Course Result
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {showAddResultModal && (
        <CreateUserCourseResultModal
          open
          onClose={() => setShowAddResultModal(false)}
          userId={userId}
        />
      )}

      {showDeleteCourseResultModal && (
        <DeleteUserCourseResultModal
          open
          onClose={() => setShowDeleteCourseResultModal(false)}
          courseName={selectedCourse.name}
          resultId={selectedCourse.id}
        />
      )}

      {showEditCourseResultModal && (
        <EditUserCourseResultModal
          open
          onClose={() => setShowEditCourseResultModal(false)}
          resultId={selectedCourse.id}
          initialCourseName={selectedCourse.name}
          initialScore={selectedCourse.score}
        />
      )}
    </>
  );
};

export default UserDetailsPage;
