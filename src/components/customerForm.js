import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { GET_CUSTOMERS } from "./customers";

const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $FullName: String
    $FirstName: String
    $SecondName: String
    $LastName: String
  ) {
    CreateCustomer(
      FullName: $FullName
      FirstName: $FirstName
      SecondName: $SecondName
      LastName: $LastName
    )
  }
`;

export function CustomersForm() {
  const [addCustomer, { data }] = useMutation(ADD_CUSTOMER, {
    refetchQueries: [{ query: GET_CUSTOMERS }]
  });
  console.log(data);

  return (
    <div id="customerForm">
      <h3>ADD HUMAN</h3>
      <Formik
        initialValues={{
          FirstName: "",
          SecondName: "",
          LastName: "",
          Email: ""
        }}
        validationSchema={Yup.object().shape({
          FirstName: Yup.string().required("First Name is required"),
          SecondName: Yup.string().required("Second Name is required"),
          LastName: Yup.string().required("Last Name is required"),
          Email: Yup.string()
            .email("Email is invalidd")
            .required("Email is required")
        })}
        onSubmit={(fields, { resetForm }) => {
          addCustomer({
            variables: {
              ...fields,
              FullName: `${fields.FirstName}  ${fields.SecondName}  ${fields.LastName}`
            }
          });
          resetForm();
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <Field
              label="First Name"
              name="FirstName"
              type="text"
              component={TextField}
              margin="none"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Second Name"
              name="SecondName"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Last Name"
              name="LastName"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Email"
              name="Email"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Button type="submit" variant="outlined" color="primary">
              Register
            </Button>{" "}
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Form>
        )}
      ></Formik>
    </div>
  );
}
