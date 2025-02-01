// import AddToCart from "@/components/Addtocart";
// import Quantity from "@/components/Quantity"


import ProductImages from "@/components/ProductImages";
import Quantity from "@/components/Quantity";
import Product from "@/components/Product";
import { Product as ProductType } from "@/models/Product";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {

    const slug = (await params).slug

    if (!slug) {
        notFound();
      }

    const response = await fetch(
        `${process.env.FRONTEND_URL}/api/getSingleProduct?slug=${slug}`
    );
    const data = await response.json()

    if(!data.name){
        notFound()
    }

    const apiUrl = `${process.env.FRONTEND_URL}/api/getProducts?category=${data.category}`;

    const res = await fetch(apiUrl);
    const products = await res.json();

    return (
        <>
            <section className="mt-4">
                <div className="container mx-auto">
                    <div className="flex gap-8 lg:flex-row flex-col">
                        <div className="flex-1 h-full">
                            <ProductImages images={data.images} />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-[#000] text-[22px]">{data.name}</h1>

                            <div className="flex items-center gap-7 mt-6">
                                <div className={`ml-1 text-[16px] ${data.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>{data.qty > 0 ? "In Stock" : "Out Of Stock"}</div>
                                {/* <div className="text-[18px] font-[500] text-black">SKU: <span className={`ml-1 text-[16px] text-[#3d3d3d]`}>{data.sku}</span> </div> */}
                            </div>

                            <div className="text-[#000] text-[20px] mt-6">${data.price}</div>

                            <div className="mt-6">
                                <Quantity id={data._id} qty={data.qty} />

                                <div className="mt-8 text-[15px] w-full whitespace-pre-line">
                                    {data.description}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-16">
                <div className="container mx-auto">

                <div className="flex items-center">
            <div className="w-full border-t border-[#bfbfbf]"></div>
            <div className="uppercase mx-8 text-[14px] whitespace-nowrap">Y0U MAY ALSO LIKE</div>
            <div className="w-full border-t border-[#bfbfbf]"></div>
          </div>
                    <div className="mt-20px grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
                        {[...products.products]
                            .sort(() => 0.5 - Math.random()) // Shuffle products
                            .slice(0, 4) // Select the first 4 products
                            .map((item: ProductType) => (
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