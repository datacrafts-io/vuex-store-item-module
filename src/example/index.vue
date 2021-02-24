<template>
  <div class="example">
    <Loader v-if="accountsLoading"/>
    <CreateAccountForm @createAccount="createAccount" />
    <AccountsList :accounts="accounts" />
  </div>
</template>

<script>
  import withStoreModule from "@/mixins/withStoreModule"
  import accountsModule from "@/store/accounts"

  const accountsStoreMixin = withStoreModule(accountsModule, {
    name: "accounts",
    readers: {
      accounts: "items",
      accountsLoading: "loading"
    },
    getters: ["usersNames"],
    actions: {
      fetchAccounts: "FETCH_ITEMS",
      createAccount: "CREATE_ITEM"
    }
  })

  export default {
    components: {
      CreateAccountForm: () => import("./CreateAccountForm"),
      AccountsList: () => import("./AccountsList"),
      Loader: () => import("./Loader")
    },

    mixins: [accountsStoreMixin],

    mounted() {
      this.fetchAccounts()
    }
  }
</script>

<style></style>
