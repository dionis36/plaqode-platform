import geoip from 'geoip-lite';

export interface GeoInfo {
    country: string | null;
    city: string | null;
}

/**
 * Extract geographic location from IP address.
 */
export function getGeoFromIp(ip: string): GeoInfo {
    // geoip-lite lookup returns null for private/local IPs
    const geo = geoip.lookup(ip);

    if (!geo) {
        return {
            country: null,
            city: null
        };
    }

    return {
        country: geo.country || null,
        city: geo.city || null
    };
}
