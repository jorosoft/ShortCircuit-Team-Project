const express = require("express");

module.exports = function(app, data) {
    const controller = require("../controllers/home-controller")(data);

    const router = new express.Router();

    router
        .get("/", controller.getHome);

    app.use("/", router);
};