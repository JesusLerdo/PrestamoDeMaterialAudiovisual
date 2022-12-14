const{Router} = require("express")
const {addPrest, updatePrestamos, getPrestamos, getPrestamosByID, deletePrestamosByID} = require("../controllers/Prestamos")

const router = Router()

//http://localhost:4000/api/v1/Prestamos/
//get

router.get("/", getPrestamos)

router.get("/id/:id", getPrestamosByID)

//delete
router.delete("/id/:id", deletePrestamosByID)

//use
router.post("/", addPrest)

//update
router.put("/", updatePrestamos)

module.exports = router
