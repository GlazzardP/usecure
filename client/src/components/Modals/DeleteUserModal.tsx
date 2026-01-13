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
import { DELETE_USER } from "../../graphql/mutations";

export const DeleteUserModal = ({
  open,
  onClose,
  name,
  userId,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  userId: string;
}) => {
  const [deleteUserError, setDeleteUserError] = useState<string>("");
  const [deleteUser, { loading }] = useMutation(DELETE_USER, {
    refetchQueries: ["GetUsers"],
  });
  const handleDelete = async () => {
    try {
      await deleteUser({ variables: { id: userId } });
      onClose();
    } catch (err) {
      setDeleteUserError("Error deleting this user. Please try again later.");
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Card elevation={4}>
          <CardContent sx={{ p: 4 }}>
            {loading ? "loading" : null}
            <Typography variant="h5" fontWeight={700}>
              Delete User
            </Typography>
            <Typography color="text.secondary" mt={1} mb={4}>
              Are you sure you want to delete {name}?
            </Typography>
            {Boolean(deleteUserError) && (
              <Typography color="warning">{deleteUserError}</Typography>
            )}
          </CardContent>

          <Divider />

          <CardActions sx={{ p: 3, justifyContent: "flex-end" }}>
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={!userId || Boolean(deleteUserError)}
              onClick={handleDelete}
            >
              Delete User
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Dialog>
  );
};
