import { connectDB } from "@/lib/mongodb";
import Product, { ProductDoc } from "@/models/Product";
import ProductDetails from "../ProductDetails";

interface ProductPageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await connectDB();

  // Loading product by slug instead of by ID
  const product = (await Product.findOne({ slug: params.slug }).lean()) as ProductDoc | null;

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Product not found
      </div>
    );
  }

  return <ProductDetails product={{ ...product, _id: product._id.toString() }} />;
}
