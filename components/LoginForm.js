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
    <div>
      {/* <Box
        className="grid grid-cols-1"
        component="form"
        noValidate
        autoComplete="off"
      >
        <h2 className="text-xl text-blue-800">{title}</h2>
        <div className="grid grid-col-1 mt-4 mb-4 ">
          <TextField
            required
            id="standard-required"
            label="Username"
            variant="standard"
            {...register("username")}
          />
          <TextField
            id="standard-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="standard"
            {...register("password", { required: true })}
          />
          {(errors.password || errors.username) && (
            <span className="text-sm text-gray-500">
              Username and Password fields are required
            </span>
          )}
        </div>
        <Button onClick={handleSubmit(onSubmit)}>Sign In</Button>
        {signUp && (
          <Button variant="outline" onClick={onSignUp}>
            Sign Up
          </Button>
        )}
      </Box> */}

      {/* my code start */}
      <section class="">
        <div class="px-4 py-5 mx-auto border-2 border-orange-600 rounded-xl w-1/3">
          <div class="max-w-lg mx-auto">
            <div class="text-center mb-8">
              <h2 class="text-3xl md:text-4xl font-extrabold mb-4">Merchant Storefront</h2>
              <h2 class="text-lg md:text-lg font-extrabold mb-2">{title}</h2>
            </div>
            <form action="">
              <div class="mb-6">
                <label class="block mb-2 font-extrabold" for="">
                  Username *
                </label>
                <input
                  className="inline-block w-full py-4 px-6 mb-6 leading-6 text-black font-extrabold border-3 shadow rounded"
                  id="name"
                  name="name"
                  type="text"
                  autocomplete="name"
                  required
                  {...register("username")}
                />
              </div>
              <div class="mb-6">
                <label class="block mb-2 font-extrabold" for="">
                  Password
                </label>
                <input
                  className="inline-block w-full py-4 px-6 mb-6 text-lg leading-6 text-black font-extrabold border-3 shadow rounded"
                  id="name"
                  name="name"
                  type="password"
                  autocomplete="name"
                  required
                  {...register("password", { required: true })}
                />
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                class="border-2 border-orange-600 inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white hover:text-orange-600 font-extrabold bg-orange-600 hover:bg-slate-100 border-3 shadow rounded transition duration-200"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
    // my code ends
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
