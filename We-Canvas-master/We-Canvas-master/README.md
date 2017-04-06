# We-Canvas
##1.We-Canvas之WaveImage

###效果图： 

![](http://p1.bpimg.com/567571/0740556f855f2858.gif)

###实现细节： 

####1.js: 
---
<pre> drawImage:function(data){
	var that = this
	var p10= data[0][0];   /* 三阶贝塞尔曲线起点坐标值*/
	var p11= data[0][1];   /* 三阶贝塞尔曲线第一个控制点坐标值*/
	var p12= data[0][2];   /* 三阶贝塞尔曲线第二个控制点坐标值*/
	var p13= data[0][3];   /* 三阶贝塞尔曲线终点坐标值*/
	
	var p20= data[1][0];
	var p21= data[1][1];
	var p22= data[1][2];
	var p23= data[1][3];
	
	var p30= data[2][0];
	var p31= data[2][1];
	var p32= data[2][2];
	var p33= data[2][3];
	
	var t = factor.t;
	
	/*计算多项式系数 （下同）*/    
	var cx1 = 3*(p11.x-p10.x);
	var bx1 = 3*(p12.x-p11.x)-cx1;
	var ax1 = p13.x-p10.x-cx1-bx1;
	
	var cy1 = 3*(p11.y-p10.y);
	var by1 = 3*(p12.y-p11.y)-cy1;
	var ay1 = p13.y-p10.y-cy1-by1;
	
	var xt1 = ax1*(t*t*t)+bx1*(t*t)+cx1*t+p10.x;
	var yt1 = ay1*(t*t*t)+by1*(t*t)+cy1*t+p10.y;
	
	var cx2 = 3*(p21.x-p20.x);
	var bx2 = 3*(p22.x-p21.x)-cx2;
	var ax2 = p23.x-p20.x-cx2-bx2;
	
	var cy2 = 3*(p21.y-p20.y);
	var by2 = 3*(p22.y-p21.y)-cy2;
	var ay2 = p23.y-p20.y-cy2-by2;
	
	var xt2 = ax2*(t*t*t)+bx2*(t*t)+cx2*t+p20.x;
	var yt2 = ay2*(t*t*t)+by2*(t*t)+cy2*t+p20.y;
	
	
	
	 var cx3 = 3*(p31.x-p30.x);
	var bx3 = 3*(p32.x-p31.x)-cx3;
	var ax3 = p33.x-p30.x-cx3-bx3;
	
	var cy3 = 3*(p31.y-p30.y);
	var by3 = 3*(p32.y-p31.y)-cy3;
	var ay3 = p33.y-p30.y-cy3-by3;
	
	/*计算xt yt的值 */
	var xt3 = ax3*(t*t*t)+bx3*(t*t)+cx3*t+p30.x;
	var yt3 = ay3*(t*t*t)+by3*(t*t)+cy3*t+p30.y;
	factor.t +=factor.speed;
	ctx.drawImage("../../images/heart1.png",xt1,yt1,30,30);
	ctx.drawImage("../../images/heart2.png",xt2,yt2,30,30);
	ctx.drawImage("../../images/heart3.png",xt3,yt3,30,30);
	ctx.draw();
	if(factor.t>1){
	    factor.t=0;
	    cancelAnimationFrame(timer);
	    that.startTimer();
	}else{
	    timer =requestAnimationFrame(function(){
	        that.drawImage([[{x:30,y:400},{x:70,y:300},{x:-50,y:150},{x:30,y:0}],[{x:30,y:400},{x:30,y:300},{x:80,y:150},{x:30,y:0}],[{x:30,y:400},{x:0,y:90},{x:80,y:100},{x:30,y:0}]])
	  })
	}}
</pre>

####2.原理：
---
  a.通过绘制三条不同的三阶贝塞尔曲线，选取三张图片让其沿着各自的贝塞尔曲线运动，运动轨迹如下图：  

 ![](http://i1.piimg.com/567571/f056562040342c21.png)  

  b.计算三阶贝塞尔曲线x(t),y(t)的数学表达式。  
  三阶贝塞尔曲线是通过四个点来形成一条曲线，两个控制点，一个起点一个终点。  
  利用多项式系数即可得到x(t),y(t)的数学表达式： 
  	 
	cx = 3 * ( x1 - x0 )
	bx = 3 * ( x2 - x1 ) - cx
	ax = x3 - x0 - cx - bx
	cy = 3 * ( y1 - y0 )	
	by = 3 * ( y2 - y1 ) - cy
	ay = y3 - y0 - cy - by
	
	x(t) = ax * t ^ 3 + bx * t ^ 2 + cx * t + x0
	y(t) = ay * t ^ 3 + by * t ^ 2 + cy * t + y0  
这里画了三条贝塞尔曲线，套用公式三次即可，这里没有采用循环，如果贝塞尔曲线条数比较多时，可采用循环调用 ctx.drawImage，其中factor.t为三阶贝塞尔曲线的参数，取值范围[0,1], 最后调用ctx.draw(),并且设置定时器即可实现图片沿着贝塞尔曲线运动。
 
####Tip：
这里采用的定时器是通过requestAnimationFrame（）函数实现的， 弃用setInterval的原因是实际测试中有卡帧现象并且动画显示有细微的不连续。


##2.We-Canvas之Particle 

###效果图： 

![](http://i1.piimg.com/4851/0541915c0b449ae6.gif)  
 
###实现原理：  
比较简单，通过绘制两条三阶贝塞尔曲线即可绘制爱心图形， 但如何实现粒子逐个显示呢？  
其实很简单，通过第一篇文章我们很容易获取贝塞尔曲线上每个点的坐标值， 我们绘制运动轨迹第一个点时调用ctx.draw()方法，后续所有点都采用ctx.draw(true)方法即可实现粒子逐个显示。 其中的参数true官方文档有说明，如下：  
  	"reserve	Boolean	非必填。本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false"  

  
---  
####举一反三：
练习了这个demo，是不是感觉 贪吃蛇小游戏是不是这种套路啊 ？！  




##3.We-Canvas之FlappyBird

###效果图： 

![](http://p1.bpimg.com/4851/5a1f2229033ee2ce.gif)

###实现细节： 
 
####JS逻辑:  
 
######主要包括 小鸟下降逻辑、随机空隙管道逻辑、 单机屏幕事件、碰撞事件、计数逻辑   
---
小鸟下降：
<pre>
birdDown:function(){
    ctx.clearRect(0, 0, res.windowWidth, res.windowHeight)
    bird.y += bird.factor
    ctx.drawImage(birds[Math.floor(Math.random()*2)], bird.x, bird.y, bird.px, bird.px)

    ctx.draw()

    timer1 = requestAnimationFrame(this.birdDown)

   
    if( bird.y>res.windowHeight){
      cancelAnimationFrame(timer1)
     
}
</pre>

随机空隙管道：
<pre>
  pipe:function(){
	pipe.x-=pipe.factor
	bird.y += bird.factor
	if(pipe.x <-pipe.width){
	    pipe.x = res.windowWidth
	    gapHeightY = Math.floor(Math.random()*(res.windowHeight-200))+20
	
	}
	ctx.drawImage('../../images/flappybird/pipe_down.png', pipe.x, 0, pipe.width, gapHeightY)
	ctx.drawImage('../../images/flappybird/pipe_up.png', pipe.x, gapHeightY+gapHeight, pipe.width,          res.windowHeight-gapHeightY-gapHeight)
  }
</pre>

单机屏幕事件：
<pre>
	bird.y -= bird.factor2

	//  只需改变bird的y坐标值即可
</pre>


碰撞事件：
<pre>
// 这里加了一个插值数10，目的是为了更贴近碰撞
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
</pre>

计数逻辑：
<pre>
// 根据小鸟x坐标和管道宽度进行判断   每完成一次就加1
if(pipe.x ==10){
      bnum+=1;
      console.log(bnum)
      this.setData({
        bird_number:bnum
      })
    }
</pre>






