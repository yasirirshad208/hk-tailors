import dbConnect from '@/lib/dbConnect';
import ProductModel from '@/models/Product';

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { search, category, sort } = Object.fromEntries(new URL(request.url).searchParams);

    console.log(search)

    const query: { name?: { $regex: string; $options: string }; category?: string } = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    // Define allowed sort fields and corresponding Mongoose sorting order
    type SortFields = 'sold' | 'price' | 'createdAt';
    type SortOrder = 1 | -1;
    const sortOptions: Partial<Record<SortFields, SortOrder>> = {};

    switch (sort) {
      case 'best-selling':
        sortOptions.sold = -1;
        break;
      case 'price-high-to-low':
        sortOptions.price = -1;
        break;
      case 'price-low-to-high':
        sortOptions.price = 1;
        break;
      case 'new-to-old':
        sortOptions.createdAt = -1;
        break;
      case 'old-to-new':
        sortOptions.createdAt = 1;
        break;
    }

    const products = await ProductModel.find(query).sort(sortOptions);

    return Response.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json(
      {
        success: false,
        message: 'Error fetching products',
      },
      { status: 500 }
    );
  }
}
