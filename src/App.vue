<template>
  <div id="app">
    <link
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css"
      rel="stylesheet"
    />
    <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
<<<<<<< HEAD
      <md-tab id="tab-about" md-label="About" to="/about" exact></md-tab>
=======
      <md-tab id="tab-about" md-label="about" to="/about" exact></md-tab>
>>>>>>> 841ce09650572084b350ccd6ab0de8983c3f88d5
    </md-tabs>
    <router-view />
  </div>
</template>

<style>
.container {
  width: 500px;
  margin: 20px auto;
}
</style>
