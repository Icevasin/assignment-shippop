const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    Product_name: {
        type: String,
        required: true,
    },
    Product_description: {
        type: String,
        required: true,
    },
    Product_price: {
        type: Number,
        required: true,
    },
    Product_sale: {
        type: Number
    },
    Product_seller: {
        type: String
    },
    Product_date: {
        type: Date,
        default: Date.now,
    },
    Product_status: {
        type: String,
        default: 'available',
    },
    Product_rating: [
        {
            rating: {
                type: Number,
                required: true,
            },
            user: {
                type: String,
                required: true,
            },  
        },
    ]
    ,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;