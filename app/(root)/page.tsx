import Product from "@/components/Product";
import { Product as ProductType } from "@/models/Product";
import Link from "next/link";

export default async function Home() {
  const apiUrl = `${process.env.FRONTEND_URL}/api/getProducts`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data)
  return (
    <>
      <section className="sm:mt-6 mt-4">
        <div className="container mx-auto">
          <div
            className="md:h-[500px] h-[450px] w-full"
            style={{
              background: "url('/images/hero-section.webp') center center",
              backgroundSize: "cover"
            }}
          >
          </div>
        </div>
      </section>

      <section className="mt-14">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">New in Cotton</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-20px grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {data.products
              .filter((pro: ProductType) => pro.category === "Cotton")
              .slice(0, 4)
              .map((item: ProductType) => (
                <div key={item._id}>
                  <Link href={`/collection/${item.slug}`}>
                    <Product image={item.images[0]} name={item.name} price={item.price} />
                  </Link>
                </div>
              ))}

          </div>

          <div className="flex items-center mt-14">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">New in Linen</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-20px grid grid-cols-2 md:grid-cols-3 xl:grid-cols-8 gap-6 mt-14">
            {data.products.filter((pro: ProductType) => { return pro.category === "Linen" }).slice(0, 6).map((item: ProductType) => (
              <div key={item._id}>
                <Link href={`/collection/${item.slug}`}>
                  <Product image={item.images[0]} name={item.name} price={item.price} height={true} />
                </Link>
              </div>
            ))}
          </div>

          <div className="flex items-center mt-14">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">New in Laces</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="mt-20px grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {data.products.filter((pro: ProductType) => { return pro.category === "Laces" }).slice(0, 4).map((item: ProductType) => (
              <div key={item._id}>
                <Link href={`/collection/${item.slug}`}>
                  <Product image={item.images[0]} name={item.name} price={item.price} />
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}