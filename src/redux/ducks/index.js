import axios from 'axios';
import { API_KEY, LEAGUE_PATCH } from 'react-native-dotenv';

export const SET_VIEW = 'SET_VIEW';
export const PULL_SUMMONER_INFO = 'PULL_SUMMONER_INFO';
export const ADD_SUMMONER_INFO = 'ADD_SUMMONER_INFO';
export const PULL_RANKED_INFO = 'PULL_RANKED_INFO';
export const ADD_RANKED_INFO = 'ADD_RANKED_INFO';
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
  addRankedInfo: rankedInfo => ({
    type: ADD_RANKED_INFO,
    payload: rankedInfo
  }),
  addChampionsMastery: championsMastery => ({
    type: ADD_CHAMPIONS_MASTERY,
    payload: championsMastery
  }),
  addChampionData: championData => ({
    type: ADD_CHAMPION_DATA,
    payload: championData
  }),
  resetChampionsData: () => ({ type: RESET_CHAMPIONS_DATA }),
  pullSummonerInfo: summonerName => (async dispatch => {
    dispatch(actions.setView('loading'));
    dispatch(actions.resetChampionsData());
    await axios
      .get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(async res => {
        await dispatch(actions.pullRankedInfo(res.data.id));
        await dispatch(actions.pullChampionsMastery(res.data.id));
        dispatch(actions.addSummonerInfo(res.data));
        dispatch(actions.setView('summoner'))
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  }),
  pullRankedInfo: summonerId => (async dispatch => {
    await axios
      .get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(res => {
        const rankedInfo = res.data.find(item => item.queueType === 'RANKED_SOLO_5x5');
        dispatch(actions.addRankedInfo(rankedInfo));
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  }),
  pullChampionsMastery: summonerId => (async dispatch => {
    await axios
      .get(`https://eun1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(async res => {
        const topThree = res.data.slice(0, 3);
        await dispatch(actions.pullChampionData(topThree[0].championId));
        await dispatch(actions.pullChampionData(topThree[1].championId));
        await dispatch(actions.pullChampionData(topThree[2].championId));
        dispatch(actions.addChampionsMastery(topThree));
      })
      .catch(err => {
        dispatch(actions.setView('error'));
      })
  }),
  pullChampionData: championId => (async dispatch => {
    await axios
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
  championsData: [],
  rankedInfo: {}
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

      case ADD_RANKED_INFO:
        return {
          ...state,
          rankedInfo: action.payload
        }

    default:
      return state;
  }
};