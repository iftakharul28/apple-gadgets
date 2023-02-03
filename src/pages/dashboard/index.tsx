import { Layout } from "@/layout";
import { PostForm } from "@/components/index";
import { api } from "@/utils/api";

const DashBoard = () => {
  const { data: categories } = api.category.getCategory.useQuery();

  return (
    <Layout title="Posts">
      <div className="posts">
        <div className="posts__heading-wrapper">
          <h2 className="posts__heading">Posts Information</h2>
        </div>
        <PostForm categories={categories} />
      </div>
    </Layout>
  );
};

export default DashBoard;
