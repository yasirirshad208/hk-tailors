import Product from "@/components/Product";
import Select from "@/components/Select";
import { Product as ProductType } from "@/models/Product";
import Link from "next/link";

export default async function Collections({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { sort?: string };
}) {
  const category = params.category || "";
  const sort = searchParams?.sort || "new-to-old";

  const paramsObj: Record<string, string> = {};
  if (category) paramsObj.category = category;
  if (sort) paramsObj.sort = sort;

  const queryString = new URLSearchParams(paramsObj).toString();

  const apiUrl = `${process.env.FRONTEND_URL}/api/getProducts?${queryString}`;

  const response = await fetch(apiUrl);
  const data = await response.json();

  return (
    <>
      <section className="mt-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">{category}</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>

          <div className="flex md:justify-between flex-col md:flex-row gap-5 md:items-center mt-10">
            <div className="md:w-[220px] w-full">
              <div className="text-[14px] mb-1">Filter</div>
              <Select
                options={[
                  { name: "Cotton", value: "Cotton" },
                  { name: "Linen", value: "Linen" },
                  { name: "Laces", value: "Laces" },
                  { name: "Stitching", value: "Stitching" }
                ]}
                selected={category}
                url={true}
              />
            </div>

            <div className="md:w-[220px] w-full">
              <div className="text-[14px] mb-1">Sort</div>
              <Select
                options={[
                  { name: "Price, high to low", value: "price-high-to-low" },
                  { name: "Price, low to high", value: "price-low-to-high" },
                  { name: "Date, new to old", value: "new-to-old" },
                  { name: "Date, old to new", value: "old-to-new" },
                  { name: "Best Selling", value: "best-selling" },
                ]}
                selected={"Date, new to old"}
                queryString="sort"
              />
            </div>
          </div>

          <div className="mt-20px grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {data.products.map((item: ProductType) => (
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
  );
}
