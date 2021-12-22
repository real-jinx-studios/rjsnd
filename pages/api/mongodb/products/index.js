import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../models/product";

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  //make sure to disconnect after every db connect
  await db.disconnect();
  res.send(products);
});

export default handler;
