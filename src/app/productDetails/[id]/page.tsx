"use client";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

export interface Products {
  id: string;
  name: string;
  category: "Furniture" | "Decor" | "Electronics";
  description: string;
}

const ProductDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: theID } = use(params);

  const [product, setProduct] = useState<Products>();

  const router = useRouter();

  // Get the product from local storage using the id
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const allProducts: Products[] = JSON.parse(saved);
      const theProduct = allProducts.find((product) => product.id === theID);

      if (theProduct) {
        setProduct(theProduct);
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router, theID]);

  const deleteProduct = (Id: string) => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const allProducts: Products[] = JSON.parse(saved);

      const newProducts = allProducts.filter((product) => product.id !== Id);

      localStorage.setItem("products", JSON.stringify(newProducts));

      router.push("/viewProducts");
    }
  };

  return (
    <>
      <Head>
        <title>Gidi - Product Details</title>
        <meta
          name="description"
          content="Displays the full and complete details of a product"
        />
        <meta name="keywords" content={`Gidi, buy, Display, Product`} />

        <meta property="og:title" content="Gidi - Product Details" />
        <meta
          property="og:description"
          content="Displays the full and complete details of a product"
        />
        <meta
          property="og:url"
          content={`https://gidi-sepia.vercel.app/productDetails/${theID}`}
        />
        <meta property="og:type" content="product" />

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="min-h-dvh px-4 grid place-items-center bg-[#ececec]">
        <div className="w-full max-w-[600px] min-h-[80dvh] grid place-items-center p-4 rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.15)]">
          <div className="w-full">
            <section className="mb-8 border-b border-b-gray-400 pb-4">
              <p className="text-2xl font-bold">Product Name</p>
              <p className="text-lg">{product?.name}</p>
            </section>

            <section className="mb-8 border-b border-b-gray-400 pb-4">
              <p className="text-2xl font-bold">Category</p>
              <p className="text-lg">{product?.category}</p>
            </section>

            <section className="mb-8 border-b border-b-gray-400 pb-4">
              <p className="text-2xl font-bold">Description</p>
              <p className="text-lg">{product?.description}</p>
            </section>

            <div className="gap-[24px] pt-8 flex flex-col min-[426]:flex-row justify-center items-center min-[426]:justify-evenly">
              <Link
                href={`/editProduct/${product?.id}`}
                type="button"
                className="flex items-center justify-center rounded w-[146px] h-[40px] ring ring-black hover:bg-black hover:text-white font-bold cursor-pointer"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => {
                  if (product?.id) {
                    deleteProduct(product.id);
                  } else {
                    router.push("/viewProducts");
                  }
                }}
                className="flex items-center justify-center rounded w-[146px] h-[40px] text-white bg-red-500 font-bold cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center py-8 w-full">
          <Link
            href={`/`}
            className="flex items-center justify-center rounded w-full max-w-[289px] h-[45px] text-white bg-[#165a4a] hover:bg-black font-bold"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
