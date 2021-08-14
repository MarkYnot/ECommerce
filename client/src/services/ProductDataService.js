import http from "../http-common";

// get the data from backend
// send request to backend and get the data
class ProductDataService {
  getBestAndStockPhone() {
    return http.post("/");
  }

  getBestAndStockPhone() {
    return http.post("/");
  }

  getPhoneDeatil(id) {
    return http.get(`/products/${id}`);
  }

  getAll() {
    return http.get("/goods");
  }

  search(flag) {
    return http.get(`/findByTitle?title=${flag}`);
  }

  getItemDetail(title) {
    title = title.replace(/\+/g, "%2B");
    title = title.replace(/\&/g, "%26");
    console.log(title);
    return http.post(`/getItemDeatils?title=${title}`);
  }

  getUserProducts(userid) {
    return http.get(`/getUserProducts?userid=${userid}`);
  }

  disableProduct(productid) {
    return http.get(`/disableProduct?productid=${productid}`);
  }

  ableProduct(productid) {
    return http.get(`/ableProduct?productid=${productid}`);
  }

  addListing(title, price, brand, image, stock, userid) {
    return http.post(
      `/addListing?title=${title}&price=${price}&brand=${brand}&image=${image}&stock=${stock}&userid=${userid}`
    );
  }

  deleteUserProduct(productid) {
    return http.get(`/deleteUserProduct?productid=${productid}`);
  }

  deleteProductNumber(title, number) {
    title = title.replace(/\+/g, "%2B");
    title = title.replace(/\&/g, "%26");
    return http.post(`/deleteProductNumber?title=${title}&number=${number}`);
  }
}

export default new ProductDataService();
