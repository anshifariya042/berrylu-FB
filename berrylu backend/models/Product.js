import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["western", "bags", "shoes"],
    },
    image: {
      type: String,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    details: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
