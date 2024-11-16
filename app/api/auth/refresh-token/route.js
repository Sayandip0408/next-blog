import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
        return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    try {
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeToExpire = payload.exp - currentTime;

        if (timeToExpire > 60) {
            const newAccessToken = jwt.sign({ userId: payload._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
            return NextResponse.json({ accessToken: newAccessToken }, { status: 201 });
        }
        else {
            return NextResponse.json({ message: "Refresh token is not valid! Login again." }, { status: 401 });
        }
    } catch (error) {
        console.error("Error verifying refresh token:", error.message);
        return NextResponse.json({ message: "Invalid or expired refresh token" }, { status: 403 });
    }
}