import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // Create roles
    const userRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: { name: 'user' },
    });

    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: { name: 'admin' },
    });

    const superadminRole = await prisma.role.upsert({
        where: { name: 'superadmin' },
        update: {},
        create: { name: 'superadmin' },
    });

    console.log('✅ Created roles:', { userRole, adminRole, superadminRole });

    // Create admin user
    const adminPassword = await hashPassword('admin123456');

    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@plaqode.com' },
        update: {},
        create: {
            email: 'admin@plaqode.com',
            name: 'Admin User',
            passwordHash: adminPassword,
        },
    });

    // Assign superadmin role
    await prisma.userRole.upsert({
        where: {
            userId_roleId: {
                userId: adminUser.id,
                roleId: superadminRole.id,
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            roleId: superadminRole.id,
        },
    });

    // Grant access to both products
    await prisma.productAccess.upsert({
        where: {
            userId_product: {
                userId: adminUser.id,
                product: 'cardify',
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            product: 'cardify',
        },
    });

    await prisma.productAccess.upsert({
        where: {
            userId_product: {
                userId: adminUser.id,
                product: 'qrstudio',
            },
        },
        update: {},
        create: {
            userId: adminUser.id,
            product: 'qrstudio',
        },
    });

    console.log('✅ Created admin user:');
    console.log('   Email: admin@plaqode.com');
    console.log('   Password: admin123456');
    console.log('   Roles: superadmin');
    console.log('   Products: cardify, qrstudio');

    console.log('\n🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
