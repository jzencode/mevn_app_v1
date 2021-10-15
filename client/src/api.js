import axios from 'axios';
const url = '/api/product';

class API {
  // get all the products from the server
  async getAllProducts() {
    const res = await axios.get(url);
    return res.data;
  }

  // get single product by id
  async getProductByID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }

  // to insert product into database
  async addProduct(post) {
    const res = await axios.post(url, post);
    return res.data;
  }

  // to update product into database
  async editProduct(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }

  // to delete a product
  async removeProduct(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
}

export default new API();
