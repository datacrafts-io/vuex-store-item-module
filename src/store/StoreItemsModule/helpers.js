import { slice } from "lodash-es"

export const withLoading = callback => async (store, ...args) => {
  const { commit } = store

  commit("SET_LOADING", true)
  const value = await callback(store, ...args)
  commit("SET_LOADING", false)

  return value
}

export const buildParams = ({ pagination, sorting, filters }, config, customParams = {}) => {
  const params = { ...customParams }

  if (config.withPagination) {
    params.pagination = { ...pagination, ...params.pagination }
  }
  if (config.withSorting) {
    params.sorting = normalizeSortingParams(sorting)
  }
  if (config.withFilters) {
    params.filters = config.mapFilters(filters)
  }

  return params
}

export const deleteItemByIndex = (state, index) => {
  const deleted = state.items.splice(index, 1).filter(({ id }) => id)
  state.itemsDeleted = [...state.itemsDeleted, ...deleted]
}

export const defaultMapFiltersMethod = filters => filters

export const paginateData = ({ data, current_page, per_page }) => {
  const totalCount = data.length
  const totalPages = Math.ceil(totalCount / per_page)
  const start = per_page * (current_page - 1)
  const end = start + per_page
  return {
    data: slice(data, start, end),
    pagination: {
      current_page,
      per_page,
      total_pages: totalPages,
      total_count: totalCount
    }
  }
}

export const normalizeSortingParams = ({ field, type, direction }) => {
  if (type) {
    return { field, direction: type }
  } else {
    return { field, direction }
  }
}
