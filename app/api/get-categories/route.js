import connectDB from '../../../server/utils/db';
import Category from '@/server/models/Category';

export async function GET() {
    try {
        await connectDB();

        const categories = await Category.find();
        if (!categories) {
            return new Response('No categories available', { status: 400 });
        }

        return new Response(JSON.stringify({ data: categories }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
