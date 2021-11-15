import{r as f,u as m,g as y,w as b,o as l,c as u,a as k,F as h,b as v,t as _,d as L,e as C,I as F,A as w,f as A,p as P,h as $,D as q}from"./vendor.a1aa35a2.js";const x=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};x();var B=(c,t)=>{for(const[n,s]of t)c[n]=s;return c};const I={class:"flex"},N=["onClick"],O=["onClick"],j={setup(c){const t=f([]),n=f([]),s=f({base:""}),e=m(y`
    query fileListQuery($base: String) {
      getFileList(base: $base) {
        path
        children {
          name
          path
        }
      }
    }
  `,s),r=o=>{t.value.push(o);const p=t.value.join("\\");s.value.base=p,e.refetch()},i=o=>{console.log(o);const p=t.value.length;t.value.splice(o+1,p-o);const a=t.value.join("\\");s.value.base=a,e.refetch()};return b(()=>{e.result.value&&(t.value=e.result.value.getFileList.path.split("\\"),n.value=e.result.value.getFileList.children.filter(o=>!!o))}),(o,p)=>(l(),u(h,null,[k("div",I,[(l(!0),u(h,null,v(t.value,(a,d)=>(l(),u("div",{class:"text-red-700",onClick:g=>i(d),key:d},_(a)+"\\ ",9,N))),128))]),(l(!0),u(h,null,v(n.value,(a,d)=>(l(),u("div",{onClick:g=>r(a.name),key:d},_(a.name),9,O))),128))],64))}};var D=B(j,[["__scopeId","data-v-bbef0cf2"]]);const S={setup(c){return(t,n)=>(l(),L(D))}};const E=C({uri:"http://localhost:3000/graphql"}),G=new F,M=new w({link:E,cache:G});A({setup(){P(q,M)},render(){return $(S)}}).mount("#app");
