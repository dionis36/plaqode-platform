import geoip from 'geoip-lite';

const ip = '8.8.8.8'; // Google Public DNS
const geo = geoip.lookup(ip);

console.log('Testing geoip-lite lookup for IP:', ip);
if (geo) {
    console.log('Region:', geo.region);
    console.log('Country:', geo.country);
    console.log('City:', geo.city);
    console.log('SUCCESS: Geo lookup returned data.');
} else {
    console.log('FAILURE: Geo lookup returned null.');
    process.exit(1);
}
