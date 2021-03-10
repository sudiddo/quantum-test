import PostRegister from "api/postRegister";
import SignUpForm from "components/atoms/forms/signupForm";
import { useState } from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onSubmit = async () => {
    setError("");
    setIsLoading(true);
    setRegisterSuccess(false);
    return await PostRegister(email, password).then((result) => {
      setIsLoading(false);
      console.log("result", result);
      result.error ? setError(result.error) : setError("");
      result.token ? setRegisterSuccess(true) : setRegisterSuccess(false);
    });
  };
  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl leading-9 font-   extrabold text-gray-900">
            Sign up
          </h2>
          <div className="mt-2 text-center flex flex-row justify-center text-md text-gray-600">
            already have an account?
            <Link to="/quantum-test">
              <p className="text-blue-500 ml-1">Log in</p>
            </Link>
          </div>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm
            onChangeEmail={(value) => setEmail(value)}
            onChangePassword={(value) => setPassword(value)}
            email={email}
            password={password}
            error={error}
            isLoading={isLoading}
            onSubmit={onSubmit}
          />
        </div>
        {registerSuccess ? (
          <div className="mt-5 text-center">
            Register success,{" "}
            <span className="font-bold cursor-pointer">
              <Link to="/quantum-test">click here to login!</Link>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default SignUpPage;
