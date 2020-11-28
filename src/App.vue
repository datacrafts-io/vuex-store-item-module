<template>
  <h1>Vuex Store Item Module</h1>
</template>

<script>
  import withStoreModule from "@/mixins/withStoreModule"
  import accountsStore from "@/store/accounts"

  const accountsStoreModule = withStoreModule(accountsStore, {
    name: "accounts",
    readers: {
      accounts: "items",
      account: "item"
    },
    getters: ["usersNames"],
    actions: {
      fetchAccounts: "FETCH_ITEMS",
      fetchAccount: "FETCH_ITEM"
    }
  })

  export default {
    mixins: [accountsStoreModule],

    mounted() {
      this.fetchAccounts()
      this.fetchAccount(3)
    }
  }
</script>

<style></style>
