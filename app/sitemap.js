export default function sitemap() {
    return [
        {
            url: 'https://inkling-by-sayandip.vercel.app',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://inkling-by-sayandip.vercel.app/log-in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://inkling-by-sayandip.vercel.app/sign-up',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://inkling-by-sayandip.vercel.app/about-inkling',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
        {
            url: 'https://inkling-by-sayandip.vercel.app/terms-and-conditions',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        },
    ]
}