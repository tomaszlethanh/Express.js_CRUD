const ClientRepository = require("../repository/sequelize/ClientRepository");

exports.login = (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  ClientRepository.findByPhoneNumber(phoneNumber)
    .then((client) => {
      if (!client) {
        res.render("index", {
          navLocation: "",
          loginError: "The username or password is incorrect",
        });
      } else if (client.password === password) {
        req.session.loggedUser = client;
        res.redirect("/");
      } else {
        res.render("index", {
          navLocation: "",
          loginError: "The username or password is incorrect",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.logut = (req, res, next) => {
  req.session.loggedUser = undefined;
  res.redirect("/");
};
