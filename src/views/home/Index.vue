<template>
  <div class="main">
    <el-header class="topHeader">
      <div class="logo">
        <a href="#"><img src="https://image.news36524.com/static/index/images/logo2.png"></a>
      </div>
    </el-header>
    <div
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled"
      :infinite-scroll-distance="300">
      <el-row id="masonry-container" v-images-loaded:on.progress="imageProgress">
        <div v-masonry
             transition-duration="0"
             item-selector=".item"
             horizontal-order="true">
          <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3.5" v-masonry-tile class="item" v-for="(item, index) in list"
                  v-bind:key="index">
            <el-link @click="goPath(item.id)" :underline="false" target="_blank">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <el-image :src="item.thumb" class="image">
                  <div slot="error" class="image-slot">
                    <div :style="{paddingBottom: '150%', backgroundColor:randomRgb()}"></div>
                  </div>
                  <div slot="placeholder" class="image-slot">
                    <div :style="{paddingBottom: '150%', backgroundColor:randomRgb()}"></div>
                  </div>
                </el-image>
                <div style="padding: 14px; font-size: 12px;">
                  <span class="card-title">{{item.title}}</span>
                  <div class="bottom clearfix">
                    <el-avatar :src="circleUrl" size="medium" class="avatar"></el-avatar>
                  </div>
                </div>
              </el-card>
            </el-link>
          </el-col>
        </div>
      </el-row>
    </div>
    <p v-if="busy" v-loading="busy"></p>
    <p v-if="noMore">没有更多了</p>
    <div style="height: 50px; width: 100%; margin-top: 20px;"> </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import imagesLoaded from 'vue-images-loaded'
import {getList} from '@/api/articles'

Vue.use(VueMasonryPlugin)
export default {
  name: 'Index.vue',
  data () {
    return {
      searchinput: '',
      busy: false,
      list: [],
      currentPage: 0,
      pagesize: 25,
      totalpage: 5,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      suijicolour: ['#767676', '#364a4c', '#ff5247', '#b469eb', '#5b2677', '#828282', '#a3081a', '#6e0f3c', '#4a85c9'],
      imgUrl: ''
    }
  },
  directives: {
    imagesLoaded
  },
  computed: {
    noMore () {
      return this.currentPage >= this.totalpage
    },
    disabled () {
      console.log('busy:', this.busy)
      return this.busy || this.noMore
    }
  },
  methods: {
    load () {
      this.busy = true
      setTimeout(() => {
        this.currentPage += 1
        this.getBlocks()
      }, 1000)
    },
    getBlocks () {
      var self = this
      const para = {
        currentPage: this.currentPage,
        pageSize: this.pagesize
      }
      console.log('当前页码：' + this.currentPage)
      getList(para).then(res => {
        const response = res.data
        if (response.code === 10000) {
          this.list = this.list.concat(response.data)
          this.totalpage = response.total / this.pagesize
          self.busy = false
          this.$redrawVueMasonry()
        }
      })
    },
    randomRgb () {
      let num = Math.floor(Math.random() * 10)
      return this.suijicolour[num]
    },
    imageProgress (instance, image) {
      this.$redrawVueMasonry()
    },
    goPath (id) {
      this.$router.push({
        path: `/content/${id}`
      })
    }
  }
}
</script>

<style>
  .main {
    height: calc(100vh - 5px);
    overflow: auto;
    margin: 0;
    padding: 0;
    /*background: #f5f5f5;*/
    background: #001935;
  }
  .topHeader{
    background: #fff;
    text-align: center;
    box-shadow: 0 1px 0 rgba(0,0,0,.06);
    top: 0;
    right: 0;
    padding: 10px;
    margin: 0 auto;
    align-items: center;
    height: 48px;
  }
  .logo{
    margin: 0 auto;
    width: 130px;
    height: 35px;
  }
  .logo img{
    width: 100%;
    height: 100%;
  }
  /*.search{*/
  /*  float: left;*/
  /*  width: 100%;*/
  /*  min-width: 407px;*/
  /*}*/
  #masonry-container {
    min-height: 550px;
    padding-top: 5px;
    margin: 0 4%;
  }
  .image {
    width: 100%;
    display: block;
    -webkit-animation: fadeIn 0.65s ease forwards;
    animation: fadeIn 0.65s ease forwards;
  }
  .item.animate{
    -webkit-animation: fadeIn 0.65s ease forwards;
    animation: fadeIn 0.65s ease forwards;
  }
  @-webkit-keyframes fadeIn {
    0% { }
    100% { opacity: 1; }
  }
  @keyframes fadeIn {
    0% { }
    100% { opacity: 1; }
  }
  .el-card {
    cursor: pointer;
    border: 0;
    margin-bottom: 10px;
    -webkit-animation: fadeIn 0.65s ease forwards;
    animation: fadeIn 0.65s ease forwards;
  }

  .card-title {
    font-size: 12px;
  }

  .item {
    padding: 10px;
    -webkit-animation: fadeIn 0.65s ease forwards;
    animation: fadeIn 0.65s ease forwards;
  }
  .bottom {
    border-top: 1px solid #F2F6FC;
    margin-top: 13px;
    line-height: 12px;
  }

  .avatar {
    margin-top: 10px;
  }
</style>
