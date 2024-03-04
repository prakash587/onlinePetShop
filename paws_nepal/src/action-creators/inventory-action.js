export const addPet = async (pet, token) => {
  const url = "http://localhost:3009/product/create-proudcts";
  const formData = new FormData();

  const imageFile = new File([pet.images[0]], pet.images[0].name);

  formData.append("name", pet.petName);
  formData.append("producttype", "Pet");
  formData.append("category", pet.category);
  formData.append("breed", pet.breed);
  formData.append("age", pet.age);
  formData.append("price", pet.price);
  formData.append("description", pet.description);
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addPetFood = async (food, token) => {
  const url = "http://localhost:3009/product/create-proudcts";
  const formData = new FormData();

  const imageFile = new File([food.images[0]], food.images[0].name);

  formData.append("name", food.productName);
  formData.append("producttype", "Petfood");
  formData.append("category", food.category);
  formData.append("brand", food.brand);
  formData.append("price", food.price);
  formData.append("description", food.shortDescription);
  formData.append("protein", food.protein);
  formData.append("fat", food.fat);
  formData.append("fiber", food.fiber);
  formData.append("moisture", food.moisture);
  formData.append("ingredients", food.ingredients);
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const addPetAccessory = async (accessory, token) => {
  const url = "http://localhost:3009/product/create-proudcts";
  const formData = new FormData();

  const imageFile = new File([accessory.images[0]], accessory.images[0].name);

  formData.append("name", accessory.productName);
  formData.append("producttype", "Petaccessories");
  formData.append("category", accessory.category);
  formData.append("brand", accessory.brand);
  formData.append("price", accessory.price);
  formData.append("size", accessory.size);
  formData.append("description", accessory.description);
  formData.append("materials", accessory.materials);
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

export const fetchProducts = async () => {
  const url = "http://localhost:3009/product/get-all-product";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();

    if (jsonData.result === "No product Avialable") {
      return { result: [] };
    } else if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchPets = async () => {
  const url = "http://localhost:3009/product/get-all-product";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();

    if (jsonData.result.length === 0) {
      return { result: [] };
    } else if (response.status === 200) {
      const products = jsonData.result.filter(
        (product) => product.producttype === "Pet"
      );

      return { result: products };
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchPetFoods = async () => {
  const url = "http://localhost:3009/product/get-all-product";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();

    if (jsonData.result.length === 0) {
      return { result: [] };
    } else if (response.status === 200) {
      const products = jsonData.result.filter(
        (product) => product.producttype === "Petfood"
      );

      return { result: products };
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchPetAccessories = async () => {
  const url = "http://localhost:3009/product/get-all-product";

  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();
    if (jsonData.result.length === 0) {
      return { result: [] };
    } else if (response.status === 200) {
      const products = jsonData.result.filter(
        (product) => product.producttype === "Petaccessories"
      );

      return { result: products };
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchPetsByCategory = async (category) => {
  const url = `http://localhost:3009/product/get-product-category?category=${category}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();
    console.log(jsonData);
    if (jsonData.result.length === 0) {
      console.log("no pet");
      return [];
    } else if (response.status === 200) {
      const products = jsonData.result.filter(
        (product) => product.producttype === "Pet"
      );
      console.log("yes pet");
      return products;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchPetFoodsByCategory = async (category) => {
  const url = `http://localhost:3009/product/get-product-category?category=${category}`;
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    const jsonData = await response.json();
    console.log("pet food category");
    console.log(jsonData);
    console.log("pet food category");
    if (jsonData.result.length === 0) {
      console.log("no food");
      return [];
    } else if (response.status === 200) {
      const products = jsonData.result.filter(
        (product) => product.producttype === "Petfood"
      );
      return products;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const deleteProduct = async (id) => {
  const url = `http://localhost:3009/product/delete-product/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const jsonData = await response.json();
    console.log("delete");
    console.log(jsonData);
    console.log("delete");
    if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};
