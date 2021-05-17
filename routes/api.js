const express=require('express');
const app = express();
const router=express.Router();
// Multer MiddleWare
const multer=require('multer');
//const upload=multer({dest:'uploads/'}); // Hey ! Store all files in this place
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
// ============================== //
/* Products API */
// product
const Product=require('../models/product');
// GetAllProducts
router.get('/products',function(req,res,next){
  Product.find({}).then(function(products){
      res.send(products);
  });
});
// GetProductById
router.get('/getProduct/:id',function(req,res,next){
  Product.findById({_id:req.params.id}).then(function(products){
      res.send(products);
  }).catch(next);
});
// Adding a new product to database
router.post('/addProduct',upload.array('productImages', 6),function(req,res,next){ // can upload maximum 6 images
Product.create(req.body).then(function(product){
  res.send(product);
}).catch(next);
});
// Get product Price
router.get('/getProductPrice/:id',function(req,res,next){
  Product.findById({_id:req.params.id}).then(function(products){
    var objJSON=JSON.parse(JSON.stringify(products));
      res.json(objJSON["price"]); // returns price figure
  }).catch(next);
});
// // ============================== //
// /* User API */
// // user
const User=require('../models/user');
// Adding a new user ==============
router.post('/createUser',function(req,res,next){
  User.findOne({ emailAddress: req.body.emailAddress },function(err, result){
      if(err)
      {
        res.status(500).send(err);
        return;
      }
      if(!result)
      {
        User.create(req.body).then(function(user){
          res.send(user);
        }).catch(next);
        return ;
      }
      else
      {
        data = {
            "meta":
            {
                "status": "fail",
                "message": "Login Failure: Invalid username or password"
            }
          };
          res.send(data);
          return ;
      }
});
});
// getAllUsers ==============
router.get('/users',function(req,res,next){
  User.find({}).then(function(user){
      res.send(user);
  });
});
// getUserDetailsbyId ==============
router.get('/getUser/:id',function(req,res,next){
  User.findById({_id:req.params.id}).then(function(user){
    if(!user)
    {
      data = {
          "meta":
          {
              "status": "fail",
              "message": "User Not Found"
          }
        };
        res.send(data);
        return ;
    }
    res.send(user);
  }).catch(next);
});
// userLogin ==============
router.post('/credentialVerification',function(req,res,next){
User.findOne(
    // parameter One
    { $and: [
      { emailAddress: req.body.emailAddress },
      { password: req.body.password }
    ] }
    ,
    // parameter Second
   function(err, result)
   {
    if(err)
    {
      res.status(500).send(err);
      return;
    }
    if(!result)
    {
        data = {
            "meta":
            {
                "status": "fail",
                "message": "Login Failure: Invalid username or password"
            }
        };
        res.status(401).send(data);
        return
    }
    else
    {
      User.find({emailAddress: req.body.emailAddress}).then(function(user){
          res.send(user);
      });
    }
  });
  });

// // ============================== //
// /* Order API */
// // order
const Order=require('../models/order');
// showAllOrders ==============
router.get('/order',function(req,res,next){
  Order.find({}).then(function(order){
      res.send(order);
  });
});
// GetOrderById ==============
router.get('/getOrderByOrderId/:id',function(req,res,next){
  Order.findById({_id:req.params.id}).then(function(order){
    if (order)
    {
      res.send(order);
    }
    else
    {
        data = {
            "meta": {
                "status": "Failure",
                "message": "Order Doesnot Exist"
              }
            };
      res.send(data);
    }
  }).catch(next);
});
// GetAllOrdersOfUserbyUserId ==============
router.get('/getOrderByUserId/:id',function(req,res,next){
  Order.find({user:req.params.user}).then(function(order){
    if (order)
    {
      res.send(order);
    }
    else
    {
        data = {
            "meta": {
                "status": "Failure",
                "message": "User Doesnot Exist or Order Doesnot Exist"
              }
            };
      res.send(data);
    }
  }).catch(next);
});
// DeleteOrderbyOrderId ==============
router.delete('/deleteOrder/:id',function(req,res,next){
  Order.findByIdAndRemove({_id:req.params.id}).then(function(order){
    if (order)
    {
      data = {
          "meta": {
              "status": "success",
              "message": "Order Deleted"
            }
          };
    }
    else
    {
        data = {
            "meta": {
                "status": "Failure",
                "message": "Order Doesnot Exist or Can't Delete"
              }
            };
    }
    res.send(data);
  }).catch(next);
});
// Adding a new order ==============
router.post('/addOrder',function(req,res,next){
  User.findById(
      // parameter One
      { _id: req.body.userId }
      ,
      // parameter Second
     function(err, result)
     {
      if(err)
      {
        res.status(500).send(err);
        return;
      }
      if(!result)
      {
          data = {
              "meta":
              {
                  "status": "fail",
                  "message": "User Does Not Exist"
              }
          };
          res.status(401).send(data);
          return
      }
      else
      {
        Order.create(req.body).then(function(order){
          res.send(order);
        }).catch(next);
      }
    });
});
// Update Order- (Status=Completed/Cancelled/Delivery Fail/Initiated)/(Items)/et cetera
router.put('/updateOrder/:id',function(req,res,next){
  Order.findByIdAndUpdate({_id:req.params.id},req.body).then(function(order){
    if(order)
    {
      if (order)
      {
        data = {
            "meta": {
                "status": "success",
                "message": "Order Updated"
              }
            };
      }
      else
      {
          data = {
              "meta": {
                  "status": "Failure",
                  "message": "Order Doesnot Exist or Can't Delete"
                }
              };
      }
    }
    res.send(data);
  }).catch(next);
});
// show Initiated orders[pending orders]
router.get('/getPendingOrders',function(req,res,next){
  Order.find({"orderStatus":"Initiated"}).then(function(order){
      res.send(order);
  });
});
// show Completed orders []
router.get('/getDeliveredOrders',function(req,res,next){
  Order.find({"orderStatus":"Delivered"}).then(function(order){
      res.send(order);
  });
});
// show Cancelled orders []
router.get('/getCancelledOrders',function(req,res,next){
  Order.find({"orderStatus":"Cancelled"}).then(function(order){
      res.send(order);
  });
});
// show Delivery Fail orders []
router.get('/getDeliveryFailOrders',function(req,res,next){
  Order.find({"orderStatus":"Delivery Fail"}).then(function(order){
      res.send(order);
  });
});
module.exports=router;
