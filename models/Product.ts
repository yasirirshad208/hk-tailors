import mongoose, { Schema, Document } from 'mongoose';

export interface Product extends Document {
    _id:string;
    name:string;
    description:string
    price: number;
    images: string[];
    qty: number;
    slug: string; 
    category:string
    size:number;
    recommended:boolean
    sold:number
  }


   const ProductSchema: Schema<Product> = new mongoose.Schema({
      name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
      },
      description: {
        type: String,
      },
      price: {
        type: Number,
        required: [true, 'Price is required'],
      },
      images: {
        type: [String],
      },
      qty: {
        type: Number,
        required: [true, 'Quantity is required'],
      },
      slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique:true
      },
      category: {
        type: String,
        required: [true, 'Category is required'],
      },
      size:{
        type:Number
      },
      recommended:{
        type:Boolean,
        default:false
      },
      sold:{
        type:Number,
        default:0
      }
    },
    {
      timestamps:true
    }
  );
    
    const ProductModel =
      (mongoose.models.Product as mongoose.Model<Product>) ||
      mongoose.model<Product>('Product', ProductSchema);
    
    export default ProductModel;