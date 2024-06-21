const express = require("express");
const router = express.Router();
const dataController = require("../Controller/dataController.js");


// all data route
router.get("/data", dataController.allData)
router.get("/data/:id", dataController.getOne)
router.post("/data", dataController.createPost)
router.put("/data/:id", dataController.updatePost)
router.delete("/data/:id", dataController.deletePost)



// export router
module.exports = router;