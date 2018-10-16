<template>
  <div class="firstStep">
    <Header :send-id="activeId"></Header>
    <div class="mainBox">
      <h1>
        <span>搜索流程</span>
      </h1>
      <div class="stepBox">
        <p>
          <span class="num">1</span>找到宝贝</p>
        <div class="content">
          <div class="contentC" v-if="!isShowCrop">
            <p>打开
              <span class="high">手机{{goodInfo.shop_type==1?'淘宝':'京东'}}APP</span>
            </p>
            <p v-if="showgoodTit">商品标题：
              <span class="high">{{goodTit}}</span>
            </p>
            <p>搜索商品：
              <span class="high">{{keyWord}}</span>
              <span class="changeBtn" :class="this.keywordArr.length==1?'changeColor':''" @click="showTit">换一换</span>
              <a style="margin-left:20px" v-clipboard:copy="keyWord" v-clipboard:success="onCopy">复制</a>
            </p>
            <p>排序方式：
              <span class="high" v-if="sortType==1">综合排序</span>
              <span class="high" v-if="sortType==2">销量排序</span>
              <span class="high" v-if="sortType==3">信用排序</span>
              <span class="high" v-if="sortType==4">价格排序</span>
              <span class="high" v-if="sortType==5">人气排序</span>
            </p>
            <p class="shaType">筛选方式：<img src="../../assets/images/choose.png" alt=""></p>
            <div class="texyp" v-if="severText">筛选条件：折扣与服务（{{severText}}）
            </div>
            <p>价格区间：
              <span class="high" v-if="priceRange">{{priceRange}}元</span>
            </p>
          </div>
          <!-- <div class="contentC" v-if="isShowCrop"> -->
          <div class="contentC" v-if="isShowCrop">
            <p>长按二维码，保存到相册，去淘宝扫描此二维码可找到该宝贝</p>
            <div class="cropBox">
              <img :src="qr_code" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="stepBox">
        <p>
          <span class="num">2</span>核对宝贝</p>
        <div class="content">
          <div class="contentC">
            <div class="tips">以下两种方式二选一</div>
            <div class="inputBox">
              <button v-bind:class="!showK?'active':''" @click="change">验证淘口令/京东链接</button>
              <button v-bind:class="showK?'active':''" @click="change">验证店铺</button>
            </div>
            <div v-if="showK">
              <p class="texyp">
                请进入商品详情页，浏览商品详情不少于3分钟，复制并核对目标宝贝
                <span class="high">店铺名称</span>。
              </p>
              <div class="shopName">核对店铺名：<input type="text" v-model="shop_name"></div>
              <div class="shopBox">
                示例：
                <img src="../../assets/images/shop.png" alt="">
              </div>
              <div class="checkBtn">
                <button @click="checkGood">{{checkTxt}}</button>
              </div>
            </div>
            <div v-if="!showK">
              <div class="vertiyShop">
                <i class="indx">1</i>点击一下输入框
                <i class="iconfont icon-jiantou2"></i>
                <i class="indx">2</i>长按
                <i class="iconfont icon-jiantou2"></i>
                <i class="indx">3</i>粘贴
              </div>
              <div class="textareaBox">
                <textarea name="" id="" placeholder="点击淘宝宝贝详情页“分享”按钮选择复制链接然后将商品链接粘贴此处" v-model="url"></textarea>
              </div>
              <div class="checkBtn">
                <button @click="checkGood">{{checkTxt}}</button>
              </div>
            </div>

            <div class="checkBtn warnBox" v-if="noticeText">
              <i class="iconfont icon-gantanhao-yuankuang"></i>
              注意 : {{noticeText}}
            </div>
          </div>

        </div>
      </div>
      <div class="stepBox">
        <p @click="addCar">
          <span class="num">3</span>加入购物车</p>
        <div class="content">
          <div class="contentC thirdStep">
            找到宝贝后
            <span class="high">必须加购物车</span>，被通过后从购物车里找到宝贝 下单。（申请成功后就没有搜索流程了哦！找不到的话会 导致无法下单哟!)
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button @click="addCar" :class="checkTxt == '验证通过'?'ischecked':''">加入购物车后，确定申请</button>
    </footer>
    <div class="popBg" v-if="showPop">
      <div class="pop">
        <div class="popContent">
          <input type="text" placeholder="请输入淘宝/京东号" class="popText" v-model="account">
        </div>
        <div class="popBtns" @click="bind">
          绑定
        </div>
      </div>
    </div>
    <!-- 去认证弹窗 -->
    <div class="popBg" v-if="verityPop">
      <div class="pop">
        <div class="popContent">
          亲，您的账号尚未认证通过
        </div>
        <div class="popBtns" @click="veritySure">
          去认证
        </div>
      </div>
    </div>

    <div class="model" v-show="showModel">
      <div class="modelShadow" @click="showModel=false"></div>
      <transition name="top">
        <div class="modelContent">
          <div class="chooseBox">
            <p class="tits">选择要下单的淘宝/京东账号</p>
            <!-- <p class="text pr" @click="selects">
              {{accountName}}
              <i class="pa icon-more iconfont"></i>
            </p> -->
            <p class="tips">必须用选择的淘宝/京东账号下单否则不返款并冻结账户</p>
          </div>
          <div class="modelShow">
            <div class="modelHeader">
              <span class="close btn" @click="showModel=false">取消</span>
              <span class="sure btn" @click="sureApply">确定</span>
            </div>
            <div class="modelBody">
              <div class="modelLine" v-for="(item,index) in accontList" :key="item.id" :class="accountIndex===index ? 'active' : ''" @click="chooseAccount(item,index)">
                <span class="text">{{item.account}}</span>
              </div>
            </div>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>
