import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
  Divider,
  Dialog,
} from "@mui/material";
import { DELETE_COURSE_RESULT } from "../../graphql/mutations";

const DeleteUserCourseResultModal = ({
  open,
  onClose,
  courseName,
  resultId,
}: {
  open: boolean;
  onClose: () => void;
  courseName: string;
  resultId: string;
}) => {
  const [deleteCourseResultError, setDeleteCourseResultError] = useState("");

  const [deleteCourseResult, { loading }] = useMutation(DELETE_COURSE_RESULT, {
    refetchQueries: ["CourseResultsByUser"],
  });

  const handleDelete = async () => {
    console.log("id here p", resultId);

    try {
      await deleteCourseResult({
        variables: {
          id: resultId,
        },
      });

      onClose();
    } catch (err) {
      console.error({err});
      setDeleteCourseResultError(
        "We couldn't delete this course result. Please try again."
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Card elevation={4}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight={700}>
              Delete Result
            </Typography>

            <Typography color="text.secondary" mt={1} mb={4}>
              Are you sure you want to delete the result for{" "}
              <strong>{courseName}</strong>?
            </Typography>

            {deleteCourseResultError && (
              <Typography color="error">{deleteCourseResultError}</Typography>
            )}
          </CardContent>

          <Divider />

          <CardActions sx={{ p: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting…" : "Delete"}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Dialog>
  );
};

export default DeleteUserCourseResultModal;
