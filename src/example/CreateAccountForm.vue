<template>
  <div class="create-account-form">
    <input v-model="name">
    <button @click="createAccount">Save</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        name: ""
      }
    },

    methods: {
      createAccount() {
        this.$emit("createAccount", { name: this.name })

        this.name = ""
      }
    }
  }
</script>
