import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import react-icons

function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false); // New state for the checkbox

  const handleSignUp = (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;

    if (!termsChecked) {
      setError("Please accept the terms and conditions.");
      return;
    }

    if (pass.length < 6) {
      setError("Password should be 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setError("Your password must contain at least one uppercase letter");
      return;
    }

    createUserWithEmailAndPassword(auth, email, pass)
      .then((res) => setSuccess("User Created Successfully"))
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Signup</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium text-gray-600"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <label
              className="block mb-1 text-sm font-medium text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            {/* Password input with eye icons */}
            <div className="relative flex items-center mb-4">
              <input
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                type={showPass ? "text" : "password"}
                id="password"
                required
                name="password"
              />
              {/* Show Password icon */}
              {showPass ? (
                <FaEye
                  className="absolute w-6 h-6 text-gray-500 cursor-pointer right-3 top-2"
                  onClick={() => setShowPass(!showPass)}
                />
              ) : (
                <FaEyeSlash
                  className="absolute w-6 h-6 text-gray-500 cursor-pointer right-3 top-2"
                  onClick={() => setShowPass(!showPass)}
                />
              )}
            </div>
            <div className="mb-4">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={termsChecked}
                onChange={() => setTermsChecked(!termsChecked)}
              />
              <label className="ml-2 text-sm text-gray-600" htmlFor="terms">
                I accept the terms and conditions
              </label>
            </div>
            <input
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
              value="Signup"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
