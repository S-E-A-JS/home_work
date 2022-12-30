import httpService from "./http.service"

const TODOS_ENDPOINT = "todos/"

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get ( TODOS_ENDPOINT, {
      params: {
        _page: 1,
        _limit: 10,
      },
    } )
    return data
  },
  send: async payload => {
    const { data } = await httpService.post ( TODOS_ENDPOINT, {
      title: "title",
      completed: false,
      userId: 1,
      id: payload,
    } )
    return data
  },
}

export default todosService