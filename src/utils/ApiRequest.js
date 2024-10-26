import axios from "axios";

class _ApiRequest {
  defaultHeader = "application/json";
  extractErrorMessage = (errorResponse) => {
    let message = '';
  
    if (typeof errorResponse === 'string') {
      message = errorResponse;
    } else if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
      message = errorResponse.errors.map(err => err.message).join(', ');
    } else if (errorResponse.message) {
      message = errorResponse.message;
    } else {
      message = "An error occurred";
    }
  
    return this.decodeHtmlEntities(message);
  };
  
  // Function to decode HTML entities
  decodeHtmlEntities = (text) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  };

  postRequest = async ({ url = null, data = null }) => {
    try {
      const response = await axios({
        method: "post",
        url: url,
        headers: {
          "Content-Type": this.defaultHeader,
        },
        data: data,
      });
      return response.data;
    } catch (e) {
      const errorHtml = e.response?.data || '';
      const errorMessageMatch = errorHtml.match(/Error: (.*?)(?:<|$)/); 
  
      const errorMessage = errorMessageMatch ? errorMessageMatch[1].trim() : "An error occurred";
  
      console.error("Error in postRequest:", errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  getRequest = async ({ url = null }) => {
    try {
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type": this.defaultHeader,
        },
      });
      return response.data;
    } catch (e) {
      console.error("Error in getRequest:", e);
      return { success: false, message: e.message };
    }
  };

  putRequest = async ({ url = null, data = null }) => {
    try {
      const response = await axios({
        method: "put",
        url: url,
        headers: {
          "Content-Type": this.defaultHeader,
        },
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("Error in putRequest:", e);
      return { success: false, message: e.message };
    }
  };

  patchRequest = async ({ url = null, data = null }) => {
    try {
      const response = await axios({
        method: "patch",
        url: url,
        headers: {
          "Content-Type": this.defaultHeader,
        },
        data: data,
      });
      return response.data;
    } catch (e) {
      console.error("Error in patchRequest:", e);
      return { success: false, message: e.message };
    }
  };

  deleteRequest = async ({ url = null }) => {
    try {
      const response = await axios({
        method: "delete",
        url: url,
        headers: {
          "Content-Type": this.defaultHeader,
        },
      });
      return response.data;
    } catch (e) {
      console.error("Error in deleteRequest:", e);
      return { success: false, message: e.message };
    }
  };
}

export const ApiRequest = new _ApiRequest();
