export const fetchNotifications = async (id, token) => {
  const url = `http://localhost:3009/notificataion/get-notificataion`;
  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    console.log("notifications");
    console.log(jsonData);
    console.log("notifications");

    if (response.status === 200) {
      return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};
