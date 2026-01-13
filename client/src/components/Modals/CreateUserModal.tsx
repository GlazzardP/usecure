import { useState } from "react";
import { useMutation } from "@apollo/client";

import {
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Stack,
  InputAdornment,
  Divider,
  Dialog,
} from "@mui/material";

import { Person, Mail } from "@mui/icons-material";
import { CREATE_USER } from "../../graphql/mutations";
import { GET_USERS } from "../../graphql/queries";

export const CreateUserModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [createUserError, setCreateUserError] = useState("");

  const [createUser] = useMutation(CREATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleCreateUser = async () => {
    await createUser({
      variables: {
        firstName,
        lastName,
        email,
      },
    })
      .then((res) => {
        console.info(res);
        onClose();
      })
      .catch((err) => {
        console.error({ err });
        setCreateUserError(
          "We couldn't create a new user at this time. Please try again later"
        );
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Card elevation={0}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            Create New User
          </Typography>
          <Typography color="text.secondary" mt={1} mb={4}>
            Grant system access by filling out the profile details and selecting
            a role.
          </Typography>

          <Stack spacing={3}>
            <TextField
              label="Full Name"
              placeholder="e.g. John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
            <TextField
              label="Last Name"
              placeholder="e.g Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />

            <TextField
              label="Email Address"
              placeholder="john@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Stack>
        </CardContent>

        <Divider />

        {Boolean(createUserError) && (
          <Typography color="warning">{createUserError}</Typography>
        )}

        <CardActions sx={{ p: 3, justifyContent: "flex-end" }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!firstName || !lastName || !email}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};
