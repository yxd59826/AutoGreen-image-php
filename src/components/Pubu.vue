<template>
  <div class="page-with"  v-loading.fullscreen.lock="pageloading">
    <div id="masonry-container" v-images-loaded:on.progress="imageProgress">
      <div v-masonry
           transition-duration="0.1s"
           item-selector=".item"
           :fit-width="true"
           :origin-top="false"
           :horizontal-order="false">
        <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="3" v-masonry-tile class="item" v-for="(item, index) in blocks"
                v-bind:key="index">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <el-image :src="item.thumb" class="image">
              <div slot="placeholder" class="image-slot">
                <div :style="{backgroundColor:rankColor(index)}"></div>
              </div>
            </el-image>
            <div style="padding: 14px; font-size: 12px;">
              <span class="card-title">{{item.title}}</span>
              <div class="bottom clearfix">
                <el-avatar :src="circleUrl" size="medium" class="avatar"></el-avatar>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {VueMasonryPlugin} from 'vue-masonry'
import imagesLoaded from 'vue-images-loaded'
import {getList} from '@/api/articles'

Vue.use(VueMasonryPlugin)

export default {
  name: 'Pubu',
  props: {
    busy: {
      type: Boolean,
      default: false
    },
    loadMore: Function
  },
  directives: {
    imagesLoaded
  },
  data () {
    return {
      blocks: [],
      currentPage: 1,
      pagesize: 25,
      count: 0,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      pageloading: true,
      suijicolour: ['#b4ffe3', '#66CDAA', '#acc2e6', '#d7b0d8', '#95abe6', '#ffc47b', '#b6d288', '#f49586', '#bcaf7a'],
      total: 100
    }
  },
  created () {
    this.getBlocks()
  },
  methods: {
    imageProgress (instance, image) {
      this.$redrawVueMasonry()
    },
    getBlocks () {
      const para = {
        currentPage: this.currentPage,
        pageSize: this.pagesize
      }
      console.log('当前页码：' + this.currentPage)
      getList(para).then(res => {
        const response = res.data
        if (response.code === 10000) {
          this.blocks = this.blocks.concat(response.data)
          this.pageloading = false
          this.total = response.total
          this.count += this.pagesize
          this.busy = false
          console.log('count2:', this.count)
        }
      })
      console.log('getBlocks-loading:', this.loading)
    },
    load () {
      this.busy = true
      setTimeout(() => {
        console.log('-------------------')
        console.log('数据获取')
        this.currentPage += 1
        this.getBlocks()
      }, 1000)
    },
    rankColor (num) {
      return this.suijicolour[num]
    }
  }
}
</script>

<style scoped>
  .page-with {
    height: 1200px;
    margin: 0;
    padding: 0;
    background: #f5f5f5;
    overflow-y: auto;
  }

  #masonry-container {
    margin: 0 6em;
    padding-top: 5px;
    overflow: hidden;
  }

  .image {
    width: 100%;
    display: block;
  }

  .el-card {
    cursor: pointer;
    border: 0;
    margin-bottom: 10px;
  }

  .card-title {
    font-size: 12px;
  }

  .item {
    padding: 7px;
  }

  .bottom {
    border-top: 1px solid #F2F6FC;
    margin-top: 13px;
    line-height: 12px;
  }

  .avatar {
    margin-top: 10px;
  }

  .scrollbar-wrapper {
    overflow: hidden;
  }
</style>
