import axios from "axios";

export const getSubs = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/subs`);
};
export const getSub = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/sub/${slug}`);
};

export const deletSub = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateSub = async (slug, Sub, authtoken) => {
  return await axios.put(`${process.env.REACT_APP_API}/sub/${slug}`, Sub, {
    headers: {
      authtoken,
    },
  });
};

export const createSub = async (Sub, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/sub`, Sub, {
    headers: {
      authtoken,
    },
  });
};
