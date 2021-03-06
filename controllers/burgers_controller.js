var express = require("express");
var router = express.Router();

var burger = require('../models/burger.js');

router.get("/", function (req, res) {
    burger.all(function (data) {
        let hbObj = {
            burgers: data,
        };
        console.log(hbObj);
        res.render("index", hbObj);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name"
    ], [
        req.body.name
    ], (result) => {
        res.json({ id: result.insertId });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = `id =${req.params.id}`;

    console.log("condition", condition);

    burger.update({
            devoured: req.body.devoured,
        },
        condition,
        (result) => {
            if (result.changedRows == 0){
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});
module.exports = router;