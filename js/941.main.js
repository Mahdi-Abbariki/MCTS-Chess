"use strict";(self.webpackChunkchess=self.webpackChunkchess||[]).push([[941],{941:(e,r,n)=>{n.d(r,{qQ:()=>I});const t="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",o=["1-0","0-1","1/2-1/2","*"],i={b:[16,32,17,15],w:[-16,-32,-17,-15]},a={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},f=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],u=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],l={p:0,n:1,b:2,r:3,q:4,k:5},s={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},c={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},p={w:[{square:c.a1,flag:s.QSIDE_CASTLE},{square:c.h1,flag:s.KSIDE_CASTLE}],b:[{square:c.a8,flag:s.QSIDE_CASTLE},{square:c.h8,flag:s.KSIDE_CASTLE}]};function v(e){var r=e.charAt(0);if(r>="a"&&r<="h"){if(e.match(/[a-h]\d.*[a-h]\d/))return;return S}return"o"===(r=r.toLowerCase())?w:r}function h(e){return e.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}function g(e){return e>>4}function d(e){return 15&e}function b(e){var r=d(e),n=g(e);return"abcdefgh".substring(r,r+1)+"87654321".substring(n,n+1)}function E(e){return e===y?C:y}function m(e){var r=e instanceof Array?[]:{};for(var n in e)r[n]="object"==typeof n?m(e[n]):e[n];return r}function _(e){return e.replace(/^\s+|\s+$/g,"")}const C="b",y="w",A=-1,S="p",w="k",T=(function(){for(var e=[],r=c.a8;r<=c.h1;r++)136&r?r+=7:e.push(b(r))}(),{NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"}),I=function(e){var r=new Array(128),n={w:A,b:A},I=y,L={w:0,b:0},P=A,R=0,k=1,q=[],O={},N={};function D(e){void 0===e&&(e=!1),r=new Array(128),n={w:A,b:A},I=y,L={w:0,b:0},P=A,R=0,k=1,q=[],e||(O={}),N={},B(j())}function Q(){for(var e=[],r={},n=function(e){e in N&&(r[e]=N[e])};q.length>0;)e.push(ne());for(n(j());e.length>0;)re(e.pop()),n(j());N=r}function U(){K(t)}function K(e,r){void 0===r&&(r=!1);var n=e.split(/\s+/),t=n[0],o=0;if(!x(e).valid)return!1;D(r);for(var i=0;i<t.length;i++){var a=t.charAt(i);if("/"===a)o+=8;else if(-1!=="0123456789".indexOf(a))o+=parseInt(a,10);else{var f=a<"a"?y:C;W({type:a.toLowerCase(),color:f},b(o)),o++}}return I=n[1],n[2].indexOf("K")>-1&&(L.w|=s.KSIDE_CASTLE),n[2].indexOf("Q")>-1&&(L.w|=s.QSIDE_CASTLE),n[2].indexOf("k")>-1&&(L.b|=s.KSIDE_CASTLE),n[2].indexOf("q")>-1&&(L.b|=s.QSIDE_CASTLE),P="-"===n[3]?A:c[n[3]],R=parseInt(n[4],10),k=parseInt(n[5],10),B(j()),!0}function x(e){var r=e.split(/\s+/);if(6!==r.length)return{valid:!1,error_number:1,error:"FEN string must contain six space-delimited fields."};if(isNaN(r[5])||parseInt(r[5],10)<=0)return{valid:!1,error_number:2,error:"6th field (move number) must be a positive integer."};if(isNaN(r[4])||parseInt(r[4],10)<0)return{valid:!1,error_number:3,error:"5th field (half move counter) must be a non-negative integer."};if(!/^(-|[abcdefgh][36])$/.test(r[3]))return{valid:!1,error_number:4,error:"4th field (en-passant square) is invalid."};if(!/^(KQ?k?q?|Qk?q?|kq?|q|-)$/.test(r[2]))return{valid:!1,error_number:5,error:"3rd field (castling availability) is invalid."};if(!/^(w|b)$/.test(r[1]))return{valid:!1,error_number:6,error:"2nd field (side to move) is invalid."};var n=r[0].split("/");if(8!==n.length)return{valid:!1,error_number:7,error:"1st field (piece positions) does not contain 8 '/'-delimited rows."};for(var t=0;t<n.length;t++){for(var o=0,i=!1,a=0;a<n[t].length;a++)if(isNaN(n[t][a])){if(!/^[prnbqkPRNBQK]$/.test(n[t][a]))return{valid:!1,error_number:9,error:"1st field (piece positions) is invalid [invalid piece]."};o+=1,i=!1}else{if(i)return{valid:!1,error_number:8,error:"1st field (piece positions) is invalid [consecutive numbers]."};o+=parseInt(n[t][a],10),i=!0}if(8!==o)return{valid:!1,error_number:10,error:"1st field (piece positions) is invalid [row too large]."}}return"3"==r[3][1]&&"w"==r[1]||"6"==r[3][1]&&"b"==r[1]?{valid:!1,error_number:11,error:"Illegal en-passant square"}:{valid:!0,error_number:0,error:"No errors."}}function j(){for(var e=0,n="",t=c.a8;t<=c.h1;t++){if(null==r[t])e++;else{e>0&&(n+=e,e=0);var o=r[t].color,i=r[t].type;n+=o===y?i.toUpperCase():i.toLowerCase()}t+1&136&&(e>0&&(n+=e),t!==c.h1&&(n+="/"),e=0,t+=8)}var a="";L[y]&s.KSIDE_CASTLE&&(a+="K"),L[y]&s.QSIDE_CASTLE&&(a+="Q"),L[C]&s.KSIDE_CASTLE&&(a+="k"),L[C]&s.QSIDE_CASTLE&&(a+="q"),a=a||"-";var f=P===A?"-":b(P);return[n,I,a,f,R,k].join(" ")}function $(e){for(var r=0;r<e.length;r+=2)"string"==typeof e[r]&&"string"==typeof e[r+1]&&(O[e[r]]=e[r+1]);return O}function B(e){q.length>0||(e!==t?(O.SetUp="1",O.FEN=e):(delete O.SetUp,delete O.FEN))}function M(e){var n=r[c[e]];return n?{type:n.type,color:n.color}:null}function W(e,t){if(!("type"in e)||!("color"in e))return!1;if(-1==="pnbrqkPNBRQK".indexOf(e.type.toLowerCase()))return!1;if(!(t in c))return!1;var o=c[t];return(e.type!=w||n[e.color]==A||n[e.color]==o)&&(r[o]={type:e.type,color:e.color},e.type===w&&(n[e.color]=o),B(j()),!0)}function F(e,r,n,t,o){var i={color:I,from:r,to:n,flags:t,piece:e[r].type};return o&&(i.flags|=s.PROMOTION,i.promotion=o),e[n]?i.captured=e[n].type:t&s.EP_CAPTURE&&(i.captured=S),i}function G(e){function t(e,r,n,t,o){if(e[n].type!==S||0!==g(t)&&7!==g(t))r.push(F(e,n,t,o));else for(var i=["q","r","b","n"],a=0,f=i.length;a<f;a++)r.push(F(e,n,t,o,i[a]))}var o=[],f=I,u=E(f),l={b:1,w:6},p=c.a8,v=c.h1,h=!1,d=void 0===e||!("legal"in e)||e.legal,b=void 0===e||!("piece"in e)||"string"!=typeof e.piece||e.piece.toLowerCase();if(void 0!==e&&"square"in e){if(!(e.square in c))return[];p=v=c[e.square],h=!0}for(var m=p;m<=v;m++)if(136&m)m+=7;else{var _=r[m];if(null!=_&&_.color===f)if(_.type!==S||!0!==b&&b!==S){if(!0===b||b===_.type)for(var C=0,y=a[_.type].length;C<y;C++){var A=a[_.type][C];for(T=m;!(136&(T+=A));){if(null!=r[T]){if(r[T].color===f)break;t(r,o,m,T,s.CAPTURE);break}if(t(r,o,m,T,s.NORMAL),"n"===_.type||"k"===_.type)break}}}else{var T=m+i[f][0];if(null==r[T]){t(r,o,m,T,s.NORMAL);T=m+i[f][1];l[f]===g(m)&&null==r[T]&&t(r,o,m,T,s.BIG_PAWN)}for(C=2;C<4;C++)136&(T=m+i[f][C])||(null!=r[T]&&r[T].color===u?t(r,o,m,T,s.CAPTURE):T===P&&t(r,o,m,P,s.EP_CAPTURE))}}if(!(!0!==b&&b!==w||h&&v!==n[f])){if(L[f]&s.KSIDE_CASTLE){var R=(k=n[f])+2;null!=r[k+1]||null!=r[R]||Z(u,n[f])||Z(u,k+1)||Z(u,R)||t(r,o,n[f],R,s.KSIDE_CASTLE)}var k;if(L[f]&s.QSIDE_CASTLE)R=(k=n[f])-2,null!=r[k-1]||null!=r[k-2]||null!=r[k-3]||Z(u,n[f])||Z(u,k-1)||Z(u,R)||t(r,o,n[f],R,s.QSIDE_CASTLE)}if(!d)return o;var q=[];for(m=0,y=o.length;m<y;m++)re(o[m]),H(f)||q.push(o[m]),ne();return q}function z(e,r){var n="";if(e.flags&s.KSIDE_CASTLE)n="O-O";else if(e.flags&s.QSIDE_CASTLE)n="O-O-O";else{if(e.piece!==S){var t=function(e,r){for(var n=e.from,t=e.to,o=e.piece,i=0,a=0,f=0,u=0,l=r.length;u<l;u++){var s=r[u].from,c=r[u].to;o===r[u].piece&&n!==s&&t===c&&(i++,g(n)===g(s)&&a++,d(n)===d(s)&&f++)}return i>0?a>0&&f>0?b(n):f>0?b(n).charAt(1):b(n).charAt(0):""}(e,r);n+=e.piece.toUpperCase()+t}e.flags&(s.CAPTURE|s.EP_CAPTURE)&&(e.piece===S&&(n+=b(e.from)[0]),n+="x"),n+=b(e.to),e.flags&s.PROMOTION&&(n+="="+e.promotion.toUpperCase())}return re(e),J()&&(V()?n+="#":n+="+"),ne(),n}function Z(e,n){for(var t=c.a8;t<=c.h1;t++)if(136&t)t+=7;else if(null!=r[t]&&r[t].color===e){var o=r[t],i=t-n,a=i+119;if(f[a]&1<<l[o.type]){if(o.type===S){if(i>0){if(o.color===y)return!0}else if(o.color===C)return!0;continue}if("n"===o.type||"k"===o.type)return!0;for(var s=u[a],p=t+s,v=!1;p!==n;){if(null!=r[p]){v=!0;break}p+=s}if(!v)return!0}}return!1}function H(e){return Z(E(e),n[e])}function J(){return H(I)}function V(){return J()&&0===G().length}function X(){return!J()&&0===G().length}function Y(){for(var e={},n=[],t=0,o=0,i=c.a8;i<=c.h1;i++)if(o=(o+1)%2,136&i)i+=7;else{var a=r[i];a&&(e[a.type]=a.type in e?e[a.type]+1:1,"b"===a.type&&n.push(o),t++)}if(2===t)return!0;if(3===t&&(1===e.b||1===e.n))return!0;if(t===e.b+2){var f=0,u=n.length;for(i=0;i<u;i++)f+=n[i];if(0===f||f===u)return!0}return!1}function ee(){for(var e=[],r={},n=!1;;){var t=ne();if(!t)break;e.push(t)}for(;;){var o=j().split(" ").slice(0,4).join(" ");if(r[o]=o in r?r[o]+1:1,r[o]>=3&&(n=!0),!e.length)break;re(e.pop())}return n}function re(e){var t=I,o=E(t);if(function(e){q.push({move:e,kings:{b:n.b,w:n.w},turn:I,castling:{b:L.b,w:L.w},ep_square:P,half_moves:R,move_number:k})}(e),r[e.to]=r[e.from],r[e.from]=null,e.flags&s.EP_CAPTURE&&(I===C?r[e.to-16]=null:r[e.to+16]=null),e.flags&s.PROMOTION&&(r[e.to]={type:e.promotion,color:t}),r[e.to].type===w){if(n[r[e.to].color]=e.to,e.flags&s.KSIDE_CASTLE){var i=e.to-1,a=e.to+1;r[i]=r[a],r[a]=null}else e.flags&s.QSIDE_CASTLE&&(i=e.to+1,a=e.to-2,r[i]=r[a],r[a]=null);L[t]=""}if(L[t])for(var f=0,u=p[t].length;f<u;f++)if(e.from===p[t][f].square&&L[t]&p[t][f].flag){L[t]^=p[t][f].flag;break}if(L[o])for(f=0,u=p[o].length;f<u;f++)if(e.to===p[o][f].square&&L[o]&p[o][f].flag){L[o]^=p[o][f].flag;break}P=e.flags&s.BIG_PAWN?"b"===I?e.to-16:e.to+16:A,e.piece===S||e.flags&(s.CAPTURE|s.EP_CAPTURE)?R=0:R++,I===C&&k++,I=E(I)}function ne(){var e=q.pop();if(null==e)return null;var t=e.move;n=e.kings,I=e.turn,L=e.castling,P=e.ep_square,R=e.half_moves,k=e.move_number;var o,i,a=I,f=E(I);if(r[t.from]=r[t.to],r[t.from].type=t.piece,r[t.to]=null,t.flags&s.CAPTURE)r[t.to]={type:t.captured,color:f};else if(t.flags&s.EP_CAPTURE){var u;u=a===C?t.to-16:t.to+16,r[u]={type:S,color:f}}return t.flags&(s.KSIDE_CASTLE|s.QSIDE_CASTLE)&&(t.flags&s.KSIDE_CASTLE?(o=t.to+1,i=t.to-1):t.flags&s.QSIDE_CASTLE&&(o=t.to-2,i=t.to+1),r[o]=r[i],r[i]=null),t}function te(e,r){for(var n=h(e),t=0;t<2;t++){if(1==t){if(!r)return null;var o=!1;if(l=n.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/)){var i=l[1],a=l[2],f=l[3],u=l[4];1==a.length&&(o=!0)}else{var l;(l=n.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/))&&(i=l[1],a=l[2],f=l[3],u=l[4],1==a.length&&(o=!0))}}for(var s=v(n),p=G({legal:!0,piece:i||s}),g=0,d=p.length;g<d;g++)switch(t){case 0:if(n===h(z(p[g],p)))return p[g];break;case 1:if(l){if(!(i&&i.toLowerCase()!=p[g].piece||c[a]!=p[g].from||c[f]!=p[g].to||u&&u.toLowerCase()!=p[g].promotion))return p[g];if(o){var E=b(p[g].from);if(!(i&&i.toLowerCase()!=p[g].piece||c[f]!=p[g].to||a!=E[0]&&a!=E[1]||u&&u.toLowerCase()!=p[g].promotion))return p[g]}}}}return null}function oe(e){var r=m(e);r.san=z(r,G({legal:!0})),r.to=b(r.to),r.from=b(r.from);var n="";for(var t in s)s[t]&r.flags&&(n+=T[t]);return r.flags=n,r}function ie(e){for(var r=G({legal:!1}),n=0,t=I,o=0,i=r.length;o<i;o++)re(r[o]),H(t)||(e-1>0?n+=ie(e-1):n++),ne();return n}return K(void 0===e?t:e),{load:function(e){return K(e)},reset:function(){return U()},moves:function(e){for(var r=G(e),n=[],t=0,o=r.length;t<o;t++)void 0!==e&&"verbose"in e&&e.verbose?n.push(oe(r[t])):n.push(z(r[t],G({legal:!0})));return n},in_check:function(){return J()},in_checkmate:function(){return V()},in_stalemate:function(){return X()},in_draw:function(){return R>=100||X()||Y()||ee()},insufficient_material:function(){return Y()},in_threefold_repetition:function(){return ee()},game_over:function(){return R>=100||V()||X()||Y()||ee()},validate_fen:function(e){return x(e)},fen:function(){return j()},board:function(){for(var e=[],n=[],t=c.a8;t<=c.h1;t++)null==r[t]?n.push(null):n.push({square:b(t),type:r[t].type,color:r[t].color}),t+1&136&&(e.push(n),n=[],t+=8);return e},pgn:function(e){var r="object"==typeof e&&"string"==typeof e.newline_char?e.newline_char:"\n",n="object"==typeof e&&"number"==typeof e.max_width?e.max_width:0,t=[],o=!1;for(var i in O)t.push("["+i+' "'+O[i]+'"]'+r),o=!0;o&&q.length&&t.push(r);for(var a=function(e){var r=N[j()];return void 0!==r&&(e=`${e}${e.length>0?" ":""}{${r}}`),e},f=[];q.length>0;)f.push(ne());var u=[],l="";for(0===f.length&&u.push(a(""));f.length>0;){l=a(l);var s=f.pop();q.length||"b"!==s.color?"w"===s.color&&(l.length&&u.push(l),l=k+"."):l=k+". ...",l=l+" "+z(s,G({legal:!0})),re(s)}if(l.length&&u.push(a(l)),void 0!==O.Result&&u.push(O.Result),0===n)return t.join("")+u.join(" ");var c=function(){return t.length>0&&" "===t[t.length-1]&&(t.pop(),!0)},p=function(e,o){for(var i of o.split(" "))if(i){if(e+i.length>n){for(;c();)e--;t.push(r),e=0}t.push(i),e+=i.length,t.push(" "),e++}return c()&&e--,e},v=0;for(i=0;i<u.length;i++)v+u[i].length>n&&u[i].includes("{")?v=p(v,u[i]):(v+u[i].length>n&&0!==i?(" "===t[t.length-1]&&t.pop(),t.push(r),v=0):0!==i&&(t.push(" "),v++),t.push(u[i]),v+=u[i].length);return t.join("")},load_pgn:function(e,r){var n=void 0!==r&&"sloppy"in r&&r.sloppy;function t(e){return e.replace(/\\/g,"\\")}e=e.trim();var i="object"==typeof r&&"string"==typeof r.newline_char?r.newline_char:"\r?\n",a=new RegExp("^(\\[((?:"+t(i)+")|.)*\\])(?:\\s*"+t(i)+"){2}"),f=a.test(e)?a.exec(e)[1]:"";U();var u=function(e,r){for(var n="object"==typeof r&&"string"==typeof r.newline_char?r.newline_char:"\r?\n",o={},i=e.split(new RegExp(t(n))),a="",f="",u=0;u<i.length;u++){var l=/^\s*\[([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;a=i[u].replace(l,"$1"),f=i[u].replace(l,"$2"),_(a).length>0&&(o[a]=f)}return o}(f,r),l="";for(var s in u)"fen"===s.toLowerCase()&&(l=u[s]),$([s,u[s]]);if(n){if(l&&!K(l,!0))return!1}else if(!("1"!==u.SetUp||"FEN"in u&&K(u.FEN,!0)))return!1;for(var c=function(e){return`{${function(e){return Array.from(e).map((function(e){return e.charCodeAt(0)<128?e.charCodeAt(0).toString(16):encodeURIComponent(e).replace(/\%/g,"").toLowerCase()})).join("")}((e=e.replace(new RegExp(t(i),"g")," ")).slice(1,e.length-1))}}`},p=function(e){if(e.startsWith("{")&&e.endsWith("}"))return function(e){return 0==e.length?"":decodeURIComponent("%"+e.match(/.{1,2}/g).join("%"))}(e.slice(1,e.length-1))},v=e.replace(f,"").replace(new RegExp(`({[^}]*})+?|;([^${t(i)}]*)`,"g"),(function(e,r,n){return void 0!==r?c(r):" "+c(`{${n.slice(1)}}`)})).replace(new RegExp(t(i),"g")," "),h=/(\([^\(\)]+\))+?/g;h.test(v);)v=v.replace(h,"");var g=_(v=(v=(v=v.replace(/\d+\.(\.\.)?/g,"")).replace(/\.\.\./g,"")).replace(/\$\d+/g,"")).split(new RegExp(/\s+/));g=g.join(",").replace(/,,+/g,",").split(",");for(var d="",b="",E=0;E<g.length;E++){var m=p(g[E]);if(void 0===m)if(null==(d=te(g[E],n))){if(!(o.indexOf(g[E])>-1))return!1;b=g[E]}else b="",re(d);else N[j()]=m}return b&&Object.keys(O).length&&!O.Result&&$(["Result",b]),!0},header:function(){return $(arguments)},turn:function(){return I},move:function(e,r){var n=void 0!==r&&"sloppy"in r&&r.sloppy,t=null;if("string"==typeof e)t=te(e,n);else if("object"==typeof e)for(var o=G(),i=0,a=o.length;i<a;i++)if(e.from===b(o[i].from)&&e.to===b(o[i].to)&&(!("promotion"in o[i])||e.promotion===o[i].promotion)){t=o[i];break}if(!t)return null;var f=oe(t);return re(t),f},undo:function(){var e=ne();return e?oe(e):null},clear:function(){return D()},put:function(e,r){return W(e,r)},get:function(e){return M(e)},ascii(){for(var e="   +------------------------+\n",n=c.a8;n<=c.h1;n++){if(0===d(n)&&(e+=" "+"87654321"[g(n)]+" |"),null==r[n])e+=" . ";else{var t=r[n].type;e+=" "+(r[n].color===y?t.toUpperCase():t.toLowerCase())+" "}n+1&136&&(e+="|\n",n+=8)}return(e+="   +------------------------+\n")+"     a  b  c  d  e  f  g  h"},remove:function(e){return function(e){var t=M(e);return r[c[e]]=null,t&&t.type===w&&(n[t.color]=A),B(j()),t}(e)},perft:function(e){return ie(e)},square_color:function(e){if(e in c){var r=c[e];return(g(r)+d(r))%2==0?"light":"dark"}return null},history:function(e){for(var r=[],n=[],t=(void 0!==e&&"verbose"in e&&e.verbose);q.length>0;)r.push(ne());for(;r.length>0;){var o=r.pop();t?n.push(oe(o)):n.push(z(o,G({legal:!0}))),re(o)}return n},get_comment:function(){return N[j()]},set_comment:function(e){N[j()]=e.replace("{","[").replace("}","]")},delete_comment:function(){var e=N[j()];return delete N[j()],e},get_comments:function(){return Q(),Object.keys(N).map((function(e){return{fen:e,comment:N[e]}}))},delete_comments:function(){return Q(),Object.keys(N).map((function(e){var r=N[e];return delete N[e],{fen:e,comment:r}}))}}}}}]);