export function decodeBase64Image(base64String) {
      // Створюємо новий елемент <img>
      const imgElement = new Image();
      imgElement.src = `data:image/png;base64,${base64String}`;
      
      // Повертаємо елемент <img>
      return imgElement;
  }