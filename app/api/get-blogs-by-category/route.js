import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryVal = searchParams.get('categoryVal');

    const sanitizedCategory = categoryVal.replace(/-/g, ' ');

    try {
        await connectDB();

        const blogs = await Blog.find({ category: sanitizedCategory });
        if (blogs.length === 0) {
            return new Response(`No blogs available in category ${sanitizedCategory}`, { status: 400 });
        }

        return new Response(JSON.stringify({ data: blogs }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
