import { API } from '../../constant/Url';

const leaderboardAPI = {
  getAllLeaderboards: async () => {
    const response = await fetch(API.LEADERBOARDS);
    const data = await response.json();
    return data;
  },
};

export default leaderboardAPI;
