import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UserPrediction {
  user_id: string;
  match_id: string;
  bets: {
    scoreBet: {
      localBet: number;
      visitorBet: number;
      betAmount: number;
    };
    winBet: {
      winner: 'local' | 'visitor' | 'tie';
      betAmount: number;
    };
  };
}

export interface UserShort {
  _id: string;
  names: string;
  score: number;
}

const userMatchesAPI = {
  async getPredictionsUser(token: string): Promise<UserPrediction[]> {
    const response = await axiosClient.get('/api/v1/bet/user', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  },

  async getPredictionsMatch(
    token: string,
    matchId: string
  ): Promise<UserPrediction[]> {
    const response = await axiosClient.get(`/api/v1/bet/match/${matchId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  },

  async getAllUser(token: string): Promise<UserShort[]> {
    const response = await axiosClient.get(`/api/v1/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    return response.data;
  },
};

export default userMatchesAPI;
