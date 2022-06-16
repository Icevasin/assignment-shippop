const express = require("express");

const { productView, 
    form , 
    edit, 
    update, 
    deleteproduct,
    rating, 
    close , 
    open,
    } = require("../controllers/productController");
const router = express.Router();
// ป้องกันการเข้าถึงข้อมูลจากผู้ใช้ที่ไม่มีสิทธิ์ในการเข้าถึง
const { protectRoute } = require("../auth/protect");

router.get("/", protectRoute, productView);
router.get("/form", protectRoute, form);
router.get('/delete/:id', protectRoute, deleteproduct);
router.get('/close/:id', protectRoute, close);
router.get('/open/:id', protectRoute, open);

router.post('/edit', protectRoute, edit);
router.post('/update', protectRoute, update);
router.post('/rating', protectRoute, rating);


module.exports = router;