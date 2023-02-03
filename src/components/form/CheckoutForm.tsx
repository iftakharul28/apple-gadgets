import { checkoutValidate } from "@/lib/validate";
import type { checkoutValidation } from "@/types/index";
import { useFormik } from "formik";
const CheckoutForm = () => {
  // formik hook
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
    },
    validate: checkoutValidate,
    onSubmit,
  });
  function onSubmit(values: checkoutValidation) {
    console.log(values);
    // try {
    //   addUser({ ...values });
    // } catch (error) {
    //   console.error(error);
    // }
  }
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
        <label htmlFor="address" className="form__label">
          Address
        </label>
        <textarea
          className={`form__textarea${
            formik.errors.address && formik.touched.address
              ? " form__textarea--red"
              : ""
          }`}
          id="address"
          {...formik.getFieldProps("address")}
          cols={30}
          rows={10}></textarea>
      </div>
    </form>
  );
};

export default CheckoutForm;
