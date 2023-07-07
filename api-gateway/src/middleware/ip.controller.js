import {
  checkIP as checkIPService,
  addIP as addIPService,
} from "../services/IP.service.js";

export const checkIP = async (req, res, next) => {
  const ip = req.ip;

  const response = await checkIPService(ip);

  if (response?.isBlocked) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  next();
};

export const addIP = async (ip, url, times) => {
  try {
    const data = {
      ip: ip,
      request: url,
      times: times,
      description: "Add a IP to the blacklist",
    };
    const response = await addIPService(data);
  } catch (error) {
    console.log(error);
  }
};
