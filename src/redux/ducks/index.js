import axios from 'axios';
import { API_KEY } from 'react-native-dotenv';
import { View } from 'react-native';

export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const PULL_SUMMONER_INFO = 'PULL_SUMMONER_INFO';
export const ADD_SUMMONER_INFO = 'ADD_SUMMONER_INFO';
export const SET_VIEW = 'SET_VIEW';

export const actions = {
  setIsLoading: () => ({ type: SET_IS_LOADING }),
  setError: errorMessage => ({
    type: SET_ERROR,
    payload: errorMessage
  }),
  addSummonerInfo: summonerInfo => ({
    type: ADD_SUMMONER_INFO,
    payload: summonerInfo
  }),
  setView: view => ({
    type: SET_VIEW,
    payload: view
  }),
  pullSummonerInfo: summonerName => (dispatch => {
    dispatch(actions.setIsLoading());
    dispatch(actions.setView('loading'));
    axios
      .get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
        headers: {
          'X-Riot-Token': API_KEY
        }
      })
      .then(res => {
        dispatch(actions.addSummonerInfo(res.data));
        dispatch(actions.setView('summoner'))
      })
      .catch(err => {
        dispatch(actions.setError(err.toString()));
        dispatch(actions.setView('error'));
      })
  })
};

const initialState = {
  isLoading: false,
  errorMessage: '',
  view: 'regular',
  summonerInfo: {}
};

export default rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }

    case SET_VIEW:
      return {
        ...state,
        view: action.payload
      }

    case ADD_SUMMONER_INFO:
      return {
        ...state,
        isLoading: false,
        summonerInfo: action.payload,
        errorMessage: ''
      }

    default:
      return state;
  }
};