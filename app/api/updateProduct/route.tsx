import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function PUT(request: Request) {
  await dbConnect();

  try {
    // Extract the id and the product data from the request body
    const { id } = Object.fromEntries(new URL(request.url).searchParams);
    const {
      name,
      description,
      price,
      qty,
      slug,
      category,
      size,
      recommended,
      images
    } = await request.json();

    if (!id) {
      return Response.json(
        { success: false, message: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Find the product by its ID and update it
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        qty,
        slug,
        category,
        images,
        size,
        recommended
      },
      { new: true }  // This option ensures the updated product is returned
    );

    if (!updatedProduct) {
      return Response.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: 'Product updated successfully', product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating product:', error);
    return Response.json(
      { success: false, message: 'Error updating product', error },
      { status: 500 }
    );
  }
}
