(function(e){function t(t){for(var o,c,i=t[0],l=t[1],d=t[2],u=0,p=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&p.push(a[c][0]),a[c]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);s&&s(t);while(p.length)p.shift()();return r.push.apply(r,d||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,i=1;i<n.length;i++){var l=n[i];0!==a[l]&&(o=!1)}o&&(r.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},a={app:0},r=[];function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/context-ui/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var d=0;d<i.length;d++)t(i[d]);var s=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"5d4e":function(e,t,n){"use strict";n("9f39")},"9f39":function(e,t,n){},bcc7:function(e,t,n){},c791:function(e,t,n){"use strict";n("bcc7")},cd49:function(e,t,n){"use strict";n.r(t);var o=n("5530"),a=n("d4ec"),r=n("bee2"),c=n("ade3"),i=(n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("7a23")),l=(n("a4d3"),n("e01a"),Object(i["createVNode"])("nav",{class:"navbar navbar-expand-lg navbar-light bg-light"},[Object(i["createVNode"])("div",{class:"container-fluid"},[Object(i["createVNode"])("a",{class:"navbar-brand",href:"#"},"Context UI"),Object(i["createVNode"])("div",{class:"collapse navbar-collapse",id:"navbarSupportedContent"},[Object(i["createVNode"])("ul",{class:"navbar-nav me-auto mb-2 mb-lg-0"},[Object(i["createVNode"])("li",{class:"nav-item dropdown"},[Object(i["createVNode"])("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," File "),Object(i["createVNode"])("ul",{class:"dropdown-menu","aria-labelledby":"navbarDropdown"},[Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Another action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("hr",{class:"dropdown-divider"})]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Something else here")])])]),Object(i["createVNode"])("li",{class:"nav-item dropdown"},[Object(i["createVNode"])("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," View "),Object(i["createVNode"])("ul",{class:"dropdown-menu","aria-labelledby":"navbarDropdown"},[Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Another action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("hr",{class:"dropdown-divider"})]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Something else here")])])]),Object(i["createVNode"])("li",{class:"nav-item dropdown"},[Object(i["createVNode"])("a",{class:"nav-link dropdown-toggle",href:"#",id:"navbarDropdown",role:"button","data-bs-toggle":"dropdown","aria-expanded":"false"}," Examples "),Object(i["createVNode"])("ul",{class:"dropdown-menu","aria-labelledby":"navbarDropdown"},[Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Another action")]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("hr",{class:"dropdown-divider"})]),Object(i["createVNode"])("li",null,[Object(i["createVNode"])("a",{class:"dropdown-item",href:"#"},"Something else here")])])])]),Object(i["createVNode"])("form",{class:"d-flex"},[Object(i["createVNode"])("input",{class:"form-control me-2",type:"search",placeholder:"Search","aria-label":"Search"}),Object(i["createVNode"])("button",{class:"btn btn-outline-success",type:"submit"},"Search")])])])],-1)),d={class:"content"};function s(e,t,n,o,a,r){var c=Object(i["resolveComponent"])("Editor"),s=Object(i["resolveComponent"])("pane"),u=Object(i["resolveComponent"])("Diagram"),p=Object(i["resolveComponent"])("splitpanes"),h=Object(i["resolveComponent"])("Markdown");return Object(i["openBlock"])(),Object(i["createBlock"])(i["Fragment"],null,[l,Object(i["createVNode"])("div",d,[Object(i["createVNode"])(p,{horizontal:"",class:"custom-theme default-theme"},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(s,null,{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(p,null,{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(s,null,{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(c,{contextMapYaml:e.contextMapYaml,onOnContextMapChanges:e.handleContextMapChanged},null,8,["contextMapYaml","onOnContextMapChanges"])]})),_:1}),Object(i["createVNode"])(s,{class:"scroll"},{default:Object(i["withCtx"])((function(){return[Object(i["createVNode"])(u,{contextMap:e.contextMap,onOnSelectContext:e.handleContextSelected,onOnContextPositionChanges:e.handleContextPositionChanged},null,8,["contextMap","onOnSelectContext","onOnContextPositionChanges"])]})),_:1})]})),_:1})]})),_:1}),Object(i["createVNode"])(s,{class:"scroll p-4 markdown-content"},{default:Object(i["withCtx"])((function(){var t;return[e.showDescription?(Object(i["openBlock"])(),Object(i["createBlock"])(h,{key:0,value:null===(t=e.selectedContext)||void 0===t?void 0:t.description},null,8,["value"])):Object(i["createCommentVNode"])("",!0)]})),_:1})]})),_:1})])],64)}n("7db0");function u(e,t,n,o,a,r){return Object(i["openBlock"])(),Object(i["createBlock"])("div",{onWheel:t[1]||(t[1]=Object(i["withModifiers"])((function(){return e.zoom&&e.zoom.apply(e,arguments)}),["alt","prevent"])),class:"draw-area h-100"},null,32)}var p=n("2909"),h=(n("99af"),n("5db7"),n("73d9"),n("159b"),n("4de4"),n("b0c0"),n("d81d"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),n("ccc1")),f=n.n(h);window["mxBasePath"]="public/mxgraph";var x=f()({mxBasePath:"public/mxgraph"}),b=n("257e"),v=n("262e"),m=n("2caf"),g=function(e){return"_ctx_".concat(e)},O=100,C=10,j=20,w=3,y=30,M=10,V=function(e){var t,n,o,a;return new x.mxGeometry(null===(t=e.position)||void 0===t?void 0:t.x,null===(n=e.position)||void 0===n?void 0:n.y,(null!==(o=e.size)&&void 0!==o?o:O)+2*C,(null!==(a=e.size)&&void 0!==a?a:O)+2*C)},S={backgroundColor:"#FD506A",fontColor:"white",strokeColor:"white",position:{x:0,y:0}},N=function(e){Object(v["a"])(n,e);var t=Object(m["a"])(n);function n(e,r){var i,l,d,s;Object(a["a"])(this,n);var u=Object(o["a"])(Object(o["a"])({},S),r);return s=t.call(this,null,V(u),"".concat(x.mxConstants.STYLE_OPACITY,"=0;")),Object(c["a"])(Object(b["a"])(s),"contextVertex",void 0),Object(c["a"])(Object(b["a"])(s),"contextId",void 0),Object(c["a"])(Object(b["a"])(s),"visStyle",void 0),Object(c["a"])(Object(b["a"])(s),"generateStyleString",(function(e){var t=Object(o["a"])(Object(o["a"])({},S),e),n="shape=ellipse;fontStyle=1;whiteSpace=wrap;strokeWidth=2;";return n+=";".concat(x.mxConstants.STYLE_FILLCOLOR,"=").concat(t.backgroundColor),n+=";".concat(x.mxConstants.STYLE_FONTCOLOR,"=").concat(t.fontColor),n+=";".concat(x.mxConstants.STYLE_STROKECOLOR,"=").concat(t.strokeColor),n})),Object(c["a"])(Object(b["a"])(s),"getRelationTerminal",(function(e,t){var n,o={x:s.getGeometry().x,y:s.getGeometry().y},a={x:e.getGeometry().x,y:e.getGeometry().y},r=o.y>a.y,c={x:o.x-a.x,y:o.y-a.y},i={x:-1,y:0},l=c.x*i.x+c.y*i.y,d=Math.sqrt(Math.pow(c.x,2)+Math.pow(c.y,2)),u=Math.sqrt(Math.pow(i.x,2)+Math.pow(i.y,2)),p=Math.acos(l/(d*u)),h=Math.round(p*(180/Math.PI)),f="".concat(s.id,".").concat(e.id),v=s.getChild(f),m=t.length<w?y:t.length*M,g=null!==(n=s.visStyle.size)&&void 0!==n?n:O,C=new x.mxGeometry(g+18-m/2,g/2,m,j);C.rotate(r?360-h:h-360,new x.mxPoint(s.contextVertex.getGeometry().getCenterX(),s.contextVertex.getGeometry().getCenterY()));var V=r?90-h:h-90,S="fillColor=#60C487;strokeColor=#1B1B1B;rotation=".concat(V,";");if(v)return v.setStyle(S),v.setGeometry(C),v;var N=new x.mxCell(t,C,S);return N.id=f,N.parent=Object(b["a"])(s),N.vertex=!0,s.insert(N,s.getChildCount()),N})),Object(c["a"])(Object(b["a"])(s),"getChild",(function(e){var t=s.children.filter((function(t){return(null===t||void 0===t?void 0:t.id)===e}));if(0!=t.length)return t[0]})),s.visStyle=u,s.contextId=e.id,s.id=g(e.id),s.vertex=!0,s.contextVertex=new x.mxCell(null!==(i=e.name)&&void 0!==i?i:e.id,new x.mxGeometry(C,C,null!==(l=u.size)&&void 0!==l?l:O,null!==(d=u.size)&&void 0!==d?d:O),s.generateStyleString(u)),s.contextVertex.id="".concat(s.id,".contextVertex"),s.contextVertex.parent=Object(b["a"])(s),s.contextVertex.vertex=!0,s.insert(s.contextVertex,s.getChildCount()),s}return Object(r["a"])(n,[{key:"update",value:function(e,t){var n;this.contextVertex.valueChanged(null!==(n=e.name)&&void 0!==n?n:e.id),this.contextVertex.setStyle(this.generateStyleString(Object(o["a"])(Object(o["a"])({},S),t)))}},{key:"removeRelationTerminal",value:function(e){var t="".concat(this.id,".").concat(e.id),n=this.getChild(t);n&&this.remove(this.getIndex(n))}}]),n}(x.mxCell),k=function e(t){return t?t instanceof N?t:t.parent?e(t.parent):void 0:void 0},E=function(e,t,n){var o=[].concat(Object(p["a"])(t),Object(p["a"])(t.flatMap((function(e){return e.children}))));e.setCellStyles(x.mxConstants.STYLE_FILL_OPACITY,n,o),e.setCellStyles(x.mxConstants.STYLE_TEXT_OPACITY,n,o),e.setCellStyles(x.mxConstants.STYLE_STROKE_OPACITY,n,o)},T=new x.mxEditor,Y=Object(i["defineComponent"])({name:"Diagram",data:function(){return Object(i["shallowReactive"])({visible:!0})},props:{contextMap:{type:Object,required:!0}},mounted:function(){if(x.mxClient.isBrowserSupported()){var e=this.$el;x.mxGraphHandler.prototype.guidesEnabled=!0,T.setGraphContainer(e);var t=T.graph;t.setHtmlLabels(!0),t.isCellFoldable=function(){return!1},t.isCellEditable=function(){return!1},t.isCellMovable=function(e){return e.isVertex()};var n=t.isCellSelectable;t.isCellSelectable=function(e){return n.apply(t,[e])&&!e.isEdge()&&e instanceof N},t.model.addListener(x.mxEvent.CHANGE,this.handleMxChange),t.addListener(x.mxEvent.CLICK,this.handleMxClick);var o=t.getStylesheet().getDefaultEdgeStyle();o[x.mxConstants.STYLE_STARTARROW]=x.mxConstants.NONE,o[x.mxConstants.STYLE_ENDARROW]=x.mxConstants.NONE,o[x.mxConstants.STYLE_STROKEWIDTH]="2",o[x.mxConstants.STYLE_STROKECOLOR]="#1B1B1B",this.updateGraph(this.renderContextMap)}else x.mxUtils.error("Browser is not supported!",200,!1)},updated:function(){this.updateGraph((function(e){e.model.clear()})),this.updateGraph(this.renderContextMap)},methods:{handleMxChange:function(e,t){var n=this;t.getProperty("edit").changes.filter((function(e){return"mxGeometryChange"===e.constructor.name})).forEach((function(e){var t=e,o=k(t.cell);o&&n.$emit("onContextPositionChanges",{contextId:o.contextId,position:{x:t.geometry.x,y:t.geometry.y}})}))},handleMxClick:function(e,t){var n=k(t.getProperty("cell")),o=e.getDefaultParent();n?(this.updateGraph((function(){var t=n.children.filter((function(e){return e.isVertex()})).flatMap((function(t){return e.getEdges(t)})),a=t.map((function(e){return k(e.source)===n?e.target:e.source})).filter((function(e){return!!e})).flatMap((function(e){if(e instanceof N)return[e];var t=k(e);return t?[e,t.contextVertex]:[e]})),r=e.getChildCells(o).flatMap((function(e){return h["mxCell"]instanceof N?h["mxCell"].children:[e]}));E(e,r,50),E(e,[n].concat(Object(p["a"])(t),Object(p["a"])(a)),100)})),this.$emit("onSelectContext",this.getAccordingContext(n))):(this.$emit("onSelectContext",null),E(e,e.getChildCells(o),100))},zoom:function(e){var t,n;e.deltaY>0?null===T||void 0===T||null===(t=T.graph)||void 0===t||t.zoomIn():null===T||void 0===T||null===(n=T.graph)||void 0===n||n.zoomOut()},getAccordingContext:function(e){return this.contextMap.contexts.filter((function(t){return t.id===e.contextId}))[0]},renderContextMap:function(e){var t=this,n=e.model,o=e.getDefaultParent(),a=new Set,r=new Set;this.contextMap.contexts.forEach((function(e){a.add(e.id);var n=t.contextMap.metadata?t.contextMap.metadata["x-viz-metadata"]:void 0,o=n?n[e.id]:void 0;P(e,o)})),this.contextMap.contexts.forEach((function(e){I(e).forEach((function(e){return r.add(e)}))}));var c=[];n.getChildVertices(o).forEach((function(e){e instanceof N&&!a.has(e.contextId)&&c.push(e)})),n.getChildEdges(o).forEach((function(e){r.has(e.getId())||c.push(e)})),e.removeCells(c)},updateGraph:function(e){var t,n=null!==(t=null===T||void 0===T?void 0:T.graph)&&void 0!==t?t:_(),o=n.getModel();o.beginUpdate();try{e.apply(this,[n])}catch(a){console.error(a)}finally{o.endUpdate()}}}});function P(e,t){var n,o=null!==(n=null===T||void 0===T?void 0:T.graph)&&void 0!==n?n:_(),a=o.model,r=g(e.id);if(a.getCell(r)){var c=a.getCell(r);c.update(e,t)}else{var i=new N(e,t);o.addCell(i)}}function I(e){var t,n,o=new Set,a=null!==(t=null===T||void 0===T?void 0:T.graph)&&void 0!==t?t:_(),r=a.model,c=a.getDefaultParent();return null===(n=e.relations)||void 0===n||n.forEach((function(t){var n=g(e.id),i=g(t.target),l=r.getCell(n),d=r.getCell(i);if(l&&d){var s,u,p=d.contextVertex,h=l.contextVertex,f="".concat(e.id,"-").concat(t.target);if(t.targetType)p=null!==(s=d.getRelationTerminal(l,t.targetType))&&void 0!==s?s:_();if(t.sourceType)h=null!==(u=l.getRelationTerminal(d,t.sourceType))&&void 0!==u?u:_();if(!r.getCell(f)){var x=a.insertEdge(c,f,"",h,p,"strokeWidth=2;strokeColor=white;");a.orderCells(!0,[x]),a.insertVertex(x,null,"U",.7,0,15,15,"fontSize=16;fontColor=white;fillColor=transparent;strokeColor=none;",!0),a.insertVertex(x,null,"D",-.7,0,10,10,"fontSize=16;fontColor=white;fillColor=transparent;strokeColor=none;",!0)}o.add(f)}})),o}function _(){throw new Error("")}n("5d4e");Y.render=u;var L=Y;function A(e,t,n,o,a,r){return Object(i["withDirectives"])((Object(i["openBlock"])(),Object(i["createBlock"])("textarea",{ref:"textarea","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.content=t})},null,512)),[[i["vModelText"],e.content]])}var z=n("56b3"),D=n.n(z),B=(n("0dd0"),n("a7be"),n("7a7a"),n("ced0"),n("8822"),n("b8d1"),void 0),G=Object(i["defineComponent"])({name:"Editor",props:{contextMapYaml:{type:String,required:!0}},data:function(){return{content:this.$props.contextMapYaml,hasError:!1}},updated:function(){var e=this;if(this.content.normalize()!==this.contextMapYaml.normalize()&&(this.content=this.contextMapYaml,B)){var t=B;t.operation((function(){var n=t.getCursor(),o=t.getViewport();t.setValue(e.content),t.setCursor(n),t.scrollIntoView({ch:n.ch,line:o.to}),t.refresh()}))}},mounted:function(){var e=this;B=D.a.fromTextArea(this.$el,{lineNumbers:!0,mode:"text/x-yaml",gutters:["CodeMirror-lint-markers"],theme:"monokai",lint:!0}),B.setSize("100%","100%"),B.on("change",(function(t){t.getValue()!==e.contextMapYaml&&e.$emit("onContextMapChanges",t.getValue())}))}});G.render=A;var R=G;function $(e,t,n,o,a,r){return Object(i["openBlock"])(),Object(i["createBlock"])("div",{innerHTML:e.compiledMarkdown},null,8,["innerHTML"])}var F=n("0e54"),U=n.n(F),W=n("1487"),q=n.n(W),H=(n("b164"),["java","javscript","bash"]);U.a.setOptions({highlight:function(e,t){var n;return n=t&&H.indexOf(t)>-1?q.a.highlight(e,{language:t}):q.a.highlightAuto(e),n.value}});var K=Object(i["defineComponent"])({props:{value:{type:String,required:!0}},data:function(){return{compiledMarkdown:"",executionId:null}},watch:{value:{immediate:!0,handler:function(e){var t=this;console.log("parsing"),U()(e,{gfm:!0},(function(e,n){t.compiledMarkdown=n}))}}}});K.render=$;var J=K,X=n("512e"),Q=(n("c1ea"),Object(i["defineComponent"])({name:"App",components:{Diagram:L,Editor:R,Markdown:J,Splitpanes:X["Splitpanes"],Pane:X["Pane"]},data:function(){var e=Object(i["toRefs"])(this.$props.store.state),t=e.contextMap,n=e.contextMapYaml;return{contextMap:Object(i["readonly"])(t),contextMapYaml:Object(i["readonly"])(n)}},computed:{showDescription:function(){var e;return!(null===(e=this.selectedContext)||void 0===e||!e.description)},selectedContext:function(){var e=this.$props.store.state.selectedContextId;if(e)return this.$props.store.state.contextMap.contexts.find((function(t){return t.id===e}))}},methods:{handleContextMapChanged:function(e){this.store.updateContextMap(e)},handleContextSelected:function(e){this.store.handleContextSelected(e)},handleContextPositionChanged:function(e){this.store.handleContextPositionChanged(e)}},props:{store:{type:Object,required:!0}}}));n("c791");Q.render=s;var Z,ee=Q,te=n("e2c1"),ne=n("2ef0"),oe=n.n(ne);n("21b6"),n("b681");window.jsyaml=te["a"];var ae=function(e){try{var t=te["a"].load(e);return{contextMap:t}}catch(n){return console.log("Invalid YAML"),{contextMap:{contexts:[]},error:n}}},re=function(){function e(){Object(a["a"])(this,e),Object(c["a"])(this,"debug",!1),Object(c["a"])(this,"state",Object(i["reactive"])({contextMapYaml:ce,contextMap:ae(ce).contextMap,selectedContextId:null}))}return Object(r["a"])(e,[{key:"updateYaml",value:function(e){this.state.contextMapYaml=e,window.localStorage.setItem("lastMap",e)}},{key:"updateContextMap",value:function(e){this.debug&&console.log("setMessageAction triggered with",e);var t=ae(e),n=t.contextMap,o=t.error;o||(this.state.contextMap=n),this.updateYaml(e)}},{key:"handleContextSelected",value:function(e){var t;this.state.selectedContextId=null!==(t=null===e||void 0===e?void 0:e.id)&&void 0!==t?t:null}},{key:"handleContextPositionChanged",value:function(e){this.debug&&console.log("handleContextPositionChanged triggered with",e);var t=oe.a.cloneDeep(this.state.contextMap);t.metadata||(t.metadata={"x-viz-metadata":{}}),t.metadata["x-viz-metadata"]||(t.metadata["x-viz-metadata"]={});var n=t.metadata["x-viz-metadata"],a=n[e.contextId];n[e.contextId]=Object(o["a"])(Object(o["a"])({},a),{},{position:{x:e.position.x<0?0:e.position.x,y:e.position.y<0?0:e.position.y}});try{var r=te["a"].dump(t,{skipInvalid:!0,lineWidth:-1});this.updateYaml(r),this.state.contextMap=t,console.log(["Updated Position",e,t,r])}catch(c){console.log(c)}}}]),e}(),ce=null!==(Z=window.localStorage.getItem("lastMap"))&&void 0!==Z?Z:"---\ncontexts:\n  - id: test\n    name: test\n    relations:\n      - target: test2\n  - id: test2\n    name: test-2",ie=new re,le=Object(i["createApp"])(ee,{store:ie});le.mount("#app")}});
//# sourceMappingURL=app.a6ca7a34.js.map