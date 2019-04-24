<template>
  <div id="app">
    <Navbar />
    <News />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import News from './components/News'

export default {
  components: {
    Navbar,
    News
  }
}
</script>

<style>
</style>
