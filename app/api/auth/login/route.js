import User from '../../../../server/models/User';
import connectDB from '../../../../server/utils/db';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response('Email and password are required', { status: 400 });
  }

  try {
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response('Invalid email or password', { status: 400 });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return new Response('Invalid email or password', { status: 400 });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    const userId = user._id;
    const userFullName = `${user.firstName} ${user.lastName}`

    return new Response(JSON.stringify({ accessToken, refreshToken, userId, userFullName }), { status: 200 });
  } catch (error) {
    return new Response('Error logging in', { status: 500 });
  }
}
