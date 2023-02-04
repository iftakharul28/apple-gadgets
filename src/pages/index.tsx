import { type NextPage } from "next";
import { api } from "@/utils/api";
import { Card, HomeSkeleton } from "@/components";

const Home: NextPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getLatestProduct.useQuery();
  if (isLoading) {
    return <HomeSkeleton />;
  }
  if (isError) {
    return <p>Erros</p>;
  }
  return (
    <section className="home">
      <div className="container">
        <div className="home__products">
          {products?.map((item, i: number) => (
            <Card {...item} key={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
