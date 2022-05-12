import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function LoginForm(props) {
  const { title, onSignIn, onSignUp, signUp } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = onSignIn;

  console.debug(watch("username"), watch("password"));

  return (
    <Box className="grid grid-cols-1" component="form" noValidate autoComplete="off">
      <h2 className="text-xl text-blue-800">{title}</h2>
      <div className="grid grid-col-1 mt-4 mb-4 ">
        <TextField required id="standard-required" label="Username" variant="standard" {...register("username")} />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
          {...register("password", { required: true })}
        />
        {(errors.password || errors.username) && (
          <span className="text-sm text-gray-500">Username and Password fields are required</span>
        )}
      </div>
      <Button onClick={handleSubmit(onSubmit)}>Sign In</Button>
      {signUp && (
        <Button variant="outline" onClick={onSignUp}>
          Sign Up
        </Button>
      )}
    </Box>
  );
}

export default LoginForm;
LoginForm.propTypes = {
  title: PropTypes.string,
  onSignUp: PropTypes.func,
  onSignIn: PropTypes.func,
  signUp: PropTypes.bool,
};

LoginForm.defaultProps = {
  title: "Login",
  signUp: false,
  onSignIn: (data) => {
    const { username, password } = data;
    alert(`TODO\nUsername: ${username}\nPassword: ${password}`);
  },
  onSignUp: () => {
    alert("TODO Sign Up");
  },
};
