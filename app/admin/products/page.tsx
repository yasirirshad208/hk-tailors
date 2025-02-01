// import DeleteProduct from "@/components/deleteProduct";
// import { Product } from "@/model/Product";
import DeleteProduct from "@/components/DeleteProduct";
import { Product } from "@/models/Product";
import Link from "next/link";

export default async function Products({ searchParams }: { searchParams: Promise<{ category?: string; search?: string; }> }) {
    

    const category = (await searchParams).category || "";
    const search = (await searchParams).search || "";

    // Build the query parameters dynamically, only adding non-empty values
    const params: Record<string, string> = {};
    if (category) params.category = category;
    if (search) params.search = search;

    const queryString = new URLSearchParams(params).toString();

    // Ensure a valid base API URL with proper formatting
    const apiUrl = queryString ? `${process.env.FRONTEND_URL}/api/getProducts?${queryString}` : `${process.env.FRONTEND_URL}/api/getProducts`;

        const response = await fetch(apiUrl);
        const data = await response.json();

    return (
        <>
            <div className="container mx-auto">

                <div className="flex justify-end">
                    <Link href="/admin/products/add" className="bg-blue-700 text-white rounded-[5px] py-1 px-2 hover:bg-blue-600">Add product</Link>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white mt-4">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs uppercase bg-gray-100 text-gray-600">
                            <tr>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Qty</th>
                                <th scope="col" className="px-6 py-3">Recommended</th>
                                <th scope="col" className="px-6 py-3">Image</th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                             {data.products.map((product:Product, index:number)=>{
                          return  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">
                                    {product.name.split(" ").slice(0, 4).join(" ") + (product.name.split(" ").length > 4 ? "..." : "")}
                                </th>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">{product.qty}</td>
                                <td className="px-6 py-4">{product.recommended?"Yes":"No"}</td>
                                <td className="px-6 py-4">
                                    <img src={product.images[0]} className="w-[50px] h-[50px] object-cover rounded-md" alt="product" />
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/admin/products/update?slug=${product.slug}`} className="font-medium text-green-500 hover:underline mr-2.5">Edit</Link>
                                    <DeleteProduct id={product._id}/>
                                </td>
                            </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}