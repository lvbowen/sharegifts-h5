<template>
    <div class="firstStep">
        <Header :send-id="activeId"></Header>
        <div class="mainBox">
            <h1>
                <span>试用流程</span>
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
                <p>
                    <span class="num">2</span>登陆
                    <span v-if="accountInfo.active_info.shop_type==1">淘宝账号</span>
                    <span v-if="accountInfo.active_info.shop_type==2">京东账号</span>
                    <span class="high">{{accountInfo.account}}</span>进入购物车，找到宝贝</p>
                <div class="content">
                    <div class="contentC"></div>
                </div>
            </div>
            <div class="stepBox thirdStep">
                <p class="pr">
                    <span class="num pa">3</span>
                    <p class="textTit">搜索关键词：
                    <span class="high">{{accountInfo.active_info.link1}}&nbsp;&nbsp;{{accountInfo.active_info.link2}}&nbsp;&nbsp;{{accountInfo.active_info.link3}}</span>
                    ，并截图同类宝贝上传到下方
                </p>
                    <div class="content">
                        <div class="contentC">
                            <div class="compareBox">
                                <span class="returnKou">货比关键词截图1:</span>
                                <div class="uploadImgBox" v-if="comparObj.link1">
                                    <img :src="comparObj.link1" alt="">
                                    <i class="iconfont icon-jian jh" @click="delImg(1)"></i>
                                </div>
                                <button @click="initUploadBtn(1)" v-if="!comparObj.link1">
                                    <i class="iconfont icon-STYL"></i>上传截图
                                </button>
                            </div>
                            <div class="compareBox">
                                <span class="returnKou">货比关键词截图2:</span>
                                <div class="uploadImgBox" v-if="comparObj.link2">
                                    <img :src="comparObj.link2" alt="">
                                    <i class="iconfont icon-jian jh" @click="delImg(2)"></i>
                                </div>
                                <button @click="initUploadBtn(2)" v-if="!comparObj.link2">
                                    <i class="iconfont icon-STYL"></i>上传截图
                                </button>
                            </div>
                            <div class="compareBox">
                                <span class="returnKou">货比关键词截图3:</span>
                                <div class="uploadImgBox" v-if="comparObj.link3">
                                    <img :src="comparObj.link3" alt="">
                                    <i class="iconfont icon-jian jh" @click="delImg(3)"></i>
                                </div>
                                <button @click="initUploadBtn(3)" v-if="!comparObj.link3">
                                    <i class="iconfont icon-STYL"></i>上传截图
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        <footer>
            <button v-if="status==3" @click="reJoinActity">确认申请</button>
            <button @click="next" v-else>下一步</button>
        </footer>

    </div>
</template>
<script>
import Header from '@/components/ActivityInfo'
import { getJoinInfo,reAddActivy,GfActive,uploadImg } from "@/api/API"
import wx from 'weixin-js-sdk'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            goodInfo: {},
            comparObj:{
                link1:'',
                link2:'',
                link3:''
            },
            tempImg: {
                localId: '',
                serverId: ''
            },
        }
    },
    components: {
        Header
    },
    created () {
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
            if(this.comparObj.link1==''||this.comparObj.link2==''||this.comparObj.link3==''){
                this.$alert('请完整填写竞品链接！')
                return
            }
            this.$router.push({
                path: '/supplyThird'
            })
            let params={
                detail_id:this.reportObj.detail_id,
                concern_shop:this.reportObj.concern_shop,
                collection_goods:this.reportObj.collection_goods,
                goods_compared:JSON.stringify(this.comparObj),
                order_screenshot:'64566575',
                order_id:this.reportObj.id
            }
            this.getReportObj(params)
        },
        onCopy () {
            this.$alert('复制成功！')
        },
        ...mapMutations({
            getReportObj: 'GET_REPORT_OBJ',
            getReObj:'GET_RE_OBJ'
        }),
        reJoinActity(){
            let params={
                detail_id:this.resupplyObj.detail_id,
                concern_shop:this.resupplyObj.concern_shop,
                collection_goods:this.resupplyObj.collection_goods,
                goods_compared:JSON.stringify(this.comparObj),
            }
            if(this.resupplyObj.keyword_search){
                params={
                    detail_id:this.resupplyObj.detail_id,
                    concern_shop:this.resupplyObj.concern_shop,
                    collection_goods:this.resupplyObj.collection_goods,
                    goods_compared:JSON.stringify(this.comparObj),
                    keyword_search:this.resupplyObj.keyword_search
                }
            }
            reAddActivy(params).then(response => {
                let res=response.data
                if(res.success){
                    this.$alert('提交成功')
                    wx.miniProgram.getEnv(function (res) {
                        if (res.miniprogram) {
                            wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
                        }
                    });
                }else{
                    this.$alert(res.msg)
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
                            this.comparObj.link1 = result.data[0]
                        } else if (index == 2) {
                            this.comparObj.link2 = result.data[0]
                        } else if (index == 3) {
                            this.comparObj.link3= result.data[0]
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
                this.comparObj.link1 = ''
            } else if (i == 2) {
                this.comparObj.link2 = ''
            } else {
                this.comparObj.link3= ''
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
          padding: 10px 0;
          border-left: 1px solid #ff504b;
        }
      }
    }
    .thirdStep {
      .contentC {
        border-left: none !important;
        .compareBox {
          border: 1px solid #eeeeee;
          padding: 25px;
          margin-bottom: 20px;
           button {
                width: 224px;
                height: 58px;
                border-radius: 29px;
                background: #fff;
                border: 2px solid #ff433d;
                color: #ff433d;
            }
          .compareTit {
            text-align: left;
            font-size: 26px;
            line-height: 40px;
          }
          .compareInput {
            height: 72px;
            margin: 20px 0;
            input {
              width: 100%;
              height: 100%;
              border: 1px solid #eee;
              padding-left: 10px;
            }
          }
          .compareTips {
            height: 72px;
            line-height: 72px;
            margin-top: 20px;
            font-size: 26px;
            background: #fef0f1;
            i {
              color: @color-base;
            }
          }
          .returnKou {
            text-align: left;
            font-size: 26px;
          }
          .returnBox {
            height: 154px;
            width: 100%;
            border: 1px solid #eee;
            padding: 20px;
            box-sizing: border-box;
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
.imgBox{
    width:224px;
    height:224px;
    background:rgba(0,0,0,1);
    opacity:0.3;
    margin:0 auto;
    img{
    width:127px;
    height: 100%;
    }
}
.textTit{
    padding-left:62px;
}
</style>
