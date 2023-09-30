import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { useState } from "react";

function Signup() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSingUp = (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log(typeof pass);
    if (pass.length < 6) {
      setError("password should be 6 cereckter or longer");
      return;
    } else if (!/[A-Z]/.test(pass)) {
      setError("your pass have to Upper case");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, pass)
      .then((res) => setSuccess("User Creat Done"))
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
          <form onSubmit={handleSingUp}>
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
            <div className="mb-4">
              <label
                className="block mb-1 text-sm font-medium text-gray-600"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
                type={showPass ? "password" : "text"}
                id="password"
                required
                name="password"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="bg-slate-500"
              >
                Show Pass
              </span>
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
