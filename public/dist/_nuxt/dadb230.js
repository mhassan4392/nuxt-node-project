(window.webpackJsonp=window.webpackJsonp||[]).push([[58,2,85],{682:function(e,t,n){"use strict";n(72);t.a={data:function(){var e=this;return{valid:!1,rules:{required:function(t){return!!t||e.$t("errorMessages.form.fieldRequired")},confirmPassword:function(t,n){return t===n||e.$t("errorMessages.form.confirmPasswordNotMatch")},isEmail:function(t){return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(t)||e.$t("errorMessages.form.addValidEmail")},passwordMinLength:function(t){return t&&t.length>=8||e.$t("errorMessages.form.passwordLength")},isImage:function(t){return!t||!t.type||(t.type.startsWith("image")||e.$t("errorMessages.form.plzUploadImage"))},imageSize:function(t){return!t||!t.size||(t.size<2048e3||e.$t("errorMessages.form.imageSize"))}}}},methods:{validate:function(){this.$refs.form.validate()}}}},683:function(e,t,n){"use strict";n(44),n(28);var r=n(8),l=n(16);var o=function(e,t,n){var r=new FormData;return function e(data,t){if(!function(e){return Array.isArray(n)&&n.some((function(t){return t===e}))}(t))if(t=t||"",data instanceof File)r.append(t,data);else if(Array.isArray(data))for(var i=0;i<data.length;i++)r.append(t,data[i]);else if("object"===Object(l.a)(data)&&data)for(var o in data)data.hasOwnProperty(o)&&e(data[o],""===t?o:t+"."+o);else null!=data&&r.append(t,data)}(e,t),r};t.a={data:function(){return{loading:{data:!1,add:!1,edit:!1,delete:!1},alert:{show:!1,type:"success",text:"",timeout:5e3}}},methods:{fetchItem:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.fetchData.url,r=n.replace(":param",e.fetchData.param),t.prev=2,e.loading.data=!0,t.next=6,e.$axios.get(r);case 6:l=t.sent,e.loading.data=!1,e.item=l.data[e.fetchData.data],t.next=14;break;case 11:t.prev=11,t.t0=t.catch(2),e.loading.data=!1;case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()},fetchItems:function(){var e=arguments,t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,l;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.length>0&&void 0!==e[0]&&e[0],n.prev=1,r&&(t.data=[]),t.loading.data=!0,n.next=6,t.$axios.get(t.fetchData.url);case 6:l=n.sent,t.loading.data=!1,t.data=l.data[t.fetchData.data],n.next=14;break;case 11:n.prev=11,n.t0=n.catch(1),t.loading.data=!1;case 14:case"end":return n.stop()}}),n,null,[[1,11]])})))()},addItem:function(data,form,e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.removeAlert(),t.loading.add=!0,t.addData.formData&&(data=o(data)),e.next=6,t.$axios.post(t.addData.url,data);case 6:if(n=e.sent,t.loading.add=!1,form.resetValidation(),t.showAddEditDialog=!1,t.addAlert(!0,"success",n.data.message?n.data.message:n.message),t.$emit("after-add",n,t.item),!t.addData.reload){e.next=16;break}if(!n){e.next=16;break}return e.next=16,t.fetchItems();case 16:t.addData.successRedirect&&t.$router.push(t.addData.successRedirect),e.next=23;break;case 19:e.prev=19,e.t0=e.catch(0),t.loading.add=!1,t.addAlert(!0,"error",e.t0.response.data.message?e.t0.response.data.message:e.t0.response.message);case 23:t.addData.errorRedirect&&t.$router.push(t.addData.errorRedirect);case 24:case"end":return e.stop()}}),e,null,[[0,19]])})))()},editItem:function(data,form){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.editData.url,r=n,e.editData.param&&(r=n.replace(":param",e.item[e.editData.param])),t.prev=3,e.removeAlert(),e.loading.edit=!0,e.editData.formData&&(data=o(data)),t.next=9,e.$axios.put(r,data);case 9:if(l=t.sent,e.loading.edit=!1,form.resetValidation(),e.showAddEditDialog=!1,e.addAlert(!0,"success",l.data.message?l.data.message:l.message),!e.editData.reload){t.next=18;break}if(!l){t.next=18;break}return t.next=18,e.fetchItems();case 18:e.$emit("after-edit",l,e.item),e.editData.successRedirect&&e.$router.push(e.editData.successRedirect),t.next=27;break;case 22:t.prev=22,t.t0=t.catch(3),e.loading.edit=!1,e.addAlert(!0,"error",t.t0.response.data.message?t.t0.response.data.message:t.t0.response.message),e.editData.errorRedirect&&e.$router.push(e.editData.errorRedirect);case 27:case"end":return t.stop()}}),t,null,[[3,22]])})))()},deleteItem:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.deleteData.url,r=n.replace(":param",e.itemToDel[e.deleteData.param]),t.prev=2,e.removeAlert(),e.loading.delete=!0,t.next=7,e.$axios.delete(r);case 7:if(l=t.sent,e.loading.delete=!1,e.addAlert(!0,"success",l.data.message?l.data.message:l.message),e.showDeleteDialog=!1,e.$emit("after-delete",l,e.item),!e.deleteData.reload){t.next=16;break}if(!l){t.next=16;break}return t.next=16,e.fetchItems();case 16:t.next=22;break;case 18:t.prev=18,t.t0=t.catch(2),e.loading.delete=!1,e.addAlert(!0,"error",t.t0.response.data.message?t.t0.response.data.message:t.t0.response.message);case 22:case"end":return t.stop()}}),t,null,[[2,18]])})))()},deleteItems:function(data){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.removeAlert(),e.loading.delete=!0,e.deleteMultipleData.arrayOf&&(data=data.map((function(t){return t[e.deleteMultipleData.arrayOf]}))),t.next=6,e.$axios.post(e.deleteMultipleData.url,data);case 6:if(n=t.sent,e.loading.delete=!1,e.addAlert(!0,"success",n.data.message?n.data.message:n.message),e.showDeleteDialog=!1,e.$emit("after-delete-multiple",n,e.item),!e.deleteMultipleData.reload){t.next=15;break}if(!n){t.next=15;break}return t.next=15,e.fetchItems();case 15:e.bulkDeleteValue="",t.next=22;break;case 18:t.prev=18,t.t0=t.catch(0),e.loading.delete=!1,e.addAlert(!0,"error",t.t0.response.data.message?t.t0.response.data.message:t.t0.response.message);case 22:case"end":return t.stop()}}),t,null,[[0,18]])})))()},addAlert:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",text=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;this.alert={show:e,type:t,text:text,timeout:n}},removeAlert:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"info",text=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5e3;this.alert={show:e,type:t,text:text,timeout:n}}}}},684:function(e,t,n){var content=n(697);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(19).default)("71e2e93b",content,!0,{sourceMap:!1})},687:function(e,t,n){var content=n(688);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(19).default)("5c8fbe94",content,!0,{sourceMap:!1})},688:function(e,t,n){(t=n(18)(!1)).push([e.i,".v-textarea textarea{align-self:stretch;flex:1 1 auto;line-height:1.75rem;max-width:100%;min-height:32px;outline:none;padding:0;width:100%}.v-textarea .v-text-field__prefix,.v-textarea .v-text-field__suffix{padding-top:2px;align-self:start}.v-textarea.v-text-field--box .v-text-field__prefix,.v-textarea.v-text-field--box textarea,.v-textarea.v-text-field--enclosed .v-text-field__prefix,.v-textarea.v-text-field--enclosed textarea{margin-top:24px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) textarea{margin-top:10px}.v-textarea.v-text-field--box.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--box.v-text-field--single-line:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--outlined:not(.v-input--dense) .v-label,.v-textarea.v-text-field--enclosed.v-text-field--single-line:not(.v-input--dense) .v-label{top:18px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense textarea,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__prefix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-text-field__suffix,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense textarea{margin-top:6px}.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--box.v-text-field--single-line.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--outlined.v-input--dense .v-input__prepend-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__append-outer,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-inner,.v-textarea.v-text-field--enclosed.v-text-field--single-line.v-input--dense .v-input__prepend-outer{align-self:flex-start;margin-top:8px}.v-textarea.v-text-field--solo{align-items:flex-start}.v-textarea.v-text-field--solo .v-input__append-inner,.v-textarea.v-text-field--solo .v-input__append-outer,.v-textarea.v-text-field--solo .v-input__prepend-inner,.v-textarea.v-text-field--solo .v-input__prepend-outer{align-self:flex-start;margin-top:12px}.v-application--is-ltr .v-textarea.v-text-field--solo .v-input__append-inner{padding-left:12px}.v-application--is-rtl .v-textarea.v-text-field--solo .v-input__append-inner{padding-right:12px}.v-textarea--auto-grow textarea{overflow:hidden}.v-textarea--no-resize textarea{resize:none}.v-textarea.v-text-field--enclosed .v-text-field__slot{align-self:stretch}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-right:-12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot{margin-left:-12px}.v-application--is-ltr .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-right:12px}.v-application--is-rtl .v-textarea.v-text-field--enclosed .v-text-field__slot textarea{padding-left:12px}",""]),e.exports=t},696:function(e,t,n){"use strict";var r=n(684);n.n(r).a},697:function(e,t,n){(t=n(18)(!1)).push([e.i,".dialog-btn{position:fixed;right:20px;bottom:50px;z-index:100}",""]),e.exports=t},700:function(e,t,n){"use strict";n(15),n(12),n(10),n(9),n(11);var r=n(1),l=(n(22),n(687),n(105)),o=n(6);function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}var c=Object(o.a)(l.a);t.a=c.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(e){return!isNaN(parseFloat(e))}},rows:{type:[Number,String],default:5,validator:function(e){return!isNaN(parseInt(e,10))}}},computed:{classes:function(){return function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},l.a.options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var e=this;setTimeout((function(){e.autoGrow&&e.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var input=this.$refs.input;if(input){input.style.height="0";var e=input.scrollHeight,t=parseInt(this.rows,10)*parseFloat(this.rowHeight);input.style.height=Math.max(t,e)+"px"}},genInput:function(){var input=l.a.options.methods.genInput.call(this);return input.tag="textarea",delete input.data.attrs.type,input.data.attrs.rows=this.rows,input},onInput:function(e){l.a.options.methods.onInput.call(this,e),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(e){this.isFocused&&13===e.keyCode&&e.stopPropagation(),this.$emit("keydown",e)}}})},702:function(e,t,n){"use strict";n.r(t);n(44),n(28);var r=n(8),l={components:{CrudAddEditDialog:function(){return n.e(79).then(n.bind(null,885))},CrudDeleteDialog:function(){return n.e(109).then(n.bind(null,886))},CrudViewDialog:function(){return n.e(110).then(n.bind(null,887))},CrudSnackbar:function(){return n.e(81).then(n.bind(null,695))}},mixins:[n(683).a],props:{crudId:{type:[String,Boolean],default:!1},table:{type:[Boolean,Object],default:!1},addEditDialog:{type:[Boolean,Object],default:!1},deleteDialog:{type:[Boolean,Object],default:!1},viewDialog:{type:[Boolean,Object],default:!1},status:{type:[String],default:"add"},button:{type:[Boolean,Object],default:!1},headers:{type:Array,default:function(){return[]}},items:{type:[Boolean,Array],default:function(){return[]}},defaultItem:{type:Object,default:function(){return{}}},fetchData:{type:[Boolean,Object],default:!1},addData:{type:[Boolean,Object],default:!1},editData:{type:[Boolean,Object],default:!1},viewData:{type:[Boolean,Object],default:!1},deleteData:{type:[Boolean,Object],default:!1},deleteMultipleData:{type:[Boolean,Object],default:!1},actions:{type:[Boolean,Object],default:!1}},data:function(){return{bulkDeleteValue:"",selected:[],search:"",itemToDel:null,deleteType:"",showAddEditDialog:!1,item:Object.assign({},this.defaultItem),edit:"edit"===this.status,data:this.items,showDeleteDialog:!1,showViewDialog:!1}},created:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.fetchData){t.next=3;break}return t.next=3,e.fetchItems(!1);case 3:case"end":return t.stop()}}),t)})))()},methods:{getEditItem:function(e){return Object.assign({},e)},closeAddEditDialog:function(){this.showAddEditDialog=!1,this.item=Object.assign({},this.defaultItem)},closeDeleteDialog:function(){this.showDeleteDialog=!1,this.bulkDeleteValue=""},closeViewDialog:function(){this.showViewDialog=!1},openDialog:function(e){if(this.addData.redirect)return this.$router.push(this.addData.url);this.showAddEditDialog=!0,this.edit="edit"===this.status,this.item=Object.assign({},e)},editDialog:function(e){this.edit=!0,this.showAddEditDialog=!0,this.item=Object.assign({},e)},openViewDialog:function(e){this.showViewDialog=!0,this.item=Object.assign({},e)},itemSave:function(form,e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.addData){n.next=4;break}t.$emit("saveItem",t.item,form),n.next=6;break;case 4:return n.next=6,t.addItem(t.item,form,e);case 6:case"end":return n.stop()}}),n)})))()},itemEdit:function(form){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.editData){t.next=4;break}e.$emit("editItem",e.item,form),t.next=6;break;case 4:return t.next=6,e.editItem(e.item,form);case 6:case"end":return t.stop()}}),t)})))()},success:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("single"!==e.deleteType){t.next=9;break}if(e.deleteData){t.next=5;break}e.$emit("deleteItem",e.itemToDel),t.next=7;break;case 5:return t.next=7,e.deleteItem();case 7:t.next=16;break;case 9:if("multiple"!==e.deleteType){t.next=16;break}if(e.deleteData){t.next=14;break}e.$emit("deleteItems",e.selected),t.next=16;break;case 14:return t.next=16,e.deleteItems(e.selected);case 16:case"end":return t.stop()}}),t)})))()},itemDelete:function(e){this.deleteType="single",this.itemToDel=e,this.showDeleteDialog=!0},itemsDelete:function(){this.deleteType="multiple",this.showDeleteDialog=!0},editRedirect:function(e,t){return e.replace(":param",t[this.editData.param])},viewRedirect:function(e,t){return e.replace(":param",t[this.viewData.param])},bulkDelete:function(){"Delete Selected"===this.bulkDeleteValue&&this.itemsDelete(this.selected)}}},o=(n(696),n(37)),d=n(46),c=n.n(d),v=n(84),f=n(103),x=n(78),m=n(428),h=n(796),_=n(109),D=n(426),w=n(728),y=n(105),component=Object(o.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.button?n("div",[n("v-btn",{attrs:{color:e.button.color?e.button.color:"primary",icon:"icon"===e.button.type},on:{click:function(t){return e.openDialog(e.defaultItem)}}},[n("v-icon",{attrs:{color:e.button.iconColor?e.button.iconColor:"",size:e.button.iconSize?e.button.iconSize:""}},[e._v("\n        "+e._s(e.button.icon?e.button.icon:"mdi-plus")+"\n      ")]),e._v("\n      "+e._s(e.button.text?e.button.text:e.$t("crud.button.text"))+"\n    ")],1)],1):e._e(),e._v(" "),e.table?n("v-row",{staticClass:"d-flex my-2"},[n("v-col",{attrs:{cols:"6"}},[e.table.showSelect?n("v-select",{attrs:{disabled:0===e.selected.length,label:e.$t("crud.table.bulkActions.label"),outlined:"",dense:"","hide-details":"",items:[{text:e.$t("crud.table.bulkActions.deleteSelected"),value:"Delete Selected"}],"item-text":"text","item-value":"value"},on:{change:e.bulkDelete},model:{value:e.bulkDeleteValue,callback:function(t){e.bulkDeleteValue=t},expression:"bulkDeleteValue"}}):e._e()],1),e._v(" "),e.table.button?n("v-col",{staticClass:"text-right",attrs:{cols:"6"}},[n("v-btn",{attrs:{color:e.table.button.color?e.table.button.color:"primary",icon:"icon"===e.table.button.type},on:{click:function(t){return e.openDialog(e.defaultItem)}}},[n("v-icon",{attrs:{color:e.table.button.iconColor?e.table.button.iconColor:"",size:e.table.button.iconSize?e.table.button.iconSize:""}},[e._v(e._s(e.table.button.icon?e.table.button.icon:"mdi-plus"))]),e._v("\n        "+e._s(e.table.button.text?e.table.button.text:e.$t("crud.table.button.text"))+"\n      ")],1)],1):e._e()],1):e._e(),e._v(" "),e.table?n("v-card",[n("v-row",{staticClass:"px-5",attrs:{"align-content":"center",justify:"center"}},[n("v-col",{attrs:{sm:"6",cols:"12"}},[e.table.heading?n("v-card-title",[e._v("\n          "+e._s(e.table.heading)+"\n        ")]):e._e()],1),e._v(" "),n("v-col",{attrs:{"align-self":"center",sm:"6",cols:"12"}},[e.table.search?n("v-text-field",{attrs:{outlined:"","hide-details":"",dense:"","append-icon":e.table.search.icon?e.table.search.icon:"mdi-magnify",label:e.table.search.label?e.table.search.label:e.$t("crud.table.search.label")},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}):e._e()],1)],1),e._v(" "),n("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.data,"item-key":e.table.itemKey?e.table.itemKey:"_id","multi-sort":"","show-select":e.table.showSelect,search:e.search,"loading-text":e.table.loadingText?e.table.loadingText:"data is loading ...","no-data-text":e.table.noDataText?e.table.noDataText:"no data found","no-results-text":e.table.noResultsText?e.table.noResultsText:"no results found",loading:e.loading.data},scopedSlots:e._u([e._l(e.$scopedSlots,(function(t,n){return{key:n,fn:function(t){return[e._t(n,null,null,t)]}}})),e.actions?{key:"item.actions",fn:function(t){var i=t.item;return[e.actions.view&&e.viewData.redirect?n("v-icon",{staticClass:"mr-2",attrs:{color:"info"},on:{click:function(t){e.$router.push(e.viewRedirect(e.viewData.url,i))}}},[e._v("\n          mdi-eye\n        ")]):e._e(),e._v(" "),e.actions.view&&!e.viewData.redirect?n("v-icon",{staticClass:"mr-2",attrs:{color:"info"},on:{click:function(t){return e.openViewDialog(i)}}},[e._v("\n          mdi-eye\n        ")]):e._e(),e._v(" "),e.actions.edit&&e.editData.redirect?n("v-icon",{staticClass:"mr-2",attrs:{color:"success"},on:{click:function(t){e.$router.push(e.editRedirect(e.editData.url,i))}}},[e._v("\n          mdi-pencil\n        ")]):e._e(),e._v(" "),e.actions.edit&&!e.editData.redirect?n("v-icon",{staticClass:"mr-2",attrs:{color:"success"},on:{click:function(t){return e.editDialog(i)}}},[e._v("\n          mdi-pencil\n        ")]):e._e(),e._v(" "),e.actions.delete?n("v-icon",{attrs:{color:"error"},on:{click:function(t){return e.itemDelete(i)}}},[e._v("\n          mdi-delete\n        ")]):e._e()]}}:null],null,!0),model:{value:e.selected,callback:function(t){e.selected=t},expression:"selected"}})],1):e._e(),e._v(" "),n("crud-add-edit-dialog",{attrs:{show:e.showAddEditDialog,dialog:e.addEditDialog,edit:e.edit,loading:e.loading},on:{editItem:e.itemEdit,saveItem:e.itemSave,close:e.closeAddEditDialog}},[n("template",{slot:"form"},[e._t("crud-form",null,{item:e.item,edit:e.edit})],2)],2),e._v(" "),n("crud-delete-dialog",{attrs:{dialog:e.deleteDialog,show:e.showDeleteDialog,loading:e.loading},on:{success:e.success,close:e.closeDeleteDialog}}),e._v(" "),n("crud-view-dialog",{attrs:{dialog:e.viewDialog,show:e.showViewDialog},on:{close:e.closeViewDialog}},[n("template",{slot:"view"},[e._t("view-item",null,{item:e.item})],2)],2),e._v(" "),n("crud-snackbar",{attrs:{alert:e.alert}})],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VBtn:v.a,VCard:f.a,VCardTitle:x.c,VCol:m.a,VDataTable:h.a,VIcon:_.a,VRow:D.a,VSelect:w.a,VTextField:y.a})},797:function(e,t,n){"use strict";n.r(t);var r={mixins:[n(682).a],props:{setting:{type:Object,required:!0}}},l=n(37),o=n(46),d=n.n(o),c=n(78),v=n(680),f=n(105),x=n(700),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card-text",[n("v-container",[n("v-text-field",{attrs:{label:e.$t("forms.labels.name"),outlined:"",dense:"",rules:[e.rules.required]},model:{value:e.setting.name,callback:function(t){e.$set(e.setting,"name",t)},expression:"setting.name"}}),e._v(" "),n("v-textarea",{attrs:{label:e.$t("forms.labels.settings"),outlined:"",dense:"",height:"500px"},model:{value:e.setting.settings,callback:function(t){e.$set(e.setting,"settings",t)},expression:"setting.settings"}})],1)],1)}),[],!1,null,null,null),m=component.exports;d()(component,{VCardText:c.b,VContainer:v.a,VTextField:f.a,VTextarea:x.a});var h={middleware:["pagePermission"],components:{CrudDataTable:n(702).default,SettingForm:m},data:function(){return{headers:[{text:this.$t("crud.table.headers.name"),value:"name"},{text:this.$t("crud.table.headers.actions"),value:"actions",sortable:!1}],defaultItem:{name:"",settings:""}}}},_=n(428),D=n(426),w=Object(l.a)(h,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("v-container",[t("v-row",[t("v-col",{attrs:{cols:"12"}},[t("CrudDataTable",{attrs:{"default-item":this.defaultItem,table:{heading:this.$t("crud.table.headings.settings.add"),search:!0,showSelect:!0,button:{text:this.$t("crud.table.addNewButtons.settings.add")}},"add-edit-dialog":{addHeading:this.$t("addEditDialog.headings.add.settings.add"),editHeading:this.$t("addEditDialog.headings.edit.settings.add")},headers:this.headers,dialog:{heading:"Setting"},actions:{edit:!0,delete:!0},"fetch-data":{url:"/api/settings",data:"allSettings"},"add-data":{url:"/api/settings",reload:!0},"edit-data":{url:"/api/settings/:param",param:"_id",reload:!0},"delete-data":{url:"/api/settings/:param",param:"_id",reload:!0},"delete-multiple-data":{url:"/api/settings/delete",arrayOf:"_id",reload:!0}},scopedSlots:this._u([{key:"crud-form",fn:function(e){var n=e.item;return[t("SettingForm",{attrs:{setting:n}})]}}])})],1)],1)],1)],1)}),[],!1,null,null,null);t.default=w.exports;d()(w,{VCol:_.a,VContainer:v.a,VRow:D.a})}}]);