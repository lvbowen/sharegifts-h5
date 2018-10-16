<template>
  <div class="firstStep">
    <Header :send-id="active_id"></Header>
    <div class="mainBox">
      <h1>
        <span>搜索流程</span>
      </h1>
      <div class="stepBox">
        <p>
          <span class="num">1</span>打开
          <span class="high">手机淘宝APP</span>
        </p>
        <div class="content">
          <div class="contentC"></div>
        </div>

      </div>
      <div class="stepBox">
        <p class="pr">
          <span class="num pa">2</span>
          <p class="textTitle">登陆
            <span v-if="shop_type==1" class="shop_type">淘宝账号</span>
            <span v-if="shop_type==2" class="shop_type">京东账号</span>
            <span class="high">{{accountInfo.account}}</span>进入购物车，找到宝贝
          </p>
        </p>
        <div class="content">
          <div class="contentC"></div>
        </div>
      </div>
      <div class="stepBox" v-if="joinNum<3">
        <p class="pr">
          <span class="num pa">3</span>
          <p class="textTitle">
            在宝贝详情页底部点击
            <span class="high">关注/收藏按钮</span>，关注收藏宝贝，如图</p>
          </p>
        <div class="content">
          <div class="contentC inner">
            <div class="exampleImg">
              <img src="../../assets/images/collectGood.png" alt="">
            </div>
            关注/收藏宝贝：
            <div class="uploadImgBox" v-if="params.concern_shop">
              <img :src="params.concern_shop" alt="">
              <i class="iconfont icon-jian jh" @click="delImg(1)"></i>
            </div>
            <button @click="initUploadBtn(1)" v-if="!params.concern_shop">
              <i class="iconfont icon-STYL"></i>上传截图
            </button>
          </div>
        </div>
      </div>
      <div class="stepBox" v-if="joinNum<3">
        <p class="pr">
          <span class="num pa">4</span>
          <p class="textTitle">
            在宝贝详情页底部点击店铺按钮进入店铺，页面顶部店铺名字旁，
             <span class="high">点击关注</span>，如图
          </p>
        </p>
        <div class="content">
          <div class="contentC inner" :class="{thirdStep:!params.keyword_search}">
            <div class="exampleImg">
              <img src="../../assets/images/gz.png" alt="">
            </div>
            关注/收藏店铺：
            <div class="uploadImgBox" v-if="params.collection_goods">
              <img :src="params.collection_goods" alt="">
              <i class="iconfont icon-jian jh" @click="delImg(2)"></i>
            </div>
            <button @click="initUploadBtn(2)" v-if="!params.collection_goods">
              <i class="iconfont icon-STYL"></i>上传截图
            </button>
          </div>
        </div>
      </div>
      <div class="stepBox" v-if="status==3&&joinNum>=3">
        <p>
          <span class="num">{{joinNum<3?5:3}}</span>请上传竞品货比图
        </p>
        <div class="content">
          <div class="contentC inner thirdStep" style="border:none">
            <div class="searchBox">
              <div class="uploadImgBox" v-if="params.keyword_search">
                <img :src="params.keyword_search" alt="">
                <i class="iconfont icon-jian jh" @click="delImg(3)"></i>
              </div>
              <button @click="initUploadBtn(3)" v-if="!params.keyword_search">
                <i class="iconfont icon-STYL"></i>上传截图
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button @click="next" v-if="joinNum<3">下一步</button>
      <button @click="reSupply" v-if="joinNum>=3">确认申请</button>
    </footer>

  </div>
