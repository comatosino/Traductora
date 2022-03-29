import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import { useAppDispatch } from "../../store/hooks";
import { register, login } from "../../store/userSlice/thunks";
import theme from "../../themes/theme";

const CLEAR = {
  username: "",
  password: "",
  confirmPassword: "",
};

enum Form {
  LOGIN,
  REGISTER,
}

const Auth: React.FC<{}> = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [formType, setFormType] = useState(Form.LOGIN);
  const [formData, setFormData] = useState(() => CLEAR);

  const clearFormInputs = () => setFormData(() => CLEAR);

  const handleFormInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value,
    };
    setFormData(() => newData);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formData.username.length || !formData.password.length) return;

    const credentials = {
      username: formData.username,
      password: formData.password,
    };

    switch (formType) {
      case Form.LOGIN:
        dispatch(login(credentials));
        break;
      case Form.REGISTER:
        if (formData.password !== formData.confirmPassword) return;
        dispatch(register(credentials));
        break;
      default:
        throw new Error("Error submitting form");
    }
    clearFormInputs();
  };

  return (
    <>
      <Stack
        position={"absolute"}
        left={0}
        right={0}
        top={0}
        bgcolor={theme.palette.secondary.main}
        height="10vh"
        alignItems="center"
        justifyContent={"center"}
      >
        <Typography
          fontSize={24}
          fontWeight={800}
          color={"rgba(0, 0, 0, 0.87)"}
        >
          <strong>Welcome to Traductora!</strong>
        </Typography>
        <Typography color={"rgba(0, 0, 0, 0.87)"}>
          A speech-to-speech language translation app
        </Typography>
      </Stack>

      <Stack
        height={500}
        width={1}
        padding={2}
        justifyContent={"space-between"}
      >
        <Box>
          <Stack alignItems={"center"}>
            <Avatar>
              <LockIcon />
            </Avatar>
            <Typography padding={3}>{Form[formType]}</Typography>
          </Stack>

          <form onSubmit={handleFormSubmit}>
            <Stack spacing={2} width={1}>
              <TextField
                type="text"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleFormInputChange}
                required
              />

              <TextField
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleFormInputChange}
                required
              />

              {formType === Form.REGISTER && (
                <TextField
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormInputChange}
                  required
                />
              )}

              <Box textAlign={"center"} paddingTop={3}>
                <Button type="submit" variant="contained" fullWidth>
                  {Form[formType]}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>

        {formType === Form.LOGIN && (
          <Button onClick={() => setFormType(Form.REGISTER)} fullWidth>
            {`Don't have an account? ${Form[Form.REGISTER]}`}
          </Button>
        )}

        {formType === Form.REGISTER && (
          <Button onClick={() => setFormType(Form.LOGIN)} fullWidth>
            {`Already have an account? ${Form[Form.LOGIN]}`}
          </Button>
        )}
      </Stack>
    </>
  );
};

export default Auth;
