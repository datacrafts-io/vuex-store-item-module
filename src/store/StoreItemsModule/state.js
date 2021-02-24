import { isObject } from "lodash-es"

export default ({ withPagination, withSorting, withFilters }) => {
  const state = defaultItemsState()

  if (withPagination) {
    state.pagination = defaultPaginationState()
  }

  if (withSorting) {
    if (isObject(withSorting)) {
      state.sorting = withSorting
    } else {
      state.sorting = defaultSortingState()
    }
  }

  if (withFilters) {
    if (isObject(withFilters)) {
      state.filters = withFilters
    } else {
      state.filters = defaultFilterState()
    }
  }

  return state
}

const defaultItemsState = () => ({
  items: [],
  loading: false,
})
const defaultPaginationState = () => ({
  current_page: 1,
  per_page: 25,
  total_pages: 0,
  total_count: 0
})
const defaultSortingState = () => ({
  field: "name",
  direction: "asc"
})
const defaultFilterState = () => ({
  search_value: ""
})
