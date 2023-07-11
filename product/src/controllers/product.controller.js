import {
  createProduct,
  getAllProducts,
  getById as getByIdService,
} from "../services/product.service.js";

export const create = async (req, res) => {
  const data = req.body;
  try {
    const response = await createProduct(data);
    return res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const response = await getAllProducts();
    return res.status(200).json({
      success: response.success,
      message: response.message,
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  if (id)
    try {
      const response = await getByIdService(id);
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      return res.status(501).json({
        success: false,
        message: error.message,
      });
    }

  return res.status(404).json({
    success: false,
    message: "Product Id not found",
  });
};
