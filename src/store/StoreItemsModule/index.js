import buildDefaultActions from "./actions"
import buildDefaultMutations from "./mutations"
import buildDefaultState from "./state"

import { defaultMapFiltersMethod } from "./helpers"
import { mapValues } from "lodash-es"
import bus from "@/config/bus"

/** Class for store modules creation */
class StoreItemsModule {
  /**
   * Generates config in class
   *  @param {object}
   *    - baseURI {String} Endpoint URI
   *    - presetActions {Array} Argument for generation default actions
   *    - withFilters {Boolean|Object} Filters config
   *    - withPagination {Boolean|Object} Pagination config
   *    - withSorting {Boolean|Object} Sorting config
   *    - mapFilters {Function} Function for filters map before send request to endpoint
   */
  constructor({ baseURI, presetActions, withFilters, withPagination, withSorting, mapFilters }) {
    this.config = {
      baseURI,
      presetActions: presetActions || [],
      withFilters: withFilters || false,
      withPagination: withPagination || false,
      withSorting: withSorting || false,
      mapFilters: mapFilters || defaultMapFiltersMethod
    }
    this.state = buildDefaultState(this.config)
    this.mutations = buildDefaultMutations(this.config)
    this.actions = buildDefaultActions(this.config)
  }

  /**
   * Merge passed state with default state
   *  @param {Object} State to add to store module
   */
  mergeState(state = {}) {
    this.state = { ...this.state, ...state }
  }

  /**
   * Merge passed getters with default getters
   *  @param {Object} Getters to add to store module
   */
  mergeGetters(getters = {}) {
    this.getters = { ...this.getters, ...getters }
  }

  /**
   * Merge passed mutations with default mutations
   *  @param {Object} Mutations to add to store module
   */
  mergeMutations(mutations = {}) {
    this.mutations = { ...this.mutations, ...mutations }
  }

  /**
   * Merge passed state with default state
   *  @param {Object} State to add to store module
   *  @param {Function} Function wrapper for passed actions
   */
  mergeActions(actions = {}, wrapper = undefined) {
    const newActions = wrapper ? mapValues(actions, wrapper) : actions

    this.actions = { ...this.actions, ...newActions }
  }

  /**
   * Register store module | Add function-handler which reset state module data on bus event
   * @param {Object}
   *   - store {Object} Store module
   *   - name {String} Name of registered store
   */
  inject({ store, name }) {
    const injectedStore = store.state[name]
    if (!injectedStore) {
      store.registerModule(name, this.toVuex())

      bus.$on("signOut", () => {
        store.commit(`${name}/RESET_STATE`, this.state)
      })
    }
  }

  /**
   * Get the store module
   * @return {Object} Store module
   */
  toVuex() {
    return {
      namespaced: true,
      state: { ...this.state },
      mutations: this.mutations,
      actions: this.actions,
      getters: this.getters
    }
  }
}

export default StoreItemsModule
