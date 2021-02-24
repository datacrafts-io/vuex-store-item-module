<template>
  <div class="accounts-list">
    <div v-for="{ id, name } in accounts" :key="id">
      <span>ID: {{ id }}</span>
      <span>, </span>
      <span>Name: {{ name }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      accounts: {
        type: Array,
        default: () => new Array()
      }
    }
  }
</script>
