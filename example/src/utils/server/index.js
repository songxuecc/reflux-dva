import axios from "axios";

const baseUrl = "http://localhost:3030";
const fetchAddress = () => axios.get(`${baseUrl}/address`).then(res => res.request.response);

export { fetchAddress };
