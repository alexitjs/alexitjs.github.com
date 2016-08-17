document.addEventListener('DOMContentLoaded',function(){
	//返回顶部
	var oTop=getByClass(document,'toTop')[0];
	totop(oTop);
	//吸顶条
	var oNav=document.getElementById('nav');
	var oBlock=getByClass(oNav,'block')[0];

	var aLi=oNav.getElementsByTagName('li');
	oBlock.style.left=aLi[0].offsetWidth*2+'px';
	var N=aLi.length;
	for(var i=0;i<N;i++){
		var iNow=2;
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
		
	//h5展示
	;(function(){
		var oUl=document.querySelector('.all');
		var oHeader=document.querySelector('.header');
		var oPerv=getByClass(document,'all_perv')[0];
		var oNext=getByClass(document,'all_next')[0];
		var aLi=oUl.children;
		for(var i=0;i<aLi.length;i++){
			(function(index){
				aLi[index].onmouseover=function(){
					aLi[index].children[0].style.webkitTransform='translateZ(-2px) translateX(5px) rotate(-10deg) scale(1.2,1.2)';
					aLi[index].children[1].style.opacity=0.8;	
					aLi[index].children[1].style.webkitTransform='translateZ(0) scale(0,0)';	
					aLi[index].children[2].style.webkitTransform='translateZ(0) scale(1.5,1.5)';	
				};		
				aLi[index].onmouseout=function(){
					aLi[index].children[0].style.webkitTransform='translateZ(-2px) translateX(0px) rotate(0deg) scale(1,1)';
					aLi[index].children[1].style.opacity=0;	
					aLi[index].children[1].style.webkitTransform='translateZ(0) scale(1,1)';	
					aLi[index].children[2].style.webkitTransform='translateZ(0) scale(0,0)';	
				};
			})(i)
		}
		var aClass=[];
		var bok=false;
		for(var i=0;i<aLi.length;i++){
			aClass.push(aLi[i].className);
		}
		oPerv.onclick=function(){
			if(bok){return;}
			bok=true;
			aClass.unshift(aClass.pop());
			tab()
		}
		oNext.onclick=function(){
			if(bok){return;}
			bok=true;
			aClass.push(aClass.shift());
			tab()
		}
		var oCur=document.querySelector('.cur');
		function tab(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className=aClass[i];
			}
			function tranEnd(){
				bok=false;
				oCur.removeEventListener('transitionend',tranEnd,false);
			}
			oCur.addEventListener('transitionend',tranEnd,false)
		}
		
		var oBook=document.querySelector('.book');
		var oBomo=document.querySelector('.bomo');
		var oFilp=document.querySelector('.filp');
		var oSfilp=document.querySelector('.sfilp');
		var oDround=document.querySelector('.dround');
		var aSpan=document.querySelectorAll('.all_text');

		setTimeout(function(){
			oUl.style.webkitTransform='scale(0.8,0.8)'
		},1001);
		for(var i=0;i<aSpan.length;i++){
			
			(function(index){
					aSpan[index].onclick=function(){
						oUl.style.webkitTransform='scale(0.8,0)';
						oUl.style.webkitTransition='1s all ease';
						function tranEnd(){
							oUl.removeEventListener('transitionend',tranEnd,false);
						}
						oUl.addEventListener('transitionend',tranEnd,false);
						//判断
						switch( aSpan[index].className.replace(/^\s+|\s+$/g,'').split(/\s+/)[1]){
							case 'to_book':
								setTimeout(function(){
									oBook.style.WebkitTransform='scale(1,1)';
								},1011);
							break;
							case 'to_bomo':
								setTimeout(function(){
								oBomo.style.WebkitTransform='scale(1,1)';
								},1011)
								
							break;
							case 'to_filp':
								setTimeout(function(){
								oFilp.style.WebkitTransform='scale(1,1)';
								},1011)
								
							break;
							
							case 'to_sfilp':
								setTimeout(function(){
									oSfilp.style.WebkitTransform='scale(1,1)';
								},1011)
								
							break;
							case 'to_dround':
								setTimeout(function(){
									oDround.style.WebkitTransform='scale(1,1)';
								},1011)
								
							break;
						}
					}
			})(i);
		}
		//翻书
	;(function(){
		var oBox = document.querySelector('.book_box');
		var oPage = document.querySelector('.book_page');
		var oFront = document.querySelector('.book_front');
		var oBack = document.querySelector('.book_back');
		var oPage2 = document.querySelector('.book_page2');
		var iNow = 0;
		var bOk = false;

		oBox.onclick=function(){
			if(bOk)return;
			bOk = true;
			oPage.style.WebkitTransition = '1s all ease';
			oPage.style.WebkitTransform = 'perspective(800px) rotateY(-180deg)';
			iNow++;
			function tranEnd(){
				oPage.removeEventListener('transitionend',tranEnd,false);
				oPage.style.WebkitTransition = 'none';
				oBox.style.backgroundImage = 'url(img/'+(iNow%8+1)+'.jpg)';
				oFront.style.backgroundImage = 'url(img/'+(iNow%8+1)+'.jpg)';
				oBack.style.backgroundImage = 'url(img/'+((iNow+1)%8+1)+'.jpg)';
				oPage2.style.backgroundImage = 'url(img/'+((iNow+1)%8+1)+'.jpg)';
				
				oPage.style.WebkitTransform = 'perspective(800px) rotateY(0deg)';
				bOk = false;
			}
			oPage.addEventListener('transitionend',tranEnd,false);
		};
			var oCls=document.querySelector('.book_cls');
			oCls.onclick=function(){
				setTimeout(function(){
					oUl.style.webkitTransform='scale(0.8,0.8)';
					
				},1001);
				oBook.style.webkitTransform='scale(1,0) rotateX(0deg)';
			};
		})()
		//爆炸
		;(function(){
			var oBox = document.getElementById('bomo_box');
			var iNow = 0;
			var R = 5;
			var C = 10;
			var bOk = false;
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					var oS = document.createElement('span');
					oS.style.width = oBox.offsetWidth/C+'px';
					oS.style.height = oBox.offsetHeight/R+'px';
					oBox.appendChild(oS);
					oS.style.left = j*oS.offsetWidth+'px';
					oS.style.top = i*oS.offsetHeight+'px';
					oS.style.backgroundPosition = '-'+oS.offsetLeft+'px -'+oS.offsetTop+'px';
				}
			}
			var aS = oBox.children;
			oBox.onclick=function(){
				
				if(bOk)return;
				bOk = true;
				iNow++;
				for(var i=0;i<aS.length;i++){
					aS[i].style.WebkitTransition = '.7s all ease';
					var x = aS[i].offsetLeft+aS[i].offsetWidth/2-oBox.offsetWidth/2;
					var y = aS[i].offsetTop+aS[i].offsetHeight/2-oBox.offsetHeight/2;
					aS[i].style.WebkitTransform = 'perspective(800px) translate('+x+'px,'+y+'px) rotateY('+rnd(-360,360)+'deg) rotateX('+rnd(-360,360)+'deg) scale('+rnd(1,3)+','+rnd(1,3)+')';
					aS[i].style.opacity = 0;
				}
				
				function tranEnd(){
					aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);
					for(var i=0;i<aS.length;i++){
						aS[i].style.WebkitTransition = 'none';
						aS[i].style.backgroundImage = 'url(img/'+(iNow%8+1)+'.jpg)';
						aS[i].style.WebkitTransform = 'perspective(800px) translate(0,0) rotateY(0deg) rotateX(0deg) scale(1,1)';
						aS[i].style.opacity = 1;
					}
					oBox.style.backgroundImage = 'url(img/'+((iNow+1)%8+1)+'.jpg)';
					bOk = false;
				}
				aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
			};
			var oCls=document.querySelector('.bomo_cls');
			oCls.onclick=function(){
				setTimeout(function(){
					oUl.style.webkitTransform='scale(0.8,0.8)';
				},1831);
				oBomo.style.webkitTransform='scale(1,0)';
			};
		})()
		//颗粒旋转
		;(function(){
			var oBox = document.querySelector('.filp_box');
			var iNow = 0;
			var C = 5;
			var R = 10;
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					var oS = document.createElement('span');
					oS.style.width = oBox.offsetWidth/C+'px';
					oS.style.height = oBox.offsetHeight/R+'px';
					oS.innerHTML = '<em class="front"></em><em class="back"></em>';
					oBox.appendChild(oS);
					oS.style.left = j*oS.offsetWidth+'px';
					oS.style.top = i*oS.offsetHeight+'px';
					var oFront = oS.children[0];
					var oBack = oS.children[1];
					oFront.style.backgroundPosition = oBack.style.backgroundPosition = '-'+oS.offsetLeft+'px -'+oS.offsetTop+'px';
					oS.r = i;
					oS.c = j;
				}
			}
			
			var aS = oBox.children;
			var bOk = false;
			oBox.onclick=function(){
				if(bOk)return;
				bOk = true;
				iNow++;
				for(var i=0;i<aS.length;i++){
					(function(index){
						setTimeout(function(){
							aS[index].style.WebkitTransition = '1s all ease';
							aS[index].style.WebkitTransform = 'perspective(800px) rotateY(180deg)';
						},(aS[i].r+aS[i].c)*100);
					})(i);
				}
				function tranEnd(){
					aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);
					for(var i=0;i<aS.length;i++){
						aS[i].style.WebkitTransition = 'none';
						var oFront = aS[i].children[0];
						var oBack = aS[i].children[1];
						oFront.style.backgroundImage = 'url(img/'+(iNow%8+1)+'.jpg)';
						oBack.style.backgroundImage = 'url(img/'+((iNow+1)%8+1)+'.jpg)';
						aS[i].style.WebkitTransform = 'perspective(800px) rotateY(0deg)';
					}
					bOk = false;
				}
				aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
			};
			var oCls=document.querySelector('.filp_cls');
			oCls.onclick=function(){
				setTimeout(function(){
					oUl.style.webkitTransform='scale(0.8,0.8)';
					
				},1001);			
				oFilp.style.webkitTransform='scale(1,0)';
			};
		})()
		//百叶窗
		;(function(){
			var oBox = document.querySelector('.sfilp_box');
			var iNow = 0;
			var C = 1;
			var R = 50;
			for(var i=0;i<R;i++){
				for(var j=0;j<C;j++){
					var oS = document.createElement('span');
					oS.style.width = oBox.offsetWidth/C+'px';
					oS.style.height = oBox.offsetHeight/R+'px';
					oS.innerHTML = '<em class="front"></em><em class="back"></em>';
					oBox.appendChild(oS);
					oS.style.left = j*oS.offsetWidth+'px';
					oS.style.top = i*oS.offsetHeight+'px';
					var oFront = oS.children[0];
					var oBack = oS.children[1];
					oFront.style.backgroundPosition = oBack.style.backgroundPosition = '-'+oS.offsetLeft+'px -'+oS.offsetTop+'px';
					oS.r = i;
					oS.c = j;
				}
			}
			var aS = oBox.children;
			var bOk = false;
			oBox.onclick=function(){
				if(bOk)return;
				bOk = true;
				iNow++;
				for(var i=0;i<aS.length;i++){
					(function(index){
						setTimeout(function(){
							aS[index].style.WebkitTransition = '1s all ease';
							aS[index].style.WebkitTransform = 'perspective(800px) rotateY(180deg)';
						},(aS[i].r+aS[i].c)*100);
					})(i);
				}
				function tranEnd(){
					aS[aS.length-1].removeEventListener('transitionend',tranEnd,false);
					for(var i=0;i<aS.length;i++){
						aS[i].style.WebkitTransition = 'none';
						var oFront = aS[i].children[0];
						var oBack = aS[i].children[1];
						oFront.style.backgroundImage = 'url(img/'+(iNow%8+1)+'.jpg)';
						oBack.style.backgroundImage = 'url(img/'+((iNow+1)%8+1)+'.jpg)';
						aS[i].style.WebkitTransform = 'perspective(800px) rotateY(0deg)';
					}
					bOk = false;
				}
				aS[aS.length-1].addEventListener('transitionend',tranEnd,false);
			};
			
			var oCls=document.querySelector('.sfilp_cls');
			oCls.onclick=function(){

				oSfilp.style.webkitTransform='scale(1,0)';
				setTimeout(function(){
				oUl.style.webkitTransform='scale(0.8,0.8)';
					
				},1001)

				
			};
		})()
		//3d图片环
		;(function(){
			var aLi = document.querySelectorAll('.dround_box li');
			var oBox=document.querySelector('.dround_box');
			oBox.onclick=function(){
				var len = aLi.length;
				for(var i=0;i<len;i++){
					aLi[i].style.WebkitTransition = '1s all ease '+((len-i)*100)+'ms';
					aLi[i].style.WebkitTransform = 'rotateY('+360/len*i+'deg) translateZ(350px)';
				}
			}
			var oCls=document.querySelector('.dround_cls');
			oCls.onclick=function(){
				setTimeout(function(){
					oUl.style.webkitTransform='scale(0.8,0.8)';
s				},1801);
				oDround.style.webkitTransform='scale(1,0)';
				var len = aLi.length;
				for(var i=0;i<len;i++){
					aLi[i].style.WebkitTransition = '1s all ease '+((len-i)*100)+'ms';
					aLi[i].style.WebkitTransform = 'rotateY(0deg) translateZ(350px)';
				}
			};
		})()
	})()
	//3d时钟
	;(function(){
		var oClock=document.querySelector('.clock');
		var oHou=document.querySelector('.hou');
		var oMin=document.querySelector('.min');
		var oSec=document.querySelector('.sec');
		//1.设置好基本时钟
		time();
		function time(){
			var oDate=new Date();
			var h=oDate.getHours();
			var m=oDate.getMinutes();
			var s=oDate.getSeconds();
			//oHou.style.WebkitTransform='rotate('+h*30+'deg)';
			//5调整时针分针位置
			oHou.style.WebkitTransform='rotate('+(h*30+m/60*30)+'deg)';
			oMin.style.WebkitTransform='rotate('+(m*6+s/60*6)+'deg)';
			oSec.style.WebkitTransform='rotate('+s*6+'deg)';
		}
		setInterval(time,1000);
		//2刻度
		for(var i=0;i<60;i++){
			var oS=document.createElement('span');
			oS.style.WebkitTransform='rotate('+i*6+'deg)';
			//3.文字
			if(i%5==0){
				oS.style.height='18px';
				oS.innerHTML='<strong>'+(i/5||12)+'<\/strong>';
				//4旋转文字
				var oSt=oS.children[0];
				oSt.style.WebkitTransform='rotate('+-i*6+'deg)';
			}
			
			oClock.appendChild(oS);
		}
		
	})()
	

},false);
