import axios from "axios";

const API_URL = "https://apisk.bkt.net.vn";
const axiosClient = axios.create({ baseURL: API_URL });
const config = {};

export const GetAllTopic = () =>
  axiosClient.get(`/api/topic/GetAllTopic`, config);
export const GetVocaByIDTopic = (idTopic) =>
  axiosClient.get(`/api/vocalbulary/GetVocaByIDTopic/${idTopic}`, config);
