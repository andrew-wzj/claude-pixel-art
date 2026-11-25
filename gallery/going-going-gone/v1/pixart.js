/* pixel-art illustrations for the 36 built-in artworks (drawn in code, 64x48) */
var PIXART=(function(){
"use strict";
var W=64,H=48,S=8;
var BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
var FONT={A:"010101111101101",B:"110101110101110",C:"011100100100011",D:"110101101101110",E:"111100110100111",F:"111100110100100",G:"011100101101011",H:"101101111101101",I:"111010010010111",J:"001001001101010",K:"101101110101101",L:"100100100100111",M:"101111111101101",N:"110101101101101",O:"010101101101010",P:"110101110100100",Q:"010101101110011",R:"110101110101101",S:"011100010001110",T:"111010010010010",U:"101101101101111",V:"101101101101010",W:"101101111111101",X:"101101010101101",Y:"101101010010010",Z:"111001010100111",".":"000000000000010","!":"010010010000010","?":"110001010000010","'":"010010000000000","-":"000000111000000"};
function rng(seed){return function(){seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hash(s){var h=2166136261;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h}
function make(seed){
  var b=new Array(W*H).fill("#000000"),R=rng(seed);
  var g={R:R,buf:b};
  g.p=function(x,y,c){x=Math.round(x);y=Math.round(y);if(x>=0&&y>=0&&x<W&&y<H)b[y*W+x]=c};
  g.r=function(x,y,w,h,c){for(var j=0;j<h;j++)for(var i=0;i<w;i++)g.p(x+i,y+j,typeof c==="function"?c(x+i,y+j):c)};
  g.e=function(cx,cy,rx,ry,c){for(var j=Math.floor(cy-ry-1);j<=Math.ceil(cy+ry+1);j++)for(var i=Math.floor(cx-rx-1);i<=Math.ceil(cx+rx+1);i++){var dx=(i-cx)/(rx+.5),dy=(j-cy)/(ry+.5);if(dx*dx+dy*dy<=1)g.p(i,j,typeof c==="function"?c(i,j):c)}};
  g.ring=function(cx,cy,rad,c){for(var a=0;a<360;a+=2)g.p(cx+rad*Math.cos(a*Math.PI/180),cy+rad*Math.sin(a*Math.PI/180),c)};
  g.l=function(x0,y0,x1,y1,c,w){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);var dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1,err=dx+dy;
    for(;;){if(w>1)g.r(x0-((w-1)>>1),y0-((w-1)>>1),w,w,c);else g.p(x0,y0,c);if(x0===x1&&y0===y1)break;var e2=2*err;if(e2>=dy){err+=dy;x0+=sx}if(e2<=dx){err+=dx;y0+=sy}}};
  g.poly=function(pts,c){var y0=1e9,y1=-1e9;pts.forEach(function(q){y0=Math.min(y0,q[1]);y1=Math.max(y1,q[1])});
    for(var y=Math.floor(y0);y<=Math.ceil(y1);y++){var yc=y+.5,xs=[];for(var i=0;i<pts.length;i++){var a=pts[i],n=pts[(i+1)%pts.length];if((a[1]<=yc&&n[1]>yc)||(n[1]<=yc&&a[1]>yc))xs.push(a[0]+(yc-a[1])/(n[1]-a[1])*(n[0]-a[0]))}
      xs.sort(function(m,n){return m-n});for(var k=0;k+1<xs.length;k+=2)for(var x=Math.round(xs[k]);x<Math.round(xs[k+1]);x++)g.p(x,y,typeof c==="function"?c(x,y):c)}};
  g.v=function(y0,y1,c1,c2,x0,x1){x0=x0||0;x1=x1==null?W:x1;for(var y=y0;y<y1;y++){var t=(y-y0+.5)/(y1-y0);for(var x=x0;x<x1;x++)g.p(x,y,t*16>BAYER[(y&3)*4+(x&3)]+.5?c2:c1)}};
  g.sp=function(x,y,w,h,cs,n){for(var k=0;k<n;k++)g.p(x+Math.floor(R()*w),y+Math.floor(R()*h),cs[Math.floor(R()*cs.length)])};
  g.mix=function(cs){return function(){return cs[Math.floor(R()*cs.length)]}};
  g.t=function(x,y,s,c){s=s.toUpperCase();for(var k=0;k<s.length;k++){var f=FONT[s[k]];if(f)for(var j=0;j<5;j++)for(var i=0;i<3;i++)if(f[j*3+i]==="1")g.p(x+i,y+j,c);x+=4}};
  g.fig=function(x,y,h,skin,cloth,hair){g.r(x,y-h,2,2,skin);if(hair)g.r(x,y-h,2,1,hair);g.r(x-1,y-h+2,4,h-5,cloth);g.r(x-1,y-3,1,3,"#222");g.r(x+2,y-3,1,3,"#222")};
  return g;
}

var A={};
/* ---------- Renaissance ---------- */
A.b0=function(g){ // Mona Leonarda: the Mona Lisa with Leonardo's beard
  g.v(0,26,"#a9b88f","#d3cc9c");g.v(24,48,"#7a7a48","#4d5230");
  g.e(8,26,12,5,"#5f7048");g.e(56,24,12,6,"#5f7048");g.l(2,34,12,27,"#b69d5e");g.l(62,30,52,25,"#b69d5e");
  g.poly([[12,48],[20,31],[44,31],[52,48]],"#2c281b");g.poly([[20,31],[24,31],[18,48],[12,48]],"#5a3e1f");g.poly([[40,31],[44,31],[52,48],[46,48]],"#5a3e1f");
  g.e(32,31,7,2,"#c9995f");
  g.e(32,17,10,13,"#33220f");g.e(32,15,7,8,"#d6a86e");g.r(25,6,3,16,"#33220f");g.r(37,6,3,16,"#33220f");g.r(26,6,12,2,"#2a1a0a");
  g.r(28,13,2,1,"#5a3a1a");g.r(34,13,2,1,"#5a3a1a");g.p(29,14,"#1d1208");g.p(35,14,"#1d1208");g.l(32,15,31,18,"#b88a52");
  g.poly([[25,18],[39,18],[37,28],[32,33],[27,28]],"#dcd6ca");for(var x=27;x<38;x+=2)g.l(x,20,x+(x<32?1:-1),29,"#b9b1a3");
  g.r(29,19,6,1,"#c8c0b2");g.r(30,20,4,1,"#8a5a4a");
  g.e(27,42,4,2,"#d6a86e");g.e(36,41,4,2,"#d6a86e");g.l(24,42,30,42,"#b88a52");
};
A.b1=function(g){ // Nail-Filing Slave: marble captive doing his nails
  g.r(0,0,64,48,"#2c313c");g.e(32,22,17,24,"#3d4452");g.e(32,22,15,22,"#454d5d");
  var M="#ece7dd",S="#bcb4a6";
  g.r(18,41,28,7,"#cfc8bb");g.r(16,41,32,2,"#e9e4da");
  g.e(31,9,4,5,M);g.e(31,6,4,3,S);g.p(32,10,S);g.r(30,13,3,2,M);
  g.poly([[24,15],[38,15],[36,28],[26,28]],M);g.poly([[34,15],[38,15],[36,28],[33,28]],S);
  g.poly([[26,28],[36,28],[38,32],[24,32]],S);g.r(26,32,4,9,M);g.r(32,32,4,9,M);g.r(29,32,1,9,S);g.r(35,32,1,9,S);
  g.l(25,16,20,11,M,2);g.l(20,11,25,8,M,2);g.e(26,8,2,1.5,M);
  g.l(37,16,34,22,M,2);g.l(34,22,28,12,M,2);g.e(28,11,1.5,1.5,M);g.l(27,10,24,7,"#8d939e");g.p(23,6,"#8d939e");
  g.sp(22,4,14,10,["#ffffff"],3);
};
A.b2=function(g){ // The Manifestation of the Tomato: Venus's shell brings a tomato
  g.v(0,22,"#d6e8e6","#a8cfd8");g.v(22,48,"#6fa8b9","#3c7c97");
  for(var k=0;k<9;k++){var x=(k*13)%60+2,y=24+(k*7)%22;g.l(x,y,x+2,y-1,"#e8f3f2");g.l(x+2,y-1,x+4,y,"#e8f3f2")}
  g.e(32,40,16,7,"#f1d6a8");for(var i=-6;i<=6;i++)g.l(32,47,32+i*2.5,34,"#d4af7a");g.r(14,46,36,2,"#3c7c97");
  g.e(32,27,10,9,"#d7362b");g.e(36,31,6,5,"#b02a21");g.e(28,23,3,2,"#f27e62");g.p(27,22,"#ffd0c0");
  g.poly([[32,16],[35,19],[40,18],[36,21],[32,21],[28,21],[24,18],[29,19]],"#3f8a3a");g.r(31,14,2,4,"#2f6a2a");
  [[8,6],[14,12],[52,8],[46,14],[56,18],[6,16]].forEach(function(q){g.p(q[0],q[1],"#f2a3b5");g.p(q[0]+1,q[1],"#f7c8d2")});
};
A.b3=function(g){ // The Poker Game: Anguissola's sisters swap chess for poker
  g.r(0,0,64,48,"#2a2420");g.v(0,14,"#4a5a48","#2a2420",0,64);
  g.poly([[0,34],[64,34],[64,48],[0,48]],"#2e6b3a");g.l(0,34,63,34,"#1f4a28");
  [[13,"#8e2b2b"],[32,"#1f1f2a"],[51,"#b8913a"]].forEach(function(s,i){var x=s[0],y=12+(i===1?-2:0);
    g.poly([[x-8,36],[x-5,y+7],[x+5,y+7],[x+8,36]],s[1]);g.e(x,y+7,3,1,"#efe9dc");
    g.e(x,y+1,5,6,"#3a2616");g.e(x,y+2,4,4.5,"#e3bf95");g.p(x-2,y+2,"#2a1a10");g.p(x+1,y+2,"#2a1a10");g.r(x-1,y+5,2,1,"#b5605a")});
  g.r(9,26,3,4,"#fff");g.r(11,25,3,4,"#fff");g.p(10,27,"#c22");g.p(12,26,"#111");
  g.r(47,25,3,4,"#fff");g.r(49,26,3,4,"#fff");g.p(48,26,"#111");g.p(50,27,"#c22");
  g.r(29,24,3,4,"#fff");g.p(30,25,"#c22");
  g.r(18,40,4,2,"#c22");g.r(18,38,4,2,"#eee");g.r(18,36,4,2,"#2a5bc2");g.r(40,40,4,2,"#111");g.r(40,38,4,2,"#c22");
  g.r(28,39,3,4,"#fff");g.r(31,40,3,4,"#fff");g.r(34,39,3,4,"#fff");g.p(29,40,"#c22");g.p(32,41,"#111");g.p(35,40,"#c22");
};
/* ---------- Baroque ---------- */
A.b4=function(g){ // Really Sick Bacchus
  g.r(0,0,64,48,"#1b1814");g.r(0,40,64,8,"#4a3a28");g.l(0,40,63,40,"#6a5438");
  g.poly([[14,40],[20,26],[42,26],[48,40]],"#ece6d8");g.poly([[20,26],[26,26],[22,40],[14,40]],"#cfc6b4");
  g.e(31,18,8,9,"#3a2a1a");g.e(31,19,7,8,"#b8c99a");g.e(34,22,3,3,"#a3b585");
  [[24,11],[28,9],[33,9],[37,11],[39,14],[23,14]].forEach(function(q){g.e(q[0],q[1],2,1.5,"#4d7a2f");g.p(q[0],q[1]-1,"#7aa84a")});
  g.r(27,17,3,1,"#4a5638");g.r(33,17,3,1,"#4a5638");g.r(27,18,3,1,"#8a9a72");g.r(33,18,3,1,"#8a9a72");g.p(28,18,"#222");g.p(34,18,"#222");
  g.l(31,24,42,21,"#f4f4f4");g.p(42,21,"#d33");g.p(43,20,"#d33");
  g.e(44,34,4,4,"#4a2050");for(var i=0;i<7;i++)g.e(41+(i%3)*3,31+Math.floor(i/3)*3,1.3,1.3,i%2?"#6a3070":"#5a2a62");g.p(42,31,"#a070b0");
  g.e(12,42,3,2,"#e0a040");g.e(17,43,3,2,"#d08a30");g.e(54,43,4,2,"#e8c860");
  g.p(22,6,"#8fd18f");g.p(40,7,"#8fd18f");g.p(41,6,"#8fd18f");
};
A.b5=function(g){ // Judith Shampooing Holofernes
  g.r(0,0,64,48,"#1a1512");g.r(0,0,64,9,"#7a1f1f");for(var x=3;x<64;x+=6)g.l(x,0,x+2,8,"#5a1414");
  g.r(0,30,64,18,"#ddd6c8");g.l(0,30,63,30,"#b8b0a0");g.l(6,40,40,46,"#c4bcac");
  g.e(18,30,6,5,"#c99a6e");g.e(18,34,5,3,"#3a2a1c");g.l(15,29,17,29,"#5a3a2a");g.l(20,29,22,29,"#5a3a2a");
  [[12,24,4],[18,22,4],[24,24,3],[15,19,3],[21,18,3],[10,28,2.5]].forEach(function(q){g.e(q[0],q[1],q[2],q[2]*.8,"#f6f8fb");g.p(q[0]-1,q[1]-1,"#ffffff");g.p(q[0]+1,q[1]+1,"#d6e2ee")});
  g.ring(30,14,1.6,"#e8f0f8");g.ring(8,12,1.2,"#e8f0f8");g.ring(26,8,1.2,"#e8f0f8");
  g.poly([[34,46],[38,18],[52,18],[58,46]],"#c9a23a");g.poly([[38,18],[42,18],[40,46],[34,46]],"#a8822a");
  g.e(45,12,4,5,"#e1b48a");g.e(45,9,5,4,"#7a3d1c");g.r(41,10,2,8,"#7a3d1c");
  g.l(39,21,26,23,"#e1b48a",2);g.l(40,25,24,27,"#e1b48a",2);
  g.r(53,24,4,7,"#4fa3d1");g.r(54,22,2,2,"#f4f4f4");g.p(54,26,"#bfe2f4");
};
A.b6=function(g){ // The Apoplectic Cavalier: a glass of red wine to the face
  g.r(0,0,64,48,"#8a8a6c");g.v(0,48,"#8a8a6c","#6c6c52");
  g.poly([[8,48],[14,30],[50,30],[56,48]],"#1d1d1d");for(var i=0;i<12;i++)g.p(16+i*3,36+(i%3)*4,"#c9a23a");g.poly([[44,34],[52,32],[56,48],[48,48]],"#c26a2a");for(var j=0;j<5;j++)g.l(46,36+j*2,52,34+j*2,"#e8a050");
  g.e(32,30,14,4,"#f2eee6");for(var k=0;k<13;k++)g.p(20+k*2,30+(k%2),"#c8c2b6");
  g.e(32,19,7,8,"#d6493a");g.e(28,21,2,2,"#b8302a");g.e(36,21,2,2,"#b8302a");
  g.l(27,15,30,16,"#3a2410");g.l(37,15,34,16,"#3a2410");g.r(28,17,2,1,"#fff");g.r(34,17,2,1,"#fff");g.p(29,17,"#111");g.p(34,17,"#111");
  g.l(25,21,31,23,"#4a2a12");g.l(39,21,33,23,"#4a2a12");g.p(25,20,"#4a2a12");g.p(39,20,"#4a2a12");g.r(31,25,2,3,"#4a2a12");
  g.e(32,9,17,3,"#151515");g.r(24,1,16,8,"#151515");g.r(24,6,16,1,"#3a3a3a");
  [[27,19,2],[35,13,1.5],[30,26,1.5],[38,24,1],[24,29,1.5],[40,30,1.5]].forEach(function(q){g.e(q[0],q[1],q[2],q[2],"#7a0e2a")});
  g.l(27,21,27,25,"#7a0e2a");g.l(38,25,38,29,"#7a0e2a");
  g.l(50,8,56,4,"#dfe6ea");g.l(56,4,58,8,"#dfe6ea");g.l(53,6,48,12,"#dfe6ea");g.p(55,6,"#7a0e2a");g.p(52,9,"#7a0e2a");g.p(47,12,"#7a0e2a");g.p(45,14,"#7a0e2a");
};
A.b7=function(g){ // The Turkey Dinner of Dr Tulp
  g.r(0,0,64,48,"#211c17");g.v(0,20,"#3a3128","#211c17");
  [[8,12],[18,9],[28,11],[40,8],[48,12]].forEach(function(q){var x=q[0],y=q[1];g.r(x-5,y+5,10,20,"#121212");g.e(x,y+5,4,1.5,"#eeeae0");g.e(x,y,3,3.5,"#d8b48a");g.r(x-3,y-4,6,2,"#2a1c12");g.r(x-1,y+2,2,2,"#5a3a22");g.p(x-1,y-1,"#2a1a10");g.p(x+1,y-1,"#2a1a10")});
  g.r(53,10,8,30,"#121212");g.e(57,12,3,3.5,"#d8b48a");g.e(57,17,4,1.5,"#eeeae0");g.r(52,6,10,2,"#111");g.r(54,2,6,5,"#111");
  g.l(52,20,40,30,"#c8c8c8");g.l(40,30,39,32,"#c8c8c8");g.l(41,31,40,33,"#c8c8c8");
  g.r(6,32,48,16,"#e8e2d4");g.l(6,32,53,32,"#c8c0ae");
  g.e(30,37,14,3,"#c7c2b8");g.e(30,32,9,6,"#9a5a26");g.e(27,29,4,2,"#c27a3a");g.e(20,34,3,2,"#8a4a1e");g.e(40,34,3,2,"#8a4a1e");g.p(17,34,"#f4ecd8");g.p(43,34,"#f4ecd8");
  g.p(30,26,"#d8a060");g.e(14,40,2,1,"#6aa04a");g.e(46,40,2,1,"#d04a2a");
};
/* ---------- Impressionism ---------- */
A.b8=function(g){ // Haystacks, with a burning getaway car
  g.v(0,20,"#f4ac78","#f4d79e");g.e(14,11,4,4,"#fff2c0");
  g.v(20,48,"#cfae4e","#7c8a3a");g.sp(0,20,64,28,["#e6c96a","#9aa848","#b0903a","#d8b860"],260);
  g.e(16,30,9,7,"#b4782e");g.e(14,26,5,3,"#d8a24a");g.r(7,30,19,6,"#9c6626");g.p(16,22,"#d8a24a");g.sp(8,26,16,10,["#c8903a","#8a5a20"],30);
  g.e(31,28,5,4,"#b4782e");g.e(30,26,3,2,"#d8a24a");g.r(26,28,11,4,"#9c6626");
  g.e(50,22,6,4,"#6b6b6b");g.e(54,14,5,4,"#7f7f7f");g.e(58,6,5,4,"#999999");
  g.r(40,35,15,5,"#c0392b");g.r(43,32,9,4,"#a83226");g.r(44,33,3,2,"#2a2a33");g.r(48,33,3,2,"#2a2a33");g.e(43,41,1.5,1.5,"#1a1a1a");g.e(52,41,1.5,1.5,"#1a1a1a");
  g.e(47,30,6,4,"#f3901e");g.e(46,28,4,3,"#f7c33a");g.e(47,26,2,2,"#fff09a");g.p(42,29,"#e04a1a");g.p(52,28,"#e04a1a");
};
A.b9=function(g){ // Mon déjeuner sur l'herbe: the men are the ones in bathing suits
  g.v(0,30,"#2c472a","#47683a");g.e(32,18,10,4,"#a6bea4");g.e(8,8,8,7,"#1f3a22");g.e(56,6,9,7,"#1f3a22");
  g.v(28,48,"#5f8a3c","#3f6a2c");g.sp(0,28,64,20,["#7aa84a","#2f5a24"],80);
  g.poly([[10,36],[52,34],[56,42],[8,44]],"#efe9dc");
  g.poly([[24,40],[28,26],[36,26],[42,40]],"#3d5a99");g.e(32,24,3,3.5,"#ecc9a0");g.e(32,20,7,2,"#e8c84a");g.r(29,18,6,2,"#e8c84a");g.r(27,26,10,1,"#f4f4f4");
  function bather(x,flip){for(var y=26;y<38;y++)g.r(x-3,y,7,1,y%2?"#2d4a8a":"#f4f4f4");g.e(x,22,3,3.5,"#e3bf95");g.r(x-2,19,5,1,"#5a3a22");g.l(x+(flip?3:-3),27,x+(flip?7:-7),33,"#e3bf95");g.r(x-3,38,2,4,"#e3bf95");g.r(x+2,38,2,4,"#e3bf95")}
  bather(16,false);bather(48,true);
  g.r(10,42,7,4,"#8a5a2a");g.l(10,41,16,41,"#6a4420");g.p(11,40,"#d0302a");g.p(13,40,"#f09030");g.p(15,40,"#d0302a");
};
A.b10=function(g){ // Ear: wrapped up like a parcel, under Van Gogh swirls
  g.r(0,0,64,48,"#2b4887");
  for(var s=0;s<4;s++){var cx=[12,50,18,52][s],cy=[10,10,38,40][s];for(var a=0;a<720;a+=8){var rr=a/120;g.p(cx+rr*Math.cos(a*Math.PI/180),cy+rr*.7*Math.sin(a*Math.PI/180),s%2?"#5b7cc4":"#9fb4e6")}}
  [[6,4],[58,22],[4,26],[40,4],[60,44]].forEach(function(q){g.e(q[0],q[1],2,2,"#f8e8a0");g.p(q[0],q[1],"#f4d150")});
  g.e(32,25,11,15,"#e8a58a");g.e(34,25,6,10,"#c87a62");g.e(32,26,3,6,"#e8a58a");g.e(29,39,5,4,"#e8a58a");
  g.l(21,17,43,31,"#f4f1ea",2);g.l(21,31,42,18,"#f4f1ea",2);
  g.l(32,9,32,44,"#b0302a");g.l(21,26,43,26,"#b0302a");g.e(29,8,3,2,"#c0392b");g.e(35,8,3,2,"#c0392b");g.p(32,8,"#8a1f1a");
  g.r(39,33,7,6,"#fffdf6");g.r(40,34,5,4,"#d04a3a");g.p(42,35,"#fff");
};
A.b11=function(g){ // Pastorales Tahitiennes: Gauguin as misunderstood martyr
  g.v(0,16,"#f09a48","#f7cb6c");g.r(0,16,64,3,"#2f8f8a");g.v(19,48,"#e6709c","#c24c78");
  g.l(55,47,58,10,"#7a4a2a",2);[[-1,-0.4],[1,-0.3],[-1,0.4],[1,0.5],[0.2,-1]].forEach(function(d){g.l(58,10,58+d[0]*9,10+d[1]*7,"#2f7a3a",2)});
  g.e(30,12,6,6,"#fff3a0");g.ring(30,12,6,"#f9e04b");g.e(30,12,5,5,"#f7cb6c");
  g.r(17,19,26,2,"#a0603a");g.r(27,18,6,10,"#a0603a");g.e(30,13,3,3.5,"#a0603a");g.r(27,9,6,2,"#1a1410");
  g.r(26,26,8,10,"#d0302b");g.p(28,28,"#fff");g.p(31,31,"#fff");g.p(29,34,"#fff");g.r(28,36,2,8,"#a0603a");g.r(31,36,2,8,"#a0603a");
  g.e(10,41,6,6,"#2b6aa0");g.e(10,33,3,3,"#a0603a");g.r(7,30,6,2,"#1a1410");g.p(12,31,"#fff");
  g.e(44,42,6,5,"#f2d24a");g.e(44,34,3,3,"#a0603a");g.r(41,31,6,2,"#1a1410");g.p(46,32,"#d0302b");
};
/* ---------- Modernism ---------- */
A.b12=function(g){ // The Uncontrollable Giggle: The Scream, laughing
  var sky=["#e2582b","#f08a3a","#f4c25a","#e86a30"];
  for(var y=0;y<22;y++)for(var x=0;x<64;x++)g.p(x,y,sky[Math.floor((y+2*Math.sin(x/5)+40)/3)%4]);
  for(y=14;y<36;y++)for(x=0;x<64;x++)if(y>14+x*.18)g.p(x,y,((y+Math.round(1.5*Math.sin(x/4)))>>1)%2?"#2f4a8a":"#4a6aa8");
  g.poly([[0,14],[22,18],[10,36],[0,40]],"#2d3a2a");
  g.poly([[0,40],[64,22],[64,29],[0,48]],"#8a5a2a");g.l(0,37,63,19,"#5a3a1a");for(var i=0;i<8;i++){var px=4+i*8;g.l(px,37-px*.28,px,41-px*.28,"#5a3a1a")}
  g.fig(50,27,7,"#cfcfcf","#1a1a1a");g.fig(55,26,7,"#cfcfcf","#1a1a1a");
  g.poly([[22,48],[26,34],[36,34],[40,48]],"#2a2838");
  g.e(31,25,5,7,"#e9d9a8");g.e(25,26,2,3,"#e9d9a8");g.e(37,26,2,3,"#e9d9a8");
  g.l(28,23,30,22,"#3a2a1a");g.l(32,22,34,23,"#3a2a1a");g.e(31,29,3,2,"#5a1a1a");g.r(28,27,7,1,"#e9d9a8");g.r(30,28,3,1,"#f4f4f4");
  g.p(26,23,"#7fc4ff");g.p(25,21,"#7fc4ff");g.p(36,23,"#7fc4ff");g.p(37,21,"#7fc4ff");
  g.t(4,3,"HA",'#fff3c8');g.t(46,6,"HA",'#fff3c8');
};
A.b13=function(g){ // A Rose Is a Rose Is a Rose Is a Rose
  g.v(0,48,"#f2e2c4","#e4c493");
  function rose(cx,cy,s){g.e(cx,cy,10*s,9*s,"#9e1b32");g.e(cx,cy,8*s,7*s,"#c42a45");g.e(cx+.5*s,cy-.5*s,6*s,5*s,"#9e1b32");g.e(cx+.5*s,cy-.5*s,4.5*s,3.5*s,"#d84a63");g.e(cx+s,cy-s,2.5*s,2*s,"#9e1b32");g.e(cx+s,cy-s,1*s,1*s,"#5e0f1f")}
  g.poly([[0,48],[10,32],[20,48]],"#4a7a3a");g.poly([[44,48],[56,30],[64,40],[64,48]],"#3a6a2e");
  rose(32,24,2);rose(6,6,.5);rose(58,6,.5);rose(58,42,.5);
  g.l(18,14,22,10,"#f07a8f");g.l(42,12,46,16,"#f07a8f");g.l(16,30,19,36,"#f07a8f");
};
A.b14=function(g){ // American Goths
  g.v(0,24,"#9cc8e8","#d2e8f4");g.e(4,20,8,10,"#4a7a3a");g.e(60,18,8,12,"#4a7a3a");
  g.r(12,8,40,30,"#ebe4d2");g.poly([[10,9],[32,0],[54,9]],"#5a4a3a");for(var x=13;x<52;x+=3)g.l(x,9,x,37,"#d8d0bc");
  g.poly([[28,18],[32,11],[36,18],[36,26],[28,26]],"#3a3a4a");g.r(31,12,1,14,"#ebe4d2");g.r(28,20,8,1,"#ebe4d2");
  function goth(x,isMan){g.poly([[x-9,48],[x-7,31],[x+7,31],[x+9,48]],"#141414");g.e(x,22,5,6,"#ece8e4");g.p(x-2,21,"#111");g.p(x+2,21,"#111");g.r(x-3,20,2,1,"#5a2a7a");g.r(x+2,20,2,1,"#5a2a7a");g.r(x-1,25,3,1,"#2a0a2a");
    for(var k=0;k<5;k++)g.p(x-4+k*2,31,"#c8c8c8");
    if(isMan){for(var s=0;s<5;s++)g.r(x-2+s,13-(s%2)*2,1,4+(s%2)*2,"#111");g.r(x-5,16,10,2,"#111");g.ring(x-2,21,1.5,"#9a9a9a");g.ring(x+2,21,1.5,"#9a9a9a")}
    else{g.e(x,18,6,4,"#111");g.r(x-6,18,2,10,"#111");g.r(x+4,18,2,10,"#111");g.r(x-3,15,2,3,"#8a3ac8")}}
  goth(22,false);goth(42,true);
  g.r(51,14,1,34,"#8a8a8a");g.r(48,12,1,5,"#8a8a8a");g.r(51,11,1,5,"#8a8a8a");g.r(54,12,1,5,"#8a8a8a");g.r(48,16,7,1,"#8a8a8a");
};
A.b15=function(g){ // Times Square Traffic Jam: Mondrian grid, gridlock
  g.r(0,0,64,48,"#f2efe6");var Y="#f2c81f",cars=["#d22e2e","#2c5bc2","#9a9a9a","#d22e2e","#f2efe6"];
  [5,19,33,47,58].forEach(function(x){g.r(x,0,2,48,Y)});[5,15,25,35,43].forEach(function(y){g.r(0,y,64,2,Y)});
  var k=0;[5,19,33,47,58].forEach(function(x){for(var y=1;y<47;y+=3){if((y+x)%7<5)g.r(x,y,2,2,cars[k++%cars.length])}});
  [5,15,25,35,43].forEach(function(y){for(var x=1;x<63;x+=3){if((y+x*3)%9<6)g.r(x,y,2,2,cars[k++%cars.length])}});
  g.r(10,19,6,4,"#d22e2e");g.r(38,8,6,4,"#2c5bc2");g.r(24,38,6,4,Y);g.r(26,39,2,2,"#d22e2e");g.r(50,27,5,5,"#2c5bc2");g.r(51,28,3,3,"#d22e2e");
};
/* ---------- Surrealism ---------- */
A.b16=function(g){ // Eating Gypsy: what the lion did next (no gore: napkin, leftovers)
  g.v(0,30,"#16233f","#3a5a7a");g.sp(0,0,64,22,["#ffffff","#cfd8ff"],22);g.e(51,8,4,4,"#f2efd0");g.e(53,7,3,3,"#2a3f5f");
  g.r(0,26,64,3,"#4a6a8a");g.v(28,48,"#c9a66a","#a6844a");g.e(10,26,10,3,"#6a5a6a");
  g.e(34,31,12,6,"#c88c3a");g.r(24,34,3,8,"#c88c3a");g.r(30,35,3,7,"#c88c3a");g.r(38,35,3,7,"#c88c3a");g.r(43,34,3,8,"#c88c3a");
  g.l(46,29,52,24,"#c88c3a");g.e(53,23,1.5,1.5,"#6a4218");
  g.e(21,25,8,8,"#7a4a1a");g.e(20,25,5,5,"#d8a050");g.p(18,24,"#111");g.p(22,24,"#111");g.r(19,27,3,1,"#6a3a1a");g.p(22,28,"#f07090");g.p(23,28,"#f07090");
  g.poly([[15,30],[25,30],[20,37]],"#f6f2e8");g.p(20,32,"#d0302a");
  g.e(50,43,3,2,"#8a5a2a");g.l(52,42,58,38,"#5a3a1a");g.e(40,43,2,3,"#c46a3a");g.r(4,42,8,2,"#c84a2a");g.r(4,43,8,1,"#2a6a9a");
};
A.b17=function(g){ // Ceci est une cigarette
  g.r(0,0,64,48,"#e9dcbe");g.v(36,48,"#e9dcbe","#dccaa4");
  g.r(10,26,42,1,"#c9b48e");g.r(10,18,38,7,"#fbfbf6");g.r(10,18,11,7,"#d9893a");g.sp(10,18,11,7,["#b8692a","#e8a050"],18);g.r(10,24,38,1,"#d8d2c4");
  g.r(48,18,4,7,"#8a8a8a");g.sp(48,18,4,7,["#6a6a6a","#b0b0b0"],8);g.r(52,19,1,5,"#e8452b");g.p(52,21,"#ffb04a");
  for(var y=17;y>0;y--)g.p(53+Math.round(2*Math.sin(y/2.2)),y,y%4?"#b8b8b8":"#d0d0d0");
  g.t(10,33,"CECI EST UNE","#2a2a2a");g.t(14,40,"CIGARETTE.","#2a2a2a");
};
A.b18=function(g){ // Le burger en fourrure
  g.r(0,0,64,48,"#5e4a6a");g.v(30,48,"#5e4a6a","#4a3a56");
  g.e(32,39,23,5,"#e8dfd2");g.e(32,39,18,3.5,"#cfc4b4");
  var fur=g.mix(["#a67c50","#8a6440","#bf9264","#6f4f30","#a67c50"]),dark=g.mix(["#5a3a22","#48301c","#6e4a2a"]);
  g.e(32,33,15,4,fur);g.e(32,28,16,3,dark);for(var x=17;x<48;x+=2)g.p(x,31-(x%4?0:1),"#6aa83a");g.r(17,30,30,1,"#7ab84a");
  g.e(32,22,15,7,fur);g.r(17,26,31,1,fur);for(x=17;x<48;x+=2)g.p(x,15+Math.abs(32-x)/3+(x%3),"#c8a070");
  g.l(50,40,59,33,fur,2);g.e(47,41,3,1.5,fur);
};
A.b19=function(g){ // Self-Portrait with Beehive
  g.r(0,0,64,48,"#2c6a3a");for(var k=0;k<26;k++){var x=Math.floor(g.R()*64),y=Math.floor(g.R()*48);g.e(x,y,2.5,1.2,k%2?"#4a8a4a":"#1e4a28")}
  g.poly([[14,48],[20,36],[44,36],[50,48]],"#2a7a8a");for(var i=0;i<6;i++)g.p(22+i*4,40+(i%2)*3,"#f2d24a");g.r(24,36,16,2,"#d0302a");
  g.e(32,16,10,14,"#1a1410");for(var y2=4;y2<26;y2+=3)g.l(23,y2,41,y2,"#2a2018");g.r(27,6,6,5,"#e8b830");g.p(28,7,"#b8881a");g.p(30,8,"#b8881a");g.p(32,7,"#b8881a");
  g.e(32,27,6,7,"#c8925e");g.r(27,24,11,1,"#1a1410");g.p(29,26,"#1a1410");g.p(35,26,"#1a1410");g.r(30,31,4,1,"#b8202a");g.e(24,22,2,2,"#d0302a");g.e(40,22,2,2,"#e85a8a");
  [[18,6],[46,9],[44,20],[16,24],[50,3],[22,2],[40,2],[48,28]].forEach(function(q){g.p(q[0],q[1],"#f4d150");g.p(q[0]+1,q[1],"#111");g.p(q[0]+2,q[1],"#f4d150");g.p(q[0]+1,q[1]-1,"#e8f4ff")});
};
/* ---------- Pop ---------- */
A.b20=function(g){ // Lady Gaga, Warhol style
  var bg=["#ff5fa2","#3fd0e0","#f9e04b","#ff8a3a"],face=["#f9e04b","#ff5fa2","#7a5af0","#3fd0e0"],hair=["#fffbe6","#f9e04b","#ff5fa2","#fffbe6"];
  for(var i=0;i<4;i++){var ox=(i%2)*32,oy=Math.floor(i/2)*24,cx=ox+16,cy=oy+12;g.r(ox,oy,32,24,bg[i]);
    g.e(cx,cy,8,8,hair[i]);g.e(cx-4,cy-9,3,2,hair[i]);g.e(cx+4,cy-9,3,2,hair[i]);g.r(cx-1,cy-10,2,2,hair[i]);
    g.e(cx,cy+1,5,6,face[i]);g.r(cx-5,cy-1,4,2,"#111");g.r(cx+1,cy-1,4,2,"#111");g.r(cx-1,cy-1,2,1,"#111");g.r(cx-1,cy+4,3,1,"#d0103a");
    g.r(cx-8,cy+8,16,4,"#1a1a2a")}
};
A.b21=function(g){ // I'm Just Transferring You. Lichtenstein comic panel
  g.r(0,0,64,48,"#ffffff");for(var y=0;y<48;y+=3)for(var x=(y/3)%2?1:0;x<64;x+=3)g.p(x,y,"#86b6ec");
  g.e(38,24,15,17,"#111");g.e(38,24,14,16,"#f4d11a");for(var k=0;k<5;k++)g.l(28+k*4,10,26+k*4,36,"#111");
  g.e(36,28,8,10,"#111");g.e(36,28,7,9,function(x,y){return(x+y)%2?"#ffffff":"#f08a80"});
  g.r(31,25,4,1,"#111");g.r(38,25,4,1,"#111");g.r(32,26,2,1,"#2a6ad0");g.r(39,26,2,1,"#2a6ad0");g.r(34,33,5,2,"#d0102a");g.p(42,29,"#86c8ff");g.p(42,30,"#86c8ff");
  g.ring(36,20,10,"#111");g.e(26,26,2,3,"#111");g.l(26,29,32,34,"#111");g.e(32,34,1.5,1,"#555");
  g.poly([[1,1],[30,1],[30,15],[18,15],[22,21],[12,15],[1,15]],"#111");g.poly([[2,2],[29,2],[29,14],[17,14],[20,18],[12,14],[2,14]],"#ffffff");
  g.t(4,3,"PLEASE",'#111');g.t(4,9,"HOLD...",'#111');
  g.r(0,0,64,1,"#111");g.r(0,47,64,1,"#111");g.r(0,0,1,48,"#111");g.r(63,0,1,48,"#111");
};
A.b22=function(g){ // Untitled Film Still #5022: Cindy Sherman as Katniss (b/w)
  g.v(0,48,"#7a7a7a","#3a3a3a");[4,14,50,58].forEach(function(x,i){g.r(x,0,3+i%2,48,i%2?"#2a2a2a":"#5a5a5a")});
  g.e(32,30,9,12,"#2e2e2e");g.r(23,36,18,12,"#2e2e2e");g.e(32,11,6,4,"#1e1e1e");g.r(26,11,2,8,"#1e1e1e");g.e(32,17,5,5,"#dedede");g.r(28,12,8,2,"#1e1e1e");
  for(var y=18;y<34;y+=2)g.r(36+((y/2)%2),y,2,2,"#1e1e1e");g.p(30,17,"#222");g.p(34,17,"#222");g.r(31,20,3,1,"#888");
  for(var a=-70;a<=70;a+=4)g.p(14+9*Math.cos(a*Math.PI/180)*.5,28+16*Math.sin(a*Math.PI/180)*.9,"#bdbdbd");g.l(18,14,18,42,"#e0e0e0");g.l(12,28,28,28,"#d8d8d8");g.p(11,27,"#f0f0f0");g.p(11,29,"#f0f0f0");
  g.r(40,14,3,12,"#4a4a4a");g.p(40,13,"#e8e8e8");g.p(42,12,"#e8e8e8");
  g.sp(0,0,64,48,["#8f8f8f","#4f4f4f","#a8a8a8"],90);
  g.r(0,0,64,2,"#f4f4f0");g.r(0,46,64,2,"#f4f4f0");g.r(0,0,2,48,"#f4f4f0");g.r(62,0,2,48,"#f4f4f0");
};
A.b23=function(g){ // You Just Stepped On My Toe: Kruger slogan over b/w photo
  g.v(0,48,"#9a9a9a","#5a5a5a");g.sp(0,0,64,48,["#b0b0b0","#7a7a7a"],120);
  g.e(18,30,16,7,"#d8d8d8");[[8,26],[11,24],[14,23],[17,23],[20,24]].forEach(function(q){g.e(q[0]-4,q[1]+1,2,1.8,"#e4e4e4")});
  g.poly([[26,20],[60,16],[62,32],[24,34]],"#151515");g.r(56,30,4,14,"#151515");g.l(26,33,60,31,"#4a4a4a");
  g.r(4,3,42,15,"#e1251b");g.t(6,5,"YOU JUST",'#ffffff');g.t(6,11,"STEPPED ON",'#ffffff');
  g.r(30,37,28,9,"#e1251b");g.t(32,39,"MY TOE",'#ffffff');
};
/* ---------- Installation ---------- */
A.b24=function(g){ // Papa: a giant tick sculpture
  g.r(0,0,64,38,"#dcd8cf");g.v(38,48,"#aa9c88","#8a7c68");g.l(0,38,63,38,"#8a7c68");
  [[24,30,14,44],[28,32,22,45],[38,32,44,45],[42,30,52,44],[22,26,10,30],[44,26,56,30],[26,22,14,16],[42,22,52,16]].forEach(function(q){g.l(q[0],q[1],(q[0]+q[2])/2,Math.min(q[1],q[3])-4,"#3a3028",2);g.l((q[0]+q[2])/2,Math.min(q[1],q[3])-4,q[2],q[3],"#3a3028",2)});
  g.e(36,26,13,10,"#6c5c4a");g.e(32,22,6,3,"#8c7c66");g.e(36,30,10,4,"#5a4a3a");g.e(22,25,5,4,"#3a2a20");g.r(16,25,3,1,"#3a2a20");
  g.fig(6,44,9,"#d8b48a","#3a5a8a","#222");g.fig(58,44,9,"#c48a5a","#c0392b","#111");
};
A.b25=function(g){ // All the Eternal Love I Have for Aubergines: mirror room
  g.r(0,0,64,48,"#0b0b14");g.v(30,48,"#0b0b14","#1c1c30");
  for(var k=0;k<60;k++)g.p(Math.floor(g.R()*64),Math.floor(g.R()*30),["#ffffff","#ff4a4a","#f4d11a"][k%3]);
  function aub(x,y,s,body,dot){g.e(x,y,3*s,4.5*s,body);g.e(x-s*.5,y-3.5*s,2*s,1.2*s,"#2f8a3a");g.r(Math.round(x-s*.5),Math.round(y-5*s),1,Math.ceil(s*1.5),"#2f8a3a");
    for(var i=0;i<6;i++){var a=i*1.1;g.e(x+Math.cos(a)*1.6*s,y+Math.sin(a)*2.6*s,s*.45,s*.45,dot)}}
  [6,18,30,42,54].forEach(function(x,i){aub(x+3,9,1,i%2?"#f4d11a":"#6a2a8a",i%2?"#111":"#f4d11a")});
  [10,26,42,56].forEach(function(x,i){aub(x,22,1.6,i%2?"#6a2a8a":"#f4d11a",i%2?"#f4d11a":"#111")});
  aub(14,38,2,"#6a2a8a","#f4d11a");aub(50,38,2,"#6a2a8a","#f4d11a");aub(32,36,2.4,"#f4d11a","#111");
};
A.b26=function(g){ // How to Explain Pictures to a Dead Man (the hare explains)
  g.r(0,0,64,40,"#3a3a46");g.r(0,40,64,8,"#5a4a3a");
  [[4,6,10,8,"#c0392b"],[18,4,8,10,"#2c8ae8"],[52,6,9,7,"#f2c81f"]].forEach(function(q){g.r(q[0]-1,q[1]-1,q[2]+2,q[3]+2,"#c9a23a");g.r(q[0],q[1],q[2],q[3],q[4]);g.p(q[0]+2,q[1]+2,"#fff")});
  g.r(4,37,28,6,"#6a6a78");g.r(4,37,28,1,"#8a8a98");g.r(28,37,3,6,"#f0f0f0");g.r(2,38,3,4,"#2a2a2a");g.e(36,38,5,4,"#d8b030");g.p(35,36,"#f6e08a");g.p(38,38,"#f6e08a");g.p(34,40,"#b08a20");g.r(37,37,2,1,"#8a6a10");
  g.e(52,31,5,8,"#a07850");g.e(52,20,4,4,"#a07850");g.r(49,7,2,10,"#a07850");g.r(54,7,2,10,"#a07850");g.r(50,9,1,7,"#e8a0a0");g.r(55,9,1,7,"#e8a0a0");g.p(50,19,"#111");g.p(49,21,"#e88a9a");
  g.e(55,39,3,1.5,"#a07850");g.e(49,39,3,1.5,"#a07850");g.e(52,33,3,4,"#d8c0a0");
  g.r(37,21,10,8,"#c9a23a");g.r(38,22,8,6,"#7ac0e8");g.e(42,26,2,1.5,"#4a8a3a");g.p(40,23,"#fff8c0");g.l(47,26,50,28,"#a07850",2);
};
A.b27=function(g){ // Present: Christo & Jeanne-Claude gift-wrap a building
  g.v(0,32,"#86c2f0","#d2eaf8");g.r(0,40,64,8,"#6a8a4a");
  g.r(8,18,48,22,"#c8ccd4");g.r(5,12,9,28,"#c8ccd4");g.r(50,12,9,28,"#c8ccd4");g.e(32,17,9,6,"#d4d8e0");
  for(var x=6;x<58;x+=3)g.l(x,13,x+((x%2)?1:0),39,"#a6acb8");for(var y=16;y<40;y+=6)g.l(5,y,58,y,"#3a6ac8");
  g.r(31,10,3,30,"#d22e2e");g.r(5,26,54,2,"#d22e2e");g.e(27,8,5,3,"#d22e2e");g.e(38,8,5,3,"#d22e2e");g.e(27,8,2,1,"#a01a1a");g.e(38,8,2,1,"#a01a1a");g.r(31,6,3,4,"#a01a1a");
  g.fig(20,46,6,"#d8b48a","#2c5bc2");g.fig(44,46,6,"#c48a5a","#f2c81f");
};
/* ---------- Contemporary ---------- */
A.b28=function(g){ // The Artist Is Living in Your Home
  g.r(0,0,64,36,"#e8d8b6");for(var x=0;x<64;x+=4)g.r(x,0,1,36,"#e0cca6");g.v(36,48,"#a8784a","#8a5a32");for(var y=38;y<48;y+=3)g.l(0,y,63,y,"#7a4e2a");
  g.r(4,6,14,12,"#9fd0f0");g.r(10,6,1,12,"#fff");g.r(2,4,4,18,"#c0392b");g.r(16,4,4,18,"#c0392b");
  g.r(46,22,18,12,"#5a7a9a");g.r(46,18,18,6,"#4a6a8a");g.r(44,24,3,10,"#4a6a8a");
  g.r(26,28,14,2,"#7a5030");g.r(27,30,1,8,"#7a5030");g.r(38,30,1,8,"#7a5030");
  g.r(18,24,1,14,"#5a3a20");g.r(18,32,6,1,"#5a3a20");g.poly([[19,20],[26,20],[28,40],[17,40]],"#c0201f");g.e(22,16,3,3.5,"#ece0d4");g.r(19,12,4,5,"#2a1a12");g.r(20,17,2,8,"#2a1a12");g.p(24,16,"#111");
  g.e(44,32,3,4,"#7a7a80");g.e(44,26,2.5,2.5,"#7a7a80");g.p(43,24,"#7a7a80");g.p(46,24,"#7a7a80");g.p(43,26,"#f2d24a");g.r(47,34,4,1,"#7a7a80");
};
A.b29=function(g){ // Little Big Pony: a beach-sized balloon pony
  g.v(0,18,"#9cd4f4","#d8f0fb");g.v(18,26,"#3a9ad0","#6ac0e0");g.r(0,25,64,1,"#ffffff");g.v(26,48,"#f2dca0","#e0bf7c");
  var P="#f07ab0",L="#ffd0e8",D="#c04a88";
  g.e(32,42,14,2,"#d0b070");
  g.r(23,32,3,10,P);g.r(28,33,3,9,P);g.r(36,33,3,9,P);g.r(41,32,3,10,P);g.e(32,29,12,6,P);g.e(32,32,10,2,D);g.e(28,26,5,2,L);
  g.e(22,21,3,7,P);g.e(18,14,6,4,P);g.e(13,15,3,2.5,P);g.e(16,12,2,1.5,L);g.e(21,9,1.5,2.5,P);
  [[24,14],[26,18],[27,22]].forEach(function(q){g.e(q[0],q[1],2,2,D)});g.e(46,26,3,2,P);g.e(49,29,2,3,D);g.p(16,13,"#111");
  g.poly([[50,30],[58,30],[54,26]],"#d22e2e");g.poly([[54,26],[58,30],[56,30]],"#ffffff");g.r(54,30,1,8,"#5a5a5a");g.fig(51,40,6,"#e3bf95","#2c5bc2");g.fig(57,40,6,"#c48a5a","#f2c81f");
};
A.b30=function(g){ // The Essential Saltiness of the Pickling Process...
  g.r(0,0,64,40,"#efefec");g.r(0,40,64,8,"#cfcfcf");g.r(8,40,48,3,"#ffffff");g.r(8,43,48,1,"#b0b0b0");
  g.r(8,6,48,34,"#e2e4ea");g.v(8,39,"#a8e0d8","#78c2bc",10,54);g.r(31,7,2,32,"#e2e4ea");g.r(8,6,48,1,"#c4c8d0");
  g.e(32,24,15,5,"#4e8a2e");g.e(32,26,13,3,"#3a6a22");g.e(30,22,10,2,"#6ea044");for(var k=0;k<18;k++)g.p(19+Math.floor(g.R()*26),21+Math.floor(g.R()*6),"#8ab85a");
  [[14,32],[20,12],[46,14],[50,30],[40,10]].forEach(function(q){g.p(q[0],q[1],"#ffffff");g.p(q[0]+1,q[1]-2,"#e8fffb")});
};
A.b31=function(g){ // Every Pillow I Have Ever Slept With
  g.r(0,0,64,40,"#d8c8ae");g.v(40,48,"#8a6a4a","#6a4a2e");g.r(48,30,16,10,"#a08060");g.r(48,28,16,2,"#f2f0ea");
  var cs=["#f2f2f2","#e8b4c8","#8ab0d8","#f2d24a","#c0302a","#7ac08a","#ffffff","#9a7ac8","#f0a050"];
  var y=44;for(var i=0;i<cs.length;i++){var w=24+((i*7)%9),h=4+(i%2),x=32-w/2+((i*5)%5)-2;y-=h;
    g.r(Math.round(x)+1,y,w-2,h,cs[i]);g.r(Math.round(x),y+1,w,h-2,cs[i]);g.l(Math.round(x)+1,y+h-1,Math.round(x)+w-2,y+h-1,"#9a9a9a");
    if(i===2)for(var s=0;s<w;s+=3)g.r(Math.round(x)+s,y+1,1,h-2,"#ffffff");if(i===5)for(s=2;s<w;s+=4)g.p(Math.round(x)+s,y+2,"#2f6a3a");}
};
/* ---------- Graffiti ---------- */
A.b32=function(g){ // My Homepage: Basquiat designs a social media page
  g.r(0,0,64,48,"#f2c81f");for(var k=0;k<14;k++){var x=Math.floor(g.R()*64),y=Math.floor(g.R()*48);g.l(x,y,x+3+Math.floor(g.R()*6),y+Math.floor(g.R()*5)-2,k%3?"#111":"#d0302a")}
  g.l(22,10,24,2,"#111");g.l(24,2,28,8,"#111");g.l(28,8,32,1,"#111");g.l(32,1,36,8,"#111");g.l(36,8,40,2,"#111");g.l(40,2,42,10,"#111");g.l(22,10,42,10,"#111");
  g.r(8,13,48,32,"#111");g.r(9,14,46,30,"#f4f4f4");g.r(9,14,46,4,"#c0c0c8");g.p(11,15,"#e8452b");g.p(13,15,"#f2c81f");g.p(15,15,"#3ab05a");g.r(19,15,30,2,"#ffffff");
  g.e(22,30,8,9,"#111");g.e(22,30,7,8,"#e8e0cc");g.e(19,28,2,2,"#111");g.e(26,28,2,2,"#111");g.r(17,34,10,3,"#111");for(var t=18;t<27;t+=2)g.r(t,34,1,2,"#ffffff");g.l(14,22,30,22,"#d0302a");
  g.r(34,21,18,2,"#111");g.r(34,25,14,2,"#111");g.r(34,29,16,2,"#111");
  var hx=38,hy=34;g.r(hx,hy,2,1,"#e8452b");g.r(hx+3,hy,2,1,"#e8452b");g.r(hx-1,hy+1,7,2,"#e8452b");g.r(hx,hy+3,5,1,"#e8452b");g.r(hx+1,hy+4,3,1,"#e8452b");g.p(hx+2,hy+5,"#e8452b");
  g.t(44,35,"99",'#111');
};
A.b33=function(g){ // Self-Portrait by Banksy: still anonymous
  for(var y=0;y<48;y++)for(var x=0;x<64;x++){var row=Math.floor(y/4),off=(row%2)*4;g.p(x,y,(y%4===3||((x+off)%8===7))?"#cdb8a0":((row*3+Math.floor((x+off)/8))%3?"#a8502e":"#9a4628"))}
  g.poly([[18,48],[22,26],[40,26],[44,48]],"#111");g.e(31,18,8,9,"#111");g.l(40,30,48,18,"#111",3);g.r(46,10,4,8,"#8a8a8a");g.r(46,9,4,1,"#e8452b");g.p(47,7,"#6a6a6a");g.p(45,6,"#c8c8c8");g.p(44,5,"#c8c8c8");
  for(var j=0;j<4;j++)for(var i=0;i<4;i++)g.r(27+i*2,14+j*2,2,2,["#9a9a9a","#6a6a6a","#c8c8c8","#7a7a7a"][(i*3+j*5)%4]);
  [20,26,36,42].forEach(function(x){g.l(x,48-((x*7)%6),x,47,"#111")});
  g.e(10,10,4,4,"#e1251b");g.p(9,8,"#ff8a7a");g.l(10,14,14,30,"#111");
};
A.b34=function(g){ // Pop Plane: Keith Haring figures on a jet
  g.r(0,0,64,48,"#2c8ae8");[[4,4],[60,40],[4,44],[60,6]].forEach(function(q){g.l(q[0],q[1],32+(q[0]-32)*.6,24+(q[1]-24)*.6,"#ffffff")});
  g.poly([[3,9],[10,9],[14,19],[6,19]],"#111");g.poly([[4,10],[9,10],[12,18],[7,18]],"#ffffff");
  g.r(5,18,50,10,"#111");g.e(55,23,7,5,"#111");g.r(6,19,48,8,"#ffffff");g.e(55,23,6,4,"#ffffff");g.r(55,20,4,2,"#111");
  g.poly([[22,27],[38,27],[30,40],[19,40]],"#111");g.poly([[23,28],[36,28],[29,39],[21,39]],"#ffffff");
  var cs=["#e8452b","#f2c81f","#3ab05a","#111","#e85a8a","#2c5bc2"];
  for(var i=0;i<7;i++){var x=9+i*6,c=cs[i%cs.length];g.r(x+1,20,2,2,c);g.r(x+1,22,2,3,c);g.p(x,22+(i%2),c);g.p(x+3,22+((i+1)%2),c);g.p(x,25,c);g.p(x+3,25,c)}
  g.l(26,30,32,30,"#e8452b");g.p(29,32,"#e8452b");g.r(27,33,4,2,"#e8452b");g.p(27,36,"#e8452b");g.p(30,36,"#e8452b");
};
A.b35=function(g){ // Don't Mess with Missy
  g.r(0,0,64,48,"#9aa0a6");g.sp(0,0,64,48,["#8a9096","#aab0b6"],200);g.l(2,40,12,34,"#3ab05a",2);g.l(50,8,60,4,"#e85a8a",2);g.l(52,44,62,40,"#2c8ae8",2);
  g.poly([[22,48],[25,28],[39,28],[42,48]],"#e85a8a");g.r(25,28,14,2,"#c83a6a");
  g.l(26,30,19,36,"#f4d8c0",2);g.l(19,36,25,40,"#f4d8c0",2);g.l(38,30,45,36,"#f4d8c0",2);g.l(45,36,39,40,"#f4d8c0",2);
  g.e(32,15,11,11,"#2a1a2a");g.r(21,15,4,12,"#2a1a2a");g.r(39,15,4,12,"#2a1a2a");g.e(32,17,8,9,"#f4d8c0");g.r(24,8,16,4,"#2a1a2a");
  g.e(28,17,2.5,3,"#ffffff");g.e(36,17,2.5,3,"#ffffff");g.e(28,18,1.3,1.8,"#2a1a3a");g.e(36,18,1.3,1.8,"#2a1a3a");g.l(25,14,30,15,"#111");g.l(39,14,34,15,"#111");
  g.e(25,21,1.5,1,"#f0a0a0");g.e(39,21,1.5,1,"#f0a0a0");g.e(32,23,2,1,"#c0102a");
  g.l(31,26,31,46,"#e85a8a");[22,24,26].forEach(function(y){g.p(28,y+22,"#ffffff")});
};

function url(id){if(!A[id])return null;if(url.c[id])return url.c[id];
  var g=make(hash(id));A[id](g);var c=document.createElement("canvas");c.width=W*S;c.height=H*S;var x=c.getContext("2d");
  for(var i=0;i<W*H;i++){x.fillStyle=g.buf[i];x.fillRect((i%W)*S,Math.floor(i/W)*S,S,S)}
  return url.c[id]=c.toDataURL("image/png")}
url.c={};
return {url:url,ids:Object.keys(A),draw:function(id){var g=make(hash(id));A[id](g);return {w:W,h:H,buf:g.buf}}};
})();
