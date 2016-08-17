
window.onload=function(){
		;(function(){
		var oDom=document.getElementById('dom');
		var oDomPlay=getByClass(oDom,'dom_play')[0];
		var oUl=oDom.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		var iNow=1;
		var oPerv=getByClass(oDom,'perv')[0];
		var oNext=getByClass(oDom,'next')[0];
		var oOl=oDom.getElementsByTagName('ol')[0];
		var aOli=oOl.children;
		var timer;
		var count=0;
		function time(){
			count+=5;
			if(count>=8000){count=0}
			oUl.style.left=-aLi[0].offsetWidth-count%(oUl.offsetWidth-aLi[0].offsetWidth*2)+'px';
			//console.log(count);
			iNow=Math.floor((-oUl.offsetLeft+aLi[0].offsetWidth/2)/aLi[0].offsetWidth);
			if(iNow<0){iNow+=2}else if(iNow==9){iNow=1}
			for(var i=0;i<aOli.length;i++){
				aOli[i].className='';
				aOli[iNow-1].className=' on';
			} 
		}
		clearInterval( oUl.timer);
		oUl.timer=setInterval(time,16)
		function tab(){	
			move(oUl,
				{"left":-iNow*aLi[0].offsetWidth},
				{"easing":Tween.Linear}
			);
			for(var i=0;i<aOli.length;i++){
				aOli[i].className='';
				aOli[iNow-1].className=' on';
			}
			iNow=iNow;
		}
		var timer2;
		oDomPlay.onmouseenter=function(ev){
			clearInterval(oUl.timer);
			tab();
			oPerv.onclick=function(){
				iNow--;
				if(iNow==0){
					oUl.style.left=-aLi[0].offsetWidth*(aLi.length-1)+'px';
					iNow=8;
				}
					tab();
			};
			oNext.onclick=function(){
				iNow++;
				if(iNow==9){
							
					iNow=1;
					oUl.style.left=0;
				}
				tab();
			};
			for(var i=0;i<aOli.length;i++){
				(function(index){
					aOli[index].onclick=function(){
						iNow=index+1;
						tab();
					}
				})(i);
			}
		};
		oDomPlay.onmouseleave=function(){
			newleft=oUl.offs
			if(-oUl.offsetLeft%1000==0){
				count=(iNow-1)*aLi[0].offsetWidth;
				clearInterval(oUl.timer);
				oUl.timer=setInterval(time,16)
			}else{
				move(oUl,
					{"left":-(iNow)*aLi[0].offsetWidth},
					{"easing":Tween.Linear,complete:function(){
						clearInterval(oUl.timer);
						count=-oUl.offsetLeft-aLi[0].offsetWidth;
						oUl.timer=setInterval(time,16);
					}}
				);
				for(var i=0;i<aOli.length;i++){
					aOli[i].className='';
						aOli[iNow-1].className=' on';
				}
			}
		};
	})();
	var oTop=getByClass(document,'toTop')[0];
	totop(oTop);
	var oNav=document.getElementById('nav');
	var oBlock=getByClass(oNav,'block')[0];
	var aLi=oNav.getElementsByTagName('li');
	oBlock.style.left=aLi[0].offsetWidth+'px';
	var N=aLi.length;
	for(var i=0;i<N;i++){
		var iNow=1;
		aLi[i].onmouseover=function(){
			spMove(oBlock,this.offsetLeft);
		};
		aLi[i].onmouseout=function(){
			spMove(oBlock,iNow*aLi[0].offsetWidth);
		};
		;(function(index){
			aLi[i].onclick = function(){
				iNow = index;
			};
		})(i);
	}
	;(function(){
				var oDiv1 = document.getElementById('div1');	
		var oDiv2 = document.getElementById('div2');	
		var oMask= document.getElementById('mask');	
		var oImg = oDiv2.children[0];
		//
		oDiv1.onmouseover = function(){
			oDiv2.style.display = 'block';	
			oMask.style.display = 'block';	
		};
		oDiv1.onmouseout = function(){
			oDiv2.style.display = 'none';	
			oMask.style.display = 'none';	
		};
		oDiv1.onmousemove = function(ev){
			var l = ev.pageX - oDiv1.offsetLeft-oMask.offsetWidth/2;
			var t = ev.pageY - oDiv1.offsetTop -oMask.offsetHeight/2;
			
			if(l<0){
				l = 0;
			}else if(l>oDiv1.offsetWidth - oMask.offsetWidth){
				l = oDiv1.offsetWidth - oMask.offsetWidth;
			}
			
			if(t<0){
				t = 0;
			}else if(t>oDiv1.offsetHeight - oMask.offsetHeight){
				t = oDiv1.offsetHeight - oMask.offsetHeight;
			}
			oMask.style.left = l +'px';
			oMask.style.top = t +'px';
			oImg.style.left = -l*(oImg.offsetWidth-oDiv2.offsetWidth)/(oDiv1.offsetWidth - oMask.offsetWidth)+'px';
			oImg.style.top = -t*(oImg.offsetHeight-oDiv2.offsetHeight)/(oDiv1.offsetHeight - oMask.offsetHeight)+'px';
		};
	})()
	;(function(){
		var oBox = document.getElementById('box');
			var iSpeedX = 0;
			var iSpeedY = 0;
			var lastX = 0;
			var lastY = 0;
			var oTxt=getByClass(document,'txt')[0];
			oBox.onmousedown=function(ev){
				oTxt.style.display='none';
				clearInterval(oBox.timer);
				var oEvent = ev||event;
				var disX = oEvent.clientX-oBox.offsetLeft;
				var disY = oEvent.clientY+document.body.scrollTop-oBox.offsetTop;
				document.onmousemove=function(ev){
					var oEvent = ev||event;
					oBox.style.left = oEvent.clientX-disX+'px';
					oBox.style.top = oEvent.clientY-disY+'px';
					
					iSpeedX = oEvent.clientX-lastX;
					iSpeedY = oEvent.clientY-lastY;
					
					lastX = oEvent.clientX;
					lastY = oEvent.clientY;
				};
				document.onmouseup=function(){
					document.onmousemove = null;
					document.onmouseup=null;
					
					//alert(iSpeedX+','+iSpeedY);
					
					dargmove(oBox);
					
					oBox.releaseCapture&&oBox.releaseCapture();
				};
				oBox.setCapture&&oBox.setCapture();
				return false;
			};
			
			
			function dargmove(obj){
				clearInterval(obj.timer);
				obj.timer = setInterval(function(){
					iSpeedY+=3;
					
					var l = obj.offsetLeft+iSpeedX;
					var t = obj.offsetTop+iSpeedY;
					
					if(t>=(document.documentElement.clientHeight-obj.offsetHeight)){
						t = document.documentElement.clientHeight-obj.offsetHeight;
						iSpeedY*=-0.85;
						iSpeedX*=0.85;
					}
					
					if(t<=0){
						t = 0;
						iSpeedY*=-0.85;
						iSpeedX*=0.85;
					}
					
					if(l>(document.documentElement.clientWidth-obj.offsetWidth)){
						l = document.documentElement.clientWidth-obj.offsetWidth;
						iSpeedX*=-0.85;
						iSpeedY*=0.85;
					}
					
					if(l<=0){
						l = 0;
						iSpeedX*=-0.85;
						iSpeedY*=0.85;
					}
					
					obj.style.left = l+'px';
					obj.style.top = t+'px';
					
					
					if(Math.abs(iSpeedX)<1)iSpeedX=0;
					if(Math.abs(iSpeedY)<1)iSpeedY=0;
					
					if(iSpeedX==0&&iSpeedY==0&&obj.offsetTop>=(document.documentElement.clientHeight-obj.offsetHeight)){
						clearInterval(obj.timer);
					}
				},30);
			}
		})()
};
