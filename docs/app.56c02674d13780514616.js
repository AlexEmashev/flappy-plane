(()=>{"use strict";const t={aspectRatio:.5625,scaleFactor:1,worldWidth:360,worldHeight:640,gravity:.5,defaultPlaneDeltaY:9,gameRefreshRate:24,canvasName:"GameCanvas",worldBackground:{top:"#4d9da5",bottom:"#c1dcdf"},sprites:{cloud1:"assets/cloud1.svg",cloud2:"assets/cloud2.svg",bottomClouds:"assets/bottom_clouds.svg",titles:"assets/titles.svg",planes:"assets/planes_list.svg",pipeTop:"assets/pipe_top.svg",pipeBottom:"assets/pipe_bottom.svg"}};var e,i,n,o;function r(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function s(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}!function(t){t[t.move=0]="move",t[t.down=1]="down",t[t.up=2]="up"}(e||(e={})),function(t){t.TitleScreen="TitleScreen",t.Gameplay="Gameplay",t.ScoreScreen="ScoreScreen"}(i||(i={})),function(t){t.flyDown="flyDown",t.flyUp="flyUp",t.crash="crash"}(n||(n={})),function(t){t[t.play=0]="play",t[t.pause=1]="pause"}(o||(o={}));var a=function(){function e(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),s(this,"_planeImg",void 0),s(this,"_gameTitlesImg",void 0),s(this,"_gameTitleSprite",void 0),s(this,"_gameOverSprite",void 0),s(this,"_bottomCloudsImg",void 0),s(this,"_cloud1Img",void 0),s(this,"_cloud2Img",void 0),s(this,"_pipeTopImg",void 0),s(this,"_pipeBottomImg",void 0),s(this,"_startButtonSprites",void 0),s(this,"_againButtomSprites",void 0),s(this,"_planeSprites",void 0),s(this,"_planeUpSprites",void 0),s(this,"_planeDownSprites",void 0)}var i,n,o;return i=e,o=[{key:"getInstance",value:function(){return e.instance||(e.instance=new e),e.instance}}],(n=[{key:"planeImg",get:function(){return this._planeImg||(this._planeImg=new Image,this._planeImg.src=t.sprites.planes),this._planeImg}},{key:"gameTitlesImg",get:function(){return this._gameTitlesImg||(this._gameTitlesImg=new Image,this._gameTitlesImg.src=t.sprites.titles),this._gameTitlesImg}},{key:"gameTitleSprite",get:function(){return this._gameTitleSprite||(this._gameTitleSprite={sprite:this.gameTitlesImg,sx:0,sy:0,sWidth:730,sHeight:65,dx:t.worldWidth/8,dy:t.worldHeight/6,dWidth:t.worldWidth/1.3,dHeight:t.worldHeight/14.2}),this._gameTitleSprite}},{key:"gameOverSprite",get:function(){return this._gameOverSprite||(this._gameOverSprite={sprite:this.gameTitlesImg,sx:0,sy:90,sWidth:373,sHeight:50,dx:t.worldWidth/7.1,dy:t.worldHeight/5.8,dWidth:t.worldWidth/1.3,dHeight:t.worldHeight/12.6}),this._gameOverSprite}},{key:"bottomCloudsImg",get:function(){return this._bottomCloudsImg||(this._bottomCloudsImg=new Image,this._bottomCloudsImg.src=t.sprites.bottomClouds),this._bottomCloudsImg}},{key:"cloud1Img",get:function(){return this._cloud1Img||(this._cloud1Img=new Image,this._cloud1Img.src=t.sprites.cloud1),this._cloud1Img}},{key:"cloud2Img",get:function(){return this._cloud2Img||(this._cloud2Img=new Image,this._cloud2Img.src=t.sprites.cloud2),this._cloud2Img}},{key:"pipeTopImg",get:function(){return this._pipeTopImg||(this._pipeTopImg=new Image,this._pipeTopImg.src=t.sprites.pipeTop),this._pipeTopImg}},{key:"pipeBottomImg",get:function(){return this._pipeBottomImg||(this._pipeBottomImg=new Image,this._pipeBottomImg.src=t.sprites.pipeBottom),this._pipeBottomImg}},{key:"startButtonSprites",get:function(){var e=this;if(this._startButtonSprites)return this._startButtonSprites;var i=[0,188,379];return this._startButtonSprites=[0,1,2].map((function(n){return{sprite:e.gameTitlesImg,sx:i[n],sy:150,sWidth:185,sHeight:60,dx:t.worldWidth/4,dy:t.worldHeight/1.57,dWidth:t.worldWidth/2.13,dHeight:t.worldHeight/16.22}})),this._startButtonSprites}},{key:"againButtonSprites",get:function(){var e=this;if(this._againButtomSprites)return this._againButtomSprites;var i=[0,183,363];return this._againButtomSprites=[0,1,2].map((function(n){return{sprite:e.gameTitlesImg,sx:i[n],sy:232,sWidth:185,sHeight:60,dx:t.worldWidth/4,dy:t.worldHeight/1.6,dWidth:t.worldWidth/2.13,dHeight:t.worldHeight/16.22}})),this._againButtomSprites}},{key:"planeSprites",get:function(){var e=this;if(this._planeSprites)return this._planeSprites;var i=[-3.4,80,170.4,259,344.9,442.4];return this._planeSprites=[0,1,2,3,4,5].map((function(n){var o=t.worldHeight/5.68;return{sprite:e.planeImg,sx:i[n],sy:0,sWidth:80,sHeight:80,dx:t.worldWidth/10,dy:t.worldHeight/2-o/2,dWidth:t.worldWidth/3.2,dHeight:o}})),this._planeSprites}},{key:"planeUpSprites",get:function(){return this._planeUpSprites||(this._planeUpSprites=this.planeSprites.slice(3,6)),this._planeUpSprites}},{key:"planeDownSprites",get:function(){return this._planeDownSprites||(this._planeDownSprites=this.planeSprites.slice(0,3)),this._planeDownSprites}}])&&r(i.prototype,n),o&&r(i,o),e}();s(a,"instance",void 0);const l=a.getInstance();function c(t,e){return Math.floor(Math.random()*(e-t+1)+t)}function h(e,i){var n=i.x1*t.scaleFactor,o=i.x2*t.scaleFactor,r=i.y1*t.scaleFactor,s=i.y2*t.scaleFactor,a=e.x>n&&e.x<o,l=e.y>r&&e.y<s;return a&&l}function u(e,i){return!!(h({x:e.x1*t.scaleFactor,y:e.y1*t.scaleFactor},i)||h({x:e.x2*t.scaleFactor,y:e.y1*t.scaleFactor},i)||h({x:e.x1*t.scaleFactor,y:e.y2*t.scaleFactor},i)||h({x:e.x2*t.scaleFactor,y:e.y2*t.scaleFactor},i))}function p(e,i){var n=e,o=e;n.dx?i.drawImage(n.sprite,n.sx,n.sy,n.sWidth,n.sHeight,n.dx*t.scaleFactor,n.dy*t.scaleFactor,n.dWidth*t.scaleFactor,n.dHeight*t.scaleFactor):i.drawImage(o.sprite,o.x*t.scaleFactor,o.y*t.scaleFactor,o.width*t.scaleFactor,o.height*t.scaleFactor)}function d(e,i){i.font="".concat(e.fontSize*t.scaleFactor,"px ").concat(e.fontName),e.shadowColor&&(i.fillStyle=e.shadowColor,i.fillText(e.text,(e.x+2)*t.scaleFactor,(e.y+2)*t.scaleFactor)),i.fillStyle=e.color,i.fillText(e.text,e.x*t.scaleFactor,e.y*t.scaleFactor)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function g(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function m(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var y,v=function(){function e(i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=i,m(this,"animationState",o.play),m(this,"cloudsSpeed",2),m(this,"cloudsWidth",t.worldWidth/1.28),m(this,"cloudsHeight",t.worldHeight/5.68),m(this,"cloudTiles",[]);for(var n=0;n<=t.worldWidth;)this.cloudTiles.push({sprite:l.bottomCloudsImg,x:n,y:t.worldHeight-this.cloudsHeight,width:this.cloudsWidth,height:this.cloudsHeight}),n+=this.cloudsWidth-1}var i,n;return i=e,(n=[{key:"draw",value:function(){var e=this;this.animationState===o.play&&(this.cloudTiles.map((function(t){return t.x-=e.cloudsSpeed})),this.cloudTiles=this.cloudTiles.filter((function(t){return t.x+t.width>=0})));var i=this.cloudTiles[this.cloudTiles.length-1],n=i.x+i.width-1;n<=t.worldWidth&&this.cloudTiles.push({sprite:l.bottomCloudsImg,x:n,y:t.worldHeight-this.cloudsHeight,width:this.cloudsWidth,height:this.cloudsHeight});var r,s=function(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(t){if("string"==typeof t)return f(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,a=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){a=!0,r=t},f:function(){try{s||null==i.return||i.return()}finally{if(a)throw r}}}}(this.cloudTiles);try{for(s.s();!(r=s.n()).done;)p(r.value,this.context)}catch(t){s.e(t)}finally{s.f()}}}])&&g(i.prototype,n),e}();function w(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function b(t,e,i){return e&&w(t.prototype,e),i&&w(t,i),t}function S(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}!function(t){t.normal="normal",t.hover="hover",t.down="down"}(y||(y={}));var x=function(){function t(e,i,n,o){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=e,this.spriteNormal=i,this.spriteHover=n,this.spritePress=o,S(this,"buttonState",y.normal),S(this,"hoverCallback",void 0),S(this,"pressCallback",void 0),S(this,"upCallback",void 0),S(this,"clickCallback",void 0)}return b(t,[{key:"hitbox",get:function(){var t=this.spriteNormal,e=this.spriteNormal;return e.dx?{x1:e.dx,x2:e.dx+e.dWidth,y1:e.dy,y2:e.dy+e.dHeight}:{x1:t.x,x2:t.x+t.width,y1:t.y,y2:t.y+t.height}}}]),b(t,[{key:"mouseEventHandler",value:function(t,i){var n=h(t,this.hitbox);switch(i){case e.move:return void this.mouseMove(n);case e.down:return void this.mouseDown(n);case e.up:return void this.mouseUp();default:return}}},{key:"onHover",value:function(t){this.hoverCallback=t}},{key:"onPress",value:function(t){this.pressCallback=t}},{key:"onUp",value:function(t){this.upCallback=t}},{key:"onClick",value:function(t){this.clickCallback=t}},{key:"draw",value:function(){switch(this.buttonState){case y.hover:p(this.spriteHover,this.context);break;case y.down:p(this.spritePress,this.context);break;default:p(this.spriteNormal,this.context)}}},{key:"mouseMove",value:function(t){t&&this.buttonState!==y.down&&(this.buttonState=y.hover,this.hoverCallback&&this.hoverCallback()),t||this.buttonState!==y.hover||(this.buttonState=y.normal)}},{key:"mouseDown",value:function(t){t&&(this.buttonState=y.down,this.pressCallback&&this.pressCallback())}},{key:"mouseUp",value:function(){this.buttonState==y.down&&(this.buttonState=y.normal,this.upCallback&&this.upCallback(),this.clickCallback&&this.clickCallback())}}]),t}();function k(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function C(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?k(Object(i),!0).forEach((function(e){_(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):k(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function P(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function I(t,e,i){return e&&P(t.prototype,e),i&&P(t,i),t}function _(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var O;!function(t){t[t.screenCenter=0]="screenCenter",t[t.gameStart=1]="gameStart"}(O||(O={}));var T=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=t,_(this,"animationState",o.play),_(this,"position",void 0),_(this,"planeSprite",void 0),_(this,"_planeState",n.flyDown),_(this,"spriteNumber",0),_(this,"currentSpriteFrame",0),this._planeState=n.flyDown,this.planeSprite=l.planeDownSprites[0],this.position={x:this.planeSprite.dx,y:this.planeSprite.dy}}return I(e,[{key:"hitbox",get:function(){var t=1-.7;return{x1:this.position.x+this.planeSprite.dWidth*t,y1:this.position.y+this.planeSprite.dHeight*t,x2:this.planeSprite.dWidth+this.position.x-this.planeSprite.dWidth*t,y2:this.planeSprite.dHeight+this.position.y-this.planeSprite.dHeight*t}}},{key:"planeState",set:function(t){this._planeState=t}}]),I(e,[{key:"draw",value:function(){var t,e=this.getSpriteNumber();switch(this._planeState){case n.flyDown:t=l.planeDownSprites[e];break;case n.flyUp:t=l.planeUpSprites[e]}p(C(C({},t),{},{dx:this.position.x,dy:this.position.y}),this.context)}},{key:"setPosition",value:function(e){switch(e){case O.screenCenter:this.position={x:t.worldWidth/2-this.planeSprite.dWidth/2,y:t.worldHeight/2-this.planeSprite.dHeight/2};break;case O.gameStart:default:this.position={x:t.worldWidth/6,y:t.worldHeight/2-this.planeSprite.dHeight/2}}}},{key:"getSpriteNumber",value:function(){return this.animationState===o.play&&this.currentSpriteFrame++,5===this.currentSpriteFrame&&(this.currentSpriteFrame=0,this.spriteNumber++,this.spriteNumber=3===this.spriteNumber?0:this.spriteNumber),this.spriteNumber}}]),e}();function H(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function j(t,e,i){return e&&H(t.prototype,e),i&&H(t,i),t}var W=function(){function e(t){var i,n;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=t,n=void 0,(i="_skyGradient")in this?Object.defineProperty(this,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):this[i]=n}return j(e,[{key:"skyGradient",get:function(){if(this._skyGradient)return this._skyGradient;this._skyGradient=this.context.createLinearGradient(0,0,0,t.worldHeight),this._skyGradient.addColorStop(0,t.worldBackground.top),this._skyGradient.addColorStop(1,t.worldBackground.bottom)}}]),j(e,[{key:"draw",value:function(){var e,i,n,o;e=t.worldWidth,i=t.worldHeight,n=this.skyGradient,(o=this.context).fillStyle=n,o.fillRect(0*t.scaleFactor,0*t.scaleFactor,e*t.scaleFactor,i*t.scaleFactor)}}]),e}();function F(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var G=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=t}var i,n;return i=e,(n=[{key:"drawGameTitle",value:function(){p(l.gameTitleSprite,this.context)}},{key:"drawGameOverTitle",value:function(){p(l.gameOverSprite,this.context)}},{key:"drawScore",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i=18,n=e.toString().length*i;d({text:e.toString(),x:t.worldWidth/2-n,y:t.worldHeight/7,color:"white",fontSize:64,fontName:"monospace",shadowColor:"#04132358"},this.context)}},{key:"drawFinalScore",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i="score: ".concat(e),n=10,o=i.toString().length*n;d({text:i.toString(),x:t.worldWidth/2-o,y:t.worldHeight/2.7,color:"white",fontSize:36,fontName:"monospace",shadowColor:"#04132358"},this.context)}}])&&F(i.prototype,n),e}();function B(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}function D(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,n)}return i}function E(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?D(Object(i),!0).forEach((function(e){U(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):D(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}function N(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function U(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var A=40,Y=30,q=55,R=30,M=function(){function e(i){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=i,U(this,"animationState",o.play),U(this,"clouds",[]);var n=this.getNewCloud(),r=this.getNewCloud(),s=this.getNewCloud();this.clouds.push(E(E({},n),{},{x:c(0,t.worldWidth)}),E(E({},r),{},{x:c(0,t.worldWidth)}),E(E({},s),{},{x:c(0,t.worldWidth)}))}var i,n;return i=e,(n=[{key:"draw",value:function(){this.animationState===o.play&&(this.clouds.map((function(t){return t.x-=t.speed})),this.clouds=this.clouds.filter((function(t){return t.x+t.width>=0})),this.clouds.length||this.clouds.push(this.getNewCloud()));var t,e=function(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=function(t,e){if(t){if("string"==typeof t)return B(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?B(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,s=!0,a=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return s=t.done,t},e:function(t){a=!0,r=t},f:function(){try{s||null==i.return||i.return()}finally{if(a)throw r}}}}(this.clouds);try{for(e.s();!(t=e.n()).done;)p(t.value,this.context)}catch(t){e.e(t)}finally{e.f()}}},{key:"getNewCloud",value:function(){var e=c(1,2),i=c(0,t.worldHeight-30),n=c(1,7);return{sprite:1===e?l.cloud1Img:l.cloud2Img,x:t.worldWidth,y:i,width:(1===e?A:q)*n,height:(1===e?Y:R)*n,speed:3*n}}}])&&N(i.prototype,n),e}();function z(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function L(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var X=function(){function t(e){var i=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=e,L(this,"name",void 0),L(this,"goToStateCallback",void 0),L(this,"data",{}),L(this,"world",void 0),L(this,"bottomClouds",void 0),L(this,"clouds",void 0),L(this,"plane",void 0),L(this,"startButton",void 0),L(this,"titles",void 0),this.world=new W(this.context),this.bottomClouds=new v(this.context),this.clouds=new M(this.context),this.titles=new G(this.context),this.plane=new T(this.context),this.plane.planeState=n.flyUp,this.plane.setPosition(O.screenCenter),this.startButton=new x(this.context,l.startButtonSprites[0],l.startButtonSprites[1],l.startButtonSprites[2]),this.startButton.onClick((function(){return i.startButtonClick()}))}var e,o;return e=t,(o=[{key:"userInput",value:function(t,e){this.startButton.mouseEventHandler(t,e)}},{key:"render",value:function(){this.world.draw(),this.bottomClouds.draw(),this.clouds.draw(),this.plane.draw(),this.titles.drawGameTitle(),this.startButton.draw()}},{key:"startButtonClick",value:function(){this.goToStateCallback&&this.goToStateCallback(i.Gameplay)}}])&&z(e.prototype,o),t}();function $(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function J(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var K={speed:5,width:t.worldWidth/4.5,height:t.worldHeight,gap:t.worldHeight/2.3},Q=function(){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),this.context=t,J(this,"animationState",o.play),J(this,"position",void 0),J(this,"pipesGeneration",0),J(this,"pipes",void 0),this.pipes=this.getPipes(),this.position={x:this.pipes.topPipe.x,y:this.pipes.topPipe.y}}var i,n;return i=e,(n=[{key:"draw",value:function(){this.animationState===o.play&&(this.pipes.topPipe.x-=K.speed,this.pipes.bottomPipe.x=this.pipes.topPipe.x),this.pipes.topPipe.x+K.width<0&&(this.pipes=this.getPipes(),this.pipesGeneration++),this.position.x=this.pipes.topPipe.x,this.position.y=this.pipes.topPipe.y,p(this.pipes.topPipe,this.context),p(this.pipes.bottomPipe,this.context)}},{key:"checkCollision",value:function(t){var e={x1:this.pipes.topPipe.x,x2:this.pipes.topPipe.x+this.pipes.topPipe.width,y1:this.pipes.topPipe.y,y2:this.pipes.topPipe.y+this.pipes.topPipe.height},i={x1:this.pipes.bottomPipe.x,x2:this.pipes.bottomPipe.x+this.pipes.bottomPipe.width,y1:this.pipes.bottomPipe.y,y2:this.pipes.bottomPipe.y+this.pipes.bottomPipe.height};return!(!u(t,e)&&!u(t,i))}},{key:"getPipes",value:function(){var e=c(K.gap/2,t.worldHeight-K.gap/2),i=0-K.height+e-K.gap/2,n=e+K.gap/2;return{topPipe:{sprite:l.pipeTopImg,x:t.worldWidth,y:i,width:K.width,height:K.height},bottomPipe:{sprite:l.pipeBottomImg,x:t.worldWidth,y:n,width:K.width,height:K.height}}}}])&&$(i.prototype,n),e}();function V(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function Z(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var tt=function(){function r(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,r),this.context=t,Z(this,"data",{score:0}),Z(this,"goToStateCallback",void 0),Z(this,"updateGameScoreCallback",void 0),Z(this,"name",i.Gameplay),Z(this,"isGameOver",!1),Z(this,"gameOverSequenceFrames",90),Z(this,"planePosition",void 0),Z(this,"planeDeltaY",0),Z(this,"pipesGeneration",void 0),Z(this,"world",void 0),Z(this,"bottomClouds",void 0),Z(this,"plane",void 0),Z(this,"clouds",void 0),Z(this,"titles",void 0),Z(this,"pipes",void 0),this.world=new W(this.context),this.bottomClouds=new v(this.context),this.clouds=new M(this.context),this.plane=new T(this.context),this.plane.planeState=n.flyDown,this.plane.setPosition(O.gameStart),this.planePosition=this.plane.position,this.pipes=new Q(this.context),this.pipesGeneration=-1,this.titles=new G(this.context)}var s,a;return s=r,(a=[{key:"userInput",value:function(t,i){this.isGameOver||i==e.down&&this.planeFlyUp()}},{key:"render",value:function(){if(this.checkCollision())return this.isGameOver=!0,void this.renderGameOverSequence();this.checkCollision(),this.renderGamePlaySequence()}},{key:"renderGamePlaySequence",value:function(){this.updateScore(),this.planeflyDown(),this.world.draw(),this.bottomClouds.draw(),this.clouds.draw(),this.pipes.draw(),this.plane.draw(),this.titles.drawScore(this.data.score)}},{key:"renderGameOverSequence",value:function(){this.gameOverSequenceFrames-=1,0===this.gameOverSequenceFrames&&this.goToStateCallback(i.ScoreScreen),this.bottomClouds.animationState=o.pause,this.clouds.animationState=o.pause,this.plane.animationState=o.pause,this.pipes.animationState=o.pause,this.world.draw(),this.bottomClouds.draw(),this.clouds.draw(),this.pipes.draw(),this.plane.draw(),this.titles.drawScore(this.data.score)}},{key:"planeflyDown",value:function(){this.planeDeltaY-=t.gravity,this.planePosition.y-=this.planeDeltaY,this.planeDeltaY<0&&(this.plane.planeState=n.flyDown),this.planeDeltaY>=0&&(this.plane.planeState=n.flyUp,this.planePosition.y<0&&(this.planeDeltaY=0))}},{key:"autoFlyUp",value:function(){this.planePosition.y>.5*t.worldHeight&&this.planePosition.y<.6*t.worldHeight&&this.planeFlyUp()}},{key:"planeFlyUp",value:function(){this.planeDeltaY=t.defaultPlaneDeltaY}},{key:"updateScore",value:function(){this.plane.position.x>this.pipes.position.x&&this.pipesGeneration!=this.pipes.pipesGeneration&&(this.pipesGeneration=this.pipes.pipesGeneration,this.data.score++,this.updateGameScoreCallback&&this.updateGameScoreCallback(this.data.score))}},{key:"checkCollision",value:function(){return!!this.pipes.checkCollision(this.plane.hitbox)||this.plane.position.y>t.worldHeight}}])&&V(s.prototype,a),r}();function et(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function it(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var nt=function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.context=e,it(this,"data",{score:0}),it(this,"name",i.ScoreScreen),it(this,"world",void 0),it(this,"bottomClouds",void 0),it(this,"titles",void 0),it(this,"againButton",void 0),it(this,"goToStateCallback",void 0),this.world=new W(this.context),this.bottomClouds=new v(this.context),this.titles=new G(this.context),this.againButton=new x(this.context,l.againButtonSprites[0],l.againButtonSprites[1],l.againButtonSprites[2]),this.againButton.onClick((function(){return n.goToStateCallback(i.TitleScreen)}))}var e,n;return e=t,(n=[{key:"render",value:function(){this.world.draw(),this.bottomClouds.draw(),this.titles.drawGameOverTitle(),this.titles.drawFinalScore(this.data.score),this.againButton.draw()}},{key:"userInput",value:function(t,e){this.againButton.mouseEventHandler(t,e)}}])&&et(e.prototype,n),t}();function ot(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function rt(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}(new(function(){function n(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,n),rt(this,"gameScore",0),rt(this,"context",void 0),rt(this,"currentScene",void 0),rt(this,"canvas",void 0)}var o,r;return o=n,(r=[{key:"init",value:function(){this.addCanvas(),this.switchGameScene(i.TitleScreen),this.setEventLoop()}},{key:"addCanvas",value:function(){var t=this;this.canvas=document.getElementById("GameCanvas"),this.setScale(),this.context=this.canvas.getContext("2d"),window.onresize=function(){return t.setScale()},this.canvas.onmousemove=function(i){return t.userInput({x:i.offsetX,y:i.offsetY},e.move)},this.canvas.onmousedown=function(i){return t.userInput({x:i.offsetX,y:i.offsetY},e.down)},this.canvas.onmouseup=function(i){return t.userInput({x:i.offsetX,y:i.offsetY},e.up)}}},{key:"setEventLoop",value:function(){var e=this;setInterval((function(){e.currentScene.render()}),t.gameRefreshRate)}},{key:"switchGameScene",value:function(t){var e=this;switch(t){case i.TitleScreen:this.currentScene=new X(this.context);break;case i.Gameplay:this.gameScore=0,this.currentScene=new tt(this.context),this.currentScene.updateGameScoreCallback=function(t){return e.updateGameScore(t)};break;case i.ScoreScreen:this.currentScene=new nt(this.context),this.currentScene.data.score=this.gameScore;break;default:this.currentScene=new X(this.context)}this.currentScene.goToStateCallback=function(t){return e.switchGameScene(t)}}},{key:"userInput",value:function(t,e){this.currentScene&&this.currentScene.userInput(t,e)}},{key:"updateGameScore",value:function(t){this.gameScore=t}},{key:"setScale",value:function(){t.scaleFactor=this.canvas.clientHeight/t.worldHeight,this.canvas.height=this.canvas.clientHeight,this.canvas.width=this.canvas.clientHeight*t.aspectRatio}}])&&ot(o.prototype,r),n}())).init()})();
//# sourceMappingURL=app.56c02674d13780514616.js.map