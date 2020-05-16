(function(t){function e(e){for(var r,s,i=e[0],l=e[1],c=e[2],u=0,m=[];u<i.length;u++)s=i[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&m.push(n[s][0]),n[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);d&&d(e);while(m.length)m.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],r=!0,i=1;i<a.length;i++){var l=a[i];0!==n[l]&&(r=!1)}r&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var r={},n={app:0},o=[];function s(e){if(r[e])return r[e].exports;var a=r[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=r,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(a,r,function(e){return t[e]}.bind(null,r));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var d=l;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);var r=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",["ready"===t.state?[a("v-navigation-drawer",{attrs:{clipped:t.$vuetify.breakpoint.lgAndUp,app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",[a("v-list-item",{attrs:{link:"",to:{name:"user-data"}}},[a("v-list-item-action",[a("v-icon",[t._v("mdi mdi-flask")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" User Data ")])],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"","clipped-left":t.$vuetify.breakpoint.lgAndUp,color:"primary"}},[a("v-app-bar-nav-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),a("div",{staticClass:"d-flex align-center"},[a("v-toolbar-title",[t._v(" Canvas Playground "),a("span",{staticClass:"font-weight-light"},[t._v("v"+t._s(t.version))])])],1),a("v-spacer"),a("v-menu",{attrs:{"offset-y":"","close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[a("v-btn",t._g({attrs:{icon:""}},r),[a("v-avatar",[a("img",{attrs:{src:t.avatar,alt:"Profile Picture"}})])],1)]}}],null,!1,2621963441)},[a("v-card",[a("v-container",[a("v-row",{attrs:{justify:"center"}},[a("v-avatar",{attrs:{size:"80"}},[a("img",{attrs:{src:t.avatar,alt:"Profile Picture"}})])],1),a("v-row",{attrs:{justify:"center"}},[a("v-card-title",[t._v(t._s(t.user.name))])],1)],1),a("v-list",[a("v-list-item",[a("dark-switch")],1),a("v-list-item",[a("close-loading-immediately-switch")],1),a("v-list-item",{on:{click:t.reload}},[a("v-list-item-icon",[a("v-icon",[t._v("mdi mdi-exit-to-app")])],1),a("v-list-item-title",[t._v("Exit")])],1)],1)],1)],1)],1),a("v-content",[a("router-view")],1)]:t._e(),"loading"===t.state||"loaded"===t.state?[a("v-content",[a("v-container",{staticClass:"mt-10",attrs:{fluid:""}},["loading"===t.state?a("v-row",{staticClass:"mb-5",attrs:{justify:"center"}},[a("v-progress-circular",{attrs:{indeterminate:""}})],1):t._e(),"loaded"===t.state?a("v-row",{staticClass:"mb-1",attrs:{justify:"center"}},[a("v-btn",{attrs:{color:"success","x-large":""},on:{click:function(e){t.state="ready"}}},[t._v("Proceed")])],1):t._e(),"loaded"===t.state?a("v-row",{staticClass:"mb-10",attrs:{justify:"center"}},[a("close-loading-immediately-switch")],1):t._e(),a("v-row",{attrs:{justify:"center"}},[a("v-list",t._l(t.prep,(function(e){return a("v-list-item",{key:e.name},[a("v-list-item-icon",["loading"===e.status?a("v-progress-circular",{attrs:{indeterminate:""}}):t._e(),"complete"===e.status?a("v-icon",{attrs:{color:"success"}},[t._v("mdi mdi-check")]):t._e(),"error"===e.status?a("v-icon",{attrs:{color:"error"}},[t._v("mdi mdi-close")]):t._e()],1),a("v-list-item-title",[t._v(t._s(e.name))])],1)})),1)],1),a("v-row",{staticClass:"mt-3",attrs:{justify:"center"}},[a("dark-switch")],1)],1)],1)]:t._e(),"unknown"===t.state?[a("v-container",{staticClass:"mt-10",attrs:{fluid:""}},[a("v-row",{attrs:{justify:"center"}},[a("v-progress-circular",{attrs:{indeterminate:""}})],1)],1)]:t._e(),"bookmarklet"===t.state?[a("v-content",[a("bookmarklet-explaination")],1)]:t._e()],2)},o=[],s=a("a002"),i=a.n(s);let l={},c=null,d=[];function u(t,...e){let a=Math.random().toString(36).substr(2,9);return parent.window.postMessage({framePromiseID:a,name:t,args:e},c),new Promise((t,e)=>{l[a]={resolve:t,reject:e}})}function m(){return null!==c}function v(t){return new Promise((e,a)=>{if(m())return void e(!0);let r=setTimeout(()=>{a("timeout"),d=d.filter(t=>t.timeoutID!==r)},t);d.push({timeoutID:r,resolve:e,reject:a})})}function p(...t){return u("fetch",...t)}window.addEventListener("message",t=>{if(t.data.hasOwnProperty("framePromiseID"))t.data.hasOwnProperty("resolve")?l[t.data.framePromiseID].resolve(t.data.resolve):t.data.hasOwnProperty("reject")&&l[t.data.framePromiseID].reject(t.data.reject);else if(t.data.framePromiseReady){c=t.origin;for(let t of d)clearTimeout(t.timeoutID),t.resolve(!0)}},!1);var h=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-switch",{attrs:{"append-icon":t.icon,"hide-details":"",label:"Dark Mode"},model:{value:t.$vuetify.theme.dark,callback:function(e){t.$set(t.$vuetify.theme,"dark",e)},expression:"$vuetify.theme.dark"}})},g=[],f={name:"DarkSwitch",computed:{icon(){return"mdi-"+(this.$vuetify.theme.dark?"weather-night":"white-balance-sunny")}},watch:{"$vuetify.theme.dark":function(t){i.a.setItem("theme",t?"dark":"light")}}},y=f,k=a("2877"),w=a("6544"),b=a.n(w),_=a("b73d"),C=Object(k["a"])(y,h,g,!1,null,"58a21098",null),I=C.exports;b()(C,{VSwitch:_["a"]});var L=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-switch",{staticClass:"mt-0",attrs:{"hide-details":"",label:"Proceed immediately next time"},model:{value:t.closeLoadingImmediately,callback:function(e){t.closeLoadingImmediately=e},expression:"closeLoadingImmediately"}})},j=[],V={name:"CloseLoadingImmediatelySwitch",computed:{closeLoadingImmediately:{set(t){i.a.setItem("closeLoadingImmediately",t),this.$store.commit("setCloseLoadingImmediately",t)},get(){return this.$store.state.closeLoadingImmediately}}}},P=V,x=Object(k["a"])(P,L,j,!1,null,"15174f1a",null),$=x.exports;b()(x,{VSwitch:_["a"]});var S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"mt-10",attrs:{fluid:""}},[a("v-row",{staticClass:"mb-5",attrs:{justify:"center"}},[a("h1",[t._v("Canvas Playground")])]),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"10",md:"4",sm:"8"}},[a("p",[t._v(" This is a webapp for experimenting with the Canvas api by loading it through a bookmarklet (a bookmark that runs javascript). "),a("br"),a("br"),a("span",{staticClass:"font-weight-bold"},[t._v("Note: ")]),t._v("This will automatically generate a token to use. ")]),a("h4",[t._v("Instructions:")]),a("ol",[a("li",[t._v('Drag the button below to your bookmarks bar or right click it and click "Bookmark this link"')]),a("li",[t._v("When you're on a Canvas page and signed in, click the bookmark")])])])],1),a("v-row",{attrs:{justify:"center"}},[a("bookmarklet",{attrs:{title:"Canvas Playground"}})],1)],1)},T=[],D=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-btn",{attrs:{color:"info",href:t.scriptData}},[t._v(t._s(t.title))])},O=[],U={name:"Bookmarklet",props:{title:{type:String,default:"Bookmarklet"}},computed:{scriptData(){return'javascript:(function(){let s = document.createElement("script");s.src="'+window.location.origin+'/bookmarklet.js";document.body.appendChild(s);})();'}}},A=U,E=a("8336"),B=Object(k["a"])(A,D,O,!1,null,"832ef822",null),q=B.exports;b()(B,{VBtn:E["a"]});var M={name:"BookmarkletExplaination",components:{Bookmarklet:q}},N=M,R=a("62ad"),z=a("a523"),J=a("0fd9"),G=Object(k["a"])(N,S,T,!1,null,"adc38548",null),H=G.exports;b()(G,{VCol:R["a"],VContainer:z["a"],VRow:J["a"]});var W={name:"App",components:{BookmarkletExplaination:H,CloseLoadingImmediatelySwitch:$,DarkSwitch:I},data:()=>({state:"unknown",prep:[],drawer:null}),computed:{user(){return this.$store.state.currentUser},avatar(){return this.user["avatar_url"]},version(){return"0.1.0"}},methods:{addLoading(t){this.prep.unshift({name:t,status:"loading"})},endLoading(t){this.prep[0].status=t?"error":"complete"},reload(){u("reload")},async getToken(){this.addLoading("Checking for token");const t=await u("getTokens");this.endLoading();let e="";for(let a of t)"canvas-playground"===a.purpose&&(this.addLoading("Regenerating existing token"),e=await u("regenerateToken",a.tokenUrl),console.log(e),e=e["visible_token"],this.endLoading(null===e||void 0===e));return""===e&&(this.addLoading("Generating new token"),e=await u("generateToken",this.$store.state.hostUrl.origin+"/profile/tokens/","canvas-playground",""),console.log("New token data: "),console.log(e),e=e["visible_token"],this.endLoading(null===e||void 0===e)),this.addLoading("Saving token"),console.log(e),await i.a.setItem("token",e),this.endLoading(),e},async getUser(t){this.addLoading("Getting user");try{let e=await p(this.$store.state.hostUrl.origin+"/api/v1/users/self",{method:"GET",mode:"cors",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"}});return this.endLoading(),{data:e,tokenValid:!0}}catch(e){return this.endLoading(!0),{tokenValid:!1}}},async loadData(){this.state="loading",this.addLoading("Loading settings"),this.$store.commit("setCloseLoadingImmediately",await i.a.getItem("closeLoadingImmediately")),this.endLoading(),this.addLoading("Loading token");let t=await i.a.getItem("token");this.endLoading(),this.addLoading("Loading url"),this.$store.commit("setHostUrl",await u("getUrl")),this.endLoading(),console.log(t),null===t&&(t=await this.getToken());let e=await this.getUser(t);e.tokenValid||(t=await this.getToken(),console.log("Newer token"),console.log(t),e=await this.getUser(t)),this.$store.commit("setToken",t),this.$store.commit("setCurrentUser",e.data),this.state="loaded",this.$store.state.closeLoadingImmediately&&(this.state="ready",this.state="ready")}},async created(){v(0).then(this.loadData).catch(()=>{console.log("Timed out"),this.state="bookmarklet"})}},F=W,K=a("7496"),Q=a("40dc"),X=a("5bc1"),Y=a("8212"),Z=a("b0af"),tt=a("99d9"),et=a("a75b"),at=a("132d"),rt=a("8860"),nt=a("da13"),ot=a("1800"),st=a("5d23"),it=a("34c3"),lt=a("e449"),ct=a("f774"),dt=a("490a"),ut=a("2fa4"),mt=a("2a7f"),vt=Object(k["a"])(F,n,o,!1,null,null,null),pt=vt.exports;b()(vt,{VApp:K["a"],VAppBar:Q["a"],VAppBarNavIcon:X["a"],VAvatar:Y["a"],VBtn:E["a"],VCard:Z["a"],VCardTitle:tt["a"],VContainer:z["a"],VContent:et["a"],VIcon:at["a"],VList:rt["a"],VListItem:nt["a"],VListItemAction:ot["a"],VListItemContent:st["a"],VListItemIcon:it["a"],VListItemTitle:st["b"],VMenu:lt["a"],VNavigationDrawer:ct["a"],VProgressCircular:dt["a"],VRow:J["a"],VSpacer:ut["a"],VToolbarTitle:mt["a"]});var ht=a("8c4f"),gt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",md:"5",sm:"8"}},[a("course-selection",{model:{value:t.selectedCourse,callback:function(e){t.selectedCourse=e},expression:"selectedCourse"}})],1)],1),a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12"}},[a("course-peer-table",{attrs:{"course-id":t.selectedCourse}})],1)],1)],1)},ft=[],yt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-select",{attrs:{loading:t.loading,label:"Course",items:t.courseItems},model:{value:t.courseSelected,callback:function(e){t.courseSelected=e},expression:"courseSelected"}})},kt=[],wt={name:"CourseSelection",props:["value"],data:()=>({courses:null}),computed:{loading(){return null===this.courses},graphqlEndpoint(){return this.$store.state.hostUrl.origin+"/api/graphql"},courseItems(){return this.loading?null:this.courses.map(t=>({text:t.name,value:t["_id"]}))},courseSelected:{set(t){this.$emit("input",t)},get(){return this.value}}},async created(){this.courses=(await p(this.graphqlEndpoint,{method:"POST",mode:"cors",body:JSON.stringify({query:"\n            query {\n              allCourses {\n                name\n                _id\n              }\n            }\n            "}),headers:{Authorization:"Bearer "+this.$store.state.token,"Content-Type":"application/json"}})).data["allCourses"]}},bt=wt,_t=a("b974"),Ct=Object(k["a"])(bt,yt,kt,!1,null,"7b6c6388",null),It=Ct.exports;b()(Ct,{VSelect:_t["a"]});var Lt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-data-table",{attrs:{headers:t.headers,loading:t.loading,items:t.rows,"items-per-page":-1,"footer-props":{"items-per-page-options":[10,25,50,-1]},"must-sort":""},scopedSlots:t._u([{key:"item.avatar",fn:function(e){var r=e.item;return[a("v-avatar",{staticClass:"ma-1"},[r.avatar?a("img",{attrs:{src:r.avatar,alt:"Avatar"}}):[t._v("?")]],2)]}},{key:"item.created",fn:function(e){var a=e.item;return[t._v(" "+t._s(new Date(a.created).toLocaleString())+" ")]}},{key:"item.activity",fn:function(e){var a=e.item;return[t._v(" "+t._s(new Date(a.activity).toLocaleString())+" ")]}}])})},jt=[],Vt={name:"CoursePeerTable",props:["courseId"],data:()=>({users:null,headers:[{text:"",value:"avatar",align:"start",sortable:!1},{text:"Name",value:"name"},{text:"Created",value:"created"},{text:"Last Activity",value:"activity"}],options:{itemsPerPage:25}}),computed:{loading(){return null===this.users},graphqlEndpoint(){return this.$store.state.hostUrl.origin+"/api/graphql"},rows(){return this.loading?[]:this.users.map(t=>({name:t.user.name,avatar:t.user.avatarUrl,created:new Date(t.user.createdAt).getTime(),activity:new Date(t.lastActivityAt).getTime()}))}},watch:{courseId(){this.loadData()}},methods:{async loadData(){if(!this.courseId)return void(this.users=[]);this.users=null;let t=await p(this.graphqlEndpoint,{method:"POST",mode:"cors",body:JSON.stringify({query:"\n            query($classID: ID!) {\n              course(id: $classID) {\n                name\n                enrollmentsConnection {\n                  nodes {\n                    user {\n                      name\n                      avatarUrl\n                      createdAt\n                    }\n                    lastActivityAt\n                  }\n                }\n              }\n            }\n            ",variables:{classID:this.courseId}}),headers:{Authorization:"Bearer "+this.$store.state.token,"Content-Type":"application/json"}});null!==t.data.course?(t=t.data.course["enrollmentsConnection"],this.users=null===t?[]:t.nodes):this.users=[]}},async created(){await this.loadData()}},Pt=Vt,xt=a("8fea"),$t=Object(k["a"])(Pt,Lt,jt,!1,null,"97b886ee",null),St=$t.exports;b()($t,{VAvatar:Y["a"],VDataTable:xt["a"]});var Tt={name:"CoursePeers",components:{CoursePeerTable:St,CourseSelection:It},data:()=>({selectedCourse:""})},Dt=Tt,Ot=Object(k["a"])(Dt,gt,ft,!1,null,"3d21275e",null),Ut=Ot.exports;b()(Ot,{VCol:R["a"],VContainer:z["a"],VRow:J["a"]}),r["a"].use(ht["a"]);const At=[{path:"/",name:"user-data",component:Ut}],Et=new ht["a"]({routes:At});var Bt=Et,qt=a("2f62");r["a"].use(qt["a"]);var Mt=new qt["a"].Store({state:{closeLoadingImmediately:!1,hostUrl:{},currentUser:{},token:""},mutations:{setHostUrl(t,e){t.hostUrl=e},setCurrentUser(t,e){t.currentUser=e},setCloseLoadingImmediately(t,e){t.closeLoadingImmediately=e},setToken(t,e){t.token=e}},actions:{},modules:{}}),Nt=a("f309");i.a.config({name:"canvas-playground"}),r["a"].use(Nt["a"]),r["a"].config.productionTip=!1,i.a.getItem("theme").then(t=>{new r["a"]({router:Bt,store:Mt,vuetify:new Nt["a"]({theme:{dark:"light"!==t}}),render:function(t){return t(pt)}}).$mount("#app")})}});
//# sourceMappingURL=app.f696b51b.js.map