import axios from "axios";
// import axios
// set the baseURL 
// 'Access-Control-Allow-Origin' by vue cli
//to get the data from backend by make reuqest from the front end with same namewe
export default axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  }
});