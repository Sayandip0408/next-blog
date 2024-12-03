import User from '../../../../server/models/User';
import connectDB from '../../../../server/utils/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password, firstName, lastName, gender, address, about, profilePhoto } = await request.json();

  if (!email || !password || !firstName || !lastName || !gender || !address || !about || !profilePhoto) {
    return new Response('All fields are required. Please fill out every detail.', { status: 400 });
  }

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response('User already exists', { status: 400 });
    }

    const user = new User({ email, password, firstName, lastName, gender, address, about, profilePhoto });
    await user.save();

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    const userId = user._id;
    const userFullName = `${user.firstName} ${user.lastName}`

    return new Response(JSON.stringify({ accessToken, refreshToken, userId, userFullName }), { status: 200 });
  } catch (error) {
    return new Response('Error registering user', { status: 500 });
  }
}
