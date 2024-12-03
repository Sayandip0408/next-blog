import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET(req) {
    try {
        await connectDB();
        const url = new URL(req.url);
        const size = url.searchParams.get('size');

        const randomBlogs = await Blog.aggregate([{ $sample: { size: parseInt(size) } }]);

        if (!randomBlogs || randomBlogs.length === 0) {
            return new Response(JSON.stringify({ message: 'No blogs available' }), { status: 404 });
        }

        return new Response(JSON.stringify({ data: randomBlogs }), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error.message }),
            { status: 500 }
        );
    }
}
