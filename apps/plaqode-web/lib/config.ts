export const config = {
    auth: {
        serviceUrl: process.env.NEXT_PUBLIC_AUTH_SERVICE_URL!,
        internalUrl: process.env.AUTH_SERVICE_INTERNAL_URL || process.env.NEXT_PUBLIC_AUTH_SERVICE_URL!,
    },
    app: {
        url: process.env.NEXT_PUBLIC_APP_URL!,
        cardifyUrl: process.env.NEXT_PUBLIC_CARDIFY_URL!,
        qrstudioUrl: process.env.NEXT_PUBLIC_QRSTUDIO_URL!,
    },
    cookie: {
        domain: process.env.COOKIE_DOMAIN || 'localhost',
    },
};
