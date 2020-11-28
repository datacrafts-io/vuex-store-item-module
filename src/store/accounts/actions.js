import api from "@/config/api"

export default ({ baseURI }) => ({
  FETCH_ITEM: async ({ commit }, id) => {
    const response = await api.get(`${baseURI}/item`, { id })

    commit("SET_ITEM", response)
  }
})
