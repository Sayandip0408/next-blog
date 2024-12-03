import Blog from '@/server/models/Blog';
import User from '../../../server/models/User';
import connectDB from '../../../server/utils/db';

export async function POST(request) {
    const { userId, author, category, title, content, img_url, img_title, synopsis } = await request.json();

    if (!userId || !category || !title || !content || !img_url ||!author || !synopsis) {
        return new Response('every field is required', { status: 400 });
    }

    try {
        await connectDB();

        const user = await User.findById(userId);
        if (!user) {
            return new Response('Not authorized to post blogs', { status: 400 });
        }

        const blog = new Blog({ user: userId, category, title, content, img_url, img_title, author, synopsis, profilePhoto: user.profilePhoto });
        await blog.save();

        return new Response(JSON.stringify({ message: 'New blog posted' }), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
