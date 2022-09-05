"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[876],{48574:(e,t,s)=>{s.r(t),s.d(t,{default:()=>B});var n=s(86940),r=s(91074),i=s(67627),o=s(95593),a=s(88870),d=s(49890),l=s(55409),u=s(70140),c=s(74161),g=s(98119),m=s(45855),h=s(41957);function p(e){var t=(0,h.Z)(e);return t&&["amazonpay"].indexOf(t.providerId)>-1?t.providerId:void 0}var f=s(76417),A=s(19686),v=s(97204),C=s(24648),_=s(53537),b=s(96543),y=s(34323),Z=s(17175),E=s(43276),S=s(67570),k=s(60452),w=s(16206),F=s(78379),U=s(77683),I=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={isResettingAddress:!1},t.addressFormRef=(0,i.createRef)(),t.handleSelectAddress=function(e){return(0,n.__awaiter)(t,void 0,void 0,(function(){var t,s,r,i;return(0,n.__generator)(this,(function(n){switch(n.label){case 0:t=this.props,s=t.updateAddress,r=t.onUnhandledError,this.setState({isResettingAddress:!0}),n.label=1;case 1:return n.trys.push([1,3,4,5]),[4,s(e)];case 2:return n.sent(),[3,5];case 3:return i=n.sent(),r(i),[3,5];case 4:return this.setState({isResettingAddress:!1}),[7];case 5:return[2]}}))}))},t.handleUseNewAddress=function(){t.handleSelectAddress({})},t}return(0,n.__extends)(t,e),t.prototype.render=function(){var e=this.props,t=e.googleMapsApiKey,s=e.billingAddress,n=e.countriesWithAutocomplete,r=e.customer,o=r.addresses,a=r.isGuest,d=e.getFields,l=e.countries,c=e.isUpdating,g=e.setFieldValue,h=e.shouldShowOrderComments,p=e.values,f="amazonpay"===e.methodId,A=d(p.countryCode),b=A.filter((function(e){return e.custom})),y=b.length>0,Z=f&&y?b:A,E=this.state.isResettingAddress,I=o&&o.length>0,M=s&&(0,v.Z)(s,o,d(s.countryCode));return i.createElement(w.Z,{autoComplete:"on"},f&&s&&i.createElement("div",{className:"form-fieldset"},i.createElement(U.Z,{address:s})),i.createElement(F.Z,{id:"checkoutBillingAddress",ref:this.addressFormRef},I&&!f&&i.createElement(F.Z,{id:"billingAddresses"},i.createElement(m.Z,{isLoading:E},i.createElement(C.Z,{addresses:o,onSelectAddress:this.handleSelectAddress,onUseNewAddress:this.handleUseNewAddress,selectedAddress:M?s:void 0}))),!M&&i.createElement(m.Z,{isLoading:E},i.createElement(_.Z,{countries:l,countriesWithAutocomplete:n,countryCode:p.countryCode,formFields:Z,googleMapsApiKey:t,setFieldValue:g,shouldShowSaveAddress:!a}))),h&&i.createElement(S.Z,null),i.createElement("div",{className:"form-actions"},i.createElement(k.ZP,{disabled:c||E,id:"checkout-billing-continue",isLoading:c||E,type:"submit",variant:k.Wu.Primary},i.createElement(u.Z,{id:"common.continue_action"}))))},t}(i.PureComponent);const M=(0,E.Z)((0,f.withFormik)({handleSubmit:function(e,t){(0,t.props.onSubmit)(e)},mapPropsToValues:function(e){var t=e.getFields,s=e.customerMessage,r=e.billingAddress;return(0,n.__assign)((0,n.__assign)({},(0,b.Z)(t(r&&r.countryCode),r)),{orderComment:s})},isInitialValid:function(e){var t=e.billingAddress,s=e.getFields,n=e.language;return!!t&&(0,y.Z)({language:n,formFields:s(t.countryCode)}).isValidSync(t)},validationSchema:function(e){var t=e.language,s=e.getFields;return"amazonpay"===e.methodId?(0,A.Vo)((function(e){return(0,Z.Z)({translate:(0,y.w)(t),formFields:s(e&&e.countryCode)})})):(0,A.Vo)((function(e){return(0,y.Z)({language:t,formFields:s(e&&e.countryCode)})}))},enableReinitialize:!0})(I));var z=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.handleSubmit=function(e){return(0,n.__awaiter)(t,void 0,void 0,(function(){var t,s,r,i,d,l,u,c,g,m,h=e.orderComment,p=(0,n.__rest)(e,["orderComment"]);return(0,n.__generator)(this,(function(e){switch(e.label){case 0:t=this.props,s=t.updateAddress,r=t.updateCheckout,i=t.customerMessage,d=t.billingAddress,l=t.navigateNextStep,u=t.onUnhandledError,c=[],(g=(0,o.Z)(p))&&!(0,a.Z)(g,d)&&c.push(s(g)),i!==h&&c.push(r({customerMessage:h})),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,Promise.all(c)];case 2:return e.sent(),l(),[3,4];case 3:return m=e.sent(),u(m),[3,4];case 4:return[2]}}))}))},t}return(0,n.__extends)(t,e),t.prototype.componentDidMount=function(){return(0,n.__awaiter)(this,void 0,void 0,(function(){var e,t,s,i,o,a;return(0,n.__generator)(this,(function(n){switch(n.label){case 0:e=this.props,t=e.initialize,s=e.onReady,i=void 0===s?r.noop:s,o=e.onUnhandledError,n.label=1;case 1:return n.trys.push([1,3,,4]),[4,t()];case 2:return n.sent(),i(),[3,4];case 3:return a=n.sent(),o(a),[3,4];case 4:return[2]}}))}))},t.prototype.render=function(){var e=this.props,t=e.updateAddress,s=e.isInitializing,r=(0,n.__rest)(e,["updateAddress","isInitializing"]);return i.createElement("div",{className:"checkout-form"},i.createElement("div",{className:"form-legend-container"},i.createElement(g.Z,{testId:"billing-address-heading"},i.createElement(u.Z,{id:"billing.billing_address_heading"}))),i.createElement(m.Z,{isLoading:s,unmountContentWhenLoading:!0},i.createElement(M,(0,n.__assign)({},r,{onSubmit:this.handleSubmit,updateAddress:t}))))},t}(i.Component);const B=(0,d.Z)((function(e){var t=e.checkoutService,s=e.checkoutState,n=s.data,r=n.getCheckout,i=n.getConfig,o=n.getCart,a=n.getCustomer,d=n.getBillingAddress,u=n.getBillingAddressFields,g=n.getBillingCountries,m=s.statuses,h=m.isLoadingBillingCountries,f=m.isUpdatingBillingAddress,A=m.isUpdatingCheckout,v=i(),C=a(),_=r(),b=o();if(!(v&&C&&_&&b))return null;var y=v.checkoutSettings,Z=y.enableOrderComments,E=y.googleMapsApiKey,S=["US","CA","AU","NZ"];return y.features["CHECKOUT-4183.checkout_google_address_autocomplete_uk"]&&S.push("GB"),{billingAddress:d(),countries:g()||l.L,countriesWithAutocomplete:S,customer:C,customerMessage:_.customerMessage,getFields:u,googleMapsApiKey:E,initialize:t.loadBillingAddressFields,isInitializing:h(),isUpdating:f()||A(),methodId:p(_),shouldShowOrderComments:Z&&(0,c.Z)(b)<1,updateAddress:t.updateBillingAddress,updateCheckout:t.updateCheckout}}))(z)}}]);
//# sourceMappingURL=billing-81bc6d15.js.map