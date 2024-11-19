import Blog from '@/server/models/Blog';
import connectDB from '../../../server/utils/db';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const categoryVal = searchParams.get('categoryVal');
    const blogId = searchParams.get('blogId');
    const blogTitle = searchParams.get('blogTitle');

    if (!categoryVal || !blogId || !blogTitle) {
        return new Response('Missing required query parameters', { status: 400 });
    }

    const sanitizedBlogTitle = blogTitle.replace(/-/g, ' ');
    const sanitizedBlogCategory = categoryVal.replace(/-/g, ' ');


    try {
        await connectDB();

        const blogs = await Blog.find({ category: sanitizedBlogCategory });
        if (!blogs || blogs.length === 0) {
            return new Response(`No blogs available in category ${sanitizedBlogCategory}`, { status: 400 });
        }

        const specificBlog = blogs.find(
            (blog) => blog._id.toString() === blogId && blog.title === sanitizedBlogTitle
        );

        if (!specificBlog) {
            return new Response(
                `No blog found with ID ${blogId} and title "${sanitizedBlogTitle}"`,
                { status: 404 }
            );
        }

        return new Response(JSON.stringify({ data: specificBlog }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
