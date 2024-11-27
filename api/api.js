export const api = {
  host: "192.168.181.100",
  port: "8083",
  registerUser: async function(userData) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        // Прочитання тексту лише один раз
        const errorData = await response.text();
        console.log('Response data:', errorData);
        throw new Error(`Failed to register user: ${response.status}`);
      }
  
      // Повертаємо результат без повторного читання
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getUserById: async function(userId) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/user/id/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response data:', errorData);
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  validateLogin: async function(loginData) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      console.log('Response status:', response.status);
  
      if (!response.ok) {
        // Прочитання тексту лише один раз
        const errorData = await response.text();
        console.log('Response data:', errorData);
        throw new Error(`Failed to register user: ${response.status}`);
      }
  
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getUserByEmail: async function(email) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/user/email/${email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response data:', errorData);
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getPlaceByCategoryId: async function(categoryId) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/place/category/${categoryId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        // console.error('Response data:', errorData);
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getCommentByPlaceId: async function(placeId) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/comment/place/id/${placeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });      
      if (!response.ok) {
        const errorData = await response.text();
        // console.error('Response data:', errorData);
        throw new Error(`Failed to fetch comment: ${response.status}`);
      }
  
      const commentData = await response.json();
      
      return commentData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
  getImagesByPlaceId: async function(placeId) {
    try {
      const response = await fetch(`http://${this.host}:${this.port}/image/place/${placeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Response data:', errorData);
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
  
      const imagesData = await response.json();
      
      return imagesData;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },
}

  