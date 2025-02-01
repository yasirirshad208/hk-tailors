import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function DELETE(request: Request) {
  await dbConnect();

  try {
    // Extract the product ID from the request URL parameters
    const { id } = Object.fromEntries(new URL(request.url).searchParams);

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: 'Product ID is required' }),
        { status: 400 }
      );
    }

    // Delete the product by its ID
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return new Response(
        JSON.stringify({ success: false, message: 'Product not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Product deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Error deleting product' }),
      { status: 500 }
    );
  }
}
