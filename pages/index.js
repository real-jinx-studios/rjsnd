import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import HomeMain from "../components/homeMain";
import HomeMain2 from "../components/homeMain2";
import db from "../utils/db";
import Link from "next/link";
import Product from "../models/product";

export default function Home(props) {
  const { products } = props;
  return (
    <Layout home>
      <section className="section-one">
        <h1>Cutting-edge professional subtitling products</h1>
        <div className="product-wrapper">
          {products.map((x) => (
            <Link href="/subtitle3">
              <div key={x.name} className="grid-wrapper__item">
                <h3>{x.name}</h3>
                <p>
                  Editions:
                  {x.editions.map((y) => (
                    <span key={y}>&nbsp; &#127569;{y}&nbsp;</span>
                  ))}
                </p>
                <p>
                  prices:
                  {x.price_no_vat.map((z) => (
                    <span key={z}>&nbsp; &#127569;{z}EUR&nbsp;</span>
                  ))}
                </p>
                <p>
                  licenses:
                  {x.license.map((q) => (
                    <span key={q}>&nbsp; &#127569;{q}&nbsp;</span>
                  ))}
                </p>
                <p>
                  tags:
                  {x.categories.map((w) => (
                    <span key={w}>&nbsp; &#127569;{w}&nbsp;</span>
                  ))}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Head>
        <title>{siteTitle}</title>
      </Head>

      <HomeMain2 />
      <HomeMain />
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();

  await db.disconnect();
  return {
    props: {
      //db.convertDocToObj is to convert the mongoose doc to js object
      products: products.map(db.convertDocToObj),
    },
  };
}
