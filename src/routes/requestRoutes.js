const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const auth = require("../middlewares/authMiddleware");

// Público: Cualquiera puede crear una solicitud
router.post("/", requestController.createRequest);

// Privado: Solo admin puede ver, editar estatus o borrar (llevan middleware 'auth')
router.get("/", auth, requestController.getAllRequests);
router.put("/:id", auth, requestController.updateStatus);
router.delete("/:id", auth, requestController.deleteRequest);

module.exports = router;

exports.getAllRequests = async (req, res, next) => {
  try {
    // Implementación de paginación
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const requests = await Request.find()
      .sort({ fecha: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Request.countDocuments();

    res.json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: requests,
    });
  } catch (err) {
    next(err); // Delegar al manejador de errores global
  }
};
