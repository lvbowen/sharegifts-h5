<template>
  <div class="firstStep">
    <header>
      <div class="imgBox">
        <img src="" alt="">
      </div>
      <div class="rightBox">
        <h1>
          <i class="iconfont icon-taobao2"></i>商品名称</h1>
        <p>
          <label for="">店铺名称：</label>啦啦啦
        </p>
        <p>
          <label for="">价格：</label>
          <span>199元</span>
        </p>
        <p>
          <label for="">规格：</label>
          <span>无</span>
        </p>
      </div>
    </header>
    <div class="mainBox">
      <h1>
        <span>搜索流程</span>
      </h1>
      <div class="stepBox">
        <p><span class="num">1</span>打开<span class="high">手机淘宝APP</span></p>
        <div class="content">
          <div class="contentC"></div>
        </div>

      </div>
      <div class="stepBox">
        <p><span class="num">2</span>登陆淘宝账号<span class="high">12255</span>进入购物车，找到宝贝</p>
        <div class="content">
          <div class="contentC"></div>
        </div>
      </div>
      <div class="stepBox">
        <p><span class="num">3</span>在宝贝详情页底部点击<span class="high">关注/收藏按钮</span>，关注收藏宝贝，如图</p>
        <div class="content">
          <div class="contentC inner">
          关注/收藏宝贝：<button>上传截图</button>
          </div>
        </div>
      </div>
      <div class="stepBox">
        <p><span class="num">4</span>在宝贝详情页底部点击店铺按钮进入店铺，页面顶部店铺名字旁，<span class="high">点击关注</span>，如图</p>
        <div class="content">
          <div class="contentC thirdStep inner">
          关注/收藏宝贝：<button>上传截图</button>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <button>加入购物车后，确定申请</button>
    </footer>
   
  </div> 
</template>
<script>
  export default{
    data(){
      return {

      }
    }
  }
</script>
<style lang='less' scoped>
@color-base: #ff433d;
.firstStep {
  width: 100%;
  height: 100%;
  line-height:normal;
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
      background: #ccc;
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
        font-size: 30px;
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
          padding:20px 0;
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
        .inner{
          padding-left: 40px;
          text-align: left;
          font-size: 26px;
          line-height: 55px;
          padding-bottom: 40px;
          button{
            width: 224px;
            height: 66px;
            border-radius:33px;
            border: 2px solid @color-base;
            color: @color-base;
            background: #fff;
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
.modelContent{
  background: #fff;
  z-index:9;
  padding:20px;
  
  .chooseBox{
    padding:20px;
    margin-bottom:20px;
  }
  .tits{
    color: #000;
    line-height: 60px;
  }
  .text{
    width:100%;
    height:60px;
    background: #eaeaea;
    i{
      right:10px;
      top:15px;
    }
  }
  .tips{
    font-size:20px;
    color:#ff433d;
    line-height:60px;
  }
 
  
}
</style>

