import { type NextPage } from "next";
import { api } from "@/utils/api";
import { Card } from "@/components";

const Home: NextPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = api.product.getLatestProduct.useQuery();
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    return <p>Erros</p>;
  }
  return (
    <main className="home">
      <div className="home__products">
        {products.map((item, i) => (
          <Card {...item} key={i} />
        ))}
      </div>
    </main>
  );
};

export default Home;
