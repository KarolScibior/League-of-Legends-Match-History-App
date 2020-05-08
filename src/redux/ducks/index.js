import axios from 'axios';
import { API_KEY, LEAGUE_PATCH } from 'react-native-dotenv';

export const SET_VIEW = 'SET_VIEW';
export const PULL_SUMMONER_INFO = 'PULL_SUMMONER_INFO';
export const ADD_SUMMONER_INFO = 'ADD_SUMMONER_INFO';
export const PULL_CHAMPIONS_MASTERY = 'PULL_CHAMPIONS_MASTERY';
export const ADD_CHAMPIONS_MASTERY = 'ADD_CHAMPIONS_MASTERY';
export const PULL_CHAMPION_DATA = 'PULL_CHAMPION_DATA';
export const ADD_CHAMPION_DATA = 'ADD_CHAMPION_DATA';
export const RESET_CHAMPIONS_DATA = 'RESET_CHAMPIONS_DATA';

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
      .then(async res => {
        const topThree = res.data.slice(0, 3);
        dispatch(actions.addChampionsMastery(topThree));
        dispatch(actions.resetChampionsData());
        await topThree.forEach(async item => {
          await dispatch(actions.pullChampionData(item.championId));
        });
        dispatch(actions.setView('summoner'))
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  }),
  addChampionData: championData => ({
    type: ADD_CHAMPION_DATA,
    payload: championData
  }),
  resetChampionsData: () => ({ type: RESET_CHAMPIONS_DATA }),
  pullChampionData: championId => (dispatch => {
    axios
      .get(`http://ddragon.leagueoflegends.com/cdn/${LEAGUE_PATCH}/data/en_US/champion.json`)
      .then(res => {
        const arr = Object.entries(res.data.data);
        let championData;
        arr.forEach((item, index) => {
          let id = Number(Object.entries(arr[index][1])[2][1]);
          if (id === championId) {
            championData = item;
          };
        })
        dispatch(actions.addChampionData(championData));
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  })
};

const initialState = {
  view: 'regular',
  summonerInfo: {},
  championsMastery: [],
  championsData: []
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

      case ADD_CHAMPION_DATA:
        return {
          ...state,
          championsData: [...state.championsData, action.payload]
        }

      case RESET_CHAMPIONS_DATA:
        return {
          ...state,
          championsData: []
        }

    default:
      return state;
  }
};