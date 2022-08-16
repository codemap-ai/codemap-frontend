import axios from "./localAxios";

const getAllAlgorithms = async () => await axios.get("/algorithms");

const getAlgorithm = async (algorithm_id) => await axios.get(`/algorithms/${algorithm_id}`);

const getAllCategories = async () => await axios.get("/algorithms/category");

const getCategory = async (category_id) => await axios.get(`/algorithms/category/${category_id}`);

export default {getAllCategories, getAllAlgorithms, getCategory, getAlgorithm};
