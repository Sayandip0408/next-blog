import Blog from '@/server/models/Blog';
import User from '../../../server/models/User';
import connectDB from '../../../server/utils/db';

export async function GET(request) {
    const { userId, category, title, content, img_url, img_title } = await request.json();

    if (!userId || !category || !title || !content || !img_url) {
        return new Response('every field is required', { status: 400 });
    }

    try {
        await connectDB();

        const user = await User.findById(userId);
        if (!user) {
            return new Response('No User Found', { status: 400 });
        }

        const userFullName = `${user.firstName} ${user.lastName}`;

        const blog = new Blog({ user: userId, category, title, content, img_url, img_title, author: userFullName });
        await blog.save();

        return new Response(JSON.stringify({ message: 'New blog posted' }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
