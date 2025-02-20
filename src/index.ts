import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { categories, products, users } from './db/schema';

const db = drizzle(process.env.DB_FILE_NAME!);
// console.log('result', db)

async function main() {
    const userData = [{
        name: 'Bob',
        age: 32,
        email: 'bob@example.com'
    },
    {
        name: 'Mike',
        age: 41,
        email: 'mike@example.com'
    },
    {
        name: 'Allen',
        age: 21,
        email: 'allen@example.com'
    }];
    const categoryData = [{
        name: 'Electronics',
    },
    {
        name: 'Accessories'
    }];
    const productData = [{
        name: 'Electronics',
        price: 400,
        categoryId: 1,
        userId: 1
    },
    {
        name: 'Accessories',
        price: 200,
        categoryId: 2,
        userId: 2
    }]

    const getAllProducts = await db.select({productName: products.name})
        .from(products)
        .innerJoin(categories, eq(products.categoryId, categories.id))
        .innerJoin(users, eq(users.id, products.userId))
        .where(eq(products.id, 1));
        console.log('All products', getAllProducts);

    // const categoryInsert = await db.insert(categories).values(categoryData).returning();
    // const productInsert = await db.insert(products).values(productData).returning();
    // console.log('value inserted',categoryInsert, productInsert)
    
    // const categoryData = [{
    //     name: 'Electronics',
    // },
    // {
    //     name: 'Accessories'
    // }];
    // const productData = [{
    //     name: 'Electronics',
    //     price: 400,
    //     categoryId: 1,
    //     userId: 1
    // },
    // {
    //     name: 'Accessories',
    //     price: 200,
    //     categoryId: 2,
    //     userId: 2
    // }]

    // const userValue = await db.delete(userTable).where(eq(userTable.id, 4)).returning();
    // console.log('User deleted', userValue);

    // const categoryInsert = await db.insert(categories).values(categoryData).returning({id: categories.id});
    // const productInsert = await db.insert(products).values(productData).returning({id: products.id});
    // console.log('Inserted both category and products: ', 'categories', categoryInsert,'products', productInsert)

}
main();