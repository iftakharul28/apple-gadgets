import { Layout } from "@/layout";
import { PostForm } from "@/components/index";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const DashBoard = () => {
  const { data: categories } = api.category.getCategory.useQuery();
  const router = useRouter();
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("/auth/login");
  //   },
  // });
  // if (status === "loading") {
  //   <p>loading</p>;
  // }
  return (
    <Layout title="Product Form">
      <div className="posts">
        <div className="container">
          <div className="posts__heading-wrapper">
            <h2 className="posts__heading">Product Form</h2>
          </div>
          <PostForm categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default DashBoard;
