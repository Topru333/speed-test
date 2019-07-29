<template>
  <div id="app">
    <div>
      <!-- As a heading -->
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-navbar-brand class="nav-link" to="/">Speed test</b-navbar-brand>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Math" right>
            <b-dropdown-item>
              <b-link to="fibonacci" router-tag="li">Fibonacci</b-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <b-link to="sqrt" router-tag="li">Sqrt</b-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#content {
  margin-top: 100px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
