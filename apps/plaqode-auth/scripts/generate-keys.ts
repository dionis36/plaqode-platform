import { generateKeyPairSync } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const keysDir = join(__dirname, '../keys');

// Create keys directory if it doesn't exist
if (!existsSync(keysDir)) {
    mkdirSync(keysDir, { recursive: true });
}

console.log('Generating RSA key pair...');

// Generate RSA key pair (2048-bit)
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
    }
});

// Write keys to files
const privatePath = join(keysDir, 'private.pem');
const publicPath = join(keysDir, 'public.pem');

writeFileSync(privatePath, privateKey);
writeFileSync(publicPath, publicKey);

console.log('✅ RSA keys generated successfully!');
console.log(`   Private key: ${privatePath}`);
console.log(`   Public key: ${publicPath}`);
console.log('\n⚠️  IMPORTANT: Add keys/ to .gitignore to keep them secure!');
