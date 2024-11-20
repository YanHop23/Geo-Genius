export const api = {
  registerUser: async function(userData) {
    try {
      const response = await fetch('http://192.168.43.124:8083/user', {
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
      const response = await fetch(`http://192.168.43.124:8083/user/id/${userId}`, {
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
      const response = await fetch('http://192.168.43.124:8083/login', {
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
      const response = await fetch(`http://192.168.43.124:8083/user/email/${email}`, {
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
}

  