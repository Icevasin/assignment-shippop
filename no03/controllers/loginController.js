const passport = require("passport");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Product = require("../models/product");
const Cart = require("../models/cart");

// แสดงหน้าแรกของระบบ
const index = (req, res) => {
  Product.find()
  .then(products => {
      res.status(200).send();
      res.render('index', { products , User});
      
  }
  )
  .catch(err => {
      console.log(err);
      return res.status(500).send();
  }
  );
}

// แสดงหน้าสมัครสมาชิก
const registerView = (req, res) => {
  res.render("register", {});
};


// เพิ่มสมาชิก
const registerUser = (req, res) => {
  const { name, email, location, password, confirm } = req.body;
  // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
  if (!name || !email || !password || !confirm) {
    console.log("กรุณากรอกข้อมูลให้ครบถ้วน");
  }
  // ตรวจสอบรหัสผ่าน
  if (password !== confirm) {
    console.log("รหัสผ่านไม่ตรงกัน");
  } else {
    // ตรวจสอบอีเมลซ้ำกับที่มีอยู่ในระบบหรือไม่
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log("อีเมลนี้มีผู้ใช้งานแล้ว");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        // สร้างผู้ใช้งาน
        const newUser = new User({
          name,
          email,
          location,
          password,
        });
        // การเข้ารหัสรหัสผ่าน
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(res.redirect("/login"))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};

// แสดงหน้าล็อกอิน
const loginView = (req, res) => {
  res.render("login", {});
};


// ตรวจสอบการล็อกอิน
const loginUser = (req, res) => {
  const { email, password } = req.body;

  // ตรวจสอบว่ากรอกข้อมูลครบถ้วนหรือไม่
  if (!email || !password) {
    console.log("กรุณากรอกข้อมูลให้ครบถ้วน");
    res.render("login", {
      email,
      password,
    });
  } else {
    // ตรวจสอบว่าข้อมูลที่กรอกมีอยู่ในระบบหรือไม่
    passport.authenticate("local", {
      successRedirect: "/product",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
  }
};

// ออกจากระบบ
const logout = (req, res) => {
  req.logout();
  res.redirect("/login");
}

// เพิ่มสินค้า
const add = (req, res) => {
  const { Product_name, Product_price, Product_description } = req.body;

  const newProduct = new Product({
    Product_name,
    Product_price,
    Product_description,
    Product_seller: req.user.name,
  });
  // สร้างสินค้า
  newProduct
    .save() 
    .then(res.redirect("/product"))
    .catch((err) => console.log(err));

}

// สินค้าของตัวเอง
const myproduct  = (req, res) => {
  Product.find({ Product_seller: req.user.name })
  .then(products => {
      res.render('myproduct', { products , User});
      res.status(200).send();
  } )
  .catch(err => {
      console.log(err);
      return res.status(500).send();
  }
  );
}

// รายละเอียดสินค้า
const detail = (req, res) => {

    const { id } = req.params;
    // เช็คว่ามีสินค้านี้อยู่ในระบบหรือไม่
    Product.findById(id) .then(product => { 
        user = req.user;
        res.render('detail', { product , user});
        res.status(200).send();
    } )
    .catch(err => {
        console.log(err);
        return res.status(500).send();
    })
}

// ให้คะแนนสินค้า
const updateRating = (req, res) => {
  const update_id = req.body.update_id;
  const rating = req.body.rate;
  // ส่งข้อมูลเข้าไปที่ตาราง
  push = { rating: rating, user: req.user.name };
  Product.findByIdAndUpdate(update_id, { $push: { Product_rating: push } })
    .then(res.redirect("/product"))
    .catch((err) => console.log(err));
}

// เพิ่มสินค้าลงตะกร้า
const addcart = (req, res) => {
        const {id } = req.params;
        Product.findById(id) .then(product => { 
            user = req.user;
            // ตรวจสอบว่ามีสินค้านี้อยู่ในตะกร้าหรือไม่
            Cart.findOne({ user: req.user.id , "item.productId": id })
            .then(cart => {
                if(cart) {
                    // ถ้ามีสินค้านี้อยู่ในตะกร้าแล้วทำการ update จำนวนสินค้า
                  Cart.findOneAndUpdate({ user: req.user.id , "item.productId": id }, { $inc: { "item.$.quantity": 1 } })
                  .then(res.redirect("/cart"))
                } else {
                  // ถ้าไม่มีสินค้า ทำการเพิ่มสินค้าใหม่
                    const newCart = new Cart({
                        item: [{ productId: id, title: product.Product_name, price: product.Product_price, quantity: 1 }],
                        user: req.user.id,
                    });
                    newCart.save();
                }
                res.redirect("/cart");
            }
            ) 
            .catch(err => {
                console.log(err);
                return res.status(500).send();
            })
        }
        )
}

// แสดงหน้าตะกร้า
const cart = (req, res) => {

  Cart.find({ user: req.user.id })
    .then(carts => {
      res.render('cart', { carts , User});
      res.status(200).send();
    }
    ) 
}

// เพิ่มจำนวนสินค้าในตะกร้า
const increase = (req, res) => {
  push = { productId: req.body.productId , title : req.body.title , price : req.body.price, quantity: req.body.quantity };
  Cart.findOneAndUpdate({ user: req.user.id , "item.productId": req.body.productId }, { $inc: { "item.$.quantity": 1 } })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
}

// ลดจำนวนสินค้าในตะกร้า
const decrease = (req, res) => {
  push = { productId: req.body.productId , title : req.body.title , price : req.body.price, quantity: req.body.quantity };
  Cart.findOneAndUpdate({ user: req.user.id , "item.productId": req.body.productId }, { $inc: { "item.$.quantity": -1 } })
    .then(res.redirect("/cart"))
    .catch((err) => console.log(err));
}

// ลบสินค้าจากตะกร้า
const deletecart = (req, res) => {
  Cart.findByIdAndDelete(req.params.id, {useFindAndModify: false}).exec(err=> {
    if(err) {
      console.log(err);
    }
    res.redirect("/cart");

  })
}


module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
  logout,
  add,
  index,
  myproduct,
  detail,
  updateRating,
  addcart,
  cart,
  increase,
  decrease,
  deletecart,
};
