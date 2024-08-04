import axios from 'axios';

// Set up your base URL and any default settings
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    };

export const login = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const getProducts = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/products/get_all', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

    export const addProduct = async (data) => {
        try {
          const authToken = localStorage.getItem('token');
          const response = await api.post('/products/create', data, {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log("response", response);
          return response.data;
        } catch (error) {
          return error.response;
        }
      };

export const getManufacturers = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const response = await api.get('/manufacturers/get_all', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Manufacturers", response);
      return response.data;
    } catch (error) {
        return error.response.data;
    }
    };

export const getProductsByManufacturer = async (manufacturer_id) => {
    try {
        const authToken = localStorage.getItem('token');

        const response = await api.get(`/products/get_by_manufacturer/${manufacturer_id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    };

export const getOrdersMade = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/orders/get_all_made', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("Orders Made", response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    };

export const getOrdersReceived = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/orders/get_all_received', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("Orders Received", response);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const addOrder = async (data) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.post('/orders/create', data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

    export const updateOrderStatus = async (order_id, status) => {
        try {
          const authToken = localStorage.getItem('token');
          const response = await api.put(`/orders/${order_id}/update_status`, { status }, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          return response.data;
        } catch (error) {
          return error.response;
          // return error.response.data;
        }
      }

      export const updateOrderOwnerAndStatus = async (order_id, current_owner_id, status) => {
        try {
          const authToken = localStorage.getItem('token');
          const response = await api.put(`/orders/${order_id}/update_owner_status`, { current_owner_id:current_owner_id, status:status }, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          return response.data;
        } catch (error) {
          return error.response;
          // return error.response.data;
        }
      }

export const getLogisticsCompanies = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/logistics/get_all', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const getSuppliers = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/suppliers/get_all', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const createAsset = async (data) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.post('/manufacturers/create_asset', data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }


export const getAssets = async () => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get('/manufacturers/get_all_assets', {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const addMeterReading = async (asset_id, data) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.post(`/manufacturers/assets/${asset_id}/add_meter_reading`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const getMeterReadings = async (asset_id) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get(`/manufacturers/assets/${asset_id}/meter_readings`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const getPredictions = async (asset_id, data) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.post(`/manufacturers/assets/${asset_id}/predict`, data, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
    }

export const getOrderHistory = async (order_id) => {
    try {
        const authToken = localStorage.getItem('token');
        const response = await api.get(`/orders/${order_id}/history`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });
        console.log("Order History", response);
        return response?.data?.history;
    } catch (error) {
        return error.response.data;
    }
    }


      