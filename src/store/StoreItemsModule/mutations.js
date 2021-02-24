export default ({ withPagination, withSorting, withFilters }) => {
  let mutations = { ...ITEMS_MUTATIONS, ...MISC_MUTATIONS }

  if (withPagination) {
    mutations = { ...mutations, ...PAGINATION_MUTATIONS }
  }

  if (withSorting) {
    mutations = { ...mutations, ...SORTING_MUTATIONS }
  }

  if (withFilters) {
    mutations = { ...mutations, ...FILTERS_MUTATIONS }
  }

  return mutations
}

const MISC_MUTATIONS = {
  RESET_STATE(state, newState) {
    Object.assign(state, newState)
  }
}

const ITEMS_MUTATIONS = {
  SET_ITEMS(state, payload) {
    state.items = payload
  },

  SET_LOADING(state, payload) {
    state.loading = !!payload
  }
}

const PAGINATION_MUTATIONS = {
  SET_PAGINATION_DATA(state, pagination) {
    state.pagination = pagination
  }
}

const SORTING_MUTATIONS = {
  SET_SORTING(state, sorting) {
    state.sorting = { ...state.sorting, ...sorting }
  }
}

const FILTERS_MUTATIONS = {
  SET_FILTERS(state, filters) {
    state.filters = { ...state.filters, ...filters }
  }
}
