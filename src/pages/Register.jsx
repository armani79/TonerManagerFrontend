import api from "../services/api";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object({
   email: Yup.string()
      .email("Invalid email")
      .matches(/@schools\.nyc\.gov$/, "Must use a @schools.nyc.gov email")
      .required("Required"),

   password: Yup.string().min(6, "Minimum 6 characters").required("Required"),

   confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
});

export default function Register() {
   const navigate = useNavigate();

   async function handleRegister(values, { setSubmitting, setErrors }) {
      try {
         const res = await api.post("/register", values);

         localStorage.setItem("token", res.data.token);

         navigate("/inventory");
      } catch (error) {
         if (error.response) {
            setErrors({ email: error.response.data.error });
         }
      } finally {
         setSubmitting(false);
      }
   }

   return (
      <div style={{ maxWidth: 400, margin: "auto", padding: "1rem" }}>
         <h2>Register</h2>

         <Formik
            initialValues={{ email: "", password: "", confirm: "" }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
         >
            {({ errors, touched, handleChange, values }) => (
               <Form>
                  <TextField
                     label="Email"
                     name="email"
                     value={values.email}
                     fullWidth
                     margin="normal"
                     onChange={handleChange}
                     error={touched.email && Boolean(errors.email)}
                     helperText={touched.email && errors.email}
                  />

                  <TextField
                     label="Password"
                     name="password"
                     type="password"
                     value={values.password}
                     fullWidth
                     margin="normal"
                     onChange={handleChange}
                     error={touched.password && Boolean(errors.password)}
                     helperText={touched.password && errors.password}
                  />

                  <TextField
                     label="Confirm Password"
                     name="confirm"
                     type="password"
                     value={values.confirm}
                     fullWidth
                     margin="normal"
                     onChange={handleChange}
                     error={touched.confirm && Boolean(errors.confirm)}
                     helperText={touched.confirm && errors.confirm}
                  />

                  <Button
                     type="submit"
                     variant="contained"
                     fullWidth
                     style={{ marginTop: "1rem" }}
                  >
                     Register
                  </Button>

                  <Button
                     type="button"
                     variant="text"
                     fullWidth
                     style={{ marginTop: "0.5rem" }}
                     onClick={() => navigate("/login")}
                  >
                     Already have an account? Login
                  </Button>
               </Form>
            )}
         </Formik>
      </div>
   );
}
