const Product = require('../models/product');
const User = require('../models/User');

// แสดงรายการสินค้าทั้งหมด
const productView = (req, res) => {
        Product.find()
            .then(products => {
                
                res.render('product', { products , user: User});
                res.status(200).send();
            }
            )
            .catch(err => {
                console.log(err);
                return res.status(500).send();
            }
            );
}

// แสดงแบบฟอร์มสำหรับเพิ่มสินค้า
const form = (req, res) => {
    res.render('form', { User });
}

// แสดงหน้าสำหรับการแก้ไขสินค้า
const edit = (req, res) => {
    const edit_id = req.body.edit_id;
    Product.findOne({ _id: edit_id }).exec((err, product) => {
            res.render('edit', { product });
            res.status(200).send();
    })
}

// อัปเดตสินค้า
const update = (req, res) => {
    const update_id = req.body.update_id;
    let data = {
        Product_name: req.body.Product_name,
        Product_description: req.body.Product_description,
        Product_price: req.body.Product_price,
    }
    
    Product.findByIdAndUpdate(update_id, data,{userFindAndModify: false}).exec(err=>{
        res.redirect('/product');
        res.status(201).send();
    })
}

// ลบสินค้า
const deleteproduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        res.redirect('/product');
        res.status(201).send();
    })
}

// เรตติ้งสินค้า
const rating = (req, res) => {
    const rating_id = req.body.rating_id;
    Product.findOne({ _id: rating_id }).exec((err, product) => {
            res.render('rating', { product });
            res.status(200).send();
    })
}

// ไม่แสดงสินค้า
const close = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: { Product_status: "unavailable" } },{userFindAndModify: false}).exec(err=>{
        res.redirect('/product');
        res.status(201).send();
    })
}

// แสดงสินค้า
const open = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: { Product_status: "available" } },{userFindAndModify: false}).exec(err=>{
        res.redirect('/product');
        res.status(201).send();
    })
}

module.exports = {
    productView,
    form,
    edit,
    update,
    deleteproduct,
    rating,
    close,
    open,
}
