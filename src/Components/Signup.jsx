import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const photoUrl =
  "https://scontent.fdac138-1.fna.fbcdn.net/v/t39.30808-6/275602694_3074415072829048_1542853174636978655_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeGbJg8C7RQkFHFTLmjosOiq-xBSMq4EWcn7EFIyrgRZyRJGZt0P3Msp7Cg9tErUeWCaHfNoB56Y2gXKmm68YBm8&_nc_ohc=IAMtvEbNNPcAX8fFf1l&_nc_ht=scontent.fdac138-1.fna&oh=00_AfAK0afGBLb25QlmJ4s7LMQXIk-Dct8BcLd_U8o9UZlAEQ&oe=651E1F80";

function Signup() {
  // State variables
  const [error, setError] = useState(""); // State for error messages
  const [success, setSuccess] = useState(""); // State for success messages
  const [showPass, setShowPass] = useState(false); // State for password visibility
  const [termsChecked, setTermsChecked] = useState(false); // State for checkbox

  // Function to handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    setError(""); // Clear any previous errors
    setSuccess(""); // Clear any previous success messages

    const email = e.target.email.value; // Get email from form
    const pass = e.target.password.value; // Get password from form
    const name = e.target.displayName.value; // Get display name from form

    // Check if terms are accepted
    if (!termsChecked) {
      setError("Please accept the terms and conditions.");
    } else if (pass.length < 6) {
      // Check password length
      setError("Password should be 6 characters or longer.");
    } else if (!/[A-Z]/.test(pass)) {
      // Check uppercase requirement
      setError("Your password must contain at least one uppercase letter.");
    } else {
      // If all checks pass, attempt user creation
      createUserWithEmailAndPassword(auth, email, pass)
        .then((res) => {
          // Set success message
          //update profile
          updateProfile(res.user, {
            displayName: name,
            photoURL: photoUrl,
          }).then(() => console.log("profile Update"));
          // Send verification email
          sendEmailVerification(res.user)
            .then(() => {
              setSuccess("Please verify your account");
              console.log(res.user);
            })
            .catch();
        })
        .catch((err) => {
          setError(err.message); // Set error message in case of failure
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Signup</h2>
        {error && <p className="text-red-500">{error}</p>}{" "}
        {/* Display error message */}
        {success && <p className="text-green-500">{success}</p>}{" "}
        {/* Display success message */}
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
            <label
              className="block mb-1 text-sm font-medium text-gray-600"
              htmlFor="displayName"
            >
              Display Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
              type="text"
              id="displayName"
              name="displayName"
              required
            />
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
          <p className="mb-8">
            Already Have Account Please
            <Link to="/login" className="text-amber-800">
              Login
            </Link>
          </p>
          <input
            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="submit"
            value="Signup"
          />
        </form>
      </div>
    </div>
  );
}

export default Signup;
