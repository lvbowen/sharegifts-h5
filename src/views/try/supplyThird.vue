<template>
  <div class="thirdBox pr">
    <Header :send-id="activeId"></Header>  
    <div class="mainBox">
      <h1>
        <span>填写订单信息</span>
      </h1>
      <div class="stepBox">
        <p><span class="num">1</span>上传订单详细截图，如图</p>
        <div class="content">
          <div class="contentC">
              <div class="exampleImg">
                  <img src="../../assets/images/order.png" alt="">
              </div>
              <div class="uploadBox">
                  <div class="btnBox">上传订单截图 :
                      <div class="uploadImgBox" v-if="orderImg">
                            <img :src="orderImg" alt="">
                            <i class="iconfont icon-jian jh" @click="delImg(4)"></i>
                        </div>
                        <button @click="initUploadBtn(1)" v-if="!orderImg" class="btn">
                            <i class="iconfont icon-STYL"></i>上传截图
                        </button>
                </div>
                  <div class="high tl">我的——我的订单——待发货【订单列表页】并截图</div>
              </div>
          </div>
        </div>
      </div>
      <div class="stepBox thirdStep">
        <p><span class="num">2</span>复制订单号</p>
        <div class="content">
          <div class="contentC">
             <div class="tl orderBox">
                 订单号：<input type="text" v-model="order_id">
             </div>
             <div class="high tl">点击 我的——我的订单——订单详情页-点击复制订单号</div>
          </div>
        </div>
      </div>
    </div>
    <footer class="pa">
      <button @click="submitBtn">已经付款，确认提交订单号</button>
    </footer>
  </div>
</template>
<script>
import Header from '@/components/ActivityInfo'
import { mapGetters, mapMutations } from 'vuex'
import {submitTask,GfActive,uploadImg} from '@/api/API'
import wx from 'weixin-js-sdk'
export default {
    data(){
        return {
            order_id:'',
            comparObj:{},
            orderImg:'',
            tempImg: {
              localId: '',
              serverId: ''
            },
        }
    },
    created(){
     this.getWXconfig()
    },
    components:{
       Header 
    },
    computed: {
        ...mapGetters([
            'reportObj',
            'accountInfo',
            'activeId'
        ])
    },
    methods:{
        ...mapMutations({
            getReportObj: 'GET_REPORT_OBJ',
        }),
        submitBtn(){
            if(this.orderImg==''){
              this.$alert('请上传订单截图！')
              return
            }
            if(this.order_id==''){
              this.$alert('请填写订单！')
              return
            }
            let params={
                detail_id:this.reportObj.detail_id,
                concern_shop:this.reportObj.concern_shop,
                collection_goods:this.reportObj.collection_goods,
                goods_compared:this.reportObj.goods_compared,
                order_screenshot:this.orderImg,
                order_id:this.order_id
            }
            this.getReportObj(params)
            submitTask(this.reportObj).then(response => {
                let res=response.data
                this.$alert(res.msg)
                if(res.success){
                    wx.miniProgram.getEnv(function (res) {
                        if (res.miniprogram) {
                            wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list?status=3' })
                        }
                    });
                }
               
            })
            
        },
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
    uploadImage(index) {
      //上传图片至微信服务器
      wx.uploadImage({
        localId: this.tempImg.localId,
       success: (res) => {
          this.tempImg.serverId = res.serverId
          uploadImg({
           mediaId:this.tempImg.serverId
          }).then(response => {
            let result = response.data
            if (result.success) {
              if (index == 1) {
                this.orderImg = result.data[0]
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
     delImg(){
       this.orderImg=''
    }
    }
}
</script>
<style lang="less" scoped>
 .thirdBox{
   height:100%;
 }
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
      padding:0 30px;
      p {
        font-size: 26px;
        margin:30px;
        margin-left:0;
        font-family: PingFang-SC-Medium;
        line-height:40px;
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
          padding:10px 20px;
          border-left: 1px solid #ff504b;
          .exampleImg{
            width:100%; 
            height:200px;
            margin-bottom:20px;
            img{
                width:100%;
                height:100%;
            }
          }
          .uploadBox{
              text-align: left;
              font-size:24px;
              .btnBox{
                  margin:20px 0;
              }
          }
          .orderBox{
              margin-bottom:40px;
              input{
                  width:420px;
                  height:72px;
                  padding-left:10px;
                  border:1px solid #eee;
              }
          }
        
        }
      }
    }
    .thirdStep{
        .contentC{
            border-left:none !important;
            padding-bottom:100px !important;
        }
    }
  
    
  }
  footer {
    width: 100%;
    height: 94px;
    bottom:0;
    left:0;
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
 .imgBox{
         width:224px;
          height:224px;
          background:rgba(0,0,0,1);
          opacity:0.3;
          margin:0 auto;
          img{
            width:127px;
            height: 100%;
}} 
</style>


