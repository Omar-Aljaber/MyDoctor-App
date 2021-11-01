import Sequelize from "sequelize";
import models from "../models";

const Op = Sequelize.Op;

/**
 * Find a Doctor.
 * @param req
 * @param res
 */
export const index = async (req, res) => {
  try {
    const { q } = req.query;
    const searchQuery = q
      ? { name: { [Op.like]: `%${q.replace(' ', '')}%` } }
      : {};

    const result = await models.User.findAll({
      where: { userType: "doctor", ...searchQuery },
      include: [{ model: models.Profile, as: "profile" }],
      attributes: { exclude: ["password"] },
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
