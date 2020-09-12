export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  song: null,
  item: null,
  discover_weekly: null,
  recently_played: [],
  token: null,
  top_tracks: [],
  top_artists: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state, user: action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state, token: action.payload
      }
    case 'SET_PLAYLISTS':
      return {
        ...state, playlists: action.payload
      }
    case 'SET_DISCOVER_WEEKLY':
      return {
        ...state, discover_weekly: action.payload
      }
    case "SET_PLAYING":
      return {
        ...state, playing: action.payload,
      };

    case "SET_ITEM":
      return {
        ...state, item: action.payload,
      };
    case 'SET_RECENTLY_PLAYED':
      return {
        ...state, recently_played: action.payload
      }
    case 'SET_TOP_TRACKS':
      return {
        ...state, top_tracks: action.payload
      }
    case "SET_TOP_ARTISTS":
      return {
        ...state, top_artists: action.payload,
      };

    default:
      return state
  }
}

export default reducer