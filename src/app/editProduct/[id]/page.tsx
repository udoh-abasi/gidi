"use client";

import { Products } from "@/app/productDetails/[id]/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import Select from "react-select";

export interface selectOptions {
  value: string;
  label: string;
}

const EditProduct = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id: theID } = use(params);

  const router = useRouter();
  const options = [
    {
      value: "Furniture",
      label: "Furniture",
    },

    {
      value: "Decor",
      label: "Decor",
    },

    {
      value: "Electronics",
      label: "Electronics",
    },

    {
      value: "Bedding",
      label: "Bedding",
    },

    {
      value: "Lighting",
      label: "Lighting",
    },
  ];

  // Set up the options to be used in the 'Select'
  const [categoryOptions, setCategoryOptions] = useState<selectOptions | "">(
    ""
  );

  // Category Values
  const [categoryValue, setCategoryValue] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Get the product to edit and set them on their respective fields
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      const allProducts: Products[] = JSON.parse(saved);
      const theProduct = allProducts.find((product) => product.id === theID);

      if (theProduct) {
        setName(theProduct.name);
        setDescription(theProduct.description);
        setCategoryValue(theProduct.category);
        setCategoryOptions({
          value: theProduct.category,
          label: theProduct.category,
        });
      } else {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  }, [router, theID]);

  const editAndSaveToLocalStorage = (): void => {
    // Get existing list
    const existingProductsString = localStorage.getItem("products");

    const existingProducts: Products[] = existingProductsString
      ? JSON.parse(existingProductsString)
      : [];

    const editedProducts = existingProducts.map((product) => {
      if (product.id === theID) {
        return {
          id: theID,
          name,
          category: categoryValue,
          description,
        };
      } else {
        return product;
      }
    });

    // Save back
    localStorage.setItem("products", JSON.stringify(editedProducts));
  };

  return (
    <main className="min-h-dvh px-4 grid place-items-center bg-[#ececec]">
      <section className="w-full max-w-[600px] p-4 rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.15)]">
        <h1 className="text-center font-bold text-3xl text-[#165a4a]">
          Edit Product
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col-reverse mb-8 relative mt-8">
            <input
              type="text"
              required
              placeholder=" "
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="h-10 rounded bg-white p-1 peer disabled:cursor-not-allowed disabled:bg-gray-600 disabled:ring-gray-600 disabled:text-gray-400"
            />

            <label
              htmlFor="name"
              className="cursor-text p-1 absolute peer-placeholder-shown:top-[50%] peer-placeholder-shown:translate-y-[-50%] peer-focus:top-[-90%] peer-focus:translate-y-[0] top-[-90%] transition-all duration-500 ease-linear"
            >
              <span className="flex items-center gap-2 text-base">
                <span>
                  Product Name&nbsp;<span className="text-red-500">&#42;</span>
                </span>
              </span>
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="mb-2 block">
              Product Category&nbsp;<span className="text-red-500">&#42;</span>
            </label>
            <Select
              id="category" // This was added to get rid of the error that says 'Prop `id` did not match'
              instanceId="category" // This also was added to get rid of the error that says 'Prop `id` did not match'
              options={options}
              required
              isSearchable
              value={categoryOptions}
              onChange={(option) => {
                // NOTE: I used this if-else block to avoid TS errors, which does not allow accessing 'option.label', as 'option' may be null
                if (option) {
                  setCategoryValue(option.value as string);
                  setCategoryOptions(option);
                } else {
                  setCategoryValue("");
                  setCategoryOptions("");
                }
              }}
              placeholder="Select Category..."
              loadingMessage={() => "Loading..."}
            />
          </div>

          <div className="mb-8 relative mt-16">
            <textarea
              id="message"
              name="message"
              required
              placeholder=" "
              aria-required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="block w-full bg-white rounded p-1 resize-none h-[200px] border-0 peer"
            ></textarea>
            <label
              htmlFor="message"
              className="absolute peer-placeholder-shown:top-[5%]  peer-focus:top-[-12%] top-[-12%] left-[0.5rem] transition-all duration-500 ease-linear cursor-text"
            >
              Product Description&nbsp;
              <span className="text-red-500">&#42;</span>
            </label>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              editAndSaveToLocalStorage();
              router.push("/viewProducts");
            }}
            className="flex items-center justify-center rounded w-full h-[45px] text-white bg-[#165a4a] hover:bg-black font-bold cursor-pointer"
          >
            Save Changes
          </button>
        </form>

        <div className="flex justify-center items-center pt-8">
          <Link
            href={`/`}
            className="flex items-center justify-center rounded w-full max-w-[289px] h-[45px] text-white bg-black font-bold"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default EditProduct;
