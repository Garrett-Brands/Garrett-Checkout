"use strict";(self.webpackJsonpCheckout=self.webpackJsonpCheckout||[]).push([[134],{58512:(e,t,a)=>{a.r(t),a.d(t,{default:()=>E});var r=a(31635),n=a(30455),l=a(41109),c=a(49655);const s=function(e){var t=e.children;return n.createElement("header",{className:"cart-header"},n.createElement("h3",{className:"cart-title optimizedCheckout-headingSecondary"},n.createElement(c.A,{id:"cart.cart_heading"})),t)};var i=a(62901),m=a(66317),u=a(62755),o=a(60164),d=a(97947),p=a(9660);const E=function(e){var t=e.isTaxIncluded,a=e.taxes,E=e.storeCurrency,h=e.shopperCurrency,y=e.headerLink,v=e.additionalLineItems,f=e.lineItems,C=e.total,I=(0,r.__rest)(e,["isTaxIncluded","taxes","storeCurrency","shopperCurrency","headerLink","additionalLineItems","lineItems","total"]),A=(0,n.useMemo)((function(){return(0,p.A)(f)}),[f]),g=t&&a&&a.length>0,x=(0,n.useState)(null),S=x[0],k=x[1],N=(0,n.useState)(null),b=N[0],_=N[1];return(0,n.useEffect)((function(){var e=localStorage.getItem("selectedShipDateObject"),t=localStorage.getItem("deliveryEstimateObject");if(e){var a=JSON.parse(e);k(a.formatted)}if(t){var r=JSON.parse(t);_(r.formatted)}}),[]),n.createElement("article",{className:"cart optimizedCheckout-orderSummary","data-test":"cart"},n.createElement(s,null,y),n.createElement(u.A,null,n.createElement(i.A,{displayLineItemsCount:!0,items:A})),S&&n.createElement(u.A,null,n.createElement("div",{className:"shipping-preview-container-orderSummary"},n.createElement("div",{className:"shipping-preview-item","data-type":"ship-date"},n.createElement("span",null,"Ship Date"),n.createElement("span",null,S)),n.createElement("div",{className:"shipping-preview-item","data-type":"delivery-date"},n.createElement("span",null,"Estimated Delivery"),n.createElement("span",null,b)))),n.createElement(l.Y,{region:"summary.lastItem.after"}),n.createElement(u.A,null,n.createElement(o.A,(0,r.__assign)({isTaxIncluded:t,taxes:a},I)),v),n.createElement(u.A,null,n.createElement(d.A,{orderAmount:C,shopperCurrencyCode:h.code,storeCurrencyCode:E.code})),g&&n.createElement(u.A,null,n.createElement("h5",{className:"cart-taxItem cart-taxItem--subtotal optimizedCheckout-contentPrimary","data-test":"tax-text"},n.createElement(c.A,{id:"tax.inclusive_label"})),(a||[]).map((function(e,t){return n.createElement(m.A,{amount:e.amount,key:t,label:e.name,testId:"cart-taxes"})}))))}}}]);
//# sourceMappingURL=order-summary-67b2f0a6.js.map