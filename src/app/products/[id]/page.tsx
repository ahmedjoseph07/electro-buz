import { connectDB } from "@/lib/mongodb";
import Product, { ProductDoc } from "@/models/Product";
import ProductDetails from "../ProductDetails";

interface ProductPageProps {
  params: { id: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  await connectDB();

  const product = (await Product.findById(params.id).lean()) as ProductDoc | null;

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Product not found
      </div>
    );
  }

  // Convert ObjectId to string for the client component
  return <ProductDetails product={{ ...product, _id: product._id.toString() }} />;
}
