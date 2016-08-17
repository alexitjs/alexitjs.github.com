function spMove(obj,iTarget){
	var iSpeed = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		iSpeed+=(iTarget-obj.offsetLeft)/5;
		iSpeed*=0.7;
		obj.style.left = obj.offsetLeft+iSpeed+'px';
		if(Math.round(iSpeed)==0&&obj.offsetLeft==iTarget){
			clearInterval(obj.timer);
		}
	},30);
}
function rnd(n,m){
	return Math.floor(Math.random()*(m-n)+n);
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);	
	}else{
		var res = [];
		var aAll = oParent.getElementsByTagName('*');
		for(var i = 0;i<aAll.length;i++){
			var re = new RegExp('\\b'+sClass+'\\b','g');
			if(re.test(aAll[i].className)){
				res.push(aAll[i]);
			}
		}
		return res;	
	}
}
//判断
function hasClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	if(re.test(obj.className)){
		return true;
	}
	return false;	
}	
//添加
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			//obj.className = obj.className+' '+sClass;
			obj.className +=' '+sClass;
		}
	}else{
		obj.className = sClass;
	}
}
//删除
function removeClass(obj,sClass){
	var re = new RegExp('\\b'+sClass+'\\b','g');
	obj.className = obj.className.replace(re,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
}

function through(obj){
	function a2d(n){
		return 	n*180/Math.PI;
	}
	//判断鼠标从哪个边移入
function hoverDir(obj,ev){
	var x = obj.offsetLeft+obj.offsetWidth/2 - ev.pageX;
	var y = obj.offsetTop+obj.offsetHeight/2 - ev.pageY;
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
}
obj.onmouseover = function(ev){
	var oEvent = ev||event;
	var oFrom = oEvent.fromElement||oEvent.relatedTarget;
	if(obj.contains(oFrom)){
		return;
	}
	var dir = hoverDir(obj,oEvent);
	var oS = obj.children[1];
	//左边 2 右侧0 上边3  下边1
	switch(dir){
		case 0:
			oS.style.left = '300px';
			oS.style.top = 0;
		break;
		case 1:
			oS.style.top = '184px';
			oS.style.left = 0;
		break;
		case 2:
			oS.style.left = '-184px';
			oS.style.top = 0;
		break;
		case 3:
			oS.style.top = '-300px';
			oS.style.left = 0;
		break;
	}
	move(oS,{left:0,top:0},{"easing":Tween.Linear});
};

obj.onmouseout = function(ev){
	var oEvent = ev||event;
	var oTo = oEvent.toElement||oEvent.relatedTarget;
	if(obj.contains(oTo)){
		return;
	}
	var dir = hoverDir(obj,oEvent);
	var oS = obj.children[1];
	//左边 2 右侧0 上边3  下边1
	switch(dir){
		case 0:
			move(oS,{left:300,top:0},{"easing":Tween.Linear});
		break;
		case 1:
			move(oS,{left:0,top:184},{"easing":Tween.Linear});
		break;
		case 2:
			move(oS,{left:-300,top:0},{"easing":Tween.Linear});
		break;
		case 3:
			move(oS,{left:0,top:-184},{"easing":Tween.Linear});
			break;
		}
	};
}
function totop(obj){
	var cur=0;
	document.onscroll=function(ev){
		if(document.body.scrollTop>200){
			obj.style.display='block';
			obj.onclick=function(){
				//alert(1);
				var dis=document.body.scrollTop;
				clearInterval(obj.timer)
				obj.timer=setInterval(function(){
					cur+=10*1.2;
					document.body.scrollTop=dis-cur	;
					if(document.body.scrollTop<=0){
						clearInterval(obj.timer)
						obj.style.display='none';
					}
				},16);
			}
		}else{
			obj.style.display='none';
		}
	}
}













