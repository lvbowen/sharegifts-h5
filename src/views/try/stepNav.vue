<template>
    <!-- // 0-待申请 1-待开奖 2-已中奖 3-未中奖 4-已取消 5-已下单 6-已提交报告 7-拒绝返款 8-已返款 -->
    <div class="orderBox pr">
        <Header :send-id="activeId"></Header>
        <div class="listBox">
            <div class="top">
                加入购物车
            </div>
            <div class="bottom">
                <div>
                    <i class="iconfont icon-shijian1"></i>
                </div>
                <div class="btnBox">
                    <button v-if="status<=3">已提交</button>
                    <button v-if="status>=5">已完成</button>
                </div>
            </div>
        </div>
        <div class="listBox">
            <div class="top">
                收藏/关注宝贝和店铺
            </div>
            <div class="bottom">
                <div v-if="status>=5">
                    <i class="iconfont icon-shijian1"></i>{{collectObj.date}}</div>
                <div v-else>
                    <i class="iconfont icon-shijian1"></i>
                </div>
                <div class="btnBox">
                    <button v-if="status<=2" disabled class="disBtn">未提交</button>
                    <button v-if="status>=5" @click="viewGz">已完成</button>
                </div>
            </div>
        </div>
        <div class="listBox">
            <div class="top">
                货比三家
            </div>
            <div class="bottom">
                <div v-if="status>=5">
                    <i class="iconfont icon-shijian1"></i>{{compareObj.date}}</div>
                <div v-else>
                    <i class="iconfont icon-shijian1"></i>
                </div>
                <div class="btnBox">
                    <button v-if="status<=3" disabled class="disBtn">未提交</button>
                    <button v-if="status>=5" @click="compare">已完成</button>
                </div>
            </div>
        </div>
        <div class="listBox">
            <div class="top">
                订单信息
            </div>
            <div class="bottom">
                <div v-if="status>=5">
                    <i class="iconfont icon-shijian1"></i>{{orderObj.date}}</div>
                <div v-else>
                    <i class="iconfont icon-shijian1"></i>
                </div>
                <div class="btnBox">
                    <button v-if="status<=3" disabled class="disBtn">未提交</button>
                    <button v-if="status>=5" @click="getOrderInfo">已完成</button>
                </div>
            </div>
        </div>
        <div class="listBox" v-if="status>=6">
            <div class="top">
                提交报告
            </div>
            <div class="bottom" @click="getOrderInfo">
                <div v-if="status>=5">
                    <i class="iconfont icon-shijian1"></i>{{orderObj.date}}</div>
                <div class="btnBox">
                    <button @click="goReport" v-if="status>=6">已完成</button>
                    <button v-else disabled class="disBtn">未提交</button>
                </div>
            </div>
        </div>
        <!-- 收藏关注店铺弹窗 -->
        <div class="model" v-show="collectModel">
            <div class="modelShadow" @click="collectModel=false"></div>
            <transition name="top">
                <div class="modelContent" style="z-index:99">
                    <div class="modelShow">
                        <div class="modelHeader">
                            <span class="close btn" @click="collectModel=false">取消</span>
                            <span class="sure btn" @click="collectModel=false">确定</span>
                        </div>
                        <div class="modelBody">
                            <div>
                                <dl>
                                    <dt>
                                        <h1>收藏/关注宝贝</h1>
                                        <div class="imgBoxsg">
                                            <img :src="collectObj.url" alt="" @click="initUploadBtn(1)">
                                        </div>

                                    </dt>
                                    <dt>
                                        <h1>收藏/关注店铺</h1>
                                        <div class="imgBoxsg">
                                            <img :src="collectShopObj.url" alt="" @click="initUploadBtn(2)">
                                        </div>
                                    </dt>
                                </dl>
                            </div>
                            <button class="saveBtn" @click="saveInfo">保存</button>
                        </div>
                    </div>
                </div>

            </transition>
        </div>
        <!-- 货比三家弹窗 -->
        <div class="model" v-show="compareModel">
            <div class="modelShadow" @click="compareModel=false"></div>
            <transition name="top">
                <div class="modelContent">
                    <div class="modelShow">
                        <div class="modelHeader">
                            <span class="close btn" @click="compareModel=false">取消</span>
                            <span class="sure btn" @click="compareModel=false">确定</span>
                        </div>
                        <div class="modelBody">
                            <div class="inputBox">
                                <div class="imgj" v-if="compareObj">货比关键词1截图：<img :src="compareObj.url.link1" alt="" @click="initUploadBtn(4)"></div>
                                <div class="imgj" v-if="compareObj">货比关键词2截图：<img :src="compareObj.url.link2" alt="" @click="initUploadBtn(5)"></div>
                                <div class="imgj" v-if="compareObj">货比关键词3截图：<img :src="compareObj.url.link3" alt="" @click="initUploadBtn(6)"></div>
                            </div>
                            <button class="saveBtn">保存</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <!-- 订单消息弹窗 -->
        <div class="model" v-show="orderModel">
            <div class="modelShadow" @click="orderModel=false"></div>
            <transition name="top">
                <div class="modelContent">
                    <div class="modelShow">
                        <div class="modelHeader">
                            <span class="close btn" @click="orderModel=false">取消</span>
                            <span class="sure btn" @click="orderModel=false">确定</span>
                        </div>
                        <div class="modelBody">
                            <div class="inputBox">
                                <p class="tl">订单号：<input type="text" v-model="order_id"></p>
                                <div class="imgBoxPop">订单截图：
                                    <div class="img">
                                        <img :src="orderObj.url" alt="" @click="initUploadBtn(3)">
                                    </div>
                                </div>
                                <!-- <div class="imgBoxPop">关键词搜索截图：
                            <div class="img">
                                <img :src="keyWordObj.url" alt="" @click="initUploadBtn(4)">
                            </div>
                        </div> -->
                            </div>
                            <button class="saveBtn" @click="saveInfo">保存</button>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script>
