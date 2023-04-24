const { userSignupValidation } = require("../models/user");
const elasticClient = require("../db");
const argon2 = require("argon2");
const adminLogin = async (req, res, next) => {
  try {
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
const adminSignup = async (req, res, next) => {
  try {
    const { error } = userSignupValidation(req.body);
    if (error) return res.status(400).send({ error });
    const hashPassword = await argon2.hash(req.body.password);
    const result = await elasticClient.index({
      index: "users",
      document: {
        ...req.body,
        password: hashPassword,
      },
    });
    return res
      .status(201)
      .send({ message: "User created successfully", result });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getUserById = async (req, res, next) => {
  try {
    const result = await elasticClient.get({
      index: "users",
      _id: req.params.id,
    });
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const result = await elasticClient.search({
      index: "users",
      body: {
        query: {
          match_all: {},
        },
      },
    });
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const updateUser = async (req, res, next) => {
  try {
    const result = await elasticClient.update({
      index: "users",
      _id: req.params.id,
      body: {
        doc: {
          ...req.body,
        },
      },
    });
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const result = await elasticClient.delete({
      index: "users",
      _id: req.params.id,
    });
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
const getUserByNameRegex = async (req, res, next) => {
  try {
    // const nameRegex = `/${req.params.name}.*/i`;
    const result = await elasticClient.search({
      index: "users",
      body: {
        query: {
          regexp: {
            name: {
              value: `${req.params.name}.*`,
              flags: "ALL",
              case_insensitive: true,
            },
          },
        },
      },
    });
    // const names = response.body.hits.hits.map((hit) => hit._source.name);
    // return res.json(names);
    return res.status(200).send(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  adminLogin,
  adminSignup,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByNameRegex,
};
