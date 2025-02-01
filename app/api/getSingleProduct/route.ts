import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    // Extract the slug parameter from the URL
    const { slug } = Object.fromEntries(new URL(request.url).searchParams);

    if (!slug) {
      return Response.json(
        { success: false, message: 'Slug is required' },
        { status: 400 }
      );
    }

    // Fetch a single product by its slug
    const product = await ProductModel.findOne({ slug });

    if (!product) {
      return Response.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(
      product,
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching product:', error);
    return Response.json(
      { success: false, message: 'Error fetching product' },
      { status: 500 }
    );
  }
}
