import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Please enter email!").email("Please enter correct email!"),
  password: yup
    .string()
    .required("Please enter password!")
    .min(8, "Password should be equal to or greater than 8!"),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your Name.")
    .min(3, "Name must be 3 characters long.")
    .max(30, "Name is too long."),
  email: yup.string().email("Entered email is invalid !").required("Please enter your email."),
  password: yup
    .string()
    .required("Please enter password.")
    .min(8, "Password must be 8 characters long."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passowords do not match")
    .required("Please enter password again."),
});

export const placeSchema = yup.object().shape({
  title: yup
    .string()
    .required("Please enter Title")
    .min(5, "Title is too short!")
    .max(100, "Title is too long"),
  address: yup
    .string()
    .required("Please enter address")
    .min(5, "Address is too short!")
    .max(500, "Address is too long!"),
  description: yup
    .string()
    .required("Please enter description!")
    .min(5, "Description is too short!")
    .max(1000, "Description is too long!"),
  extraInfo: yup.string().max(1000, "Extra Info is too long !"),
  maxGuests: yup
    .number("please enter a number")
    .positive("Please enter valid number")
    .default(1)
    .required("please enter maximum no. guests")
    .typeError("please enter valid maximum number of guests"),
  price: yup
    .number("Please enter price")
    .required("Please enter Price")
    .positive("Please enter valid Price")
    .typeError("please enter valid Price")
    .min(10, "Price cant be lower than 10$."),
  longitude: yup
    .number("Please enter valid Longitude")
    .required("Please enter Longitutde")
    .min(-180, "Longitude must be at least -180.")
    .max(180, "Longitude must be at most 180.")
    .typeError("Please enter valid longitude")
    .test("is-float", "Please enter valid latitude", function (value) {
      return value.toString().includes(".");
    }),
  latitude: yup
    .number("Please enter valid Latitude")
    .required("Please enter Latitude.")
    .min(-90, "Latitude must be at least -90.")
    .max(90, "Latitude must be at most 90.")
    .typeError("Please enter valid latitude")
    .test("is-float", "Please enter valid latitude", function (value) {
      return value.toString().includes(".");
    }),
});

export const profileSchema = yup.object().shape({
  name: yup.string().min(3, "name is too short!").max(30, "name is too long!"),
  email: yup.string().email("please enter valid email!"),
});
