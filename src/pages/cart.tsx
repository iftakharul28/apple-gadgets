import { CartWrapper } from "@/components";
import { Layout } from "@/layout";

const Cart = () => {
  return (
    <Layout title="Cart" description="Cart Page">
      <section className="cart">
        <div className="container">
          <CartWrapper />
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
