import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { ids } = Object.fromEntries(new URL(request.url).searchParams);

    // Check if `ids` exists and split the string into an array
    if (!ids) {
      return Response.json(
        {
          success: false,
          message: 'No product IDs provided',
        },
        { status: 400 }
      );
    }

    const idsArray = ids.split(','); // Split the string of IDs into an array

    // Define query to find products by multiple IDs
    const query = { _id: { $in: idsArray } };

    // Fetch products based on the IDs
    const products = await ProductModel.find(query);

    if (products.length === 0) {
      return Response.json(
        {
          success: false,
          message: 'No products found for the provided IDs',
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products by IDs:', error);
    return Response.json(
      {
        success: false,
        message: 'Error fetching products',
      },
      { status: 500 }
    );
  }
}
