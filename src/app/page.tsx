import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-dvh px-4 grid place-items-center">
      <section className="min-[784]:flex">
        <div className="flex-[0_1_50%]">
          <h1 className="text-4xl text-center min-[784]:text-left min-[784]:text-[46px] min-[910px]:text-[56px] font-bold pt-[40px]">
            <span className="block">Your Home Essentials,</span>{" "}
            <span>All In One Place.</span>
          </h1>

          <h2 className="text-sm py-8 text-center min-[784]:text-left min-[910px]:text-[24px] max-w-[471px] min-[784]:py-[56px]">
            Simplify your shopping with our extensive selection of reliable
            household appliances and stylish decor to perfectly complete your
            home.
          </h2>

          <div className="gap-[24px] hidden min-[784]:flex">
            <Link
              href={`/addProduct`}
              className="flex items-center justify-center rounded w-[193px] h-[56px] text-white bg-[#165a4a] hover:bg-black font-bold"
            >
              Get Started
            </Link>

            <Link
              href={`/viewProducts`}
              className="flex items-center justify-center rounded w-[146px] h-[56px] ring ring-black hover:bg-black hover:text-white font-bold"
            >
              View All Products
            </Link>
          </div>
        </div>

        <div className="flex-[0_1_50%] max-w-[450px] min-[784]:max-w-none grid place-items-center grid-cols-[minmax(0,1fr)_minmax(0,0.2fr)_minmax(0,1fr)] grid-rows-1 min-[784]:place-items-stretch min-[784]:grid-cols-4 min-[784]:grid-rows-2">
          <Image
            src="/home1.png"
            alt="A kitchen"
            width={473}
            height={446}
            className="min-[784]:w-[473px] min-[784]:h-[446px] col-start-1 col-end-3 row-start-1 row-end-2 min-[784]:col-start-1 min-[784]:col-end-4 min-[784]:row-start-1 min-[784]:row-end-3"
            // blurDataURL=""
            // placeholder="blur" // Optional blur-up while loading
          />

          <Image
            src="/home2.png"
            alt="A bathroom sink"
            width={385}
            height={271}
            className="min-[784]:w-[385px] min-[784]:h-[271px] col-start-2 col-end-4 row-start-1 row-end-2 min-[784]:col-start-2 min-[784]:col-end-5 min-[784]:row-start-2 min-[784]:row-end-3"
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>

        <div className="p-8 flex flex-col items-center justify-center gap-6 min-[784]:hidden">
          <Link
            href={`/addProduct`}
            className="flex items-center justify-center rounded w-full max-w-[289px] h-[45px] text-white bg-[#165a4a] hover:bg-black font-bold"
          >
            Get Started
          </Link>

          <Link
            href={`/viewProducts`}
            className="flex items-center justify-center rounded w-full max-w-[222px] h-[40px] ring ring-black hover:bg-black hover:text-white font-bold"
          >
            View All Products
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
