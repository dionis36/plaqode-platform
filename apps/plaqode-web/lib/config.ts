import { env } from '@/lib/env';

export const config = {
    auth: {
        serviceUrl: env.NEXT_PUBLIC_AUTH_SERVICE_URL,
        internalUrl: env.AUTH_SERVICE_INTERNAL_URL || env.NEXT_PUBLIC_AUTH_SERVICE_URL,
    },
    app: {
        url: env.NEXT_PUBLIC_APP_URL,
        cardifyUrl: env.NEXT_PUBLIC_CARDIFY_URL,
        qrstudioUrl: env.NEXT_PUBLIC_QRSTUDIO_URL,
    },
    cookie: {
        domain: env.COOKIE_DOMAIN,
    },
};
