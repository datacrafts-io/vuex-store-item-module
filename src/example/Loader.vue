<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
  .loader-wrapper {
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    display: flex;
    height: 100vh;
    justify-content: center;
    position: fixed;
    width: 100%;
  }

  .loader {
    animation: spin 2s linear infinite;
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    height: 40px;
    width: 40px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
