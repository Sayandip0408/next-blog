import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET() {
    try {
        await connectDB();

        const randomBlogs = await Blog.aggregate([{ $sample: { size: 3 } }]);

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
