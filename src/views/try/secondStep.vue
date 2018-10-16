<template>
  <div class="successBox">
      <div class="topBox">
        <div class="tit">
          <i class="iconfont icon-zhengquewancheng-yuankuang"></i>
          提交成功
        </div>
        <div class="text">
          <p>一天内申请10个免费试用送200朵小红花，</p>
          <p>小红花可兑换一口价的商品，</p>
          <p>系统将于每人21:00抽取中奖用户，请耐心等待</p>
        </div>
        <div class="imgbox">
          <img src="" alt="">
        </div>
        <p>（小福社小程序二维码)</p>
      </div>
      <p class="likeTit pr">猜你喜欢</p>
      <ul>
        <li class="pr likeList">
          <img src="" alt="">
          <div class="pr likes">

          </div>
        </li>
        <li class="pr likeList">
          <img src="" alt="">
          <div class="pr likes">

          </div>
        </li>
      </ul>
      <button class="submitbtn">申请更多，中奖率更高</button>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>

<style lang="less" scoped>
  .successBox{
    overflow: hidden;
  }
  .topBox{
    width:100%;
    height:655px;
    background: #FF504B;
    margin-top:20px;
    color:#fff;
    overflow: hidden;
    .tit{
      font-size:40px;
      margin-top:74px;
      margin-bottom:35px;
      i{
        font-size:46px;
      }
    }
    .text{
      font-size:24px;
      line-height:36px;
    }
    .imgbox{
      margin:38px auto 34px;
      width:260px;
      height:260px;
      background: pink;
    }
  }
  .likeTit{
    height:94px;
    line-height: 94px;
    font-size:32px;
  }
  .likeTit:before,  .likeTit:after{
    position: absolute;
    content:'';
    height: 1px;
    width:106px;
    background: #DCDCDC;
    top:50%;
    left:460px;
  }
    .likeTit:before{
      left:200px
    }
    .likeList{
      width:348px;
      height:348px;
      float: left;
      margin-left:20px;
      background: pink;
    }
    .likes{
      height:85px;
      bottom:0;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
     .submitbtn{
            height:98px;
            background: #FF433D;
            color:#fff;
            border:none;
            width:100%;
            font-size:32px;
            margin-top:30px;
        }
    
</style>
