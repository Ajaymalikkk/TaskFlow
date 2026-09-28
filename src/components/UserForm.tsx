import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { User } from "../services/userService";

type UserFormValues = {
  name: string;
  email: string;
};

type UserFormProps = {
  editUser: User | null;
  onAdd: (user: UserFormValues) => void;
  onUpdate: (user: UserFormValues) => void;
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
});

function UserForm({
  editUser,
  onAdd,
  onUpdate,
}: UserFormProps) {
  const initialValues: UserFormValues = {
    name: editUser ? editUser.name : "",
    email: editUser ? editUser.email : "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={(values, { resetForm }) => {
        if (editUser) {
          onUpdate(values);
        } else {
          onAdd(values);
        }

        resetForm();
      }}
    >
      <Form>
        <div>
          <Field
            type="text"
            name="name"
            placeholder="Enter name"
          />

          <ErrorMessage
            name="name"
            component="p"
          />
        </div>

        <div>
          <Field
            type="email"
            name="email"
            placeholder="Enter email"
          />

          <ErrorMessage
            name="email"
            component="p"
          />
        </div>

        <button type="submit">
          {editUser ? "UPDATE" : "ADD"}
        </button>
      </Form>
    </Formik>
  );
}

export default UserForm;