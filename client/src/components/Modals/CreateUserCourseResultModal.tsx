import React from "react";
import { useQuery, useMutation } from "@apollo/client";

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  MenuItem,
  Stack,
  InputAdornment,
  Divider,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  Dialog,
} from "@mui/material";

import { Person } from "@mui/icons-material";
import { CREATE_COURSE_RESULT } from "../../graphql/mutations";
import { GET_COURSE_RESULTS_BY_USER, GET_COURSES } from "../../graphql/queries";

const CreateUserCourseResultModal = ({
  open,
  onClose,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  userId: string;
}) => {
  const [selectedCourseId, setSelectedCourseId] = React.useState("");
  const [score, setScore] = React.useState<number | "">("");
  const [addResultError, setAddResultError] = React.useState("");

  const { data, loading: coursesLoading, error } = useQuery(GET_COURSES);

  const [createCourseResult, { loading }] = useMutation(CREATE_COURSE_RESULT, {
    refetchQueries: [
      {
        query: GET_COURSE_RESULTS_BY_USER,
        variables: { userId },
      },
    ],
  });

  if (coursesLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading courses</p>;

  const courses = data.courseResults;

  const handleAddResult = async () => {
    const selectedCourse = courses.find((c) => c.id === selectedCourseId);

    if (!selectedCourse || score === "") return;

    try {
      await createCourseResult({
        variables: {
          name: selectedCourse.name,
          score,
          learnerId: userId,
        },
      });

      onClose();
    } catch {
      setAddResultError(
        "We couldn't create a course result at this time. Please try again later."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card elevation={0}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Add New Result
          </Typography>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                value={selectedCourseId}
                label="Course"
                onChange={(e: SelectChangeEvent) =>
                  setSelectedCourseId(e.target.value)
                }
              >
                {courses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Score"
              type="number"
              value={score}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < 0) val = 0;
                if (val > 100) val = 100;
                setScore(val);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 100 },
              }}
              fullWidth
            />
          </Stack>
        </CardContent>

        <Divider />

        {addResultError && (
          <Typography color="error" sx={{ px: 4, pt: 2 }}>
            {addResultError}
          </Typography>
        )}

        <CardActions sx={{ p: 3, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleAddResult}
            disabled={!selectedCourseId || score === "" || loading}
          >
            Create Result
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default CreateUserCourseResultModal;
