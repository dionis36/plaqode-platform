export const config = {
    auth: {
        serviceUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3001',
        internalUrl: process.env.AUTH_SERVICE_INTERNAL_URL || 'http://localhost:3001',
    },
    app: {
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        cardifyUrl: process.env.NEXT_PUBLIC_CARDIFY_URL || 'http://localhost:3002',
        qrstudioUrl: process.env.NEXT_PUBLIC_QRSTUDIO_URL || 'http://localhost:3004',
    },
    cookie: {
        domain: process.env.COOKIE_DOMAIN || 'localhost',
    },
};
