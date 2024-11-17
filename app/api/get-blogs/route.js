import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET() {
    try {
        await connectDB();

        const blogs = await Blog.find();
        if (!blogs) {
            return new Response('No blogs available', { status: 400 });
        }

        return new Response(JSON.stringify({ data: blogs }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
