import { Layout } from "@/layout";
import { PostForm } from "@/components/index";
import { api } from "@/utils/api";

const DashBoard = () => {
  const { data: categories } = api.category.getCategory.useQuery();
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
