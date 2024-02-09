import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputMask } from "@react-input/mask";
import axios from "axios";
import Modal from "./Modal";
import styles from "./styles.scss";
import { AlertSnackbar } from "./AlertSnackbar";

const App = () => {
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);
  const [data, setData] = useState(null);
  console.log(isOpenSnackbar);
  console.log(data);
  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Enter your name"),
          email: Yup.string()
            .email("Wrong email format")
            .required("Enter your email"),
          phone: Yup.string().required("Enter your phone number"),
          message: Yup.string().required("Enter your message"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post("http://localhost:9090/api/registration", values)
            .then((response) => {
              console.log(response.data);
              setIsOpenSnackbar(true);
              setData(response.data);
              resetForm();
            })
            .catch((error) => {
              setIsOpenSnackbar(true);
              console.error(error.response.data);
              setData(error.response.data);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.feedbackForm}>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles.error}
            />

            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.error}
            />

            <Field name="phone">
              {({ field }) => (
                <InputMask
                  {...field}
                  mask="+375 (__) ___-__-__"
                  replacement={{ _: /\d/ }}
                  showMask
                  placeholder="Phone number"
                  className={styles.input}
                />
              )}
            </Field>
            <ErrorMessage
              name="phone"
              component="div"
              className={styles.error}
            />

            <Field
              as="textarea"
              name="message"
              placeholder="Message"
              className={styles.textarea}
            />
            <ErrorMessage
              name="message"
              component="div"
              className={styles.error}
            />

            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </Form>
        )}
      </Formik>
      <Modal />
      <AlertSnackbar
        isOpen={isOpenSnackbar}
        onClose={() => setIsOpenSnackbar(false)}
        message={data?.message || ""}
        status={data?.status || ""}
      />
    </div>
  );
};

export default App;
