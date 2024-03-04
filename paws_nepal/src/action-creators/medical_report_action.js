export const postMedicalReport = async (
  token,
  patientId,
  appointmentId,
  data
) => {
  try {
    const url = `http://localhost:3009/report/create-report/${patientId}?appointmentid=${appointmentId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description: [data.description],
        recommends: data.recommends,
        nonrecommendeds: data.nonrecommendeds,
        diagnosis: data.diagnosis,
      }),
    });
    console.log(response.status);
    const jsonData = await response.json();
    if (response.status === 200) {
      return jsonData.message;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    console.log("bad");
    console.log(e);
    throw Error(e.message);
  }
};

export const fetchMedicalReportById = async (token, appointmentId) => {
  console.log(appointmentId);
  try {
    const url = `http://localhost:3009/report/fetch-report/${appointmentId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.status);
    const jsonData = await response.json();
    if (response.status === 200) {
      console.log(jsonData);
      return jsonData;
    } else {
      throw Error(jsonData.message);
    }
  } catch (e) {
    console.log(e.message);
    throw Error(e.message);
  }
};
