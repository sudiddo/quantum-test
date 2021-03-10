import PostLogin from "api/postLogin";
import LoginForm from "components/atoms/forms/loginForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { StoreStateType } from "store";
import { addUserToken } from "store/actions/user";

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state: StoreStateType) => state.user.token);

  if (token) {
    history.replace("/users");
  }

  const onSubmit = async () => {
    setError("");
    setIsLoading(true);
    return await PostLogin(email, password).then((result) => {
      setIsLoading(false);
      console.log("result", result);
      dispatch(addUserToken(result.token));
      result.error ? setError(result.error) : setError("");
      history.push("/users");
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Don't have an account? "}
            <a href="#" className="text-blue-500">
              Sign Up
            </a>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm
            onChangeEmail={(value) => setEmail(value)}
            onChangePassword={(value) => setPassword(value)}
            email={email}
            password={password}
            error={error}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;
