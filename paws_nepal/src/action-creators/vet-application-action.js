export const fetchDoctorApplications = async (token, docType) => {
  try {
    const url = `http://localhost:3009/admin/requesdoctorList?state=${docType.toLowerCase()}`;

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

export const changeApplicantVerifiedState = async (id, token, docType) => {
  try {
    const url = `http://localhost:3009/admin/approvedoctor/${id}?state=${docType}`;

    const response = await fetch(url, {
      method: "POST",
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
