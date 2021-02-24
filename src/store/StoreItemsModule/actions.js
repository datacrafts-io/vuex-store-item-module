import api from "@/config/api"
import { withLoading, buildParams } from "./helpers"
import { includes, isEmpty } from "lodash-es"

export default ({ presetActions, ...config }) => {
  const moduleActions = {}

  if (!config.baseURI || isEmpty(presetActions)) return moduleActions
  if (!(presetActions instanceof Array)) throw `Type mismatch for ${presetActions}`

  ACTIONS.forEach(action => {
    if (includes(presetActions, action)) {
      const uppercased = action.toUpperCase()
      const actionName = action === "fetch" ? `${uppercased}_ITEMS` : `${uppercased}_ITEM`
      moduleActions[actionName] = actionsToDefine[uppercased](config)
    }
  })

  return moduleActions
}

const ACTIONS = ["fetch", "create", "update", "delete"]

const actionsToDefine = {
  FETCH: config => {
    return withLoading(async ({ commit, state }, { ...customParams } = {}) => {
      const params = buildParams(state, config, customParams)
      const response = await api.get(config.baseURI, { params })

      return defaultSuccessCallback(response, commit, config.withPagination)
    })
  },
  CREATE: config => {
    return withLoading(async ({ commit, state }, customParams) => {
      const params = buildParams(state, config, customParams)
      const response = await api.post(config.baseURI, params)

      return defaultSuccessCallback(response, commit, config.withPagination)
    })
  },
  UPDATE: config => {
    return withLoading(async ({ commit, state }, { id, ...customParams }) => {
      const params = buildParams(state, config, customParams)
      const response = await api.patch(`${config.baseURI}/${id}`, params)

      return defaultSuccessCallback(response, commit, config.withPagination)
    })
  },
  DELETE: config => {
    return withLoading(async ({ commit, state }, id) => {
      const params = buildParams(state, config)
      const response = await api.delete(`${config.baseURI}/${id}`, params)

      return defaultSuccessCallback(response, commit, config.withPagination)
    })
  }
}

const defaultSuccessCallback = ({ data }, commit, withPagination) => {
  if (withPagination) {
    commit("SET_ITEMS", data.items)
    commit("SET_PAGINATION_DATA", data.meta.pagination)

    return data.items
  } else {
    commit("SET_ITEMS", data)

    return data
  }
}