<script>
import { checkGoods, getGood, firstJoin, getAccountList, addAccount } from "@/api/API"
import Header from '@/components/ActivityInfo'
import { mapGetters, mapMutations } from 'vuex'
import wx from 'weixin-js-sdk'
export default {
  data () {
    return {
      showK: true,
      keyWord: '',
      keyword_taokouling: '',
      shop_name: '',
      url: '',
      checkTxt: '点击核对',
      showPop: false,
      showModel: false,
      accontList: [],
      accountIndex: 0,
      showSelect: false,
      goodInfo: {},//商品详情
      trusteeship: 0,//精准搜索
      keywordArr: [],//关键词搜索
      showgoodTit: false,//显示商品标题
      goodTit: '',
      tickNum: 0,
      sortType: '',
      severText: '',
      priceRange: '',
      accont: '',
      accountName: '',
      active_id: 0,
      account: '',//绑定的账号
      verityPop: false,
      noticeText: '',
      isShowCrop: false,//是否显示二维码
      qr_code: '',
    }
  },
  created () {
    this.dealUrl(location.href)//设置token
    // this.dealUrl('https://xfsapi.aiju.com/h5/#/?token=323481ba6cf682018cf874ae71fb59a1&id=22')
    
  },
  computed: {
    ...mapGetters([
      'activeId'
    ])
  },
  components: {
    Header
  },
  methods: {
    change () {
      this.showK = !this.showK
    },
    //获取商品详情
    init () {
      getGood({ active_id: this.active_id, page: 1, limit: 10 }).then(response => {
        let res = response.data
        if (res.success) {
          this.goodInfo = res.data.data[0]
          let goodObj = JSON.parse(this.goodInfo.route_to_store)
          this.keywordArr = JSON.parse(this.goodInfo.route_to_store).keyword.search_keywords
          this.keywordArr = JSON.parse(this.keywordArr)
          this.keyWord = this.keywordArr[0].keyWord
          this.sortType = this.keywordArr[0].sort
          this.goodInfo.shop_name = this.dealTit(this.goodInfo.shop_name)
          this.discounted_service = goodObj.keyword.discounted_service
          let price_range = JSON.parse(JSON.parse(this.goodInfo.route_to_store).keyword.price_range)
          this.priceRange = price_range ? price_range.min + '~' + price_range.max : ''
          this.severText = this.dealSeverText(JSON.parse(goodObj.keyword.discounted_service))
          this.keyword_taokouling = this.goodInfo.keyword_taokouling
          this.noticeText = this.dealNotice(this.goodInfo.remind)
          this.isShowCrop = this.dealShowType(goodObj.keyword.keyword_ratio, goodObj.qr_code.qr_code_ratio)
          console.log(this.isShowCrop)
          this.qr_code = goodObj.qr_code.qr_code
          this.getAccount(1)

        }
      })
    },
    checkGood () {
      let params = {}
      if (this.showK) {
        params = {
          id: this.activeId,
          shop_name: this.shop_name
        }
      } else {
        params = {
          id: this.activeId,
          url: this.url
        }
      }
      checkGoods(params).then(res => {
        if (res.data.success) {
          this.$alert(res.data.msg)
          this.checkTxt = '验证通过'
        } else {
          this.$alert(res.data.msg)
        }
      })
    },
    //点击加入购物车
    addCar () {
      this.accontList = []
      if (this.checkTxt == '点击核对') {
        this.$alert('请先验证店铺！')
        return
      }
      this.getAccount()
    },
    //确认加入购物车

    sureApply () {
      this.showModel = false
      if (!this.accont) {
        this.accont = this.accontList[this.accountIndex].id
      }
      if (!this.accountName) {
        this.accountName = this.accontList[this.accountIndex].account
      }
      let params = {
        active_id: this.activeId,
        auth_id: this.accont,
        account: this.accountName
      }
      firstJoin(params).then(response => {
        let res = response.data
        this.$alert(res.msg)
        if (res.success) {
          wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
              wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
            }
          });
        }
      })
    },
    bind () {
      if (this.account == '') {
        this.$alert('请输入账号！')
        return
      }
      let data = {
        type: this.goodInfo.shop_type,
        account: this.account
      }
      addAccount(data).then(response => {
        let res = response.data
        this.verityPop = true
        this.veritySure();
      })
    },
    //去认证
    veritySure () {
      let type = this.goodInfo.shop_type
      wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          if (type == 1) {
            wx.miniProgram.navigateTo({ url: '/pages/mine/account/edit/edit?type=1' })
          } else {
            wx.miniProgram.navigateTo({ url: '/pages/mine/account/edit/edit?type=2' })
          }
        }
      });
    },
    onCopy (e) {
      this.$alert('已复制: ' + e.text)
    },

    //换一换
    showTit () {
      this.showgoodTit = true
      this.goodTit = this.goodInfo.goods_name.substring(0, (6 + this.tickNum)) + '***';
      if (this.tickNum < 10) {
        this.tickNum += 2;
      }
      let i = Math.floor(this.keywordArr.length * (Math.random()));
      this.keyWord = this.keywordArr[i].keyWord
      this.sortType = this.keywordArr[i].sort

    },
    //处理标题
    dealTit (str) {
      let arr = str.split('')
      for (let i = 0; i < arr.length; i++) {
        if (i % 2 != 0) {
          arr[i] = '*'
        }
      }
      return arr.join('')
    },
    //处理服务字段
    dealSeverText (arr) {
      let severA = []
      let severArr = ["包邮", "天猫", "消费者保障", "全球购", "公益宝贝", "淘金币抵钱", "7+天内退货", "花呗分期", "通用排序"]
      if (arr && arr.length != 0) {
        for (let i = 0; i < arr.length; i++) {
          severA.push(severArr[arr[i]])
        }
      }
      return severA.join('，')
    },
    //获取账号列表
    getAccount (num) {
      let params = {
        type: this.goodInfo.shop_type
      }
      getAccountList(params).then(response => {
        let res = response.data
        if (res.success) {
          for (let item of res.data.data) {
            if (item.authentication_status == 2) {
              this.accontList.push(item)
            }
          }
          if (num && this.accontList.length == 0) {
            console.log(333)
            this.showPop = true
          }
          console.log(this.accontList)
          if (!num && this.accontList.length > 0) {
            console.log(222)
            this.showModel = true
          }
        }
      })
    },
    //选择账号
    chooseAccount (item, index) {
      this.accountIndex = index
      this.accont = item.id;
      this.accountName = item.account
      let params = {
        active_id: this.activeId,
        auth_id: this.accont,
        account: this.accountName
      }
      firstJoin(params).then(response => {
        let res = response.data
        this.$alert(res.msg)
        wx.miniProgram.getEnv(function (res) {
          if (res.miniprogram) {
            wx.miniProgram.navigateTo({ url: '/pages/mine/gaofan/list/list' })
          }
        });

      })
    },
    //处理地址
    dealUrl (url) {
      if (url.indexOf('?') > -1) {
        let str = url.split('?')[1];
        let token = str.split('&')[0].split('=')[1]
        localStorage.setItem('token', token)
        this.active_id = str.split('&')[1].split('=')[1];
        this.getActiveId(this.active_id)
        this.init();
        
      }

    },
    //处理注意消息
    dealNotice (item) {
      if (typeof (item) == 'string') {
        item = JSON.parse(item)
      }
      if (item.saitu == 1 && item.wangwang == 1) {
        return '请勿旺旺聊天联系商家和晒图'
      } else if (item.saitu == 1 && item.wangwang == 0) {
        return '请勿晒图'
      } else if (item.saitu == 0 && item.wangwang == 1) {
        return '请勿旺旺聊天联系商家'
      } else {
        return ''
      }

    },
    //处理怎样找到商品的方式
    dealShowType (ratio1, ratio2) {
      let ratio = Math.random() * 100
      if (parseFloat(ratio1) == 100) {
        return true
      }
      if (parseFloat(ratio2) == 100) {
        return false
      }
      if (parseFloat(ratio1) >= parseFloat(ratio2)) {
        return parseFloat(ratio1) >= parseFloat(ratio) ? true : false
      } else {
        return parseFloat(ratio2) >= parseFloat(ratio) ? false : true
      }
    },
    ...mapMutations({
      getActiveId: 'GET_ACTIVE_ID'
    })
  }
}
</script>
<style lang='less' scoped>
@color-base: #ff433d;
.firstStep {
  width: 100%;
  height: 100%;
  line-height: normal;
  overflow: scroll;
  header {
    height: 220px;
    background: #fff;
    margin: 20px 0;
    padding: 30px;
    display: flex;
    box-sizing: border-box;
    .imgBox {
      width: 160px;
      height: 160px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .rightBox {
      margin-left: 10px;
      font-size: 30px;
      h1 {
        text-align: left;
        padding-left: 20px;
        i {
          color: #ff6b06;
          margin-right: 10px;
        }
        .icon-jingdong_ {
          color: #f10215;
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
        font-size: 30px;
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        color: rgba(53, 56, 55, 1);
        line-height: 80px;
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
          border-left: 1px solid #ff504b;
          p {
            font-size: 26px;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(52, 56, 55, 1);
            line-height: 65px;
            padding-left: 40px;
            .high {
              color: @color-base;
              vertical-align: baseline;
            }
            .changeBtn {
              display: inline-block;
              border-radius: 5px;
              width: 118px;
              height: 58px;
              line-height: 58px;
              color: @color-base;
              text-align: center;
              margin-left: 8px;
              border: 2px solid @color-base;
            }
            img {
              height: 52px;
            }
          }
          .shopName {
            height: 72px;
            padding-left: 40px;
            box-sizing: border-box;
            display: flex;
            input {
              width: 431px;
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
          .inputBox {
            display: flex;
            height: 66px;
            padding-left: 40px;
            margin: 15px 0;
            .active {
              background: @color-base;
              color: #fff;
              border: none;
            }
            button {
              width: 300px;
              height: 100%;
              background: #fff;
              border: 2px solid #cccccc;
              margin-left: -2px;
            }
          }
          .shopBox {
            color: @color-base;
            padding-left: 40px;
            margin: 15px 0;
            display: flex;
            box-sizing: border-box;
            img {
              width: 510px;
              height: 222px;
            }
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
          .warnBox {
            background: #fef0f1;
            margin-top: 30px;
            font-size: 26px;
            line-height: 66px;
            i {
              color: @color-base;
            }
          }
          .texyp {
            margin-bottom: 45px;
          }
          div.texyp {
            padding: 0 40px;
            font-size: 26px;
            line-height: 80px;
            text-align: left;
            margin-bottom: 0;
          }
        }
        .thirdStep {
          border: none;
          padding-left: 40px;
          text-align: left;
          font-size: 26px;
          line-height: 55px;
          padding-bottom: 40px;
          .high {
            color: @color-base;
          }
        }
      }
    }
  }
  .vertiyShop {
    text-align: left;
    padding: 20px 0 20px 40px;
    .indx {
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      border: 2px solid #6b6d6b;
      font-size: 20px;
      font-style: normal;
      vertical-align: baseline;
    }
    i {
      margin-right: 8px;
    }
  }
  .textareaBox {
    padding: 20px 0 20px 40px;
    textarea {
      width: 100%;
      height: 163px;
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
      background: #aaaaaa;
      color: #fff;
      font-size: 32px;
      border: none;
    }
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
    line-height: 60px;
    background: #eaeaea;
    i {
      right: 10px;
      top: 5px;
    }
  }
  .tips {
    font-size: 20px;
    color: #ff433d;
    line-height: 60px;
  }
}
.changeColor {
  color: #ccc !important;
  border-color: #ccc !important;
}
.ischecked {
  background: #ff433d !important;
}
.shaType {
  display: flex;
  img {
    width: 412px;
  }
}
.cropBox {
  width: 250px;
  height: 250px;
  background-image: url(../../assets/images/crop.png);
  background-size: 100% 100%;
  position: relative;
  margin: 48px auto;

  img {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -100px;
    margin-top: -100px;
  }
}
</style>
