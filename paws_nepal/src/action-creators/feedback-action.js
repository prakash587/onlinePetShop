export const postFeedback = async (productId, token, rating, review) => {
  const url = `http://localhost:3009/feedback/create-feedback/${productId}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        rating: rating,
        comment: review,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    if (response.status === 200) {
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchFeedbacks = async (productId) => {
    
  const url = `http://localhost:3009/feedback/get-feedback/${productId}`;
  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    console.log('reviews');
    console.log(jsonData);
    console.log('reviews');

    if (response.status === 200) {
        return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};
