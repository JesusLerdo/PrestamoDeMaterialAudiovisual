const{Router} = require("express")
const {addClien, updateCliente, getCliente, getClienteByID, deleteClienteByID} = require("../controllers/Cliente")

const router = Router()

//http://localhost:4000/api/v1/Cliente/
//get

router.get("/", getCliente)

router.get("/id/:id", getClienteByID)

//delete
router.delete("/id/:id", deleteClienteByID)

//use
router.post("/", addClien)

//update
router.put("/", updateCliente)

module.exports = router