import Header from '@/components/ActivityInfo'
import { getJoinInfo, editJoin, uploadImg, GfActive } from '@/api/API'
import { mapGetters, mapMutations } from 'vuex'
import wx from 'weixin-js-sdk'
export default {
    data () {
        return {
            showImg: false,
            collectModel: false,//收藏弹窗
            compareModel: false,//货比三家
            orderModel: false,//订单详情
            infoId: 0,
            collectObj: {},
            collectShopObj: {},
            compareObj: {
                url: {
                    link1: '',
                    link2: '',
                    link3: ''
                }
            },
            orderObj: '',
            searchImg: '',
            keyWordObj: {},
            tempImg: {
                localId: '',
                serverId: ''
            },
            order_id: ''
        }
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

    created () {
        this.dealUrl(location.href)
        this.getWXconfig()
    },
    methods: {
        viewGz () {
            this.collectModel = true

        },
        compare () {
            this.compareModel = true
        },
        getOrderInfo () {
            this.orderModel = true
        },
        saveInfo () {
            let params = {
                detail_id: this.infoId,
                concern_shop: this.collectShopObj.url,
                collection_goods: this.collectObj.url,
                goods_compared: JSON.stringify(this.compareObj),
                keyword_search: this.keyWordObj.url,
                order_screenshot: this.orderObj.url,
                order_id: this.order_id,
                report_title: this.accountInfo.report_title,
                trial_evaluation: this.accountInfo.trial_evaluation,
                goods_picture: this.accountInfo.goods_picture,
                five_star_praise: this.accountInfo.five_star_praise,
                buyer_show: this.accountInfo.buyer_show,
                add_comment: this.accountInfo.add_comment,
                share_friends: this.accountInfo.share_friends
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
        },
        //处理地址
        dealUrl (url) {
            if (url.indexOf('?') > -1) {
                console.log(url)
                let str = url.split('?')[1];
                let status = str.split('&')[1].split('=')[1]
                let active_id = str.split('&')[2].split('=')[1];
                this.infoId = str.split('&')[0].split('=')[1]
                let token = str.split('&')[3].split('=')[1]
                localStorage.setItem('token', token)
                this.getStatus(status)
                this.getActiveId(active_id)
                this.getOwnJoinInfos()
            }
        },
        //获取上传详情
        getOwnJoinInfos () {
            getJoinInfo({ id: this.infoId }).then(response => {
                let res = response.data
                if (res.success) {
                    this.dealInnfos(res.data)//处理数据显示
                    this.getAccounrObj(res.data)//存储账号信息

                }
            })
        },
        dealInnfos (data) {
            this.collectObj = data.collection_goods ? JSON.parse(data.collection_goods) : ''
            this.collectShopObj = data.concern_shop ? JSON.parse(data.concern_shop) : ''
            this.compareObj = data.goods_compared ? JSON.parse(data.goods_compared) : ''
            if (this.compareObj) {
                this.compareObj.url = this.compareObj.url ? JSON.parse(this.compareObj.url) : ''
            }
            this.orderObj = data.order_screenshot ? JSON.parse(data.order_screenshot) : ''
            this.keyWordObj = data.keyword_search ? JSON.parse(data.keyword_search) : ''
            this.order_id = data.order_id
        },
        goReport () {
            this.$router.push({
                path: '/report'
            })
        },
        ...mapMutations({
            getAccounrObj: 'GET_ACCOUNT_OBJ',
            getStatus: 'GET_STATUS',
            getActiveId: 'GET_ACTIVE_ID',
            editReport: 'EDIT_REPORT'
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
                                this.collectObj.url = result.data[0]
                            } else if (index == 2) {
                                this.collectShopObj.url = result.data[0]
                            } else if (index == 3) {
                                this.orderObj.url = result.data[0]
                            } else if (index == 4) {
                                this.keyWordObj.url = result.data[0]
                            } else if (index == 5) {
                                this.compareObj.url.link1 = result.data[0]
                            } else if (index == 6) {
                                this.compareObj.url.link2 = result.data[0]
                            } else {
                                this.compareObj.url.link3 = result.data[0]
                            }

                        }
                    })
                },
                fail: (res) => {
                    alert(res)
                }
            })
        },

    }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
}
.listBox {
  height: 213px;
  background: #fff;
  margin-bottom: 20px;
  padding: 0 30px;
  .top {
    height: 104px;
    border-bottom: 1px solid #eee;
    color: #363837;
    font-size: 24px;
    text-align: left;
    line-height: 104px;
  }
  .bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 106px;
    font-size: 24px;
    button {
      height: 58px;
      line-height: 58px;
      padding: 0 30px;
      border-radius: 29px;
      border: 2px solid #ff433d;
      background: #fff;
      color: #ff433d;
    }
    i {
      margin-right: 8px;
    }
  }
}
.modelBody {
  margin-bottom: 0 !important;
  padding: 20px;
}
.modelContent {
  z-index: 99 !important;
}
.inputBox {
  padding-top: 20px;
    .imgj{
        width:100%;
        height:200px;
        margin-bottom:20px;
    }
  .imgBoxPop {
    display: flex;
    margin-bottom: 20px;
  
    .img {
      width: 180px;
      height: 180px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

dl {
  display: flex;
  justify-content: space-around;
  h1 {
    height: 56px;
    line-height: 56px;
  }
  .imgBoxsg {
    width: 180px;
    height: 280px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
p {
  height: 80px;
  input {
    height: 60px;
    border: 1px solid #eee;
    padding-left: 10px;
  }
}
.orderdetail {
  label {
    width: 200px;
    text-align: right;
  }
  input {
    height: 80px;
    padding-left: 10px;
  }
  img {
    width: 400px;
  }
}
.saveBtn {
  width: 100%;
  height: 56px;
  background: #ff433d;
  border: none;
  color: #fff;
  border-radius: 4px;
  margin-top: 20px;
}

.disBtn {
  color: #ccc !important;
  border-color: #ccc !important;
}
</style>


