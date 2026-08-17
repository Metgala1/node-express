import { permissions } from "./permission.js";

export const rolePermissions = {
    admin: [
        permissions.USERS_CREATE,
        permissions.USERS_READ,
        permissions.USERS_UPDATE,
        permissions.USERS_DELETE,

        permissions.PRODUCTS_CREATE,
        permissions.PRODUCTS_READ,
        permissions.PRODUCTS_UPDATE,
        permissions.PRODUCTS_DELETE,

        permissions.REPORT_READ
    ],

    manager: [
        permissions.USERS_READ,
        permissions.USERS_UPDATE,

        permissions.PRODUCTS_READ,
        permissions.PRODUCTS_UPDATE,

        permissions.REPORT_READ
    ],

    seller: [
        permissions.PRODUCTS_CREATE,
        permissions.PRODUCTS_READ,
        permissions.PRODUCTS_UPDATE
    ],

    user: [
        permissions.PRODUCTS_READ,
        permissions.USERS_UPDATE,
    ]
}