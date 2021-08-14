import http from "../http-common";

// get data from backend
class userDataService {
  getSellerName(id) {
    return http.get(`/findSellerName?id=${id}`);
  }

  getLoginDetail(username, password) {
    return http.get(`/login?username=${username}&password=${password}`);
  }

  signInDetail(email, password, firstname, lastname) {
    return http.get(
      `/signin?username=${email}&password=${password}&firstname=${firstname}&lastname=${lastname}`
    );
  }

  getUpdatedProfit(firstname, lastname, email, userid) {
    return http.post(
      `/update?firstname=${firstname}&lastname=${lastname}&username=${email}&userid=${userid}`
    );
  }

  changePassword(username, newPassword) {
    return http.post(
      `/changePassword?username=${username}&password=${newPassword}`
    );
  }

  addItemToUser(firstname, lastname, productTitle, number) {
    productTitle = productTitle.replace(/\+/g, "%2B");
    productTitle = productTitle.replace(/\&/g, "%26");
    return http.post(
      `/addItemToUser?firstname=${firstname}&lastname=${lastname}&productTitle=${productTitle}&number=${number}`
    );
  }

  getCartList(firstname, lastname) {
    return http.get(`/getCartList?firstname=${firstname}&lastname=${lastname}`);
  }

  deleteItem(firstname, lastname, title) {
    title = title.replace(/\+/g, "%2B");
    title = title.replace(/\&/g, "%26");
    return http.post(
      `/deleteItem?firstname=${firstname}&lastname=${lastname}&title=${title}`
    );
  }

  updateItemNumber(firstname, lastname, title, newnumber) {
    title = title.replace(/\+/g, "%2B");
    title = title.replace(/\&/g, "%26");
    return http.get(
      `/updateItemNumber?firstname=${firstname}&lastname=${lastname}&title=${title}&newnumber=${newnumber}`
    );
  }

  LoginVerify(userid, password){
    return http.get(
      `/loginVerify?userid=${userid}&password=${password}`);

  }
}

export default new userDataService();
