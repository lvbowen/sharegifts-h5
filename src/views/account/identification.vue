<template>
  <div class="verityBox">
    <header class="headerBOX"><span>{{type==1?'淘宝号':'京东号'}}</span>：{{params.account}}</header>
    <div class="containerBox">
      <!-- <div class="mainBox">
        <p class="tit">性别生日截图</p>
        <p class="tips">(请在电脑版{{type==1?'淘宝':'京东'}}-账户设置-修改头像昵称)</p>
        <div class="uploadImgBox" v-if="params.sex_pic">
          <img :src="params.sex_pic " alt="">
          <i class="iconfont icon-jian jh" @click="delImg(1)"></i>
        </div>
        <button @click="initUploadBtn(1)" v-if="!params.sex_pic">
          <i class="iconfont icon-STYL"></i>上传截图
        </button>

      </div> -->
      <div class="mainBox">
        <p class="tit">{{type==1?'淘气值':'京东豆'}}和{{type==1?'淘宝':'京东'}}账号等级截图 </p>
        <p class="tips" v-if="type==1">(请在手机淘宝-我的淘宝-我的淘气值）</p>
        <div class="uploadImgBox" v-if="params.value_pic">
          <img :src="params.value_pic" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(2)"></i>
        </div>
        <button @click="initUploadBtn(2)" v-if="!params.value_pic">
          <i class="iconfont icon-STYL"></i>上传截图
        </button>
      </div>
      <!-- <div class="mainBox">
        <p class="tit">{{type==1?'淘宝':'京东'}}购买记录截图 </p>
        <p class="tips" v-if="type==1">(请在手机淘宝-我的淘宝-查看更多订单，上传最近几条购买记录）</p>
        <div class="uploadImgBox" v-if="params.record_pic">
          <img :src="params.record_pic" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(3)"></i>
        </div>
        <button @click="initUploadBtn(3)" v-if="!params.record_pic">
          <i class="iconfont icon-STYL"></i>上传截图
        </button>
      </div>
      <div class="mainBox">
        <p class="tit">{{type==1?'淘宝':'京东'}}好评率截图 </p>
        <p class="tips" v-if="type==1">(请在电脑版淘宝-账号管理-评价管理）</p>
        <div class="uploadImgBox" v-if="params.praise_pic">
          <img :src="params.praise_pic" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(4)"></i>
        </div>
        <button @click="initUploadBtn(4)" v-if="!params.praise_pic">
          <i class="iconfont icon-STYL"></i>上传截图
        </button>
      </div>
      <div class="mainBox">
        <p class="tit">{{type==1?'淘宝':'京东'}}账号收货地址截图 </p>
        <p class="tips" v-if="type==1">(请在手机淘宝-我的淘宝-设置-我的收货地址）</p>
        <div class="uploadImgBox" v-if="params.address_pic">
          <img :src="params.address_pic" alt="">
          <i class="iconfont icon-jian jh" @click="delImg(5)"></i>
        </div>
        <button @click="initUploadBtn(5)" v-if="!params.address_pic">
          <i class="iconfont icon-STYL"></i>上传截图
        </button>
      </div> -->

    </div>
    <div class="tagBox">
      <div class="title">
        请选择个人标签
      </div>
      <ul class="clearfix">
        <li class="fl" :class="{'active':tagShowFlag[index]}" v-for="(item,index) in tagsBox" :key="index" @click="selectTag(index)">{{item}}
        </li>
      </ul>
    </div>
    <button class="submitbtn" @click="verityInfos">提交</button>
  </div>
</template>
<script>
import { GfActive, verityAccount, uploadImg } from "@/api/API"
import wx from 'weixin-js-sdk'

export default {

  data () {
    return {
      tempImg: {
        localId: '',
        serverId: ''
      },
      tagsBox: ['在校学生', '职场白领', '技术蓝领', '家庭主妇', '公务员', '医护人员', '餐饮行业', '自由行业', '专职司机'],
      tagShowFlag: [false, false, false, false, false, false, false, false, false],
      params: {
        id:0,
        account: '',
        sex_pic: '',
        value_pic: '',
        record_pic: '',
        praise_pic: '',
        address_pic: '',
        tags: '',
      },
      tempImg: {
        localId: '',
        serverId: ''
      },
      jssdk_config: {},
      uploadArr:[],
      type:1,
    }
  },
  created () {
    this.dealUrl(location.href)
    // this.dealUrl('https://xfsapi.aiju.com/h5/#/?token=7b04c7d249d76b4196cd7a54aef4aaee&active_id=9&type=1')
    this.getWXconfig()

  },
  methods: {
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
           mediaId:this.tempImg.serverId
          }).then(response => {
            let result = response.data
            if (result.success) {
              if (index == 1) {
                this.params.sex_pic = result.data[0]
              } else if (index == 2) {
                this.params.value_pic = result.data[0]
              } else if (index == 3) {
                this.params.record_pic = result.data[0]
              } else if (index == 4) {
                this.params.praise_pic = result.data[0]
              } else {
                this.params.address_pic = result.data[0]
              }

            }
          })
        },
        fail: (res) => {
          alert(res)
        }
      })
    },
    selectTag (index) {
      this.tagShowFlag.splice(index, 1, !this.tagShowFlag[index])
    },
    //处理地址
    dealUrl (url) {
      if (url.indexOf('?') > -1) {
        let str = url.split('?')[1];
        let token = str.split('&')[0].split('=')[1]
        localStorage.setItem('token', token)
        this.params.account = decodeURI(str.split('&')[1].split('=')[1]);
        this.params.id = str.split('&')[2].split('=')[1];
        this.type = str.split('&')[3].split('=')[1];
      }
    },
    //点击认证
    verityInfos(){
      let tagArr=[]
      for(let i=0;i<this.tagShowFlag.length;i++){
        if(this.tagShowFlag[i]){
          tagArr.push((i+1))
        }
      }
      this.params.tags=JSON.stringify(tagArr)
      verityAccount(this.params).then(response => {
        let res=response.data
        if(res.success){
          this.$alert('提交成功！')
          if(this.type==1){
            wx.miniProgram.getEnv(function (res) {
              if (res.miniprogram) {
                  wx.miniProgram.navigateTo({ url: '/pages/mine/account/edit/edit?type=1' })
              }
            })
          }else{
            wx.miniProgram.getEnv(function (res) {
              if (res.miniprogram) {
                  wx.miniProgram.navigateTo({ url: '/pages/mine/account/edit/edit?type=2' })
              }
            })
          }
          
        }else{
          this.$alert(res.msg)
        }
      })
    },
    delImg(i){
      if(i==1){
        this.params.sex_pic=''
      }else if(i==2){
        this.params.value_pic=''
      }else if(i==3){
        this.params.record_pic=''
      }else if(i==4){
         this.params.praise_pic=''
      }else if(i==5){
        this.address_pic=''
      }
      this.$alert('图片删除成功！')
    }
  }
}
</script>
<style lang="less" scoped>
.verityBox {
  position: relative;
  height:100%;
  overflow: hidden;
  .headerBOX {
    height: 120px;
    background: #fff;
    margin-top: 20px;
    text-align: left;
    line-height: 120px;
    padding: 0 30px;
    font-size: 30px;
    color: #000;
    font-weight: 500;
  }
  .containerBox {
    padding: 20px 30px;
    .mainBox {
      background: #fff;
      width: 100%;
      margin-bottom: 20px;
      font-size: 26px;
      overflow: hidden;
      padding-bottom:20px;
      .tit {
        color: #000000;
        margin-top: 36px;
        height: 34px;
        line-height: 34px;
      }
      .tips {
        line-height: 34px;
        color: #939994;
      }
      button {
        width: 224px;
        height: 58px;
        margin-top: 30px;
        border-radius: 29px;
        background: #fff;
        border: 2px solid #ff433d;
        color: #ff433d;
      }
    }
  }
  .tagBox {
    background: #fff;
    padding-left: 28px;
    .title {
      height: 55px;
      line-height: 55px;
      text-align: left;
    }
    li {
      width: 154px;
      height: 58px;
      line-height: 58px;
      border: 1px solid #cccccc;
      margin-right: 25px;
      margin-bottom: 30px;
    }
  }
  .submitbtn {
    height: 98px;
    background: #ff433d;
    color: #fff;
    border: none;
    width: 100%;
    font-size: 32px;
    position: absolute;
    bottom:0;
    left:0;
  }
}

.active {
  background: #ff433d;
  color: #fff;
  border: none !important;
}
</style>


