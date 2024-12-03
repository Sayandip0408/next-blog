import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET(req) {
    try {
        await connectDB();

        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return new Response('User ID is required', { status: 400 });
        }

        const blogs = await Blog.find({ user: userId });
        
        if (!blogs) {
            return new Response('No blogs available', { status: 400 });
        }

        return new Response(JSON.stringify({ data: blogs }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
