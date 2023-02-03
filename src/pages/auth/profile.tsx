import { ProfileForm } from "@/components/index";
import Layout from "@/layout/Layout";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
const Profile = () => {
  const { data: sessionData } = useSession();
  const {
    data: user,
    isLoading,
    isError,
  } = api.user.getSingleUser.useQuery({
    id: `${sessionData?.user.id}`,
  });
  if (isLoading) {
    return <p>loading</p>;
  }
  if (isError) {
    <div>loading</div>;
  }
  return (
    <Layout title="Profile">
      <section className="login">
        <div className="login__first-col">
          <div className="login__card-heading">
            <h3 className="login__heading">Welcome!</h3>
            <p className="login__text">
              Use these awesome forms to login or create new account in your
              project for free.
            </p>
          </div>
          <ProfileForm data={user} />
        </div>
        <div className="login__second-col">
          <div
            className="login__bg-image"
            style={{
              backgroundImage: "url(/assets/curved-8.jpg)",
            }}></div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
