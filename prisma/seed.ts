import "dotenv/config";
import bcrypt from "bcrypt";
import {prisma} from "../src/config/prisma"

declare const process: {
    exit(code?: number): never;
};

async function main() {
    console.log("🌱 Starting database seed...");

    // --------------------------------------------------
    // 1. CLEAR DATABASE
    // --------------------------------------------------

    console.log("🗑️ Clearing existing data...");

    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.product.deleteMany();

    await prisma.userRole.deleteMany();
    await prisma.rolePermission.deleteMany();

    await prisma.user.deleteMany();

    await prisma.role.deleteMany();
    await prisma.permission.deleteMany();

    console.log("✅ Database cleared");

    // --------------------------------------------------
    // 2. CREATE PERMISSIONS
    // --------------------------------------------------

    const permissions = await Promise.all([
        prisma.permission.create({
            data: {
                name: "products:read"
            }
        }),

        prisma.permission.create({
            data: {
                name: "products:create"
            }
        }),

        prisma.permission.create({
            data: {
                name: "products:update"
            }
        }),

        prisma.permission.create({
            data: {
                name: "products:delete"
            }
        }),

        prisma.permission.create({
            data: {
                name: "orders:read"
            }
        }),

        prisma.permission.create({
            data: {
                name: "orders:create"
            }
        }),

        prisma.permission.create({
            data: {
                name: "orders:update"
            }
        })
    ]);

    const permissionMap = Object.fromEntries(
        permissions.map(permission => [
            permission.name,
            permission.id
        ])
    );

    console.log("✅ Permissions created");

    // --------------------------------------------------
    // 3. CREATE ROLES
    // --------------------------------------------------

    const adminRole = await prisma.role.create({
        data: {
            name: "ADMIN"
        }
    });

    const sellerRole = await prisma.role.create({
        data: {
            name: "SELLER"
        }
    });

    const customerRole = await prisma.role.create({
        data: {
            name: "CUSTOMER"
        }
    });

    console.log("✅ Roles created");

    // --------------------------------------------------
    // 4. CONNECT ROLES → PERMISSIONS
    // --------------------------------------------------

    await prisma.rolePermission.createMany({
        data: [
            // ADMIN
            {
                roleId: adminRole.id,
                permissionId: permissionMap["products:read"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["products:create"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["products:update"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["products:delete"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["orders:read"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["orders:create"]
            },
            {
                roleId: adminRole.id,
                permissionId: permissionMap["orders:update"]
            },

            // SELLER
            {
                roleId: sellerRole.id,
                permissionId: permissionMap["products:read"]
            },
            {
                roleId: sellerRole.id,
                permissionId: permissionMap["products:create"]
            },
            {
                roleId: sellerRole.id,
                permissionId: permissionMap["products:update"]
            },
            {
                roleId: sellerRole.id,
                permissionId: permissionMap["orders:read"]
            },

            // CUSTOMER
            {
                roleId: customerRole.id,
                permissionId: permissionMap["products:read"]
            },
            {
                roleId: customerRole.id,
                permissionId: permissionMap["orders:read"]
            },
            {
                roleId: customerRole.id,
                permissionId: permissionMap["orders:create"]
            }
        ]
    });

    console.log("✅ Role permissions created");

    // --------------------------------------------------
    // 5. HASH PASSWORDS
    // --------------------------------------------------

    const passwordHash = await bcrypt.hash(
        "secret123",
        10
    );

    // --------------------------------------------------
    // 6. CREATE USERS
    // --------------------------------------------------

    const roger = await prisma.user.create({
        data: {
            name: "Roger",
            email: "roger@example.com",
            passwordHash
        }
    });

    const john = await prisma.user.create({
        data: {
            name: "John",
            email: "john@example.com",
            passwordHash
        }
    });

    const mary = await prisma.user.create({
        data: {
            name: "Mary",
            email: "mary@example.com",
            passwordHash
        }
    });

    console.log("✅ Users created");

    // --------------------------------------------------
    // 7. ASSIGN ROLES TO USERS
    // --------------------------------------------------

    await prisma.userRole.createMany({
        data: [
            {
                userId: roger.id,
                roleId: adminRole.id
            },
            {
                userId: john.id,
                roleId: sellerRole.id
            },
            {
                userId: mary.id,
                roleId: customerRole.id
            }
        ]
    });

    console.log("✅ User roles assigned");

    // --------------------------------------------------
    // 8. CREATE PRODUCTS
    // --------------------------------------------------

    await prisma.product.createMany({
        data: [
            {
                name: "Phone",
                price: 350000,
                sellerId: john.id
            },
            {
                name: "Macbook",
                price: 10000000,
                sellerId: john.id
            },
            {
                name: "Bicycle",
                price: 50000,
                sellerId: john.id
            }
        ]
    });

    console.log("✅ Products created");

    console.log("");
    console.log("🎉 Database seeded successfully!");
    console.log("");
    console.log("Users:");
    console.log("Roger → roger@example.com / secret123 → ADMIN");
    console.log("John  → john@example.com / secret123 → SELLER");
    console.log("Mary  → mary@example.com / secret123 → CUSTOMER");
    console.log("");
    console.log("Products:");
    console.log("Phone → 350,000 XAF");
    console.log("Macbook → 10,000,000 XAF");
    console.log("Bicycle → 50,000 XAF");
}

main()
    .catch((error) => {
        console.error("❌ Seed failed:");
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });