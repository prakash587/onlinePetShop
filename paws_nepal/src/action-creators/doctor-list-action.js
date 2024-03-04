export const fetchDoctorsList = async (speciality) => {
  try {
    const url = `http://localhost:3009/admin/getAllDoctor`;

    const response = await fetch(url, {
      method: "GET",
      
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchDoctorsByName = async (name, token) => {
  try {
    const url = `http://localhost:3009/doctor/serchdoctor?name=${name}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      
      return jsonData.result;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchDoctorById = async (id) => {
  try {
    const url = `http://localhost:3009/doctor/getdoctorbyid/${id}`;

    const response = await fetch(url, {
      method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    const jsonData = await response.json();
    if (response.status === 200) {
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    throw Error(e.message);
  }
};

export const fetchSchedules = async (date, token, doctorId) => {
  try {
    const url = `http://localhost:3009/schedule/get-all-schedule/${doctorId}?date=${date}`;

    const response = await fetch(url, {
      method: "GET",
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
    throw Error(e.message);
  }
};
