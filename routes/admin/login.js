var express = require("express");
var router = express.Router();
var user_models = require("./../../models/user_models");

router.get("/", function (req, res, next) {
  res.render("admin/login", {
    layout: "/admin/layout",
  });
});

module.exports = router;

router.post("/", async (req, res, next) => {
  try {
    var user = req.body.user;
    var password = req.body.password;

    console.log(req.body);

    var data = await user_models.getUserByUserAndPassword(user, password);

    if (data != undefined) {
      req.session.id_user = data.id_user;
      req.session.nombre = data.user;
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/login", {
        layout: "admin/layout",
        error: true
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.render('admin/login',{
    layout: 'admin/layout'
  });
});