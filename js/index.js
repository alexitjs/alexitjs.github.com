
window.onload=function(){
	;(function(){
		//document.documentElement.style.height=document.documentElement.clientHeight+'px';
		var oIntro=getByClass(document,'intro')[0];
		var oA=oIntro.children[1];
			move(oIntro,{top:0},{duration:3000});
		oA.onclick=function(){
			move(oIntro,{top:-900},{duration:2000});
		};
	})();
	//
	var oTop=getByClass(document,'toTop')[0];
	totop(oTop);
	//吸顶tiao
	var oNav=document.getElementById('nav');
	var oBlock=getByClass(oNav,'block')[0];
	var aLi=oNav.getElementsByTagName('li');
	var N=aLi.length;
	for(var i=0;i<N;i++){
		var iNow=0;
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
	//无缝轮播图
	;(function(){
		var oDom=document.getElementById('dom');
		var oDomPlay=getByClass(oDom,'dom_play')[0];
		var oUl=oDom.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';
		var iNow=1;
		var oPrev=getByClass(oDom,'perv')[0];
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
			oPrev.onclick=function(){
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
		var newleft=0;
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
	//穿墙
	;(function(){
		var oMove=getByClass(document,'move')[0];
		var oUl=oMove.children[0];
		var aLi=oUl.children;
		for(var i=0;i<aLi.length;i++){
			through(aLi[i]);
		}
	})();
	//消失返回
	;(function(){
		var oUl=getByClass(document,'move_back')[0];
		var aLi=oUl.children;
		var oBtn=getByClass(document,'move_btn')[0];
		var oldLeft=[];
		var oldTop=[];
		for(var i=0;i<aLi.length;i++){
			oldLeft.push(aLi[i].offsetLeft)
			oldTop.push(aLi[i].offsetTop)
		};
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.position='absolute';
			aLi[i].style.left=oldLeft[i]+'px';
			aLi[i].style.top=oldTop[i]+'px';
			aLi[i].style.magrin=0;
		}
		var bok=false;
		oBtn.onclick=function(){
			if(bok){return;}
			bok=true;
			for(var i=0;i<aLi.length;i++){
				(function(index){
					setTimeout(function(){
						move(
							aLi[index],
							{top:0,left:0,width:0,height:0,opactiy:0},
							{"easing":Tween.Linear,
							complete:function(){
								console.log(aLi.length-1,index)
								if(index==aLi.length-1){
									for(var i=aLi.length;i>=0;i--){
										(function(index){
											setTimeout(function(){
												move(aLi[index],
													{left:oldLeft[index],
														top:oldTop[index],
														width:300,height:200,
														opacity:1},
													{complete:function(){
														if(index==0){
														bok=false;
													}
												}});
											},(aLi.length-1-index)*100);
										})(i)
									}
								}
						}});
					},index*100);
				})(i);
			}
		};
	})();
};






