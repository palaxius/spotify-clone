export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  song: null,
  // token: null,
  token: 'BQCtfTOVmMKJpF2rtUy-sLaNml7xDf1msQQg1Cy3aXcT6Zlocj67yML91fzkZ795ZZide5Ykf1CrvHkVAVwt-jK7N6C4M2fnmUzHowV1yGgAPJqr3GvZeOj8JKrrWvO8_hZ-LVDt8YhuziUxDpkfX5jVtFZgAjZJS_-B85-v9LPnCVqE8BFQ'
}

const reducer = (state, action) => {
  console.log('Action: ', action)

  switch (action.type) {
    case 'SET_USER':
      return {
        ...state, user: action.payload
      }
    case 'SET_TOKEN':
      return {
        ...state, token: action.payload
      }
    default:
      return state
  }
}

export default reducer