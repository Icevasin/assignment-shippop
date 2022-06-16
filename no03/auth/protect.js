// ป้องกันการเข้าถึง
const protectRoute = (req, res, next) =>{
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('กรุณาล็อคอินก่อน');
  res.redirect('/login');
}


module.exports = {
    protectRoute,
  };