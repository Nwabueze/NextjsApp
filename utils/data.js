import bcrypt from 'bcryptjs';
const data = {

    users: [
        {
            name: 'Samuel',
            email: 'admin1@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },
        {
            name: 'Samuel',
            email: 'sam1@gmail.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Free Shirt',
            slug: 'free-shirt',
            category: 'Shirts',
            image: '/images/shirt1.jpg',
            price: 69,
            brand: 'Nike',
            rating: 3,
            numReviews: 38,
            countInStock: 36,
            description: 'A popular shirt'
        },
        {
            name: 'Fit Shirt',
            slug: 'fit-shirt',
            category: 'Shirts',
            image: '/images/shirt2.jpg',
            price: 200,
            brand: 'Nike',
            rating: 2,
            numReviews: 28,
            countInStock: 43,
            description: 'Fitted shirt for outdoor games'
        },
        {
            name: 'Slim Shirt',
            slug: 'slim-shirt',
            category: 'Shirts',
            image: '/images/shirt3.jpg',
            price: 10,
            brand: 'Nike',
            rating: 4,
            numReviews: 60,
            countInStock: 74,
            description: 'Description for free shirt'
        },
        {
            name: 'Gulf Pants',
            slug: 'gulf-pants',
            category: 'Pants',
            image: '/images/pants1.jpg',
            price: 90,
            brand: 'Nike',
            rating: 5,
            numReviews: 9,
            countInStock: 30,
            description: 'Description for free shirt'
        },
        {
            name: 'Fit Pants',
            slug: 'fit-pants',
            category: 'Pants',
            image: '/images/pants2.jpg',
            price: 65,
            brand: 'Zara',
            rating: 10,
            numReviews: 2,
            countInStock: 41,
            description: 'Description for free shirt'
        },
        {
            name: 'Classic Pants',
            slug: 'classic-pants',
            category: 'Pants',
            image: '/images/pants3.jpg',
            price: 75,
            brand: 'Casley',
            rating: 6,
            numReviews: 4,
            countInStock: 40,
            description: 'Description for classic pants'
        }
    ]
}

export default data;