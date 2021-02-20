<template>
  <div style="margin: 20px 100px;">
    <el-card :body-style="{ padding: '0px' }" shadow="always" style="width: 500px">
      <el-image
        style=""
        :src="url"
        fit="fill"></el-image>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'content.vue',
  data () {
    return {
      url: 'https://image.news36524.com/uploads/20200318/455f370d33e7c4b64a454c5d73a9c7d1.jpg',
      id: 0
    }
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style scoped>

</style>
