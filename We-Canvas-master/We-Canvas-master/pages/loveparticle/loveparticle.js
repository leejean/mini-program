// pages/cooltimer/cooltimer.js
var ctx=null;
var timer1 = null;
var timer2 = null;
var factor={
              speed:.02,  // 运动速度，值越小越慢
              t:0    //  贝塞尔函数系数
            };

var factor1={
              speed:.02,  // 运动速度，值越小越慢
              t:0    //  贝塞尔函数系数
            };

var texts ="汪汪汪";

var colors = ['lightskyblue',  'lawngreen',   'greenyellow',   'orangered',    'turquoise',   'pink',   'plum']
var points=[{x:2,y:4},{x:20,y:10},{x:30,y:40},{x:30,y:50},{x:50,y:70}];            
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: options.title,
      success: function(res) {
        // success
      }
    })
    var that = this
    ctx = wx.createCanvasContext('canvas_ct')
    points.splice(0,points.length)
    factor1.t = 0;
    setTimeout(function(){
        timer1 = setInterval(function(){
        that.render([[{x:150,y:140},{x:30,y:72},{x:70,y:20},{x:150,y:60}]])
     },30)
    },1000)
    
      
    
  },

  render:function(data){
     console.log("111")
    var that = this
    var p10= data[0][0];   // 三阶贝塞尔曲线起点坐标值
    var p11= data[0][1];   // 三阶贝塞尔曲线第一个控制点坐标值
    var p12= data[0][2];   // 三阶贝塞尔曲线第二个控制点坐标值
    var p13= data[0][3];   // 三阶贝塞尔曲线终点坐标值
    ctx.beginPath();
     points.splice(0,points.length)
    ctx.setLineWidth(1);
    ctx.setFillStyle(colors[Math.floor(Math.random()*5)])
     var t = factor.t;
     ctx.setLineJoin('round')
    /*计算多项式系数 （下同）*/    
    var cx1 = 3*(p11.x-p10.x);
    var bx1 = 3*(p12.x-p11.x)-cx1;
    var ax1 = p13.x-p10.x-cx1-bx1;

    var cy1 = 3*(p11.y-p10.y);
    var by1 = 3*(p12.y-p11.y)-cy1;
    var ay1 = p13.y-p10.y-cy1-by1;

    var xt1 = ax1*(t*t*t)+bx1*(t*t)+cx1*t+p10.x;
    var yt1 = ay1*(t*t*t)+by1*(t*t)+cy1*t+p10.y;
    points.push({x:xt1,y:yt1})
     factor.t +=factor.speed;
    //  ctx.lineTo(xt1, yt1)
     
     for(var i=0;i<points.length;i++){
       
        ctx.arc(points[i].x, points[i].y,2,0,2*Math.PI)
     }

    
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(230, 20, 270, 72, 150, 140)
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(70, 20, 30, 72, 150, 140)
    ctx.fill();
    if(yt1<140){
        ctx.draw(true)
    }else{
        ctx.draw()
    }
    
    
    if( factor.t >1){
        factor.t = 0
         timer2 = setInterval(function(){
            that.render2([[{x:150,y:60},{x:230,y:20},{x:270,y:72},{x:150,y:140}]])
        },30)
        clearInterval(timer1)
     }
  },


  render2:function(data){
    console.log("222")
    var that = this
    var p20= data[0][0];
    var p21= data[0][1];
    var p22= data[0][2];
    var p23= data[0][3];
     points.splice(0,points.length)
 ctx.beginPath();
    ctx.setLineWidth(1);
    ctx.setLineJoin('red')
    ctx.setFillStyle(colors[Math.floor(Math.random()*5)])
     var t = factor1.t;

    var cx2 = 3*(p21.x-p20.x);
    var bx2 = 3*(p22.x-p21.x)-cx2;
    var ax2 = p23.x-p20.x-cx2-bx2;

    var cy2 = 3*(p21.y-p20.y);
    var by2 = 3*(p22.y-p21.y)-cy2;
    var ay2 = p23.y-p20.y-cy2-by2;

    var xt2 = ax2*(t*t*t)+bx2*(t*t)+cx2*t+p20.x;
    var yt2 = ay2*(t*t*t)+by2*(t*t)+cy2*t+p20.y;

    points.push({x:xt2,y:yt2})
     factor1.t +=factor1.speed;
    // ctx.lineTo(xt2, yt2)
     for(var i=0;i<points.length;i++){
        ctx.arc(points[i].x, points[i].y,2,0,2*Math.PI)

     }
     if(points[points.length-1].y>=140){
          clearInterval(timer2)
          that.renderText()
          return ;
     }

    
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(230, 20, 270, 72, 150, 140)
    // ctx.moveTo(150,60)
    // ctx.bezierCurveTo(70, 20, 30, 72, 150, 140)
    ctx.fill();
    
        ctx.draw(true)
    
    if( factor1.t >1){
       // factor1.t = 0
        // clearInterval(timer2)
     }
  },

  renderText:function(){
    
      ctx.setFontSize(20)
      setTimeout(function(){
        ctx.setFillStyle(colors[Math.floor(Math.random()*5)])
        ctx.fillText(texts.substring(0,1), 120, 100)
        ctx.draw(true)
      },1000)

      setTimeout(function(){
        ctx.setFillStyle(colors[Math.floor(Math.random()*5)])
          ctx.fillText(texts.substring(1,2), 140, 100)
        ctx.draw(true)
      },2000)

      setTimeout(function(){
        ctx.setFillStyle(colors[Math.floor(Math.random()*5)])
          ctx.fillText(texts.substring(2,3), 160, 100)
        ctx.draw(true)
      },3000)
      
  },

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