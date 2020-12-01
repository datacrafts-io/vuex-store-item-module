<template>
  <div>
    <h1>Vuex Store Item Module</h1>
    <Example />
  </div>
</template>

<script>
  export default {
    components: {
      Example: () => import("@/example")
    }
  }
</script>
