import axios from "axios";

const API = "http://localhost:3001/censo";

export const getSetores = async (city: string) => {
  const response = await axios.get(`${API}?city=${city}`);
  return response.data;
};

export const getSetorByPoint = async (x: number, y: number) => {
  const response = await axios.get(`${API}/point?x=${x}&y=${y}`);
  return response.data;
};
