import React from "react";
import { useFormik } from "formik";
import { Auth } from "aws-amplify";

async function signUp(values) {
  try {
    const { username, password } = values;
    const { user } = await Auth.signUp({
      username: username,
      password: password,
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(user);
    alert(JSON.stringify(user, null, 2));
  } catch (error) {
    console.log("error signing up:", error);
  }
}
function App() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      // alert(JSON.stringify(values, null, 2));
      return await signUp(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="username">Username (Email Address)</label>
      <input
        id="username"
        name="username"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.username}
      />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
