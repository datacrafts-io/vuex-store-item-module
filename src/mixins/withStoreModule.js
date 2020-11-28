import { mapState, mapActions, mapMutations, mapGetters } from "vuex"
import store from "@/store"

/**
 *  Generates mixin for passed storeModule
 *
 *  @param storeModule {StoreItemsModule} imported storeModule
 *  @param {object}
 *    - name {string} Module namespace
 *    - resetFilters {Boolean} Reset filters before destroying
 *    - unloadBeforeDestroy {Boolean} Unload module before destroying
 *    - readers {Array|Object} argument for mapState
 *    - getters {Array|Object} argument for mapGetters
 *    - actions {Array|Object} argument for mapActions
 *    - mutations {Array|Object} argument for mapMutations
 *
 *  @return {object} Mixin object
 *
 *  @example
 *    const storeMixin = withStoreModule(storeModule, {
 *      name: "myModule",
 *      unloadBeforeDestroy: true,
 *      readers: ["items", "loading"] | { items: "mappedItems", loading: "mappedLoading" }
 *      getters: ["groupedByAny"] | { groupedByAny: "concreteGroupedByAny" }
 *      actions: ["ACTION_NAME"] | { ACTION_NAME: "componentMethod" }
 *      mutations: ["MUTATION_NAME"] | { MUTATION_NAME: "componentMethod" }
 *    })
 *
 *    // Your component
 *    export default {
 *      ...
 *      mixins: [storeMixin]
 *      ...
 *    }
 */
const withStoreModule = (storeModule, { name, resetState = false, readers, getters, actions, mutations }) => ({
  beforeCreate() {
    storeModule.inject({ store, name })
  },

  beforeDestroy() {
    if (store.state[name] && resetState) {
      store.commit(`${name}/RESET_STATE`, storeModule.state)
    }
  },

  computed: {
    ...mapState(name, readers || []),
    ...mapGetters(name, getters || [])
  },
  methods: {
    ...mapActions(name, actions || []),
    ...mapMutations(name, mutations || [])
  }
})

export default withStoreModule
