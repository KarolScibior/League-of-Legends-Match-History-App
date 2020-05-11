import axios from 'axios';
import { LEAGUE_PATCH, API_KEY } from 'react-native-dotenv';
import store from '../store';

export const SET_VIEW = 'SET_VIEW';
export const ADD_SUMMONER_INFO = 'ADD_SUMMONER_INFO';
export const ADD_RANKED_INFO = 'ADD_RANKED_INFO';
export const ADD_CHAMPIONS_MASTERY = 'ADD_CHAMPIONS_MASTERY';
export const ADD_CHAMPION_DATA = 'ADD_CHAMPION_DATA';
export const RESET_CHAMPIONS_DATA = 'RESET_CHAMPIONS_DATA';
export const ADD_MATCH_HISTORY = 'ADD_MATCH_HISTORY';
export const ADD_TOTAL_GAMES = 'ADD_TOTAL_GAMES';
export const ADD_LAST_PAGINATION_PAGE = 'ADD_LAST_PAGINATION_PAGE';
export const CHANGE_PAGINATION = 'CHANGE_PAGINATION';
export const ADD_MATCH_DATA = 'ADD_MATCH_DATA';
export const RESET_MATCH_DATA = 'RESET_MATCH_DATA';
export const ADD_SUMMONER_SPELLS = 'ADD_SUMMONER_SPELLS';

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
  addChampionData: (championData, type) => ({
    type: ADD_CHAMPION_DATA,
    payload: { championData, type }
  }),
  addMatchHistory: matches => ({
    type: ADD_MATCH_HISTORY,
    payload: matches
  }),
  addTotalGames: number => ({
    type: ADD_TOTAL_GAMES,
    payload: number
  }),
  addLastPaginationPage: number => ({
    type: ADD_LAST_PAGINATION_PAGE,
    payload: number
  }),
  addMatchData: matchData => ({
    type: ADD_MATCH_DATA,
    payload: matchData
  }),
  changePagination: (number, type) => ({
    type: CHANGE_PAGINATION,
    payload: { number, type }
  }),
  resetChampionsData: type => ({
    type: RESET_CHAMPIONS_DATA,
    payload: type
  }),
  addSummonerSpells: summonerSpells => ({
    type: PULL_SUMMONER_SPELLS,
    payload: summonerSpells
  }),
  resetMatchData: () => ({ type: RESET_MATCH_DATA }),
  pullSummonerInfo: summonerName => (async dispatch => {
    dispatch(actions.setView('loading'));
    dispatch(actions.resetChampionsData('mastery'));
    dispatch(actions.resetChampionsData('matches'));
    dispatch(actions.changePagination(0, 'first'));
    await axios
      .get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(async res => {
        const beginIndex = store.getState().pagination.beginIndex;
        const endIndex = store.getState().pagination.endIndex;
        await dispatch(actions.pullRankedInfo(res.data.id));
        await dispatch(actions.pullChampionsMastery(res.data.id));
        await dispatch(actions.pullMatchHistory(res.data.accountId, beginIndex, endIndex));
        dispatch(actions.addSummonerInfo(res.data));
        dispatch(actions.setView('summoner'))
      })
      .catch(err => {
        console.log('pull summoner error', err.toString());
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
        console.log('pull ranked error', err.toString());
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
        await dispatch(actions.pullChampionData(topThree[0].championId, 'mastery'));
        await dispatch(actions.pullChampionData(topThree[1].championId, 'mastery'));
        await dispatch(actions.pullChampionData(topThree[2].championId, 'mastery'));
        dispatch(actions.addChampionsMastery(topThree));
      })
      .catch(err => {
        console.log('pull mastery error', err.toString());
        dispatch(actions.setView('error'));
      })
  }),
  pullChampionData: (championId, type) => (async dispatch => {
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
        if (type === 'mastery') {
          dispatch(actions.addChampionData(championData, 'mastery'));
        } else if (type === 'matches') {
          dispatch(actions.addChampionData(championData, 'matches'));
        }

      })
      .catch(err => {
        console.log('pull champion data error', err.toString());
        dispatch(actions.setView('error'));
      })
  }),
  pullMatchHistory: (accountId, beginIndex, endIndex) => (async dispatch => {
    await axios
      .get(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?endIndex=${endIndex}&beginIndex=${beginIndex}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(async res => {
        //dispatch(actions.addTotalGames(res.data.totalGames));
        //dispatch(actions.addLastPaginationPage(Math.ceil(res.data.totalGames / 5)));
        dispatch(actions.addMatchHistory(res.data.matches));
        dispatch(actions.resetChampionsData('matches'));
        dispatch(actions.resetMatchData());
        //
        //       TO NA DOLE TO JEST NIEPOPRAWNIE NA MAKSA, ALE NIE WIEM ZA BARDZO JAK
        //       DISPATCHOWAĆ W PĘTLI, A JAK PRÓBUJE TO MI SIĘ WYWALA WSZYSTKO, TAKŻE
        //       NA RAZIE IDZIEMY DALEJ, KIEDYŚ TU WRÓCIMY OKI DZIĘKI POZDRAWIAM
        //
        await dispatch(actions.pullChampionData(res.data.matches[0].champion, 'matches'));
        await dispatch(actions.pullMatchData(res.data.matches[0].gameId));
        await dispatch(actions.pullChampionData(res.data.matches[1].champion, 'matches'));
        await dispatch(actions.pullMatchData(res.data.matches[1].gameId));
        await dispatch(actions.pullChampionData(res.data.matches[2].champion, 'matches'));
        await dispatch(actions.pullMatchData(res.data.matches[2].gameId));
        await dispatch(actions.pullChampionData(res.data.matches[3].champion, 'matches'));
        await dispatch(actions.pullMatchData(res.data.matches[3].gameId));
        await dispatch(actions.pullChampionData(res.data.matches[4].champion, 'matches'));
        await dispatch(actions.pullMatchData(res.data.matches[4].gameId));
      })
      .catch(err => {
        console.log('pull match history error', err.toString());
        dispatch(actions.setView('error'));
      })
  }),
  pullMatchData: matchId => (async dispatch => {
    await axios
      .get(`https://eun1.api.riotgames.com/lol/match/v4/matches/${matchId}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(res => {
        dispatch(actions.addMatchData(res.data));
      })
      .catch(err => {
        console.log('pull match data error', err.toString());
        dispatch(actions.setView('error'));
      })
  }),
  pullSummonerSpells: () => (async dispatch => {
    await axios
      .get(`http://ddragon.leagueoflegends.com/cdn/${LEAGUE_PATCH}/data/en_US/summoner.json`)
      .then(res => {
        dispatch(actions.addSummonerSpells(res.data));
      })
      .catch(err => {
        console.log('pull summoner spells error', err.toString());
        dispatch(actions.setView('error'));
      })
  })
};

const initialState = {
  view: 'regular',
  summonerInfo: {},
  championsMastery: [],
  masteryChampionsData: [],
  rankedInfo: {},
  pagination: {
    beginIndex: 0,
    endIndex: 5,
    firstPage: 1,
    lastPage: 30,
    currentPage: 1
  },
  totalGames: 0,
  matches: [],
  matchesChampionsData: [],
  matchesData: [],
  summonerSpells: {}
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
      if (action.payload.type === 'mastery') {
        return {
          ...state,
          masteryChampionsData: [...state.masteryChampionsData, action.payload.championData]
        }
      } else if (action.payload.type === 'matches') {
        return {
          ...state,
          matchesChampionsData: [...state.matchesChampionsData, action.payload.championData]
        }
      }

    case RESET_CHAMPIONS_DATA:
      if (action.payload === 'mastery') {
        return {
          ...state,
          masteryChampionsData: []
        }
      } else if (action.payload === 'matches') {
        return {
          ...state,
          matchesChampionsData: []
        }
      }

    case ADD_RANKED_INFO:
      return {
        ...state,
        rankedInfo: action.payload
      }

    case ADD_MATCH_HISTORY:
      return {
        ...state,
        matches: action.payload
      }

    case ADD_TOTAL_GAMES:
      return {
        ...state,
        matches: action.payload
      }

    case ADD_LAST_PAGINATION_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          lastPage: action.payload
        }
      }

    case CHANGE_PAGINATION:
      const p = state.pagination;
      switch (action.payload.type) {
        case 'left':
          return {
            ...state,
            pagination: {
              ...p,
              beginIndex: p.beginIndex - 5,
              endIndex: p.endIndex - 5,
              currentPage: p.currentPage - 1
            }
          }

        case 'right':
          return {
            ...state,
            pagination: {
              ...p,
              beginIndex: p.beginIndex + 5,
              endIndex: p.endIndex + 5,
              currentPage: p.currentPage + 1
            }
          }

        case 'index':
          const { number } = action.payload;
            return {
              ...state,
              pagination: {
                ...p,
                beginIndex: (number * 5) - 5,
                endIndex: (number * 5),
                currentPage: number
              }
            }

        case 'first':
          return {
            ...state,
            pagination: {
              ...p,
              beginIndex: 0,
              endIndex: 5,
              currentPage: p.firstPage
            }
          }

        case 'last':
          return {
            ...state,
            pagination: {
              ...p,
              beginIndex: (p.lastPage * 5) - 5,
              endIndex: (p.lastPage * 5 ),
              currentPage: p.lastPage
            }
          }

        default:
          return state;
      }

    case ADD_MATCH_DATA:
      return {
        ...state,
        matchesData: [...state.matchesData, action.payload]
      }

    case RESET_MATCH_DATA:
      return {
        ...state,
        matchesData: []
      }

    case ADD_SUMMONER_SPELLS:
      return {
        ...state,
        summonerSpells: action.payload
      }

    default:
      return state;
  }
};