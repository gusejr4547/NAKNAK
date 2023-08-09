import axios from "axios";

async function upgradeProgress(status, accessToken) {
  try {
    const response = await axios.post(
      "/api1/api/members/status/progress",
      { data: { tutorialProgress: status } },
      {
        headers: { authorization: accessToken },
      }
    );
    return response;
  } catch (err) {
    throw err;
  }
}

export default upgradeProgress;
