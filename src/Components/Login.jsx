import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";

function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleLogIn = (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log(email, pass);
    // add validation

    if (pass.length < 6) {
      setError("Password should be 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setError("Your password must contain at least one uppercase letter");
      return;
    }
    // logIn
    signInWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        console.log(res);
        setSuccess("login Done");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleLogIn}>
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
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                type="password"
                id="password"
                required
              />
            </div>
            <input
              className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              type="submit"
              value="LogIn"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
