"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Select from "react-select";
import { Products } from "../productDetails/[id]/page";
import Image from "next/image";

export interface selectOptions {
  value: string;
  label: string;
}

const ViewProducts = () => {
  const options = [
    {
      value: "All",
      label: "All",
    },

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
  const [filterOptions, setFilterOptions] = useState<selectOptions | "">(
    options[0]
  );

  // Filter Values
  const [filterValue, setFilterValue] = useState(options[0].value);

  const [savedItems, setSavedItems] = useState<Products[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      if (filterValue !== "All") {
        const allProducts: Products[] = JSON.parse(saved);
        setSavedItems(
          allProducts.filter((product) => product.category === filterValue)
        );
      } else {
        setSavedItems(JSON.parse(saved));
      }
    } else {
      setSavedItems([]);
    }
  }, [filterValue]);

  return (
    <main className="min-h-dvh px-4 grid place-items-center bg-[#ececec]">
      <section className="w-full max-w-[600px]">
        <h1 className="text-center font-bold text-2xl text-[#165a4a] pb-11">
          Our Products
        </h1>

        <div className="mb-4 flex items-center justify-end gap-2">
          <label htmlFor="filter" className="font-bold">
            Filter By
          </label>

          <Select
            id="filter" // This was added to get rid of the error that says 'Prop `id` did not match'
            instanceId="filter" // This also was added to get rid of the error that says 'Prop `id` did not match'
            options={options}
            className="w-[140px]"
            required
            isSearchable
            value={filterOptions}
            onChange={(option) => {
              // NOTE: I used this if-else block to avoid TS errors, which does not allow accessing 'option.label', as 'option' may be null
              if (option) {
                setFilterValue(option.value as string);
                setFilterOptions(option);
              } else {
                setFilterValue("");
                setFilterOptions("");
              }
            }}
            // placeholder="Select Category..."
            // loadingMessage={() => "Loading..."}
          />
        </div>

        <ul className="p-4 min-h-[60dvh] rounded-2xl shadow-[0px_5px_15px_rgba(0,0,0,0.15)]">
          {!savedItems.length ? (
            <section className=" flex justify-center items-center flex-col">
              <Image
                src="/empty.webp"
                alt="A bathroom sink"
                width={350}
                height={292}
                className="max-w-[261px] rounded-2xl block"
              />

              <p className="text-2xl text-center py-8">
                Sorry, you do not have any product yet.
              </p>

              <div className="flex justify-center items-center pt-8 w-full">
                <Link
                  href={`/addProduct`}
                  className="flex items-center justify-center rounded w-full max-w-[189px] h-[45px] text-white bg-black font-bold"
                >
                  Add Product
                </Link>
              </div>
            </section>
          ) : (
            <>
              <li className="font-bold gap-2 mb-8 border-b border-b-gray-400 pb-4 grid grid-rows-1 grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <p>Product Name</p>
                <p>Category</p>
              </li>

              <>
                {savedItems.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/productDetails/${product.id}`}
                      className="grid gap-2 mb-8 border-b border-b-gray-400 pb-4 grid-rows-1 grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]"
                    >
                      <p
                        id="one-line-ellipsis"
                        className="text-xs min-[500px]:text-sm"
                      >
                        {product.name}
                      </p>

                      <p
                        id="one-line-ellipsis"
                        className="text-xs min-[500px]:text-sm"
                      >
                        {product.category}
                      </p>

                      <button
                        type="button"
                        className="text-[10px] min-[500px]:text-sm cursor-pointer ring-1 rounded"
                      >
                        View Product
                      </button>
                    </Link>
                  </li>
                ))}
              </>
            </>
          )}
        </ul>

        <div className="flex justify-center items-center pt-8">
          <Link
            href={`/`}
            className="flex items-center justify-center rounded w-full max-w-[289px] h-[45px] text-white bg-[#165a4a] hover:bg-black font-bold"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ViewProducts;
