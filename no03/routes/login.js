const express = require("express");

const {
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
      } = require("../controllers/loginController");
// ป้องกันการเข้าถึงข้อมูลจากผู้ใช้ที่ไม่มีสิทธิ์ในการเข้าถึง
const { protectRoute } = require("../auth/protect");

const router = express.Router();


router.get("/", loginView);

router.get("/register", registerView);
router.get("/login", loginView);
router.get("/logout", logout);

router.get("/myproduct", protectRoute, myproduct);
router.get("/product/:id", protectRoute, detail);
router.get('/addcart/:id', protectRoute, addcart);
router.get('/cart', protectRoute, cart);
router.get('/deletecart/:id', protectRoute, deletecart);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/add", protectRoute, add);
router.post("/updateRating", protectRoute, updateRating);
router.post('/increase', protectRoute, increase);
router.post('/decrease', protectRoute, decrease);


module.exports = router;
