import nc from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/product";
import data from "../../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  //connect to db
  await db.connect();
  //do bd manipulation stuff
  await Product.deleteMany();
  await Product.insertMany(data.products);
  //always disconnect from db after request
  await db.disconnect();
  res.send({ message: "generated bunch of shit successfully" });
});

export default handler;
