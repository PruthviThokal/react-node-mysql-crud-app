import axios from "axios";

//backend request for getting all the users
export const getUsers = async () =>
  await axios.get(`http://localhost:8001/api/users`);

//backend request for getting all user
export const getUser = async (id) =>
  await axios.get(`http://localhost:8001/api/user/${id}`);
