import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object({
   email: Yup.string().email("Invalid email").required("Required"),
   password: Yup.string()
      .min(6, "Password must have at least 6 chars")
      .required("Required"),
});

export default function Login() {
   const navigate = useNavigate();

   // TEMP values while i still work on backend
   function fakeLogin(values) {
      console.log("Login submitted: ", values);
      alert("Login successful!");
      navigate("/inventory");
   }

   return (
      <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
         <div
            style={{
               flex: 1,
               backgroundColor: 'url("/backgroundLogin.jpg")',
               backgroundSize: "cover",
               backgroundPosition: "center",
               backgroundRepeat: "no-repeat",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               padding: 20,
               color: "white",
            }}
         ></div>

         <div
            style={{
               flex: 1.2,
               backgroundColor: "white",
               display: "flex",
               justifyContent: "flex-start",
               alignItems: "center",
               paddingLeft: "80px",
               borderLeft: "1px solid #e0e0e0",
            }}
         >
            <div style={{ width: "350px" }}>
               <Typography variant="h4" gutterBottom>
                  Login
               </Typography>
               <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={fakeLogin}
               >
                  {({ errors, touched, handleChange }) => (
                     <Form>
                        <TextField
                           label="Email"
                           name="email"
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
                           fullWidth
                           margin="normal"
                           onChange={handleChange}
                           error={touched.password && Boolean(errors.password)}
                           helperText={touched.password && errors.password}
                        />
                        <Button type="submit" variant="contained">
                           Login
                        </Button>

                        <Button
                           type="button"
                           variant="text"
                           onClick={() => navigate("/register")}
                        >
                           Need an account? Register
                        </Button>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      </div>
   );
}
