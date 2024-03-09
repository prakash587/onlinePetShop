import CryptoJS from "crypto-js";

export const createOrder = async (
  token,
  products,
  shippingDetails,
  amount,
  items
) => {
  const url = "http://localhost:3009/order/create-order";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        products: products,
        totalprice: amount,
        houseNumber: shippingDetails.houseNumber,
        streetName: shippingDetails.streetName,
        city: shippingDetails.city,
        district: shippingDetails.district,
        zone: shippingDetails.zone,
        contactNumber: shippingDetails.phoneNumber,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    localStorage.setItem("itemsToReview", JSON.stringify(items));

    const tid = jsonData.result._id;
    console.log(tid);
    const signature = createSignature(
      `total_amount=${amount},transaction_uuid=${tid},product_code=EPAYTEST`
    );

    console.log(signature);
    console.log("here");

    const formData = {
      amount: `${jsonData.result.totalprice}`,
      failure_url: "http://localhost:3000/home",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/review-items",
      tax_amount: "0",
      total_amount: `${jsonData.result.totalprice}`,
      transaction_uuid: tid,
    };

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  } catch (e) {
    console.log(e.message);

    throw new Error(e.message);
  }
};

export const fetchOrders = async (token) => {
  const url = `http://localhost:3009/order/get-all-order`;
  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    console.log("orders");
    console.log(jsonData);
    console.log("orders");

    if (response.status === 200) {
      return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchUserOrders = async (token, id) => {
  const url = `http://localhost:3009/order/get-order/${id}`;
  try {
    const response = await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    console.log("orders");
    console.log(jsonData);
    console.log("orders");

    if (response.status === 200) {
      return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";

  // Convert secret to bytes
  const secretBytes = CryptoJS.enc.Utf8.parse(secret);

  // Generate SHA-256 HMAC
  const hmac = CryptoJS.HmacSHA256(message, secretBytes);

  // Convert HMAC to base64
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hmac);

  return hashInBase64;
};
