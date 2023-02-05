import { LoginForm } from "@/components/index";
import Link from "next/link";
const login = () => {
  // Google Handler function
  return (
    <section className="login">
      <div className="login__first-col">
        <div className="login__card-heading">
          <h3 className="login__heading">Welcome back</h3>
          <p className="login__text">
            Enter your email and password to sign in
          </p>
        </div>
        <LoginForm />
        <p className="login__footer-text">
          Don{`'`}t have an account?
          <Link className="login__footer-link" href="/auth/register">
            Sign up
          </Link>
        </p>
      </div>
      <div className="login__second-col">
        <div
          className="login__bg-image"
          style={{
            backgroundImage: "url(/assets/curved-6.jpg)",
          }}></div>
      </div>
    </section>
  );
};

export default login;
