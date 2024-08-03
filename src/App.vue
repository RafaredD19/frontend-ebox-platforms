<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App"
}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500&family=Montserrat:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}

main {
  height: 100%;
  width: 100%;
  display: flex;
}
</style>