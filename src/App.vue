<template>
  <div id="app">
    <link
      href="https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css"
      rel="stylesheet"
    />
    <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="Home" to="/" exact></md-tab>
      <md-tab id="tab-about" md-label="about" to="/about" exact></md-tab>
      <md-tab id="tab-happy" md-label="happy" to="/happy" exact></md-tab>
    </md-tabs>
    <router-view />
  </div>
</template>

<style></style>
