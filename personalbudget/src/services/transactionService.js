import http from "../http-common";

class TransactionDataService {
  getAll() {
    return http.get("/transactions");
  }
  get(id) {
    return http.get(`/transactions/${id}`);
  }
  create(data) {
    return http.post("/transactions", data);
  }
  update(id, data) {
    return http.put(`/transactions/${id}`, data);
  }
  delete(id) {
    return http.delete(`/transactions/${id}`);
  }
  deleteAll() {
    return http.delete(`/transactions`);
  }
  findByName(detail) {
    return http.get(`/transactions?detail=${detail}`);
  }  
}
export default new TransactionDataService();
