import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
    editions: { type: [String], required: true },
    price_no_vat: { type: [Number], required: true },
    license: { type: [String], required: true },
    categories: { type: [String], required: true },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
