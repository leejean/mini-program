// pages/flappybird/flappybird.js
var ctx = null;
var res = null;
var bird={   // bird对象
    y:100,   // bird初始左上角y坐标
    x:50,    // bird初始左上角x坐标
    px:40,   //  bird的像素大小
    factor:1,  //  下降速率
    factor2:20,  //  每点击一次时上升像素
    cX:0,   //  bird 右上角x坐标
    cY:0    //  bird 右上角y坐标
}

var pipe={  // 管道对象
    x:0,    // 管道初始左上角x坐标
    width:60,   //  管道宽度
    factor:0.5,  // 管道运动速率
    cX:0,  // 管道空隙左上角x坐标（即pipe.x）
    cY:0   // 管道空隙左上角y坐标
}
var timer1 = null;
var gapHeightY =0;   //  空隙左上角Y坐标
var gapHeight = 150;  // 空隙高度
var bnum = 0;  // 完成个数
var birds=['../../images/flappybird/bird2_0.png','../../images/flappybird/bird2_1.png','../../images/flappybird/bird2_2.png']
Page({
  data:{
    canvas_fb_style:'',
    style_start:'',
    src_img_title:'../../images/flappybird/title.png',
    bird_number:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: options.title,
      success: function(res) {
        // success
      }
    })
    res = wx.getSystemInfoSync()
    this.setData({
        canvas_fb_style:'width:'+res.windowWidth+'px;height:'+res.windowHeight+'px;'
    })
     ctx = wx.createCanvasContext('canvas_fb')
     
  },

  //  开始游戏
  start_game:function(e){
    bnum = 0;
    bird.y = 100
    pipe.x = res.windowWidth-pipe.width
    gapHeightY = Math.floor(Math.random()*(res.windowHeight-200))+20
    this.birdDown();
    this.setData({
      style_start:'display:none;',
      bird_number:0
    })
  },

  // 小鸟下降函数
  birdDown:function(){
    ctx.clearRect(0, 0, res.windowWidth, res.windowHeight)
    pipe.x-=pipe.factor
    bird.y += bird.factor
    if(pipe.x <-pipe.width){
      pipe.x = res.windowWidth
      gapHeightY = Math.floor(Math.random()*(res.windowHeight-200))+20

    }
    this.pipe()
    ctx.drawImage(birds[Math.floor(Math.random()*2)], bird.x, bird.y, bird.px, bird.px)

    ctx.draw()

    timer1 = requestAnimationFrame(this.birdDown)

    this.crash()
    if(pipe.x ==10){
      bnum+=1;
      console.log(bnum)
      this.setData({
        bird_number:bnum
      })
    }
    if( bird.y>res.windowHeight){
      cancelAnimationFrame(timer1)
      this.gameOver();
    }
     
  },

  // 随机空隙的管道
  pipe:function(){
      ctx.drawImage('../../images/flappybird/pipe_down.png', pipe.x, 0, pipe.width, gapHeightY)
      ctx.drawImage('../../images/flappybird/pipe_up.png', pipe.x, gapHeightY+gapHeight, pipe.width, res.windowHeight-gapHeightY-gapHeight)
  },


  // 单击屏幕事件
  onClickScreen:function(e){
      bird.y -= bird.factor2
      
  },


  // 碰撞函数
  crash:function(){
      bird.cX = bird.x+bird.px-10
      bird.cY = bird.y
      pipe.cX = pipe.x
      pipe.cY = gapHeightY
      if(bird.cX > pipe.cX & bird.cY < pipe.cY-10 ){
          if(bird.cX < pipe.cX+pipe.width){
              cancelAnimationFrame(timer1)
              this.gameOver();
          }
          
      }else if(bird.cX > pipe.cX & bird.cY+bird.px > pipe.cY+gapHeight+10){
          if(bird.cX < pipe.cX+pipe.width){
             cancelAnimationFrame(timer1)
             this.gameOver();
          }
         
      }

  },

  //    游戏结束
  gameOver:function(){
      this.setData({
        style_start:'display: flex;',
        src_img_title:'../../images/flappybird/text_game_over.png'
      })
  } ,



  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})