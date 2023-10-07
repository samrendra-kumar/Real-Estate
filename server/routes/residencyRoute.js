const express= require("express") ;
const router= express.Router() ;
const { createResidency, getAllResidencies,getResidency } = require('../controllers/residencyController.js');

router.post("/create",createResidency)
router.get("/allresd",getAllResidencies);
router.get("/:id",getResidency);
module.exports = router ;