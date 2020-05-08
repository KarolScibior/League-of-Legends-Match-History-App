import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';

export const SET_VIEW = 'SET_VIEW';
export const PULL_SUMMONER_INFO = 'PULL_SUMMONER_INFO';
export const ADD_SUMMONER_INFO = 'ADD_SUMMONER_INFO';
export const PULL_CHAMPIONS_MASTERY = 'PULL_CHAMPIONS_MASTERY';
export const ADD_CHAMPIONS_MASTERY = 'ADD_CHAMPIONS_MASTERY';

export const actions = {
  setView: view => ({
    type: SET_VIEW,
    payload: view
  }),
  addSummonerInfo: summonerInfo => ({
    type: ADD_SUMMONER_INFO,
    payload: summonerInfo
  }),
  pullSummonerInfo: summonerName => (dispatch => {
    dispatch(actions.setView('loading'));
    axios
      .get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(res => {
        dispatch(actions.addSummonerInfo(res.data));
        dispatch(actions.pullChampionsMastery(res.data.id))
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  }),
  addChampionsMastery: championsMastery => ({
    type: ADD_CHAMPIONS_MASTERY,
    payload: championsMastery
  }),
  pullChampionsMastery: summonerId => (dispatch => {
    axios
      .get(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(res => {
        const topThree = res.data.slice(0, 3);
        dispatch(actions.addChampionsMastery(topThree));
        dispatch(actions.setView('summoner'))
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  })
};

const initialState = {
  view: 'regular',
  summonerInfo: {},
  championsMastery: []
};

export default rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_VIEW:
      return {
        ...state,
        view: action.payload
      }

    case ADD_SUMMONER_INFO:
      return {
        ...state,
        summonerInfo: action.payload,
      }

      case ADD_CHAMPIONS_MASTERY:
        return {
          ...state,
          championsMastery: action.payload
        }

    default:
      return state;
  }
};