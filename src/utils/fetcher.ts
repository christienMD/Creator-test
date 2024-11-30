import {
  CheckoutEntity,
  FetchHeaderType,
  LoginEntity,
  RegistrationEntity,
} from '@/types/entities';
export const useApi = () => {
  const API = {
    /**
     * Execute a query
     * @param url
     * @param method
     * @param body
     * @returns
     */
    execute: async (
      url: string,
      method: string = "GET",
      data?: string | null | object,
      token?: string
    ) => {
      const headers: FetchHeaderType = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      // Only add Content-Type for non-FormData requests
      if (!(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }
      headers["Accept"] = "application/json";

      // let fetchPromises: Promise<Response | null> | null = null;
      const apiUrl = `${import.meta.env.VITE_BASE_URL}/api/v1${url}`;
      // fetch options
      const fetchOptions: RequestInit = {
        method,
        headers,
      };

      // Only add body for non-GET requests
      if (method !== "GET" && data) {
        fetchOptions.body =
          data instanceof FormData ? data : JSON.stringify(data);
      }

      try {
        const res = await fetch(apiUrl, fetchOptions);
        return Promise.all([res.status, res.json(), res.ok]);
      } catch (error) {
        console.error("Fetch error:", error);
        return Promise.resolve([null, null, false, null]);
      }
    }, //execute

    /**
     * Process the response after the query has been executed
     * @param res
     * @returns
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    processResponse: (res: any[]) => {
      // console.log('====================================');
      // console.log({ res });
      // console.log('====================================');
      if (!res[2]) {
        if (res[0] == 401) {
          alert("Authentication error : " + res[1].message);
        }

        throw new Error(res[1].message);
      }

      return res[1];
    },

    /**
     * API request for customer registration
     * @param data - Customer registration data including name, email, password, and profile picture
     * @returns Promise with registration response
     */
    registerCustomer: async (data: RegistrationEntity) => {
      const res = await API.execute("/auth/register", "POST", data);
      return API.processResponse(res);
    },

    /**
     * API request for creator registration
     * @param data - Creator registration data including name, email, password, bio, and profile picture
     * @returns Promise with registration response
     */
    registerCreator: async (data: RegistrationEntity) => {
      const res = await API.execute("/auth/register", "POST", data);
      return API.processResponse(res);
    },

    /**
     *API request to for Admin login
     * @param data
     * @returns
     */
    login: async (data: LoginEntity) => {
      const res = await API.execute("/auth/login", "POST", data);
      return res;
    },
    /**
     *API request for logout operation
     * @param token
     * @returns
     */
    logout: async (token: string) => {
      const res = await API.execute("/auth/logout", "POST", null, token);
      return res;
    },

    /**
     * API request to fetch all products
     * @returns Promise with all products data
     */
    getAllProducts: async (nextPage: number) => {
      const res = await API.execute(`/products?page=${nextPage}`, "GET", null);
      return API.processResponse(res);
    },

    /**
     * API request to fetch all categories
     * @returns Promise with all categories data
     */
    getAllCategories: async () => {
      const res = await API.execute("/categories", "GET", null);
      return API.processResponse(res);
    },

    /**
     * API request to fetch products by category
     * @param categoryId The ID of the category
     * @returns Promise with products data for the specified category
     */
    getProductsByCategory: async (categoryId: number) => {
      const res = await API.execute(
        `/categories/${categoryId}/products`,
        "GET",
        null
      );
      return API.processResponse(res);
    },

    searchProducts: async (param: string) => {
      const res = await API.execute(`/products?search=${param}`, "GET", null);
      return API.processResponse(res);
    },

    checkoutProduct: async (data: CheckoutEntity, token: string) => {
      const res = await API.execute("/cart/checkout", "POST", data, token);
      return res;
    },
  };
  return { API };
};
