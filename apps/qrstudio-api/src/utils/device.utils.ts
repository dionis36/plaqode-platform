import { FastifyRequest } from 'fastify';
import { UAParser } from 'ua-parser-js';

export interface DeviceInfo {
    browser: string;
    os: string;
    deviceType: string;
}

/**
 * Extract device information from the request User-Agent.
 */
export function getClientDevice(request: FastifyRequest): DeviceInfo {
    const ua = request.headers['user-agent'] || '';
    const parser = new UAParser(ua);
    const result = parser.getResult();

    // Browser
    const browser = result.browser.name || 'Unknown';

    // OS
    const os = result.os.name || 'Unknown';

    // Device Type
    // ua-parser-js returns undefined for desktop, so we default to 'desktop'
    let deviceType = result.device.type || 'desktop';

    // Safe fallback for consistency
    if (deviceType === 'console') deviceType = 'desktop'; // analytics simplicity
    if (deviceType === 'smarttv') deviceType = 'desktop'; // analytics simplicity

    return {
        browser,
        os,
        deviceType
    };
}
