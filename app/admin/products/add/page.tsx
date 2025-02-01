"use client"
import { useState } from "react";
import axios from "axios";

interface FormData {
    name: string;
    description: string
    price: string;
    images: string[];
    qty: string;
    slug: string;
    category: string
    size: string;
    recommended: string
}

export default function AddProduct() {
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        description: "",
        price: "",
        images: [],
        qty: "",
        slug: "",
        category: "",
        size: "",
        recommended: "false"
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setUploading(true)
        const { files } = e.target;

        if (files && files.length > 0) {
            const data = new FormData();
            data.set("file", files[0] as File);
            const uploadRequest = await fetch("/api/files", {
                method: "POST",
                body: data,
            });
            const signedUrl = await uploadRequest.json();
            setFormData((prevData) => ({
                ...prevData,
                images: [...(prevData.images || []), signedUrl],
            }));
        } else {
            alert("No file selected");
        }
        setUploading(false)
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        const validationErrors: Record<string, string> = {};
        if (!formData.name) validationErrors.name = "Name is required";
        if (!formData.price) validationErrors.price = "Price is required";
        if (!formData.qty) validationErrors.qty = "Quantity is required";
        if (!formData.slug) validationErrors.slug = "Slug is required";
        if (!formData.category) validationErrors.category = "Category is required";

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {


            try {
                const res = await axios.post("/api/addProduct", formData);

                if (res.status === 201) {
                    alert("Product added successfully");

                    setFormData({
                        name: "",
                        description: "",
                        price: "",
                        images: [],
                        qty: "",
                        slug: "",
                        category: "",
                        size: "",
                        recommended: "false"
                    })
                } else {
                    alert("Error adding product");
                }
            } catch (error:unknown) {
                console.error("Error submitting the form:", error);
            }
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-black text-[32px] font-bold">Add Product</h1>

            <form onSubmit={handleSubmit} className="w-full mt-6">
                <div className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold text-[16px]">
                                Name<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            />
                            {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
                        </div>

                        {/* Price */}
                        <div className="flex flex-col">
                            <label htmlFor="price" className="font-semibold text-[16px]">
                                Price<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            />
                            {errors.price && <span className="text-red-600 text-sm">{errors.price}</span>}
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col">
                            <label htmlFor="qty" className="font-semibold text-[16px]">
                                Quantity<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="number"
                                name="qty"
                                value={formData.qty}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            />
                            {errors.qty && <span className="text-red-600 text-sm">{errors.qty}</span>}
                        </div>

                        {/* Slug */}
                        <div className="flex flex-col">
                            <label htmlFor="slug" className="font-semibold text-[16px]">
                                Slug<span className="text-red-600">*</span>
                            </label>
                            <input
                                type="text"
                                name="slug"
                                value={formData.slug}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            />
                            {errors.slug && <span className="text-red-600 text-sm">{errors.slug}</span>}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col">
                            <label htmlFor="category" className="font-semibold text-[16px]">
                                Category<span className="text-red-600">*</span>
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            >
                                <option value="" selected={formData.category === ""}>Select Category</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Linen">Linen</option>
                                <option value="Laces">Laces</option>
                                <option value="Stitching">Stitching</option>
                            </select>
                            {errors.category && <span className="text-red-600 text-sm">{errors.category}</span>}
                        </div>


                        <div className="flex flex-col">
                            <label htmlFor="size" className="font-semibold text-[16px]">
                                Size (In meters)
                            </label>
                            <input
                                type="number"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="recommended" className="font-semibold text-[16px]">
                                Recommended
                            </label>
                            <select
                                name="recommended"
                                value={formData.recommended}
                                onChange={handleChange}
                                className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2"
                            >
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>


                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="marketingInformation" className="font-semibold text-[16px]">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="text-[16px] mt-2 px-4 py-3 border border-[#00000040] outline-none rounded-sm focus:border-blue-700 focus:border-2 resize-none"
                        />
                    </div>

                    <div>
                        <div className="flex flex-col">
                            <label htmlFor="images" className="font-semibold text-[16px]">
                                Images
                            </label>
                            <input
                                type="file"
                                name="images"
                                // multiple
                                onChange={handleFileChange}
                                className="text-[16px] mt-2"
                                accept="image/*"
                            />
                        </div>
                        <div className="mt-1">
                            {uploading && "uploading..."}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap mt-4">
                            {formData.images.map((img, index) => {
                                return <img key={index} src={img} alt="Img" className="w-[60px] h-[60px] object-cover rounded-[5px]" />
                            })}

                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={uploading}
                        className="bg-blue-800 mb-4 text-white text-[16px] font-semibold px-6 py-2  hover:bg-blue-700 transition-colors"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

