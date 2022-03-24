import { ChangeEventHandler, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { useAppDispatch } from "../../store/hooks";
import { register, login } from "../../store/userSlice/thunks";

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

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
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
    <Stack height={500} width={1} padding={2} justifyContent={"space-between"}>
      <Box>
        <Typography padding={3} textAlign={"center"}>
          {Form[formType]}
        </Typography>

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
  );
};

export default Auth;
