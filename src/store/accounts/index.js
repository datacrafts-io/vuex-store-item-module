import StoreItemsModule from "@/store/StoreItemsModule"
import extractActions from "./actions"
import extractMutations from "./mutations"
import { withLoading } from "@/store/StoreItemsModule/helpers"

const BASE_URI = "/accounts"

const store = new StoreItemsModule({
  baseURI: BASE_URI,
  presetActions: ["fetch"],
  withSorting: {
    field: "name",
    direction: "asc"
  }
})

store.mergeState({ item: {} })

store.mergeGetters({
  usersNames: ({ items }) => items.map(item => item.name)
})

const mutations = extractMutations()
store.mergeMutations(mutations)

const { FETCH_ITEM } = extractActions({ baseURI: BASE_URI })
store.mergeActions({ FETCH_ITEM }, withLoading)

export default store