</template>
<script>
import Header from '@/components/ActivityInfo'
import { mapGetters, mapMutations } from 'vuex'
import { getJoinInfo, GfActive, uploadImg, reAddActivy } from '@/api/API'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      id: 0,
      active_id: 0,
      tempImg: {
        localId: '',
        serverId: ''
      },
      params: {},
      tempImg: {
        localId: '',
        serverId: ''
      },
      joinNum: 0,
      shop_type: 1,
    }
  },
  components: {
    Header
  },
  created () {
    this.dealUrl(location.href)
    this.getWXconfig()
  },
  computed: {
    ...mapGetters([
      'reportObj',
      'accountInfo',
      'activeId',
      'status',
      'resupplyObj'
    ])
  },
  methods: {
    next () {
      if (!this.params.collection_goods) {
        this.$alert('请上传关注/收藏宝贝图片！')
        return
      }
      if (!this.params.concern_shop) {
        this.$alert('请上传关注/收藏店铺图片！')
        return
      }
      this.$router.push({
        path: '/supplySecond'
      })
    },
    reSupply () {
      let params = {
        detail_id: this.id,
        keyword_search: this.params.keyword_search
      }
      reAddActivy(params).then(response => {
        let res = response.data
        if (res.success) {
          this.$alert('提交成功')
          wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
              wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
            }
          });
        }
      })

    },
    dealUrl (url) {
      if (url.indexOf('?') > -1) {
        let str = url.split('?')[1];
        this.id = str.split('&')[0].split('=')[1]
        this.active_id = str.split('&')[1].split('=')[1]
        let token = str.split('&')[2].split('=')[1]
        let status = str.split('&')[3].split('=')[1]
        localStorage.setItem('token', token)
        this.getActiveId(this.active_id)
        this.getStatus(status)
        if (status != 3) {
          this.params = {
            detail_id: this.id,
            concern_shop: this.params.concern_shop,
            collection_goods: this.params.collection_goods,
            goods_compared: '',
            order_screenshot: '',
            order_id: ''
          }
          this.getReportObj(this.params)
        } else {
          this.params = {
            detail_id: this.id,
            concern_shop: this.params.concern_shop,
            collection_goods: this.params.collection_goods,
            goods_compared: '',
            keyword_search: this.params.keyword_search
          }
          this.getReObj(this.params)
        }
        this.getOwnJoinInfos()

      }
    },
    //获取上传详情
    getOwnJoinInfos () {
      getJoinInfo({ id: this.id }).then(response => {
        let res = response.data
        if (res.success) {
          this.getAccounrObj(res.data)
          this.shop_type = this.accountInfo.active_info.shop_type
          this.joinNum = res.data.join_num
        }
      })
    },
    ...mapMutations({
      getReportObj: 'GET_REPORT_OBJ',
      getAccounrObj: 'GET_ACCOUNT_OBJ',
      getActiveId: 'GET_ACTIVE_ID',
      getStatus: 'GET_STATUS',
      getReObj: 'GET_RE_OBJ'

    }),
    getWXconfig () {
      GfActive({ url: location.href.split('#')[0] }).then(response => {
        let res = response.data
        if (res.success) {
          this.jssdk_config = res.data
          this.initWxJDK(res.data);
        }
      })
    },
    initWxJDK (jssdk_config) {
      wx.config({
        appId: jssdk_config.appId,
        timestamp: jssdk_config.timestamp,
        nonceStr: jssdk_config.nonceStr,
        signature: jssdk_config.signature,
        url: jssdk_config.url,
        nonceStr: jssdk_config.nonceStr,
        jsApiList: [
          'chooseImage',
          'uploadImage',
          'getLocalImgData'
        ]
      });
    },
    initUploadBtn (index) {
      wx.ready(() => {
        //点击上传打开微信提供的相册
        wx.chooseImage({
          count: 1,
          success: (res) => {
            this.tempImg.localId = res.localIds[0]
            this.tempImg.serverId = ''
            this.uploadImage(index)
          },
          fail: (res) => {
            alert(JSON.stringify(res))
          }
        })
      })
    },

    // 上传图片
    uploadImage (index) {
      //上传图片至微信服务器
      wx.uploadImage({
        localId: this.tempImg.localId,
        success: (res) => {
          this.tempImg.serverId = res.serverId
          uploadImg({
            mediaId: this.tempImg.serverId
          }).then(response => {
            let result = response.data
            if (result.success) {
              if (index == 1) {
                this.params.concern_shop = result.data[0]
              } else if (index == 2) {
                this.params.collection_goods = result.data[0]
              } else if (index == 3) {
                this.params.keyword_search = result.data[0]
              }

            }
          })
        },
        fail: (res) => {
          alert(res)
        }
      })
    },
    //删除图片
    delImg (i) {
      if (i == 1) {
        this.params.concern_shop = ''
      } else if (i == 2) {
        this.params.collection_goods = ''
      } else {
        this.params.keyword_search = ''
      }
      this.$alert('图片删除成功！')
    }

  }
}
</script>
<style lang='less'>
@color-base: #ff433d;
.firstStep {
  width: 100%;
  height: 100%;
  line-height: normal;
  overflow: scroll;

  .mainBox {
    background: #fff;
    h1 {
      width: 100%;
      height: 87px;
      font-size: 30px;
      font-family: PingFang-SC-Bold;
      font-weight: bold;
      color: rgba(54, 56, 55, 1);
      line-height: 36px;
      border-bottom: 1px solid #eeeeee;
      padding-left: 30px;
      span {
        display: inline-block;
        border-bottom: 4px solid #ff504b;
        line-height: 83px;
        float: left;
      }
    }
    .stepBox {
      padding: 0 30px;
      p {
        font-size: 26px;
        margin: 30px;
        margin-left: 0;
        font-family: PingFang-SC-Medium;
        line-height: 40px;
        color: rgba(53, 56, 55, 1);
        text-align: left;
        span.num {
          display: inline-block;
          color: #fff;
          background: #ff504b;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          line-height: 40px;
          text-align: center;
          margin-right: 22px;
        }
      }
      .content {
        padding: 0 20px;

        .contentC {
          padding: 20px;
          border-left: 1px solid #ff504b;
          p {
            font-size: 26px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(52, 56, 55, 1);
            line-height: 55px;
            padding-left: 40px;
            .high {
              color: @color-base;
              vertical-align: baseline;
            }
            img {
              height: 52px;
            }
          }
          .shopName {
            height: 72px;
            padding-left: 40px;
            input {
              width: 461px;
              height: 72px;
              border: 1px solid #ccc;
              padding-left: 27px;
            }
          }
          .tips {
            font-size: 26px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(146, 153, 147, 1);
            line-height: 31px;
            text-align: left;
            padding-left: 40px;
          }

          .checkBtn {
            width: 618px;
            height: 66px;
            margin-left: 40px;
            button {
              width: 100%;
              height: 100%;
              border: none;
              border-radius: 4px;
              color: #fff;
              background: @color-base;
            }
          }
        }
        .inner {
          padding-left: 60px !important;
          text-align: left;
          font-size: 26px;
          line-height: 55px;
          padding-bottom: 40px;
          button {
            width: 224px;
            height: 66px;
            border-radius: 33px;
            border: 2px solid @color-base;
            color: @color-base;
            background: #fff;
          }
          .searchBox {
            margin: 0 auto;
            text-align: center;
          }
        }
        .thirdStep {
          border: none;
          .high {
            color: @color-base;
          }
        }
      }
    }
  }

  footer {
    width: 100%;
    height: 94px;
    margin-top: 22px;
    button {
      width: 100%;
      height: 100%;
      line-height: 94px;
      background: #ff504b;
      color: #fff;
      font-size: 32px;
      border: none;
    }
  }
}
.exampleImg {
  width: 100%;
  height: 100px;
  margin-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
  }
}
.reKEY {
  border: 1px solid #eee;
  height: 72px;
  width: 80%;
  padding-left: 20px;
}
.reBTN button {
  width: 300px;
  height: 72px;
  border: none;
  background: #ff433d;
  border-radius: 5px;
  margin-top: 20px;
  color: #fff;
}
.retips {
  margin-top: 20px;
}
.modelContent {
  background: #fff;
  z-index: 9;
  padding: 20px;

  .chooseBox {
    padding: 20px;
    margin-bottom: 20px;
  }
  .tits {
    color: #000;
    line-height: 60px;
  }
  .text {
    width: 100%;
    height: 60px;
    background: #eaeaea;
    i {
      right: 10px;
      top: 15px;
    }
  }
  .tips {
    font-size: 20px;
    color: #ff433d;
    line-height: 60px;
  }
}
.textTitle{
  padding-left:62px;
}
</style>

