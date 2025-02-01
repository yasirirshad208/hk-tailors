// import dbConnect from '@/lib/dbConnect';
import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function POST(request: Request) {
    await dbConnect();

    try {
        const {
            name,
            description,
            price,
            qty,
            slug,
            category,
            images,
            size,
            recommended
        } = await request.json();


        const newProduct = new ProductModel({
            name,
            description,
            price,
            qty,
            slug,
            category,
            images,
            size,
            recommended
        });

        await newProduct.save();


        return Response.json(
            {
                success: true,
                message: 'Product created successfully',
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error)
        return Response.json(
            {
                success: false,
                message: 'Error adding product',
                error
            },
            { status: 500 }
        );
    }
}