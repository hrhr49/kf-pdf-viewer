(this["webpackJsonpkf-pdf-viewer"]=this["webpackJsonpkf-pdf-viewer"]||[]).push([[0],{22:function(e,t){},35:function(e,t,n){},46:function(e,t){},47:function(e,t){},48:function(e,t){},49:function(e,t){},50:function(e,t){},72:function(e,t,n){"use strict";n.r(t);n(34),n(35);var r=n(0),o=n.n(r),c=n(19),i=n.n(c);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var a=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,73)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),r(e),o(e),c(e),i(e)}))},u=n(3),l=n(21),s=n(4),d=n(5),f=n.n(d),b=n(6),p=n(10),h=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r,o,c,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.pdf,"string"!==typeof(r=t.outlineNode).dest){e.next=7;break}return e.next=4,n.getDestination(r.dest);case 4:o=e.sent,e.next=8;break;case 7:o=r.dest;case 8:if(o){e.next=10;break}throw Error("can not get destination: ".concat(o));case 10:return c=o[0],e.next=13,n.getPageIndex(c);case 13:return i=e.sent,e.abrupt("return",i+1);case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),j=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getTextContent();case 2:return n=e.sent,r=n.items.map((function(e){return e.str||""})).join(""),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),m=function(){var e=Object(b.a)(f.a.mark((function e(t){var n;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=new Array(t.numPages).fill(null).map(function(){var e=Object(b.a)(f.a.mark((function e(n,r){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=j,e.next=3,t.getPage(r+1);case 3:return e.t1=e.sent,e.abrupt("return",(0,e.t0)(e.t1));case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.next=3,Promise.all(n);case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=n(32),g=n(2),x={margin:"3px 5px",padding:"1px 3px",backgroundColor:"#f9f9f9",border:"1px solid #aaa",borderRadius:"2px",boxShadow:"1px 2px 2px #ddd",fontSize:"0.85em"},v=function(e){var t=e.keys,n=null===t?[]:"string"===typeof t?[t]:t;return Object(g.jsx)(g.Fragment,{children:n.map((function(e){return Object(g.jsx)("span",{style:x,children:e},e)}))})},k=function(e){var t=e.text,n=e.matchedIndexes,r=new Set(n);return Object(g.jsx)(g.Fragment,{children:t.split("").map((function(e,t){var n=r.has(t),o={color:n?"coral":"#333",fontWeight:n?"bold":"normal"};return Object(g.jsx)("span",{style:o,children:e},t)}))})},w=n(11),y=n.n(w),C=function(e){var t=Object(r.useState)(e),n=Object(u.a)(t,2),o=n[0],c=n[1];return[o,{set:c,on:Object(r.useCallback)((function(){c(!0)}),[]),off:Object(r.useCallback)((function(){c(!1)}),[]),toggle:Object(r.useCallback)((function(){c((function(e){return!e}))}),[])}]},S=n(27),P=function e(){var t=this;Object(S.a)(this,e),this.promise=void 0,this._resolve=void 0,this._reject=void 0,this.resolve=function(e){return t._resolve(e)},this.reject=function(e){return t._reject(e)},this._resolve=function(){throw Error("_resolve is not initialized yet")},this._reject=function(){throw Error("_reject is not initialized yet")},this.promise=new Promise((function(e,n){t._resolve=e,t._reject=n}))},I=n(13),z=n.n(I),R=(n(63),function(e){var t=e.keybindings,n=e.commandCallbacks,o=e.commands,c=e.bindGlobal,i=void 0!==c&&c,a=e.enabled,u=void 0===a||a,l=e.onBeforeCommand,s=e.onAfterCommand,d=Object(r.useRef)(n);d.current=n,Object(r.useEffect)((function(){if(u)return o.forEach((function(e){var n=t[e];n&&(i?z.a.bindGlobal(n,(function(t){var n,r;t.preventDefault(),null===l||void 0===l||l(e),null===(n=(r=d.current)[e])||void 0===n||n.call(r),null===s||void 0===s||s(e)})):z.a.bind(n,(function(t){var n,r;t.preventDefault(),null===l||void 0===l||l(e),null===(n=(r=d.current)[e])||void 0===n||n.call(r),null===s||void 0===s||s(e)})))})),function(){o.forEach((function(e){var n=t[e];n&&z.a.unbind(n)}))}}),[t,u,i,o,l,s])}),E={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",width:"80%",height:"80%",overflow:"hidden",padding:"3px",boxSizing:"border-box"}},T={margin:0,padding:"2px 8px",boxSizing:"border-box",color:"#333"},F={width:"100%",margin:0,padding:"4px 8px",fontSize:"1.2em",boxSizing:"border-box",border:"solid 2px orange",color:"#333"},L={width:"100%",listStyleType:"none",margin:0,padding:0,color:"#333"},Q={width:"100%",padding:0,margin:0,borderBottom:"1px solid #aaa",boxSizing:"border-box",color:"#333"},B=function(e){var t=e.title,n=e.placeHolder,r=e.isOpen,o=e.items,c=e.selectedIndex,i=e.onClose,a=e.onTextChange,u=e.onMouseDownOutside,l=e.renderItem,s=e.parentSelector;return Object(g.jsx)("div",{onMouseDown:u,children:Object(g.jsxs)(y.a,{isOpen:r,onRequestClose:i,style:E,contentLabel:"Command Palette",parentSelector:s,children:[t&&Object(g.jsx)("div",{style:T,children:t}),Object(g.jsx)("input",{autoFocus:!0,onChange:a,type:"text",placeholder:n,style:F}),Object(g.jsx)("ul",{style:L,children:o.map((function(e,t){return Object(g.jsx)("li",{style:Q,children:l(e,t===c)},"".concat(e.name))}))})]})})},H=o.a.memo(B),M=["cancelQuickPick","selectItemQuickPick","nextItemQuickPick","previousItemQuickPick"],D={cancelQuickPick:"esc",selectItemQuickPick:"enter",nextItemQuickPick:"down",previousItemQuickPick:"up"},N=function(e){var t=e.renderItem,n=e.textFilter,o=Object(r.createContext)({isOpen:!1,showQuickPick:function(){throw Error("QuickPickGlobals is not initialized yet")},cancelQuickPick:function(){throw Error("QuickPickGlobals is not initialized yet")},selectItemQuickPick:function(){throw Error("QuickPickGlobals is not initialized yet")},nextItemQuickPick:function(){throw Error("QuickPickGlobals is not initialized yet")},previousItemQuickPick:function(){throw Error("QuickPickGlobals is not initialized yet")}});return{QuickPickContext:o,QuickPickProvider:function(e){var c=e.parentSelector,i=e.modalAppElement,a=void 0===i?"#root":i,l=e.children;y.a.setAppElement(a);var d=Object(r.useRef)(null),f=Object(r.useState)([]),b=Object(u.a)(f,2),p=b[0],h=b[1],j=Object(r.useState)(""),m=Object(u.a)(j,2),O=m[0],x=m[1],v=Object(r.useState)(""),k=Object(u.a)(v,2),w=k[0],S=k[1],I=function(e){var t=e.items,n=e.textFilter,o=Object(r.useState)(""),c=Object(u.a)(o,2),i=c[0],a=c[1],l=Object(r.useState)(0),s=Object(u.a)(l,2),d=s[0],f=s[1],b=C(!1),p=Object(u.a)(b,2),h=p[0],j=p[1],m=j.on,O=j.off,g=Object(r.useState)([]),x=Object(u.a)(g,2),v=x[0],k=x[1],w=Object(r.useCallback)((function(){a(""),f(0),m()}),[m]),y=Object(r.useCallback)((function(){a(""),f(0),O()}),[O]),S=Object(r.useCallback)((function(){h?y():w()}),[h,w,y]),P=Object(r.useCallback)((function(){var e,t,n=null!==(e=null===(t=v[d])||void 0===t?void 0:t.content)&&void 0!==e?e:null;return y(),n}),[d,v,y]),I=Object(r.useCallback)((function(e){a(e),f(0)}),[]),z=Object(r.useCallback)((function(){f((function(e){return Math.min(e+1,v.length-1)}))}),[v]),R=Object(r.useCallback)((function(){f((function(e){return Math.max(0,e-1)}))}),[]);return Object(r.useEffect)((function(){var e=[];t.forEach((function(t){var r=n(i,t.name);null!==r&&e.push({name:t.name,matchedIndexes:r,content:t})})),k(e)}),[i,h,t,n]),{isOpen:h,open:w,close:y,toggle:S,nextItem:z,previousItem:R,select:P,chanegeInputText:I,matchedItems:v,selectedIndex:d}}({items:p,textFilter:n}),z=I.isOpen,E=I.open,T=I.close,F=I.nextItem,L=I.previousItem,Q=I.select,B=I.chanegeInputText,N=I.matchedItems,A=I.selectedIndex,U=Object(r.useCallback)((function(e){B(e.target.value)}),[B]),G=Object(r.useCallback)((function(e,t){var n=t||{},r=n.placeHolder,o=void 0===r?"":r,c=n.title,i=void 0===c?"":c;x(o),S(i),h(e);var a=new P;return d.current=a,E(),a.promise}),[E]),W=Object(r.useCallback)((function(){var e;T(),null===(e=d.current)||void 0===e||e.resolve(null)}),[T]),_=Object(r.useCallback)((function(){var e;console.log("selectItemQuickPick");var t=Q();null===(e=d.current)||void 0===e||e.resolve(t)}),[Q]),$=Object(r.useMemo)((function(){return console.log("updated callbacks"),{cancelQuickPick:W,selectItemQuickPick:_,nextItemQuickPick:F,previousItemQuickPick:L}}),[W,_,F,L]);R({keybindings:D,commandCallbacks:$,commands:M,bindGlobal:!0,enabled:z});var q=Object(s.a)({isOpen:z,showQuickPick:G},$);return Object(g.jsxs)(o.Provider,{value:q,children:[z&&Object(g.jsx)(H,{title:w,placeHolder:O,isOpen:z,items:N,selectedIndex:A,onClose:W,onTextChange:U,onMouseDownOutside:W,renderItem:t,parentSelector:c}),l]})}}},A=n(28),U={substringFilter:function(e,t){var n=t.indexOf(e);return n>=0?Array(e.length).fill(0).map((function(e,t){return t+n})):null},regexFilter:function(e,t){try{var n=t.match(e);if(n){var r=n[0],o=n.index;return void 0===o?null:Array(r.length).fill(0).map((function(e,t){return t+o}))}return null}catch(c){return null}},fuzzyFilter:function(e,t){var n,r=[],o=0,c=Object(A.a)(e);try{for(c.s();!(n=c.n()).done;){var i=n.value;if((o=t.indexOf(i,o))<0)return null;r.push(o),o++}}catch(a){c.e(a)}finally{c.f()}return r}},G=function(e,t){var n=(null!==t&&void 0!==t?t:{}).ignoreCase,r=void 0!==n&&n;return function(t,n){return r&&(t=t.toLowerCase(),n=n.toLowerCase()),U[e](t,n)}},W={backgroundColor:"white",width:"100%",height:"100%",margin:0,padding:"4px 8px",boxSizing:"border-box"},_=Object(s.a)(Object(s.a)({},W),{},{backgroundColor:"#ddd"}),$=N({renderItem:function(e,t){var n=e.name,r=e.matchedIndexes,o=e.content;return Object(g.jsxs)("div",{style:t?_:W,children:[Object(g.jsx)(k,{text:n,matchedIndexes:r}),Object(g.jsx)(v,{keys:o.keys})]})},textFilter:G("fuzzyFilter",{ignoreCase:!0})}),q=$.QuickPickContext,K=$.QuickPickProvider,J={backgroundColor:"white",width:"100%",height:"100%",margin:0,padding:"4px 8px",boxSizing:"border-box"},Z=Object(s.a)(Object(s.a)({},J),{},{backgroundColor:"#ddd"}),V=N({renderItem:function(e,t){var n=e.name,r=e.matchedIndexes;return Object(g.jsx)("div",{style:t?Z:J,children:Object(g.jsx)(k,{text:n,matchedIndexes:r})})},textFilter:G("fuzzyFilter",{ignoreCase:!0})}),X=V.QuickPickContext,Y=V.QuickPickProvider,ee={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",width:"80%",height:"20%",overflow:"hidden",padding:"3px",boxSizing:"border-box"}},te={margin:0,padding:"2px 8px",boxSizing:"border-box",color:"#333"},ne={width:"100%",margin:0,padding:"4px 8px",fontSize:"1.2em",boxSizing:"border-box",border:"solid 2px orange",color:"#333"},re=function(e){var t=e.prompt,n=e.placeHolder,r=e.isOpen,o=e.onClose,c=e.onTextChange,i=e.onMouseDownOutside,a=e.parentSelector;return Object(g.jsx)("div",{onMouseDown:i,children:Object(g.jsxs)(y.a,{isOpen:r,onRequestClose:o,style:ee,contentLabel:"Input Box",parentSelector:a,children:[Object(g.jsx)("input",{autoFocus:!0,onChange:c,type:"text",placeholder:n,style:ne}),t&&Object(g.jsx)("div",{style:te,children:t})]})})},oe=["cancelInputBox","confirmInputBox"],ce={cancelInputBox:"esc",confirmInputBox:"enter"},ie=function(){var e=Object(r.createContext)({isOpen:!1,showInputBox:function(){throw Error("InputBoxGlobals is not initialized yet")},cancelInputBox:function(){throw Error("InputBoxGlobals is not initialized yet")},confirmInputBox:function(){throw Error("InputBoxGlobals is not initialized yet")}});return{InputBoxContext:e,InputBoxProvider:function(t){var n=t.parentSelector,o=t.modalAppElement,c=void 0===o?"#root":o,i=t.children;y.a.setAppElement(c);var a=Object(r.useRef)(null),l=Object(r.useState)(""),s=Object(u.a)(l,2),d=s[0],f=s[1],b=Object(r.useState)(""),p=Object(u.a)(b,2),h=p[0],j=p[1],m=Object(r.useState)(""),O=Object(u.a)(m,2),x=O[0],v=O[1],k=C(!1),w=Object(u.a)(k,2),S=w[0],I=w[1],z=I.on,E=I.off,T=Object(r.useCallback)((function(){z(),v("")}),[z]),F=Object(r.useCallback)((function(){E()}),[E]),L=Object(r.useCallback)((function(e){v(e.target.value)}),[]),Q=function(){var e;F(),null===(e=a.current)||void 0===e||e.resolve(null)},B=function(){var e;F(),null===(e=a.current)||void 0===e||e.resolve(x)};R({keybindings:ce,commandCallbacks:{cancelInputBox:Q,confirmInputBox:B},commands:oe,bindGlobal:!0,enabled:S});var H={isOpen:S,showInputBox:function(e){var t=e||{},n=t.placeHolder,r=void 0===n?"":n,o=t.prompt,c=void 0===o?"":o;f(r),j(c);var i=new P;return a.current=i,T(),i.promise},cancelInputBox:Q,confirmInputBox:B};return Object(g.jsxs)(e.Provider,{value:H,children:[S&&Object(g.jsx)(re,{prompt:h,placeHolder:d,isOpen:S,onClose:Q,onTextChange:L,onMouseDownOutside:Q,parentSelector:n}),i]})}}}(),ae=ie.InputBoxContext,ue=ie.InputBoxProvider,le=n(33),se={position:"fixed",top:0,left:0,width:"100%",height:"100%"},de=function(e){var t=e.onDropFile,n=e.children,r=e.accept,o=Object(le.a)({noKeyboard:!0,noClick:!0,maxFiles:1,onDrop:function(e){t(e[0])},accept:r}),c=o.getRootProps,i=o.getInputProps;return Object(g.jsxs)("div",Object(s.a)(Object(s.a)({},c({onClick:function(e){return e.stopPropagation()}})),{},{style:se,children:[Object(g.jsx)("input",Object(s.a)({},i())),n]}))},fe=["doNothing"].concat(["fullScreenOn","fullScreenOff","fullScreenToggle"],["showInfoOn","showInfoOff","showInfoToggle"],["prevPage","nextPage","firstPage","lastPage","goToPage"],["zoomReset","zoomIn","zoomOut","zoomFitWidth","zoomFitHeight"],["scrollLeft","scrollRight","scrollUp","scrollDown","scrollHalfPageDown","scrollHalfPageUp","scrollTop","scrollBottom","scrollReset"],["rotateRight","rotateLeft"],["colorInvert","invertColorRateUp","invertColorRateDown"],["sidebarToggle"],["goToOutline","goToOutlineRecursive"],["search","searchNext","searchPrev","pickSearchList","highlightToggle"],["forwardPageHistory","backwardPageHistory"],["commandPaletteOpen"]),be=function(e){return e.replace(/^(\w)/,(function(e){return e.toUpperCase()})).replace(/([a-z])([A-Z])/g,"$1 $2").replace(/([a-zA-Z])(\d)/g,"$1 $2").replace(/(\d)([a-zA-Z])/g,"$1 $2")},pe={padding:"0px 40px",background:"white",width:"100%",height:"100%",overflow:"scroll"},he={borderCollapse:"collapse"},je={backgroundColor:"#777",color:"#eee",border:"1px solid #ddd",padding:"4px"},me={padding:"4px"},Oe={padding:"4px"},ge={padding:"4px"},xe=function(e){var t=e.keybindings;return Object(g.jsxs)("div",{style:pe,children:[Object(g.jsx)("h3",{children:"How to Use"}),Object(g.jsxs)("ul",{children:[Object(g.jsxs)("li",{children:["command palette: ",Object(g.jsx)(v,{keys:t.commandPaletteOpen})]}),Object(g.jsx)("li",{children:"load File: drag and drop PDF file here."})]}),Object(g.jsx)("h3",{children:"Keybindings"}),Object(g.jsxs)("table",{style:he,children:[Object(g.jsx)("thead",{style:je,children:Object(g.jsxs)("tr",{children:[Object(g.jsx)("th",{style:me,children:"command"}),Object(g.jsx)("th",{style:me,children:"keybord shortcuts"})]})}),Object(g.jsx)("tbody",{children:fe.map((function(e,n){return Object(g.jsxs)("tr",{style:Object(s.a)(Object(s.a)({},Oe),{},{backgroundColor:n%2===0?"#eee":"#fff"}),children:[Object(g.jsx)("td",{style:ge,children:be(e)}),Object(g.jsx)("td",{style:ge,children:Object(g.jsx)(v,{keys:t[e]})})]},e)}))})]})]})},ve=Object(r.memo)(p.b),ke={position:"fixed",zIndex:999},we=function(e){var t=e.onItemClick,n=e.onLoadSuccess,r=e.isOpen;return Object(g.jsx)("div",{style:Object(s.a)(Object(s.a)({},ke),{},{display:r?"block":"none"}),children:Object(g.jsx)(ve,{onItemClick:t,onLoadSuccess:n})})},ye=n(20),Ce=Object(r.memo)(p.c),Se=function(e,t){var n=e.split(t);if(n.length<=1)return e;var r=e.match(t);return n.reduce((function(e,t,n){return r&&r[n]?[].concat(Object(ye.a)(e),[t,Object(g.jsx)("span",{style:{background:"rgba(255, 0, 0, 0.3)"},children:r[n]},n)]):[].concat(Object(ye.a)(e),[t])}),[])},Pe=function(e){var t=e.index,n=e.style,o=e.data,c=o.scale,i=o.rotate,a=o.isKeywordHighlighted,u=o.keyword,l=o.paddingSize,d=o.isScrolling,f=o.pageWidth,b=Object(r.useCallback)((function(e){var t=e.str;return Object(g.jsx)(g.Fragment,{children:Se(t,u)})}),[u]);return console.log(n),Object(g.jsx)("div",{style:Object(s.a)(Object(s.a)({},n),{},{top:"".concat(parseFloat(n.top)+l,"px")}),children:Object(g.jsx)("div",{style:{width:"".concat(f,"px"),margin:"auto"},children:Object(g.jsx)(Ce,{pageNumber:t+1,scale:c,rotate:i,customTextRenderer:a?b:void 0,onLoadError:Object(r.useCallback)((function(e){return console.error("Error while loading page! "+e.message)}),[]),onRenderError:Object(r.useCallback)((function(e){return console.error("Error while loading page! "+e.message)}),[]),onGetTextError:Object(r.useCallback)((function(e){return console.error("Error while loading text layer items! "+e.message)}),[]),renderTextLayer:!d,renderAnnotationLayer:!1,renderInteractiveForms:!1})})})},Ie=n(30),ze=(function(){var e={anyOf:[{type:"null"},{type:"string"},{type:"array",items:[{type:"string"},{type:"string"}]}]},t={$schema:"http://json-schema.org/draft-04/schema#",type:"object",additionalProperties:!1,properties:{},required:[]};fe.forEach((function(n){t.properties[n]=e}))}(),new Ie.Validator,{doNothing:null,fullScreenOn:null,fullScreenOff:null,fullScreenToggle:"f",showInfoOn:null,showInfoOff:null,showInfoToggle:"s",prevPage:["shift+space","pageup"],nextPage:["space","pagedown"],firstPage:["g","ctrl+home"],lastPage:["G","ctrl+end"],goToPage:["ctrl+g","command+g"],zoomReset:"=",zoomIn:"+",zoomOut:"-",zoomFitWidth:"w",zoomFitHeight:"e",scrollLeft:"h",scrollRight:"l",scrollUp:"k",scrollDown:"j",scrollHalfPageDown:"d",scrollHalfPageUp:"u",scrollTop:["home","z t"],scrollBottom:["end","z b"],scrollReset:"M",rotateRight:">",rotateLeft:"<",colorInvert:"i",invertColorRateUp:")",invertColorRateDown:"(",highlightToggle:"#",sidebarToggle:"b",goToOutline:"o",goToOutlineRecursive:"O",search:"/",searchNext:"n",searchPrev:"N",pickSearchList:null,forwardPageHistory:"L",backwardPageHistory:"H",commandPaletteOpen:[":","command+shift+p","ctrl+shift+p"]}),Re=[],Ee=function(e){void 0!==e.id&&cancelAnimationFrame(e.id)},Te=function(e,t){if(!(Re.length>0)){var n=function(e){var t={};return t.id=requestAnimationFrame((function n(){e(),t.id=requestAnimationFrame(n)})),t}((function(){e.scrollBy(t)}));Re.push(n)}},Fe=function(e){var t=e.fullScreenCommandCallbacks,n=e.height,o=e.width,c=e.paddingSize,i=void 0===c?5:c,a=e.scrollStep,l=void 0===a?25:a,d=e.scrollHalfPageStep,j=void 0===d?60:d,x=e.scaleMax,v=void 0===x?4:x,k=e.scaleMin,w=void 0===k?.1:k,y=e.scaleStep,C=void 0===y?.1:y,S=e.invertColorRateStep,P=void 0===S?.05:S,I=Object(r.useState)(null),z=Object(u.a)(I,2),E=z[0],T=z[1],F=Object(r.useState)(null),L=Object(u.a)(F,2),Q=L[0],B=L[1],H=Object(r.useState)(ze),M=Object(u.a)(H,1)[0],D=Object(r.useState)(""),N=Object(u.a)(D,2),A=N[0],U=N[1],G=Object(r.useState)(0),W=Object(u.a)(G,2),_=W[0],$=W[1],K=Object(r.useState)(0),J=Object(u.a)(K,2),Z=J[0],V=J[1],Y=Object(r.useState)(1),ee=Object(u.a)(Y,2),te=ee[0],ne=ee[1],re=Object(r.useState)(500),oe=Object(u.a)(re,2),ce=oe[0],ie=oe[1],ue=Object(r.useState)(1e3),le=Object(u.a)(ue,2),se=le[0],pe=le[1],he=Object(r.useState)(!1),je=Object(u.a)(he,2),me=je[0],Oe=je[1],ge=Object(r.useState)(!1),ve=Object(u.a)(ge,2),ke=ve[0],ye=ve[1],Ce=Object(r.useState)(1),Se=Object(u.a)(Ce,2),Ie=Se[0],Fe=Se[1],Le=Object(r.useState)(false),Qe=Object(u.a)(Le,2),Be=Qe[0],He=Qe[1],Me=Object(r.useState)(!1),De=Object(u.a)(Me,2),Ne=De[0],Ae=De[1],Ue=Object(r.useState)(0),Ge=Object(u.a)(Ue,2),We=Ge[0],_e=Ge[1],$e=Object(r.useState)(""),qe=Object(u.a)($e,2),Ke=qe[0],Je=qe[1],Ze=Object(r.useState)(!0),Ve=Object(u.a)(Ze,2),Xe=Ve[0],Ye=Ve[1],et=Object(r.useState)([]),tt=Object(u.a)(et,2),nt=tt[0],rt=tt[1],ot=Object(r.useState)(new Set([])),ct=Object(u.a)(ot,2),it=ct[0],at=ct[1],ut=Object(r.useRef)(null),lt=Object(r.useRef)(null),st=function(e){lt.current&&(Te(lt.current,e),Ae(!0))},dt=Object(r.useRef)(null),ft=Object(r.useRef)(null),bt=Object(r.useContext)(q),pt=Object(r.useContext)(X),ht=Object(r.useContext)(ae),jt=[bt,pt,ht].every((function(e){return e.isOpen})),mt=function(){var e=Object(r.useState)(-1),t=Object(u.a)(e,2),n=t[0],o=t[1];return Object(r.useEffect)((function(){var e=function(e){if("0123456789".includes(e.key)){var t=Number(e.key);o((function(e){return Math.min(10*Math.max(e,0)+t,999)}))}},t=function(e){"0123456789".includes(e.key)||o(-1)};return document.addEventListener("keypress",e),document.addEventListener("keyup",t),function(){document.removeEventListener("keypress",e),document.removeEventListener("keyup",t)}}),[]),[n,function(){o(-1)}]}(),Ot=Object(u.a)(mt,2),gt=Ot[0],xt=Ot[1],vt=Math.max(gt,1),kt=Z/90%2===0?se*te:ce*te,wt=Z/90%2===0?ce*te:se*te,yt=kt+i,Ct=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r,o,c,i;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.outline,o=t.recursive,E&&r&&!jt){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,pt.showQuickPick(r.map((function(e){return{name:e.title,content:e}})));case 5:if(c=e.sent){e.next=8;break}return e.abrupt("return");case 8:if(!o||!(null===(n=c.content.items)||void 0===n?void 0:n.length)){e.next=12;break}Ct({outline:c.content.items,recursive:!0}),e.next=16;break;case 12:return e.next=14,h({pdf:E,outlineNode:c.content});case 14:i=e.sent,zt(i);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),St=function(){var e=Object(b.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(E&&!jt&&0!==nt.length){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,ht.showInputBox({prompt:"input word to search"});case 4:e.sent&&((t=nt.map((function(e,t){return e.includes(Ke)?t+1:-1})).filter((function(e){return e>0}))).length>0?(Je(Ke),at(new Set(t))):alert("can not find keyword: ".concat(Ke)));case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Pt=function(){var e=Object(b.a)(f.a.mark((function e(t){var n,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(r=It+(n={forward:1,backward:-1}[t]);1<=r&&r<=_&&!it.has(r);)r+=n;r<1||r>_?alert("can not find next search result"):zt(r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(r.useEffect)((function(){var e=function(){!function(){for(;;){var e=Re.pop();if(!e)break;Ee(e)}}(),Ae(!1)};return document.addEventListener("keyup",e),function(){document.removeEventListener("keyup",e)}}),[Ae]);var It=Math.floor((We+n/2)/yt)+1,zt=function(e){var t;Number.isInteger(e)&&(e<0&&(e+=_+1),e=Math.max(1,Math.min(_,e)),null===(t=ut.current)||void 0===t||t.scrollToItem(e-1))},Rt=_*yt+i-n,Et=function(){return alert("sorry not implemented yet")},Tt=Object(s.a)(Object(s.a)({doNothing:function(){}},t),{},{showInfoOn:function(){return He(!0)},showInfoOff:function(){return He(!1)},showInfoToggle:function(){return He(!Be)},prevPage:function(){var e;return null===(e=ut.current)||void 0===e?void 0:e.scrollTo(Math.max(0,We-vt*yt))},nextPage:function(){var e;return null===(e=ut.current)||void 0===e?void 0:e.scrollTo(Math.min(Rt,We+vt*yt))},firstPage:function(){return zt(vt)},lastPage:function(){return zt(gt>=1?gt:-1)},goToPage:function(){var e=Object(b.a)(f.a.mark((function e(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!jt){e.next=2;break}return e.abrupt("return");case 2:return e.t0=zt,e.t1=Number,e.next=6,ht.showInputBox({prompt:"input page number to go"});case 6:e.t2=e.sent,e.t3=(0,e.t1)(e.t2),(0,e.t0)(e.t3);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),zoomReset:function(){return ne(1)},zoomIn:function(){return ne(Math.min(te+vt*C,v))},zoomOut:function(){return ne(Math.max(te-vt*C,w))},zoomFitWidth:function(){return ne(o/(wt/te))},zoomFitHeight:function(){return ne(n/(kt/te))},scrollLeft:function(){return st({left:-l})},scrollRight:function(){return st({left:l})},scrollUp:function(){return st({top:-l})},scrollDown:function(){return st({top:l})},scrollHalfPageUp:function(){return st({top:-j})},scrollHalfPageDown:function(){return st({top:j})},scrollTop:function(){var e;return null===(e=ut.current)||void 0===e?void 0:e.scrollTo(i+yt*(It-1))},scrollBottom:function(){var e;return null===(e=ut.current)||void 0===e?void 0:e.scrollTo(i-n+yt*It)},scrollReset:Et,rotateRight:function(){return V((Z+90)%360)},rotateLeft:function(){return V((Z+360-90)%360)},colorInvert:function(){return ye(!ke)},invertColorRateUp:function(){return Fe(Math.min(Ie+vt*P,1))},invertColorRateDown:function(){return Fe(Math.max(Ie-vt*P,0))},search:St,searchNext:function(){return Pt("forward")},searchPrev:function(){return Pt("backward")},pickSearchList:Et,highlightToggle:function(){return Ye(!Xe)},goToOutline:function(){return Ct({outline:Q,recursive:!1})},goToOutlineRecursive:function(){return Ct({outline:Q,recursive:!0})},sidebarToggle:function(){return Oe(!me)},forwardPageHistory:Et,backwardPageHistory:Et,commandPaletteOpen:function(){var e=Object(b.a)(f.a.mark((function e(){var t,n,r,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!jt){e.next=2;break}return e.abrupt("return");case 2:return t=fe.map((function(e){return{name:be(e),command:e,keys:M[e]}})),e.next=5,bt.showQuickPick(t);case 5:(null===(n=e.sent)||void 0===n?void 0:n.command)&&(null===(r=ft.current)||void 0===r||null===(o=r[n.command])||void 0===o||o.call(r));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()});ft.current=Tt,R({keybindings:M,commandCallbacks:Tt,commands:fe,onAfterCommand:xt});var Ft={scale:te,rotate:Z,isKeywordHighlighted:Xe,keyword:Ke,paddingSize:i,isScrolling:Ne,pageWidth:wt};return A?Object(g.jsx)(de,{onDropFile:function(e){return U(URL.createObjectURL(e))},children:Object(g.jsxs)("div",{style:{background:"gray",filter:ke?"invert(".concat(Ie,")"):""},children:[Object(g.jsxs)(p.a,{inputRef:dt,file:A,onLoadSuccess:function(e){T(e),$(e.numPages),Object(b.a)(f.a.mark((function t(){var n,r,o,c,i,a;return f.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getPage(1);case 2:return n=t.sent,r=Object(u.a)(n.view,4),o=r[0],c=r[1],i=r[2],a=r[3],ie(i-o),pe(a-c),t.t0=rt,t.next=9,m(e);case 9:t.t1=t.sent,(0,t.t0)(t.t1);case 11:case"end":return t.stop()}}),t)})))()},options:{cMapUrl:"cmaps/",cMapPacked:!0},loading:Object(g.jsx)("div",{children:"loading..."}),onItemClick:function(e){var t=e.pageNumber;zt(Number(t))},children:[Object(g.jsx)(we,{onItemClick:function(e){var t=e.pageNumber;zt(Number(t))},onLoadSuccess:function(e){B(e)},isOpen:me}),Object(g.jsx)(O.a,{height:n,itemCount:_,itemSize:yt,width:o,overscanCount:2,itemData:Ft,onScroll:function(e){var t=e.scrollOffset;return _e(t)},ref:ut,outerRef:lt,children:Pe})]}),Be&&Object(g.jsx)("div",{style:{position:"fixed",top:0,left:0,backgroundColor:"rgba(255, 255, 255, 0.5)"},children:Object(g.jsx)("pre",{children:Object(g.jsxs)("code",{children:["state = ",JSON.stringify({url:A,height:n,width:o,page:"".concat(It,"/").concat(_),scale:te,pageWidthRaw:ce,pageHeightRaw:se,pageHeight:kt,isSidebarOpen:me,pdfLoaded:null!==E,scrollOffset:We,isColorInverted:ke,invertColorRate:Ie,rotate:Z,repeatCount:gt},null,"  ")]})})})]})}):Object(g.jsx)(de,{onDropFile:function(e){return U(URL.createObjectURL(e))},children:Object(g.jsx)(xe,{keybindings:M})})},Le=n(31),Qe=function(){var e=Object(r.useRef)(null),t=Object(r.useState)(!1),n=Object(u.a)(t,2),o=n[0],c=n[1],i=Object(r.useState)(document.documentElement.clientWidth),a=Object(u.a)(i,2),s=a[0],d=a[1],f=Object(r.useState)(document.documentElement.clientHeight),b=Object(u.a)(f,2),p=b[0],h=b[1];Object(r.useEffect)((function(){var e=Object(Le.a)(250,(function(){d(document.documentElement.clientWidth),h(document.documentElement.clientHeight)}));return window.addEventListener("resize",e),function(){window.removeEventListener("resize",e)}}),[]);var j=Object(l.b)(),m=Object(r.useCallback)((function(){o||j.enter()}),[o,j]),O=Object(r.useCallback)((function(){o&&j.exit()}),[o,j]),x=Object(r.useCallback)((function(){o?j.exit():j.enter()}),[o,j]),v=o?{width:"100%",height:"100%"}:{width:s,height:p},k=function(){return e.current?e.current:document.body},w={fullScreenOn:m,fullScreenOff:O,fullScreenToggle:x};return Object(g.jsx)(l.a,{handle:j,onChange:c,children:Object(g.jsx)("div",{ref:e,children:Object(g.jsx)(K,{parentSelector:k,children:Object(g.jsx)(Y,{parentSelector:k,children:Object(g.jsx)(ue,{parentSelector:k,children:Object(g.jsx)("div",{style:v,children:Object(g.jsx)(Fe,{fullScreenCommandCallbacks:w,height:p,width:s})})})})})})})};i.a.render(Object(g.jsx)(o.a.StrictMode,{children:Object(g.jsx)(Qe,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),a()}},[[72,1,2]]]);
//# sourceMappingURL=main.5bf5ff9f.chunk.js.map