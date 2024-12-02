import User from '../../../server/models/User';
import connectDB from '../../../server/utils/db';

export async function PUT(request) {
    try {
        await connectDB();

        const url = new URL(request.url);
        const userId = url.searchParams.get('userId');

        if (!userId) {
            return new Response(
                JSON.stringify({ error: 'User ID is required' }),
                { status: 400 }
            );
        }

        const body = await request.json();
        const { profilePhoto } = body;

        if (!profilePhoto) {
            return new Response(
                JSON.stringify({ error: 'Profile photo URL is required' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        const user = await User.findById(userId);
        if (!user) {
            return new Response(
                JSON.stringify({ error: 'User not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }

        user.profilePhoto = profilePhoto;
        await user.save();

        return new Response(
            JSON.stringify({ message: 'Profile photo updated successfully', data: user }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'Internal Server Error', details: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
