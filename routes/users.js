import express from "express";
var router = express.Router();
import { createNewUser } from "../controllers/createNewUser.js";
import { editUser } from "../controllers/editUser.js";
// import login from "../controllers/login.js";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/user/create',createNewUser);
router.post('/user/edit', editUser);
// router.post('/user/login',login);

export default router;
