import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { registerValidate } from "@/lib/validate";
import type { registertype } from "@/types/index";
import { useFormik } from "formik";

const RegisterForm = () => {
  const router = useRouter();
  // formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      passWord: "",
      cpassword: "",
    },
    validate: registerValidate,
    onSubmit,
  });
  async function onSubmit(values: registertype) {
    console.log(values);
    try {
      addUser({ ...values });
    } catch (error) {
      console.error(error);
    }
  }
  const { mutate: addUser } = api.user.Adduser.useMutation({
    onSuccess() {
      router.push("/auth/login");
    },
    onError(e) {
      console.error(e);
    },
  });
  return (
    <form
      className="form login__card-body"
      role="form"
      onSubmit={formik.handleSubmit}>
      <div className="form__input-group">
        <label htmlFor="name" className="form__label">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          className={`form__input${
            formik.errors.name && formik.touched.name ? " form__input--red" : ""
          }`}
          {...formik.getFieldProps("name")}
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="email" className="form__label">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          className={`form__input${
            formik.errors.email && formik.touched.email
              ? " form__input--red"
              : ""
          }`}
          {...formik.getFieldProps("email")}
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="password" className="form__label">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          className={`form__input${
            formik.errors.passWord && formik.touched.passWord
              ? " form__input--red"
              : ""
          }`}
          {...formik.getFieldProps("passWord")}
          // onChange={(e) =>
          //   setUserInfo({
          //     ...userInfo,
          //     passWord: e.target.value,
          //   })
          // }
          // value={userInfo && userInfo?.passWord ? userInfo.passWord : ""}
        />
      </div>
      <div className="form__input-group">
        <label htmlFor="cpassword" className="form__label">
          RePassword
        </label>
        <input
          id="cpassword"
          type="password"
          placeholder="Password"
          className={`form__input${
            formik.errors.cpassword && formik.touched.cpassword
              ? " form__input--red"
              : ""
          }`}
          {...formik.getFieldProps("cpassword")}
        />
      </div>
      <button type="submit" className="form__button">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
