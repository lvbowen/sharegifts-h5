<template>
  <div class="header">
    <header>
      <div class="imgBoxs">
        <img :src="goodInfo.order_image" alt="">
      </div>
      <div class="rightBox">
        <h1 class="tl ellipsis" style="margin-left:10px">
          <i class="iconfont icon-taobao2" v-if="goodInfo.shop_type==1"></i>
          <i class="iconfont icon-jingdong_" v-if="goodInfo.shop_type==2"></i>
          {{goodInfo.active_name?goodInfo.active_name:'无标题'}}</h1>
        <p>
          <label for="">店铺名称：</label>{{goodInfo.shop_name}}
        </p>
        <p>
          <label for="">价格：</label>
          <span>{{goodInfo.price}}元</span>
        </p>
        <p>
          <label for="">规格：</label>
          <span>{{goodInfo.properties_name}}{{goodInfo.remarks}}</span>
        </p>
      </div>
    </header>
  </div>
</template>
<script>
import { getGood } from "@/api/API"
import { mapGetters } from 'vuex'
import Header from '@/components/ActivityInfo'
export default {
  data () {
    return {
      goodInfo: {}
    }
  },
  created () {
    console.log(this.sendId)
    this.init()
  },
  props: ['sendId'],
  computed: {
    ...mapGetters([
      'activeId'
    ])
  },
  watch: {
    activeId (news, old) {
      console.log(news)
    }
  },
  methods: {
    //获取商品详情
   init () {
      getGood({ active_id: this.sendId, page: 1, limit: 10 }).then(response => {
        let res = response.data
        if (res.success) {
          this.goodInfo = res.data.data[0]
          this.goodInfo.shop_name = this.dealTit(this.goodInfo.shop_name)
        }
      })
    },
    dealTit (str) {
      let arr = str.split('')
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 != 0) {
          arr[i] = '*'
        }
      }
      return arr.join('')
    },
  }

}
</script>
<style lang="less" scoped>
header {
  height: 220px;
  background: #fff;
  margin: 20px 0;
  padding: 30px;
  display: flex;
  box-sizing: border-box;
  .imgBoxs {
    width: 160px;
    height: 160px;
    img{
      width:100%;
      height:100%;
    }
  }
  .rightBox {
    margin-left: 10px;
    font-size: 30px;
    h1 {

      i {
        color: #ff6b06;
        margin-right: 10px;
      }
    }
    p {
      font-size: 24px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: #363837;
      text-align: left;
      padding-left: 20px;
      label {
        color: #939994;
      }
      span {
        color: #ff433d;
      }
    }
  }
}
</style>


