import axios from "axios";

export class teamsService {
  Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  public teams: any = [];
  public teamsSelect: any = [];
  public matches: any = [];
  constructor() {}

  async getTeams(token: string) {
    const dataTeams = await this.Api.get("/api/v1/teams", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    this.teams = dataTeams.data;
    dataTeams.data.forEach((team: any) => {
      this.teamsSelect.push({ label: team.name, value: team._id });
    });
    return { teams: this.teams, teamsSelect: this.teamsSelect };
  }

  getImageByTeamId(teamId: string) {
    return this.teams.filter((team: any) => team._id === teamId)[0];
  }

  async getMatches(token: string) {
    const dataMatches = await this.Api.get("/api/v1/matches", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    this.matches = dataMatches.data;
  }

  getMatchesByGroup(group: string) {
    return this.matches.filter((match: any) => match.group === group);
  }

  async betScore(token: string, payload: any) {
    const data = await this.Api.post(
      `/api/v1/bet/score`,
      {
        match_id: payload.match_id,
        localBet: payload.localBet ? payload.localBet : 0,
        visitorBet: payload.visitorBet ? payload.visitorBet : 0,
        betAmount: payload.betAmount,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  async betWinner(token: string, payload: any) {
    const data = await this.Api.post(
      `/api/v1/bet/winner`,
      {
        match_id: payload.match_id,
        value: payload.value,
        betAmount: payload.betAmount,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }
  async getRankUsers(token: string) {
    const data = await this.Api.get(`/api/v1/users`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data.data;
  }

  async updatePodium(token: string, userId: string, dataUpdate: any) {
    const data = await this.Api.patch(`/api/v1/users/${userId}`, dataUpdate, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return data.data;
  }
}
