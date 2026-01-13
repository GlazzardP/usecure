import { useState } from "react";
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
import { GET_COURSES } from "../../graphql/queries";
import { UPDATE_COURSE_RESULT } from "../../graphql/mutations";
import type { SelectedCourse } from "../../types";

const EditUserCourseResultModal = ({
  open,
  onClose,
  resultId,
  initialCourseName,
  initialScore,
}: {
  open: boolean;
  onClose: () => void;
  resultId: string;
  initialCourseName: string;
  initialScore: number;
}) => {
  const { data, loading: coursesLoading } = useQuery(GET_COURSES);
  const [updateCourseResult, { loading }] = useMutation(UPDATE_COURSE_RESULT);

  const [courseName, setCourseName] = useState(initialCourseName);
  const [score, setScore] = useState<number>(initialScore);
  const [error, setError] = useState("");

  console.log({ courseName, score });

  const handleUpdateResult = async () => {
    try {
      await updateCourseResult({
        variables: {
          id: resultId,
          name: courseName,
          score,
        },
      });
      onClose();
    } catch (err) {
      console.error({err});
      
      setError(
        "We couldn't update the course result at this time. Please try again."
      );
    }
  };

  if (coursesLoading) return null;

  const courses = data?.courseResults ?? [];

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card elevation={0}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Update Result
          </Typography>

          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={courseName}
                label="Course"
                onChange={(e: SelectChangeEvent) =>
                  setCourseName(e.target.value)
                }
              >
                {courses.map((course: SelectedCourse) => (
                  <MenuItem key={course.id} value={course.name}>
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

        {error && (
          <Typography color="error" sx={{ px: 4, pt: 2 }}>
            {error}
          </Typography>
        )}

        <CardActions sx={{ p: 3, justifyContent: "flex-end" }}>
          <Button variant="outlined" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpdateResult}
            disabled={loading || !courseName}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default EditUserCourseResultModal;
