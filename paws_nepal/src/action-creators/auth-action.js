import { authSliceActions } from "../slices/auth-slice";

export const registerUser = async (user) => {
  const url = "http://localhost:3009/user/signup";

  const imageFile = new File([user.image], user.image.name);
  const formData = new FormData();

  formData.append("name", user.username);
  formData.append("email", user.email);
  formData.append("address", user.address);
  formData.append("password", user.password);
  formData.append("image", imageFile);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {},
    });
    const jsonData = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("role", jsonData.result.role);
      localStorage.setItem("user", JSON.stringify(jsonData.result));
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const loginUser = async (email, password) => {
  const url = "http://localhost:3009/user/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      // currentUser = jsonData.user;
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("role", jsonData.user.role);
      localStorage.setItem("user", JSON.stringify(jsonData.user));
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  } catch (e) {
  }
};

export const getLoggedInState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData);
    console.log(user);
    console.log(token);

    if (!token) {
      dispatch(
        authSliceActions.replaceLoggedInState({
          role: null,
          user: null,
          token: null,
        })
      );
    } else {
      dispatch(
        authSliceActions.replaceLoggedInState({
          role: role,
          user: user,
          token: token,
        })
      );
    }
  };
};

export const registerDoctorRequest = async (doctorData, token) => {
  const url = "http://localhost:3009/user/applyasdoctor";

  const formData = new FormData();
  for (let i = 0; i < doctorData.education.length; i++) {
    formData.append(
      `education[${i}][instituteName]`,
      doctorData.education[i].instituteName
    );
    formData.append(`education[${i}][grade]`, doctorData.education[i].grade);
  }

  for (let i = 0; i < doctorData.imageFiles; i++) {
    formData.append("document", doctorData.imageFiles[i]);
  }

  doctorData.imageFiles.forEach((file, index) => {
    formData.append("document", file);
  });
  formData.append("specialization", doctorData.specialization);
  formData.append("experience", doctorData.experience);

  try {
    console.log("here");
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status);
    const jsonData = await response.json();
    console.log(jsonData);

    if (response.status === 200) {
      return jsonData.message;
    } else {
      console.log(jsonData.message);
      throw Error(jsonData.message);
    }
  } catch (e) {
    console.log("error");
    console.log(e.message);
    throw Error(e.message);
  }
};
