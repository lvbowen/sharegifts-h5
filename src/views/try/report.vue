<template>
  <div class="reportBox">
    <Header :send-id="activeId"></Header>
    <div class="containBox">
      <div class="mainBox">
        <div class="tit">报告标题</div>
        <input type="text" v-model="reportObj.report_title">
      </div>
      <div class="mainBox">
        <div class="tit">试用品评价</div>
        <textarea name="" id="" cols="30" rows="10" placeholder="请填写试用评价" v-model="reportObj.trial_evaluation"></textarea>
      </div>
      <div class="mainBox">
        <div class="tit">上传所传宝贝的评价截图
          <span>(自由发挥）</span>
        </div>
        <div class="uploadImgBox" v-if="reportObj.five_star_praise">
          <img :src="reportObj.five_star_praise" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(1)"></i>
        </div>
        <button class="btn" v-if="!reportObj.five_star_praise" @click="initUploadBtn(1)">
          <i class="iconfont icon-STYL"></i> 上传截图</button>
      </div>
      <div class="mainBox">
        <div class="tit">上传试用宝贝截图
          <span>(上传图片后有机会被评选为精报告哦，每被评为一次精华报告送100小红花！）</span>
        </div>
        <div class="uploadImgBox" v-if="reportObj.goods_picture">
          <img :src="reportObj.goods_picture" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(2)"></i>
        </div>
        <button class="btn" v-if="!reportObj.goods_picture" @click="initUploadBtn(2)">
          <i class="iconfont icon-STYL"></i> 上传截图</button>
      </div>
      <div class="mainBox" v-if="showXuan.buyer_show==1||reportObj.buyer_show">
        <div class="tit">上传买家秀截图</div>
        <div class="uploadImgBox" v-if="reportObj.buyer_show"> 
          <img :src="reportObj.buyer_show" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(3)"></i>
        </div>
        <button class="btn" v-if="!reportObj.buyer_show" @click="initUploadBtn(3)">
          <i class="iconfont icon-STYL"></i> 上传截图</button>
      </div>
      <div class="mainBox" v-if="showXuan.add_comment==1||reportObj.add_comment">
        <div class="tit">上传追加评论截图</div>
        <div class="uploadImgBox" v-if="reportObj.add_comment">
          <img :src="reportObj.add_comment" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(4)"></i>
        </div>
        <button class="btn" v-if="!reportObj.add_comment" @click="initUploadBtn(4)">
          <i class="iconfont icon-STYL"></i> 上传截图</button>
      </div>
      <div class="mainBox" v-if="showXuan.share_friends==1||reportObj.share_friends">
        <div class="tit">上传分享朋友圈截图</div>
        <div class="uploadImgBox" v-if="reportObj.share_friends">
          <img :src="reportObj.share_friends" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(5)"></i>
        </div>
        <button class="btn" v-if="!reportObj.share_friends" @click="initUploadBtn(5)">
          <i class="iconfont icon-STYL"></i> 上传截图</button>
      </div>

    </div>
    <div class="bottomBox">
      <div class="left" :class="status==5?'disText':''">{{timer}}后将取消资格</div>
      <div class="right" @click="submits" :class="status==5?'disBtn':''">提交试用报告</div>
    </div>
  </div>
</template>
<script>
import { leftTimer } from "@/api/utils"
import Header from '@/components/ActivityInfo'
import { submitReport, getJoinInfo, editJoin, GfActive, uploadImg } from "@/api/API"
import wx from 'weixin-js-sdk'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      timer: '',
      reportObj: {
        detail_id: 0,
        report_title: '',
        trial_evaluation: '',
        goods_picture: '',
        five_star_praise: '',
        buyer_show: '',
        add_comment: '',
        share_friends: '',
        active_id: 0,
      },
      showXuan: {},
      tempImg: {
        localId: '',
        serverId: ''
      },
      time: ''

    }
  },
  created () {
    this.dealUrl(location.href)
    // this.dealUrl('https://xfsapi.aiju.com/h5/#/report?id=2&activeid=4&token=3af92d48112566e23b3a2927848ba1b7&status=6')
    setInterval(() => {
      this.timer = leftTimer(this.time, this.status)
    }, 1000);

    this.getWXconfig();
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters([
      'accountInfo',
      'activeId',
      'status',
      'editReportObj'
    ])
  },
  methods: {
    submits () {
      if (this.status < 6) {//新提交报告
        submitReport(this.reportObj).then(response => {
          let res = response.data
          if (res.success) {
            wx.miniProgram.getEnv(function (res) {
              if (res.miniprogram) {
                wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
              }
            });

          }else{
            this.$alert(res.msg)
          }
        })
      } else {
        let params = {
          detail_id: this.editReportObj.detail_id,
          concern_shop: this.editReportObj.concern_shop,
          collection_goods: this.editReportObj.collection_goods,
          goods_compared: this.editReportObj.goods_compared,
          keyword_search: this.editReportObj.keyword_search,
          order_screenshot: this.editReportObj.order_screenshot,
          order_id: this.editReportObj.order_id,
          report_title: this.reportObj.report_title,
          trial_evaluation: this.reportObj.trial_evaluation,
          goods_picture: this.reportObj.goods_picture,
          five_star_praise: this.reportObj.five_star_praise,
          buyer_show: this.reportObj.buyer_show,
          add_comment: this.reportObj.add_comment,
          share_friends: this.reportObj.share_friends
        }
        this.editReport(params)
        editJoin(params).then(response => {
          let res = response.data
          if (res.success) {
            this.$alert('修改成功')
            wx.miniProgram.getEnv(function (res) {
              if (res.miniprogram) {
                wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
              }
            });
          }
        })
      }

    },
    dealObj () {
      this.reportObj.report_title = this.accountInfo.report_title
      this.reportObj.trial_evaluation = this.accountInfo.trial_evaluation
      this.reportObj.goods_picture = this.accountInfo.goods_picture
      this.reportObj.five_star_praise = this.accountInfo.five_star_praise?JSON.parse(this.accountInfo.five_star_praise).url:''
      this.reportObj.add_comment = this.accountInfo.add_comment?JSON.parse(this.accountInfo.add_comment).url:''
      this.reportObj.share_friends = this.accountInfo.share_friends?JSON.parse(this.accountInfo.share_friends).url:''
      this.showXuan = this.accountInfo.active_info.return_task_setting?JSON.parse(this.accountInfo.active_info.return_task_setting):''
    },
    //获取上传详情
    getOwnJoinInfos () {
      getJoinInfo({ id: this.reportObj.detail_id }).then(response => {
        let res = response.data
        if (res.success) {
          this.time = res.data.active_info.update_at
          this.showXuan = JSON.parse(res.data.active_info.return_task_setting)
          this.getAccounrObj(res.data)
          if (this.status >= 6) {
            this.dealObj()
          }
        }
      })
    },


    //处理地址
    dealUrl (url) {
      if (url.indexOf('?') > -1) {
        let str = url.split('?')[1];
        let status = str.split('&')[3].split('=')[1]
        let active_id = str.split('&')[1].split('=')[1];
        this.reportObj.detail_id = str.split('&')[0].split('=')[1]
        let token = str.split('&')[2].split('=')[1]
        localStorage.setItem('token', token)
        this.getStatus(status)
        this.getActiveId(active_id)
        this.active_id = active_id
        this.getOwnJoinInfos();
        
        
      }
    },
    ...mapMutations({
      getStatus: 'GET_STATUS',
      getActiveId: 'GET_ACTIVE_ID',
      editReport: 'EDIT_REPORT',
      getAccounrObj: 'GET_ACCOUNT_OBJ',
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
                this.reportObj.five_star_praise = result.data[0]
              } else if (index == 2) {
                this.reportObj.goods_picture = result.data[0]
              } else if (index == 3) {
                this.showXuan.buyer_show = result.data[0]
              } else if (index == 4) {
                this.showXuan.add_comment = result.data[0]
              } else if (index == 5) {
                this.showXuan.share_friends = result.data[0]
              }

            }
          })
        },
        fail: (res) => {
          alert(res)
        }
      })
    },
    delImg (i) {
      if (i == 1) {
        this.reportObj.five_star_praise = ''
      } else if (i == 2) {
        this.reportObj.goods_picture = ''
      } else if (i == 3) {
        this.reportObj.buyer_show = ''
      } else if (i == 4) {
        this.reportObj.add_comment = ''
      } else if (i == 5) {
        this.reportObj.share_friends = ''
      }
      this.$alert('删除图片成功!')
    },
  }

}
</script>
<style lang="less" scoped>
.reportBox {
  overflow: hidden;
}
.containBox {
  background: #fff;
  padding: 20px 30px 80px 30px;
  .tit {
    font-size: 30px;
    color: #353837;
    text-align: left;
    font-weight: bold;
    margin: 30px 0;
    span {
      color: #939994;
      font-weight: 400;
      vertical-align: baseline;
    }
  }
  input {
    height: 72px;
    border: none;
    width: 689px;
    background: #f6f6f6;
    padding-left: 10px;
  }
  textarea {
    width: 689px;
    height: 169px;
    border: 1px solid #eee !important;
    padding: 20px;
    box-sizing: border-box;
  }
  button {
    margin: 35px 0;
  }
}
.bottomBox {
  height: 94px;
  display: flex;
  text-align: center;
  line-height: 94px;
  .left {
    width: 450px;
    background: #ffeceb;
    color: #ff433d;
    font-size: 26px;
  }
  .right {
    background: #ff433d;
    color: #fff;
    font-size: 26px;
    width: 300px;
    font-weight: bold;
  }
}
.uploadBox {
  width: 100px;
  height: 30px;
  background: pink;
}
.imgBox {
  width: 224px;
  height: 224px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.3;
  margin: 0 auto;
  img {
    width: 127px;
    height: 100%;
  }
}
.disText {
  color: #353837 !important;
  background: #fff !important;
}
.disBtn {
  background: #939994 !important;
  color: #fff !important;
}
</style>

