import { useQuery } from '@tanstack/react-query'
import userMatchesAPI from '../../services/user-matches.services'



export const userMatchesKeys = {
  all: ['user-matches'] as const,
  getPredictionsUser: (userId: string) => [...userMatchesKeys.all, 'getPredictionsUser', userId] as const,
  getPredictionsMatch: (matchId: string) => [...userMatchesKeys.all, 'getPredictionsMatch', matchId] as const,
  getAllUser: () => [...userMatchesKeys.all, 'getAllUser'],
}

export function useGetPredictionsUser(token : string, userId : string) {
  return useQuery(userMatchesKeys.getPredictionsUser(userId), () =>
    userMatchesAPI.getPredictionsUser(token)
  )
}

export function useGetPredictionsMatch(token : string, matchId : string) {
  return useQuery(userMatchesKeys.getPredictionsMatch(matchId), () =>
    userMatchesAPI.getPredictionsMatch(token, matchId)
  )
}

export function useGetAllUser(token : string) {
  return useQuery(userMatchesKeys.getAllUser(), () =>
    userMatchesAPI.getAllUser(token)
  )
}

