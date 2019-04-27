<template>
  <div v-if="news.description" id="maindiv">
    <div class="container">
      <div class="row">
        <div class="" role="">
          <button type="button" onclick="this.parentNode.parentNode.removeChild(this.parentNode);" class="close"
            data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
          <strong><i class="fa fa-warning"></i> Tech News!</strong>
          <marquee>
            <a style="font-family: Impact; font-size: 18pt" :href="news.url" target="_blank">{{news.description}}</a>
          </marquee>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: io('http://35.240.210.212'),
      news: {
        description: '',
        url: ''
      }
    }
  },

  mounted() {
    this.socket.on('news', (data) => {
      this.news = data
    })
  }
}
</script>

<style scoped>
#maindiv {
  margin: 0 0;
}
</style>
