(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(i){if(i.ep)return;i.ep=!0;const n=r(i);fetch(i.href,n)}})();function ct(t,e){var r={};for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,s=Object.getOwnPropertySymbols(t);i<s.length;i++)e.indexOf(s[i])<0&&Object.prototype.propertyIsEnumerable.call(t,s[i])&&(r[s[i]]=t[s[i]]);return r}function Xr(t,e,r,s){function i(n){return n instanceof r?n:new r(function(a){a(n)})}return new(r||(r=Promise))(function(n,a){function o(d){try{c(s.next(d))}catch(u){a(u)}}function l(d){try{c(s.throw(d))}catch(u){a(u)}}function c(d){d.done?n(d.value):i(d.value).then(o,l)}c((s=s.apply(t,e||[])).next())})}const Zr=t=>t?(...e)=>t(...e):(...e)=>fetch(...e);class It extends Error{constructor(e,r="FunctionsError",s){super(e),this.name=r,this.context=s}toJSON(){return{name:this.name,message:this.message,context:this.context}}}class Qr extends It{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class Mt extends It{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class qt extends It{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var wt;(function(t){t.Any="any",t.ApNortheast1="ap-northeast-1",t.ApNortheast2="ap-northeast-2",t.ApSouth1="ap-south-1",t.ApSoutheast1="ap-southeast-1",t.ApSoutheast2="ap-southeast-2",t.CaCentral1="ca-central-1",t.EuCentral1="eu-central-1",t.EuWest1="eu-west-1",t.EuWest2="eu-west-2",t.EuWest3="eu-west-3",t.SaEast1="sa-east-1",t.UsEast1="us-east-1",t.UsWest1="us-west-1",t.UsWest2="us-west-2"})(wt||(wt={}));class es{constructor(e,{headers:r={},customFetch:s,region:i=wt.Any}={}){this.url=e,this.headers=r,this.region=i,this.fetch=Zr(s)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Xr(this,arguments,void 0,function*(r,s={}){var i;let n,a;try{const{headers:o,method:l,body:c,signal:d,timeout:u}=s;let h={},{region:f}=s;f||(f=this.region);const p=new URL(`${this.url}/${r}`);f&&f!=="any"&&(h["x-region"]=f,p.searchParams.set("forceFunctionRegion",f));let g;c&&(o&&!Object.prototype.hasOwnProperty.call(o,"Content-Type")||!o)?typeof Blob<"u"&&c instanceof Blob||c instanceof ArrayBuffer?(h["Content-Type"]="application/octet-stream",g=c):typeof c=="string"?(h["Content-Type"]="text/plain",g=c):typeof FormData<"u"&&c instanceof FormData?g=c:(h["Content-Type"]="application/json",g=JSON.stringify(c)):c&&typeof c!="string"&&!(typeof Blob<"u"&&c instanceof Blob)&&!(c instanceof ArrayBuffer)&&!(typeof FormData<"u"&&c instanceof FormData)?g=JSON.stringify(c):g=c;let w=d;u&&(a=new AbortController,n=setTimeout(()=>a.abort(),u),d?(w=a.signal,d.addEventListener("abort",()=>a.abort())):w=a.signal);const b=yield this.fetch(p.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},h),this.headers),o),body:g,signal:w}).catch(B=>{throw new Qr(B)}),_=b.headers.get("x-relay-error");if(_&&_==="true")throw new Mt(b);if(!b.ok)throw new qt(b);let m=((i=b.headers.get("Content-Type"))!==null&&i!==void 0?i:"text/plain").split(";")[0].trim(),T;return m==="application/json"?T=yield b.json():m==="application/octet-stream"||m==="application/pdf"?T=yield b.blob():m==="text/event-stream"?T=b:m==="multipart/form-data"?T=yield b.formData():T=yield b.text(),{data:T,error:null,response:b}}catch(o){return{data:null,error:o,response:o instanceof qt||o instanceof Mt?o.context:void 0}}finally{n&&clearTimeout(n)}})}}const Er=3,zt=t=>Math.min(1e3*2**t,3e4),ts=[520,503],Tr=["GET","HEAD","OPTIONS"];var Ht=class extends Error{constructor(t){super(t.message),this.name="PostgrestError",this.details=t.details,this.hint=t.hint,this.code=t.code}toJSON(){return{name:this.name,message:this.message,details:this.details,hint:this.hint,code:this.code}}};function Ft(t,e){return new Promise(r=>{if(e!=null&&e.aborted){r();return}const s=setTimeout(()=>{e==null||e.removeEventListener("abort",i),r()},t);function i(){clearTimeout(s),r()}e==null||e.addEventListener("abort",i)})}function rs(t,e,r,s){return!(!s||r>=Er||!Tr.includes(t)||!ts.includes(e))}var ss=class{constructor(t){var e,r,s,i,n;this.shouldThrowOnError=!1,this.retryEnabled=!0,this.method=t.method,this.url=t.url,this.headers=new Headers(t.headers),this.schema=t.schema,this.body=t.body,this.shouldThrowOnError=(e=t.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=t.signal,this.isMaybeSingle=(r=t.isMaybeSingle)!==null&&r!==void 0?r:!1,this.shouldStripNulls=(s=t.shouldStripNulls)!==null&&s!==void 0?s:!1,this.urlLengthLimit=(i=t.urlLengthLimit)!==null&&i!==void 0?i:8e3,this.retryEnabled=(n=t.retry)!==null&&n!==void 0?n:!0,t.fetch?this.fetch=t.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}stripNulls(){if(this.headers.get("Accept")==="text/csv")throw new Error("stripNulls() cannot be used with csv()");return this.shouldStripNulls=!0,this}setHeader(t,e){return this.headers=new Headers(this.headers),this.headers.set(t,e),this}retry(t){return this.retryEnabled=t,this}then(t,e){var r=this;if(this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json"),this.shouldStripNulls){const a=this.headers.get("Accept");a==="application/vnd.pgrst.object+json"?this.headers.set("Accept","application/vnd.pgrst.object+json;nulls=stripped"):(!a||a==="application/json")&&this.headers.set("Accept","application/vnd.pgrst.array+json;nulls=stripped")}const s=this.fetch;let n=(async()=>{let a=0;for(;;){const c={};r.headers.forEach((u,h)=>{c[h]=u}),a>0&&(c["X-Retry-Count"]=String(a));let d;try{d=await s(r.url.toString(),{method:r.method,headers:c,body:JSON.stringify(r.body,(u,h)=>typeof h=="bigint"?h.toString():h),signal:r.signal})}catch(u){if((u==null?void 0:u.name)==="AbortError"||(u==null?void 0:u.code)==="ABORT_ERR"||!Tr.includes(r.method))throw u;if(r.retryEnabled&&a<Er){const h=zt(a);a++,await Ft(h,r.signal);continue}throw u}if(rs(r.method,d.status,a,r.retryEnabled)){var o,l;const u=(o=(l=d.headers)===null||l===void 0?void 0:l.get("Retry-After"))!==null&&o!==void 0?o:null,h=u!==null?Math.max(0,parseInt(u,10)||0)*1e3:zt(a);await d.text(),a++,await Ft(h,r.signal);continue}return await r.processResponse(d)}})();return this.shouldThrowOnError||(n=n.catch(a=>{var o;let l="",c="",d="";const u=a==null?void 0:a.cause;if(u){var h,f,p,g;const _=(h=u==null?void 0:u.message)!==null&&h!==void 0?h:"",m=(f=u==null?void 0:u.code)!==null&&f!==void 0?f:"";l=`${(p=a==null?void 0:a.name)!==null&&p!==void 0?p:"FetchError"}: ${a==null?void 0:a.message}`,l+=`

Caused by: ${(g=u==null?void 0:u.name)!==null&&g!==void 0?g:"Error"}: ${_}`,m&&(l+=` (${m})`),u!=null&&u.stack&&(l+=`
${u.stack}`)}else{var w;l=(w=a==null?void 0:a.stack)!==null&&w!==void 0?w:""}const b=this.url.toString().length;return(a==null?void 0:a.name)==="AbortError"||(a==null?void 0:a.code)==="ABORT_ERR"?(d="",c="Request was aborted (timeout or manual cancellation)",b>this.urlLengthLimit&&(c+=`. Note: Your request URL is ${b} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((u==null?void 0:u.name)==="HeadersOverflowError"||(u==null?void 0:u.code)==="UND_ERR_HEADERS_OVERFLOW")&&(d="",c="HTTP headers exceeded server limits (typically 16KB)",b>this.urlLengthLimit&&(c+=`. Your request URL is ${b} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{success:!1,error:{message:`${(o=a==null?void 0:a.name)!==null&&o!==void 0?o:"FetchError"}: ${a==null?void 0:a.message}`,details:l,hint:c,code:d},data:null,count:null,status:0,statusText:""}})),n.then(t,e)}async processResponse(t){var e=this;let r=null,s=null,i=null,n=t.status,a=t.statusText;if(t.ok){var o,l;if(e.method!=="HEAD"){var c;const h=await t.text();if(h!=="")if(e.headers.get("Accept")==="text/csv")s=h;else if(e.headers.get("Accept")&&(!((c=e.headers.get("Accept"))===null||c===void 0)&&c.includes("application/vnd.pgrst.plan+text")))s=h;else try{s=JSON.parse(h)}catch{if(r={message:h},s=null,e.shouldThrowOnError)throw new Ht({message:h,details:"",hint:"",code:""})}}const d=(o=e.headers.get("Prefer"))===null||o===void 0?void 0:o.match(/count=(exact|planned|estimated)/),u=(l=t.headers.get("content-range"))===null||l===void 0?void 0:l.split("/");d&&u&&u.length>1&&(i=parseInt(u[1])),e.isMaybeSingle&&Array.isArray(s)&&(s.length>1?(r={code:"PGRST116",details:`Results contain ${s.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},s=null,i=null,n=406,a="Not Acceptable"):s.length===1?s=s[0]:s=null)}else{const d=await t.text();try{r=JSON.parse(d),Array.isArray(r)&&t.status===404&&(s=[],r=null,n=200,a="OK")}catch{t.status===404&&d===""?(n=204,a="No Content"):r={message:d}}if(r&&e.shouldThrowOnError)throw new Ht(r)}return{success:r===null,error:r,data:s,count:i,status:n,statusText:a}}returns(){return this}overrideTypes(){return this}},is=class extends ss{throwOnError(){return super.throwOnError()}select(t){let e=!1;const r=(t??"*").split("").map(s=>/\s/.test(s)&&!e?"":(s==='"'&&(e=!e),s)).join("");return this.url.searchParams.set("select",r),this.headers.append("Prefer","return=representation"),this}order(t,{ascending:e=!0,nullsFirst:r,foreignTable:s,referencedTable:i=s}={}){const n=i?`${i}.order`:"order",a=this.url.searchParams.get(n);return this.url.searchParams.set(n,`${a?`${a},`:""}${t}.${e?"asc":"desc"}${r===void 0?"":r?".nullsfirst":".nullslast"}`),this}limit(t,{foreignTable:e,referencedTable:r=e}={}){const s=typeof r>"u"?"limit":`${r}.limit`;return this.url.searchParams.set(s,`${t}`),this}range(t,e,{foreignTable:r,referencedTable:s=r}={}){const i=typeof s>"u"?"offset":`${s}.offset`,n=typeof s>"u"?"limit":`${s}.limit`;return this.url.searchParams.set(i,`${t}`),this.url.searchParams.set(n,`${e-t+1}`),this}abortSignal(t){return this.signal=t,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:t=!1,verbose:e=!1,settings:r=!1,buffers:s=!1,wal:i=!1,format:n="text"}={}){var a;const o=[t?"analyze":null,e?"verbose":null,r?"settings":null,s?"buffers":null,i?"wal":null].filter(Boolean).join("|"),l=(a=this.headers.get("Accept"))!==null&&a!==void 0?a:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${n}; for="${l}"; options=${o};`),n==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(t){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${t}`),this}};const Wt=new RegExp("[,()]");var pe=class extends is{throwOnError(){return super.throwOnError()}eq(t,e){return this.url.searchParams.append(t,`eq.${e}`),this}neq(t,e){return this.url.searchParams.append(t,`neq.${e}`),this}gt(t,e){return this.url.searchParams.append(t,`gt.${e}`),this}gte(t,e){return this.url.searchParams.append(t,`gte.${e}`),this}lt(t,e){return this.url.searchParams.append(t,`lt.${e}`),this}lte(t,e){return this.url.searchParams.append(t,`lte.${e}`),this}like(t,e){return this.url.searchParams.append(t,`like.${e}`),this}likeAllOf(t,e){return this.url.searchParams.append(t,`like(all).{${e.join(",")}}`),this}likeAnyOf(t,e){return this.url.searchParams.append(t,`like(any).{${e.join(",")}}`),this}ilike(t,e){return this.url.searchParams.append(t,`ilike.${e}`),this}ilikeAllOf(t,e){return this.url.searchParams.append(t,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(t,e){return this.url.searchParams.append(t,`ilike(any).{${e.join(",")}}`),this}regexMatch(t,e){return this.url.searchParams.append(t,`match.${e}`),this}regexIMatch(t,e){return this.url.searchParams.append(t,`imatch.${e}`),this}is(t,e){return this.url.searchParams.append(t,`is.${e}`),this}isDistinct(t,e){return this.url.searchParams.append(t,`isdistinct.${e}`),this}in(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Wt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`in.(${r})`),this}notIn(t,e){const r=Array.from(new Set(e)).map(s=>typeof s=="string"&&Wt.test(s)?`"${s}"`:`${s}`).join(",");return this.url.searchParams.append(t,`not.in.(${r})`),this}contains(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cs.{${e.join(",")}}`):this.url.searchParams.append(t,`cs.${JSON.stringify(e)}`),this}containedBy(t,e){return typeof e=="string"?this.url.searchParams.append(t,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(t,`cd.{${e.join(",")}}`):this.url.searchParams.append(t,`cd.${JSON.stringify(e)}`),this}rangeGt(t,e){return this.url.searchParams.append(t,`sr.${e}`),this}rangeGte(t,e){return this.url.searchParams.append(t,`nxl.${e}`),this}rangeLt(t,e){return this.url.searchParams.append(t,`sl.${e}`),this}rangeLte(t,e){return this.url.searchParams.append(t,`nxr.${e}`),this}rangeAdjacent(t,e){return this.url.searchParams.append(t,`adj.${e}`),this}overlaps(t,e){return typeof e=="string"?this.url.searchParams.append(t,`ov.${e}`):this.url.searchParams.append(t,`ov.{${e.join(",")}}`),this}textSearch(t,e,{config:r,type:s}={}){let i="";s==="plain"?i="pl":s==="phrase"?i="ph":s==="websearch"&&(i="w");const n=r===void 0?"":`(${r})`;return this.url.searchParams.append(t,`${i}fts${n}.${e}`),this}match(t){return Object.entries(t).filter(([e,r])=>r!==void 0).forEach(([e,r])=>{this.url.searchParams.append(e,`eq.${r}`)}),this}not(t,e,r){return this.url.searchParams.append(t,`not.${e}.${r}`),this}or(t,{foreignTable:e,referencedTable:r=e}={}){const s=r?`${r}.or`:"or";return this.url.searchParams.append(s,`(${t})`),this}filter(t,e,r){return this.url.searchParams.append(t,`${e}.${r}`),this}},ns=class{constructor(t,{headers:e={},schema:r,fetch:s,urlLengthLimit:i=8e3,retry:n}){this.url=t,this.headers=new Headers(e),this.schema=r,this.fetch=s,this.urlLengthLimit=i,this.retry=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(t,e){const{head:r=!1,count:s}=e??{},i=r?"HEAD":"GET";let n=!1;const a=(t??"*").split("").map(c=>/\s/.test(c)&&!n?"":(c==='"'&&(n=!n),c)).join(""),{url:o,headers:l}=this.cloneRequestState();return o.searchParams.set("select",a),s&&l.append("Prefer",`count=${s}`),new pe({method:i,url:o,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}insert(t,{count:e,defaultToNull:r=!0}={}){var s;const i="POST",{url:n,headers:a}=this.cloneRequestState();if(e&&a.append("Prefer",`count=${e}`),r||a.append("Prefer","missing=default"),Array.isArray(t)){const o=t.reduce((l,c)=>l.concat(Object.keys(c)),[]);if(o.length>0){const l=[...new Set(o)].map(c=>`"${c}"`);n.searchParams.set("columns",l.join(","))}}return new pe({method:i,url:n,headers:a,schema:this.schema,body:t,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}upsert(t,{onConflict:e,ignoreDuplicates:r=!1,count:s,defaultToNull:i=!0}={}){var n;const a="POST",{url:o,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${r?"ignore":"merge"}-duplicates`),e!==void 0&&o.searchParams.set("on_conflict",e),s&&l.append("Prefer",`count=${s}`),i||l.append("Prefer","missing=default"),Array.isArray(t)){const c=t.reduce((d,u)=>d.concat(Object.keys(u)),[]);if(c.length>0){const d=[...new Set(c)].map(u=>`"${u}"`);o.searchParams.set("columns",d.join(","))}}return new pe({method:a,url:o,headers:l,schema:this.schema,body:t,fetch:(n=this.fetch)!==null&&n!==void 0?n:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}update(t,{count:e}={}){var r;const s="PATCH",{url:i,headers:n}=this.cloneRequestState();return e&&n.append("Prefer",`count=${e}`),new pe({method:s,url:i,headers:n,schema:this.schema,body:t,fetch:(r=this.fetch)!==null&&r!==void 0?r:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}delete({count:t}={}){var e;const r="DELETE",{url:s,headers:i}=this.cloneRequestState();return t&&i.append("Prefer",`count=${t}`),new pe({method:r,url:s,headers:i,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};function Ie(t){"@babel/helpers - typeof";return Ie=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ie(t)}function as(t,e){if(Ie(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Ie(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function os(t){var e=as(t,"string");return Ie(e)=="symbol"?e:e+""}function ls(t,e,r){return(e=os(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Kt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function ze(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Kt(Object(r),!0).forEach(function(s){ls(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Kt(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}var cs=class Ar{constructor(e,{headers:r={},schema:s,fetch:i,timeout:n,urlLengthLimit:a=8e3,retry:o}={}){this.url=e,this.headers=new Headers(r),this.schemaName=s,this.urlLengthLimit=a;const l=i??globalThis.fetch;n!==void 0&&n>0?this.fetch=(c,d)=>{const u=new AbortController,h=setTimeout(()=>u.abort(),n),f=d==null?void 0:d.signal;if(f){if(f.aborted)return clearTimeout(h),l(c,d);const p=()=>{clearTimeout(h),u.abort()};return f.addEventListener("abort",p,{once:!0}),l(c,ze(ze({},d),{},{signal:u.signal})).finally(()=>{clearTimeout(h),f.removeEventListener("abort",p)})}return l(c,ze(ze({},d),{},{signal:u.signal})).finally(()=>clearTimeout(h))}:this.fetch=l,this.retry=o}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new ns(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}schema(e){return new Ar(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}rpc(e,r={},{head:s=!1,get:i=!1,count:n}={}){var a;let o;const l=new URL(`${this.url}/rpc/${e}`);let c;const d=f=>f!==null&&typeof f=="object"&&(!Array.isArray(f)||f.some(d)),u=s&&Object.values(r).some(d);u?(o="POST",c=r):s||i?(o=s?"HEAD":"GET",Object.entries(r).filter(([f,p])=>p!==void 0).map(([f,p])=>[f,Array.isArray(p)?`{${p.join(",")}}`:`${p}`]).forEach(([f,p])=>{l.searchParams.append(f,p)})):(o="POST",c=r);const h=new Headers(this.headers);return u?h.set("Prefer",n?`count=${n},return=minimal`:"return=minimal"):n&&h.set("Prefer",`count=${n}`),new pe({method:o,url:l,headers:h,schema:this.schemaName,body:c,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit,retry:this.retry})}};class ds{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",wsConstructor:WebSocket};const r=globalThis;if(typeof globalThis<"u"&&typeof r.WebSocket<"u")return{type:"native",wsConstructor:r.WebSocket};const s=typeof global<"u"?global:void 0;if(s&&typeof s.WebSocket<"u")return{type:"native",wsConstructor:s.WebSocket};if(typeof globalThis<"u"&&typeof r.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&r.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const i=globalThis.process;if(i){const n=i.versions;if(n&&n.node){const a=n.node,o=parseInt(a.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",wsConstructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.wsConstructor)return e.wsConstructor;let r=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(r+=`

Suggested solution: ${e.workaround}`),new Error(r)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const us="2.108.2",hs=`realtime-js/${us}`,fs="1.0.0",Rr="2.0.0",ps=Rr,gs=1e4,vs=100,re={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Cr={close:"phx_close",error:"phx_error",join:"phx_join",leave:"phx_leave",access_token:"access_token"},_t={connecting:"connecting",closing:"closing",closed:"closed"};class ms{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,r){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return r(this._binaryEncodeUserBroadcastPush(e));let s=[e.join_ref,e.ref,e.topic,e.event,e.payload];return r(JSON.stringify(s))}_binaryEncodeUserBroadcastPush(e){var r;return this._isArrayBuffer((r=e.payload)===null||r===void 0?void 0:r.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,i)}_encodeJsonUserBroadcastPush(e){var r,s;const i=(s=(r=e.payload)===null||r===void 0?void 0:r.payload)!==null&&s!==void 0?s:{},a=new TextEncoder().encode(JSON.stringify(i)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,a)}_encodeUserBroadcastPush(e,r,s){var i,n;const a=e.topic,o=(i=e.ref)!==null&&i!==void 0?i:"",l=(n=e.join_ref)!==null&&n!==void 0?n:"",c=e.payload.event,d=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},u=Object.keys(d).length===0?"":JSON.stringify(d);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(o.length>255)throw new Error(`ref length ${o.length} exceeds maximum of 255`);if(a.length>255)throw new Error(`topic length ${a.length} exceeds maximum of 255`);if(c.length>255)throw new Error(`userEvent length ${c.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`metadata length ${u.length} exceeds maximum of 255`);const h=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+o.length+a.length+c.length+u.length,f=new ArrayBuffer(this.HEADER_LENGTH+h);let p=new DataView(f),g=0;p.setUint8(g++,this.KINDS.userBroadcastPush),p.setUint8(g++,l.length),p.setUint8(g++,o.length),p.setUint8(g++,a.length),p.setUint8(g++,c.length),p.setUint8(g++,u.length),p.setUint8(g++,r),Array.from(l,b=>p.setUint8(g++,b.charCodeAt(0))),Array.from(o,b=>p.setUint8(g++,b.charCodeAt(0))),Array.from(a,b=>p.setUint8(g++,b.charCodeAt(0))),Array.from(c,b=>p.setUint8(g++,b.charCodeAt(0))),Array.from(u,b=>p.setUint8(g++,b.charCodeAt(0)));var w=new Uint8Array(f.byteLength+s.byteLength);return w.set(new Uint8Array(f),0),w.set(new Uint8Array(s),f.byteLength),w.buffer}decode(e,r){if(this._isArrayBuffer(e)){let s=this._binaryDecode(e);return r(s)}if(typeof e=="string"){const s=JSON.parse(e),[i,n,a,o,l]=s;return r({join_ref:i,ref:n,topic:a,event:o,payload:l})}return r({})}_binaryDecode(e){const r=new DataView(e),s=r.getUint8(0),i=new TextDecoder;switch(s){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,r,i)}}_decodeUserBroadcast(e,r,s){const i=r.getUint8(1),n=r.getUint8(2),a=r.getUint8(3),o=r.getUint8(4);let l=this.HEADER_LENGTH+4;const c=s.decode(e.slice(l,l+i));l=l+i;const d=s.decode(e.slice(l,l+n));l=l+n;const u=s.decode(e.slice(l,l+a));l=l+a;const h=e.slice(l,e.byteLength),f=o===this.JSON_ENCODING?JSON.parse(s.decode(h)):h,p={type:this.BROADCAST_EVENT,event:d,payload:f};return a>0&&(p.meta=JSON.parse(u)),{join_ref:null,ref:null,topic:c,event:this.BROADCAST_EVENT,payload:p}}_isArrayBuffer(e){var r;return e instanceof ArrayBuffer||((r=e==null?void 0:e.constructor)===null||r===void 0?void 0:r.name)==="ArrayBuffer"}_pick(e,r){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([s])=>r.includes(s)))}}var A;(function(t){t.abstime="abstime",t.bool="bool",t.date="date",t.daterange="daterange",t.float4="float4",t.float8="float8",t.int2="int2",t.int4="int4",t.int4range="int4range",t.int8="int8",t.int8range="int8range",t.json="json",t.jsonb="jsonb",t.money="money",t.numeric="numeric",t.oid="oid",t.reltime="reltime",t.text="text",t.time="time",t.timestamp="timestamp",t.timestamptz="timestamptz",t.timetz="timetz",t.tsrange="tsrange",t.tstzrange="tstzrange"})(A||(A={}));const Vt=(t,e,r={})=>{var s;const i=(s=r.skipTypes)!==null&&s!==void 0?s:[];return e?Object.keys(e).reduce((n,a)=>(n[a]=ys(a,t,e,i),n),{}):{}},ys=(t,e,r,s)=>{const i=e.find(o=>o.name===t),n=i==null?void 0:i.type,a=r[t];return n&&!s.includes(n)?Pr(n,a):kt(a)},Pr=(t,e)=>{if(t.charAt(0)==="_"){const r=t.slice(1,t.length);return ks(e,r)}switch(t){case A.bool:return bs(e);case A.float4:case A.float8:case A.int2:case A.int4:case A.int8:case A.numeric:case A.oid:return ws(e);case A.json:case A.jsonb:return _s(e);case A.timestamp:return Ss(e);case A.abstime:case A.date:case A.daterange:case A.int4range:case A.int8range:case A.money:case A.reltime:case A.text:case A.time:case A.timestamptz:case A.timetz:case A.tsrange:case A.tstzrange:return kt(e);default:return kt(e)}},kt=t=>t,bs=t=>{switch(t){case"t":return!0;case"f":return!1;default:return t}},ws=t=>{if(typeof t=="string"){const e=parseFloat(t);if(!Number.isNaN(e))return e}return t},_s=t=>{if(typeof t=="string")try{return JSON.parse(t)}catch{return t}return t},ks=(t,e)=>{if(typeof t!="string")return t;const r=t.length-1,s=t[r];if(t[0]==="{"&&s==="}"){let n;const a=t.slice(1,r);try{n=JSON.parse("["+a+"]")}catch{n=a?a.split(","):[]}return n.map(o=>Pr(e,o))}return t},Ss=t=>typeof t=="string"?t.replace(" ","T"):t,Or=t=>{const e=new URL(t);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};var Ce=t=>typeof t=="function"?t:function(){return t},xs=typeof self<"u"?self:null,ge=typeof window<"u"?window:null,V=xs||ge||globalThis,Es="2.0.0",Ts=1e4,As=1e3,G={connecting:0,open:1,closing:2,closed:3},N={closed:"closed",errored:"errored",joined:"joined",joining:"joining",leaving:"leaving"},Z={close:"phx_close",error:"phx_error",join:"phx_join",reply:"phx_reply",leave:"phx_leave"},St={longpoll:"longpoll",websocket:"websocket"},Rs={complete:4},xt="base64url.bearer.phx.",He=class{constructor(t,e,r,s){this.channel=t,this.event=e,this.payload=r||function(){return{}},this.receivedResp=null,this.timeout=s,this.timeoutTimer=null,this.recHooks=[],this.sent=!1,this.ref=void 0}resend(t){this.timeout=t,this.reset(),this.send()}send(){this.hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload(),ref:this.ref,join_ref:this.channel.joinRef()}))}receive(t,e){return this.hasReceived(t)&&e(this.receivedResp.response),this.recHooks.push({status:t,callback:e}),this}reset(){this.cancelRefEvent(),this.ref=null,this.refEvent=null,this.receivedResp=null,this.sent=!1}destroy(){this.cancelRefEvent(),this.cancelTimeout()}matchReceive({status:t,response:e,_ref:r}){this.recHooks.filter(s=>s.status===t).forEach(s=>s.callback(e))}cancelRefEvent(){this.refEvent&&this.channel.off(this.refEvent)}cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=null}startTimeout(){this.timeoutTimer&&this.cancelTimeout(),this.ref=this.channel.socket.makeRef(),this.refEvent=this.channel.replyEventName(this.ref),this.channel.on(this.refEvent,t=>{this.cancelRefEvent(),this.cancelTimeout(),this.receivedResp=t,this.matchReceive(t)}),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}hasReceived(t){return this.receivedResp&&this.receivedResp.status===t}trigger(t,e){this.channel.trigger(this.refEvent,{status:t,response:e})}},$r=class{constructor(t,e){this.callback=t,this.timerCalc=e,this.timer=void 0,this.tries=0}reset(){this.tries=0,clearTimeout(this.timer)}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}},Cs=class{constructor(t,e,r){this.state=N.closed,this.topic=t,this.params=Ce(e||{}),this.socket=r,this.bindings=[],this.bindingRef=0,this.timeout=this.socket.timeout,this.joinedOnce=!1,this.joinPush=new He(this,Z.join,this.params,this.timeout),this.pushBuffer=[],this.stateChangeRefs=[],this.rejoinTimer=new $r(()=>{this.socket.isConnected()&&this.rejoin()},this.socket.rejoinAfterMs),this.stateChangeRefs.push(this.socket.onError(()=>this.rejoinTimer.reset())),this.stateChangeRefs.push(this.socket.onOpen(()=>{this.rejoinTimer.reset(),this.isErrored()&&this.rejoin()})),this.joinPush.receive("ok",()=>{this.state=N.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this.joinPush.receive("error",s=>{this.state=N.errored,this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.onClose(()=>{this.rejoinTimer.reset(),this.socket.hasLogger()&&this.socket.log("channel",`close ${this.topic}`),this.state=N.closed,this.socket.remove(this)}),this.onError(s=>{this.socket.hasLogger()&&this.socket.log("channel",`error ${this.topic}`,s),this.isJoining()&&this.joinPush.reset(),this.state=N.errored,this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.joinPush.receive("timeout",()=>{this.socket.hasLogger()&&this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),new He(this,Z.leave,Ce({}),this.timeout).send(),this.state=N.errored,this.joinPush.reset(),this.socket.isConnected()&&this.rejoinTimer.scheduleTimeout()}),this.on(Z.reply,(s,i)=>{this.trigger(this.replyEventName(i),s)})}join(t=this.timeout){if(this.joinedOnce)throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");return this.timeout=t,this.joinedOnce=!0,this.rejoin(),this.joinPush}teardown(){this.pushBuffer.forEach(t=>t.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=N.closed,this.bindings=[]}onClose(t){this.on(Z.close,t)}onError(t){return this.on(Z.error,e=>t(e))}on(t,e){let r=this.bindingRef++;return this.bindings.push({event:t,ref:r,callback:e}),r}off(t,e){this.bindings=this.bindings.filter(r=>!(r.event===t&&(typeof e>"u"||e===r.ref)))}canPush(){return this.socket.isConnected()&&this.isJoined()}push(t,e,r=this.timeout){if(e=e||{},!this.joinedOnce)throw new Error(`tried to push '${t}' to '${this.topic}' before joining. Use channel.join() before pushing events`);let s=new He(this,t,function(){return e},r);return this.canPush()?s.send():(s.startTimeout(),this.pushBuffer.push(s)),s}leave(t=this.timeout){this.rejoinTimer.reset(),this.joinPush.cancelTimeout(),this.state=N.leaving;let e=()=>{this.socket.hasLogger()&&this.socket.log("channel",`leave ${this.topic}`),this.trigger(Z.close,"leave")},r=new He(this,Z.leave,Ce({}),t);return r.receive("ok",()=>e()).receive("timeout",()=>e()),r.send(),this.canPush()||r.trigger("ok",{}),r}onMessage(t,e,r){return e}filterBindings(t,e,r){return!0}isMember(t,e,r,s){return this.topic!==t?!1:s&&s!==this.joinRef()?(this.socket.hasLogger()&&this.socket.log("channel","dropping outdated message",{topic:t,event:e,payload:r,joinRef:s}),!1):!0}joinRef(){return this.joinPush.ref}rejoin(t=this.timeout){this.isLeaving()||(this.socket.leaveOpenTopic(this.topic),this.state=N.joining,this.joinPush.resend(t))}trigger(t,e,r,s){let i=this.onMessage(t,e,r,s);if(e&&!i)throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");let n=this.bindings.filter(a=>a.event===t&&this.filterBindings(a,e,r));for(let a=0;a<n.length;a++)n[a].callback(i,r,s||this.joinRef())}replyEventName(t){return`chan_reply_${t}`}isClosed(){return this.state===N.closed}isErrored(){return this.state===N.errored}isJoined(){return this.state===N.joined}isJoining(){return this.state===N.joining}isLeaving(){return this.state===N.leaving}},tt=class{static request(t,e,r,s,i,n,a){if(V.XDomainRequest){let o=new V.XDomainRequest;return this.xdomainRequest(o,t,e,s,i,n,a)}else if(V.XMLHttpRequest){let o=new V.XMLHttpRequest;return this.xhrRequest(o,t,e,r,s,i,n,a)}else{if(V.fetch&&V.AbortController)return this.fetchRequest(t,e,r,s,i,n,a);throw new Error("No suitable XMLHttpRequest implementation found")}}static fetchRequest(t,e,r,s,i,n,a){let o={method:t,headers:r,body:s},l=null;return i&&(l=new AbortController,setTimeout(()=>l.abort(),i),o.signal=l.signal),V.fetch(e,o).then(c=>c.text()).then(c=>this.parseJSON(c)).then(c=>a&&a(c)).catch(c=>{c.name==="AbortError"&&n?n():a&&a(null)}),l}static xdomainRequest(t,e,r,s,i,n,a){return t.timeout=i,t.open(e,r),t.onload=()=>{let o=this.parseJSON(t.responseText);a&&a(o)},n&&(t.ontimeout=n),t.onprogress=()=>{},t.send(s),t}static xhrRequest(t,e,r,s,i,n,a,o){t.open(e,r,!0),t.timeout=n;for(let[l,c]of Object.entries(s))t.setRequestHeader(l,c);return t.onerror=()=>o&&o(null),t.onreadystatechange=()=>{if(t.readyState===Rs.complete&&o){let l=this.parseJSON(t.responseText);o(l)}},a&&(t.ontimeout=a),t.send(i),t}static parseJSON(t){if(!t||t==="")return null;try{return JSON.parse(t)}catch{return console&&console.log("failed to parse JSON response",t),null}}static serialize(t,e){let r=[];for(var s in t){if(!Object.prototype.hasOwnProperty.call(t,s))continue;let i=e?`${e}[${s}]`:s,n=t[s];typeof n=="object"?r.push(this.serialize(n,i)):r.push(encodeURIComponent(i)+"="+encodeURIComponent(n))}return r.join("&")}static appendParams(t,e){if(Object.keys(e).length===0)return t;let r=t.match(/\?/)?"&":"?";return`${t}${r}${this.serialize(e)}`}},Ps=t=>{let e="",r=new Uint8Array(t),s=r.byteLength;for(let i=0;i<s;i++)e+=String.fromCharCode(r[i]);return btoa(e)},de=class{constructor(t,e){e&&e.length===2&&e[1].startsWith(xt)&&(this.authToken=atob(e[1].slice(xt.length))),this.endPoint=null,this.token=null,this.skipHeartbeat=!0,this.reqs=new Set,this.awaitingBatchAck=!1,this.currentBatch=null,this.currentBatchTimer=null,this.batchBuffer=[],this.onopen=function(){},this.onerror=function(){},this.onmessage=function(){},this.onclose=function(){},this.pollEndpoint=this.normalizeEndpoint(t),this.readyState=G.connecting,setTimeout(()=>this.poll(),0)}normalizeEndpoint(t){return t.replace("ws://","http://").replace("wss://","https://").replace(new RegExp("(.*)/"+St.websocket),"$1/"+St.longpoll)}endpointURL(){return tt.appendParams(this.pollEndpoint,{token:this.token})}closeAndRetry(t,e,r){this.close(t,e,r),this.readyState=G.connecting}ontimeout(){this.onerror("timeout"),this.closeAndRetry(1005,"timeout",!1)}isActive(){return this.readyState===G.open||this.readyState===G.connecting}poll(){const t={Accept:"application/json"};this.authToken&&(t["X-Phoenix-AuthToken"]=this.authToken),this.ajax("GET",t,null,()=>this.ontimeout(),e=>{if(e){var{status:r,token:s,messages:i}=e;if(r===410&&this.token!==null){this.onerror(410),this.closeAndRetry(3410,"session_gone",!1);return}this.token=s}else r=0;switch(r){case 200:i.forEach(n=>{setTimeout(()=>this.onmessage({data:n}),0)}),this.poll();break;case 204:this.poll();break;case 410:this.readyState=G.open,this.onopen({}),this.poll();break;case 403:this.onerror(403),this.close(1008,"forbidden",!1);break;case 0:case 500:this.onerror(500),this.closeAndRetry(1011,"internal server error",500);break;default:throw new Error(`unhandled poll status ${r}`)}})}send(t){typeof t!="string"&&(t=Ps(t)),this.currentBatch?this.currentBatch.push(t):this.awaitingBatchAck?this.batchBuffer.push(t):(this.currentBatch=[t],this.currentBatchTimer=setTimeout(()=>{this.batchSend(this.currentBatch),this.currentBatch=null},0))}batchSend(t){this.awaitingBatchAck=!0,this.ajax("POST",{"Content-Type":"application/x-ndjson"},t.join(`
`),()=>this.onerror("timeout"),e=>{this.awaitingBatchAck=!1,!e||e.status!==200?(this.onerror(e&&e.status),this.closeAndRetry(1011,"internal server error",!1)):this.batchBuffer.length>0&&(this.batchSend(this.batchBuffer),this.batchBuffer=[])})}close(t,e,r){for(let i of this.reqs)i.abort();this.readyState=G.closed;let s=Object.assign({code:1e3,reason:void 0,wasClean:!0},{code:t,reason:e,wasClean:r});this.batchBuffer=[],clearTimeout(this.currentBatchTimer),this.currentBatchTimer=null,typeof CloseEvent<"u"?this.onclose(new CloseEvent("close",s)):this.onclose(s)}ajax(t,e,r,s,i){let n,a=()=>{this.reqs.delete(n),s()};n=tt.request(t,this.endpointURL(),e,r,this.timeout,a,o=>{this.reqs.delete(n),this.isActive()&&i(o)}),this.reqs.add(n)}},Os=class Te{constructor(e,r={}){let s=r.events||{state:"presence_state",diff:"presence_diff"};this.state={},this.pendingDiffs=[],this.channel=e,this.joinRef=null,this.caller={onJoin:function(){},onLeave:function(){},onSync:function(){}},this.channel.on(s.state,i=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.joinRef=this.channel.joinRef(),this.state=Te.syncState(this.state,i,n,a),this.pendingDiffs.forEach(l=>{this.state=Te.syncDiff(this.state,l,n,a)}),this.pendingDiffs=[],o()}),this.channel.on(s.diff,i=>{let{onJoin:n,onLeave:a,onSync:o}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(i):(this.state=Te.syncDiff(this.state,i,n,a),o())})}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}list(e){return Te.list(this.state,e)}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel.joinRef()}static syncState(e,r,s,i){let n=this.clone(e),a={},o={};return this.map(n,(l,c)=>{r[l]||(o[l]=c)}),this.map(r,(l,c)=>{let d=n[l];if(d){let u=c.metas.map(g=>g.phx_ref),h=d.metas.map(g=>g.phx_ref),f=c.metas.filter(g=>h.indexOf(g.phx_ref)<0),p=d.metas.filter(g=>u.indexOf(g.phx_ref)<0);f.length>0&&(a[l]=c,a[l].metas=f),p.length>0&&(o[l]=this.clone(d),o[l].metas=p)}else a[l]=c}),this.syncDiff(n,{joins:a,leaves:o},s,i)}static syncDiff(e,r,s,i){let{joins:n,leaves:a}=this.clone(r);return s||(s=function(){}),i||(i=function(){}),this.map(n,(o,l)=>{let c=e[o];if(e[o]=this.clone(l),c){let d=e[o].metas.map(h=>h.phx_ref),u=c.metas.filter(h=>d.indexOf(h.phx_ref)<0);e[o].metas.unshift(...u)}s(o,c,l)}),this.map(a,(o,l)=>{let c=e[o];if(!c)return;let d=l.metas.map(u=>u.phx_ref);c.metas=c.metas.filter(u=>d.indexOf(u.phx_ref)<0),i(o,c,l),c.metas.length===0&&delete e[o]}),e}static list(e,r){return r||(r=function(s,i){return i}),this.map(e,(s,i)=>r(s,i))}static map(e,r){return Object.getOwnPropertyNames(e).map(s=>r(s,e[s]))}static clone(e){return JSON.parse(JSON.stringify(e))}},Fe={HEADER_LENGTH:1,META_LENGTH:4,KINDS:{push:0,reply:1,broadcast:2},encode(t,e){if(t.payload.constructor===ArrayBuffer)return e(this.binaryEncode(t));{let r=[t.join_ref,t.ref,t.topic,t.event,t.payload];return e(JSON.stringify(r))}},decode(t,e){if(t.constructor===ArrayBuffer)return e(this.binaryDecode(t));{let[r,s,i,n,a]=JSON.parse(t);return e({join_ref:r,ref:s,topic:i,event:n,payload:a})}},binaryEncode(t){let{join_ref:e,ref:r,event:s,topic:i,payload:n}=t,a=this.META_LENGTH+e.length+r.length+i.length+s.length,o=new ArrayBuffer(this.HEADER_LENGTH+a),l=new DataView(o),c=0;l.setUint8(c++,this.KINDS.push),l.setUint8(c++,e.length),l.setUint8(c++,r.length),l.setUint8(c++,i.length),l.setUint8(c++,s.length),Array.from(e,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(r,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(i,u=>l.setUint8(c++,u.charCodeAt(0))),Array.from(s,u=>l.setUint8(c++,u.charCodeAt(0)));var d=new Uint8Array(o.byteLength+n.byteLength);return d.set(new Uint8Array(o),0),d.set(new Uint8Array(n),o.byteLength),d.buffer},binaryDecode(t){let e=new DataView(t),r=e.getUint8(0),s=new TextDecoder;switch(r){case this.KINDS.push:return this.decodePush(t,e,s);case this.KINDS.reply:return this.decodeReply(t,e,s);case this.KINDS.broadcast:return this.decodeBroadcast(t,e,s)}},decodePush(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=e.getUint8(3),a=this.HEADER_LENGTH+this.META_LENGTH-1,o=r.decode(t.slice(a,a+s));a=a+s;let l=r.decode(t.slice(a,a+i));a=a+i;let c=r.decode(t.slice(a,a+n));a=a+n;let d=t.slice(a,t.byteLength);return{join_ref:o,ref:null,topic:l,event:c,payload:d}},decodeReply(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=e.getUint8(3),a=e.getUint8(4),o=this.HEADER_LENGTH+this.META_LENGTH,l=r.decode(t.slice(o,o+s));o=o+s;let c=r.decode(t.slice(o,o+i));o=o+i;let d=r.decode(t.slice(o,o+n));o=o+n;let u=r.decode(t.slice(o,o+a));o=o+a;let h=t.slice(o,t.byteLength),f={status:u,response:h};return{join_ref:l,ref:c,topic:d,event:Z.reply,payload:f}},decodeBroadcast(t,e,r){let s=e.getUint8(1),i=e.getUint8(2),n=this.HEADER_LENGTH+2,a=r.decode(t.slice(n,n+s));n=n+s;let o=r.decode(t.slice(n,n+i));n=n+i;let l=t.slice(n,t.byteLength);return{join_ref:null,ref:null,topic:a,event:o,payload:l}}},$s=class{constructor(t,e={}){this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.channels=[],this.sendBuffer=[],this.ref=0,this.fallbackRef=null,this.timeout=e.timeout||Ts,this.transport=e.transport||V.WebSocket||de,this.conn=void 0,this.primaryPassedHealthCheck=!1,this.longPollFallbackMs=e.longPollFallbackMs,this.fallbackTimer=null;let r=null;try{r=V&&V.sessionStorage}catch{}this.sessionStore=e.sessionStorage||r,this.establishedConnections=0,this.defaultEncoder=Fe.encode.bind(Fe),this.defaultDecoder=Fe.decode.bind(Fe),this.closeWasClean=!0,this.disconnecting=!1,this.binaryType=e.binaryType||"arraybuffer",this.connectClock=1,this.pageHidden=!1,this.encode=void 0,this.decode=void 0,this.transport!==de?(this.encode=e.encode||this.defaultEncoder,this.decode=e.decode||this.defaultDecoder):(this.encode=this.defaultEncoder,this.decode=this.defaultDecoder);let s=null;ge&&ge.addEventListener&&(ge.addEventListener("pagehide",i=>{this.conn&&(this.disconnect(),s=this.connectClock)}),ge.addEventListener("pageshow",i=>{s===this.connectClock&&(s=null,this.connect())}),ge.addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"?this.pageHidden=!0:(this.pageHidden=!1,!this.isConnected()&&!this.closeWasClean&&this.teardown(()=>this.connect()))})),this.heartbeatIntervalMs=e.heartbeatIntervalMs||3e4,this.autoSendHeartbeat=e.autoSendHeartbeat??!0,this.heartbeatCallback=e.heartbeatCallback??(()=>{}),this.rejoinAfterMs=i=>e.rejoinAfterMs?e.rejoinAfterMs(i):[1e3,2e3,5e3][i-1]||1e4,this.reconnectAfterMs=i=>e.reconnectAfterMs?e.reconnectAfterMs(i):[10,50,100,150,200,250,500,1e3,2e3][i-1]||5e3,this.logger=e.logger||null,!this.logger&&e.debug&&(this.logger=(i,n,a)=>{console.log(`${i}: ${n}`,a)}),this.longpollerTimeout=e.longpollerTimeout||2e4,this.params=Ce(e.params||{}),this.endPoint=`${t}/${St.websocket}`,this.vsn=e.vsn||Es,this.heartbeatTimeoutTimer=null,this.heartbeatTimer=null,this.heartbeatSentAt=null,this.pendingHeartbeatRef=null,this.reconnectTimer=new $r(()=>{if(this.pageHidden){this.log("Not reconnecting as page is hidden!"),this.teardown();return}this.teardown(async()=>{e.beforeReconnect&&await e.beforeReconnect(),this.connect()})},this.reconnectAfterMs),this.authToken=e.authToken}getLongPollTransport(){return de}replaceTransport(t){this.connectClock++,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.conn&&(this.conn.close(),this.conn=null),this.transport=t}protocol(){return location.protocol.match(/^https/)?"wss":"ws"}endPointURL(){let t=tt.appendParams(tt.appendParams(this.endPoint,this.params()),{vsn:this.vsn});return t.charAt(0)!=="/"?t:t.charAt(1)==="/"?`${this.protocol()}:${t}`:`${this.protocol()}://${location.host}${t}`}disconnect(t,e,r){this.connectClock++,this.disconnecting=!0,this.closeWasClean=!0,clearTimeout(this.fallbackTimer),this.reconnectTimer.reset(),this.teardown(()=>{this.disconnecting=!1,t&&t()},e,r)}connect(t){t&&(console&&console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor"),this.params=Ce(t)),!(this.conn&&!this.disconnecting)&&(this.longPollFallbackMs&&this.transport!==de?this.connectWithFallback(de,this.longPollFallbackMs):this.transportConnect())}log(t,e,r){this.logger&&this.logger(t,e,r)}hasLogger(){return this.logger!==null}onOpen(t){let e=this.makeRef();return this.stateChangeCallbacks.open.push([e,t]),e}onClose(t){let e=this.makeRef();return this.stateChangeCallbacks.close.push([e,t]),e}onError(t){let e=this.makeRef();return this.stateChangeCallbacks.error.push([e,t]),e}onMessage(t){let e=this.makeRef();return this.stateChangeCallbacks.message.push([e,t]),e}onHeartbeat(t){this.heartbeatCallback=t}ping(t){if(!this.isConnected())return!1;let e=this.makeRef(),r=Date.now();this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:e});let s=this.onMessage(i=>{i.ref===e&&(this.off([s]),t(Date.now()-r))});return!0}transportName(t){switch(t){case de:return"LongPoll";default:return t.name}}transportConnect(){this.connectClock++,this.closeWasClean=!1;let t;this.authToken&&(t=["phoenix",`${xt}${btoa(this.authToken).replace(/=/g,"")}`]),this.conn=new this.transport(this.endPointURL(),t),this.conn.binaryType=this.binaryType,this.conn.timeout=this.longpollerTimeout,this.conn.onopen=()=>this.onConnOpen(),this.conn.onerror=e=>this.onConnError(e),this.conn.onmessage=e=>this.onConnMessage(e),this.conn.onclose=e=>this.onConnClose(e)}getSession(t){return this.sessionStore&&this.sessionStore.getItem(t)}storeSession(t,e){this.sessionStore&&this.sessionStore.setItem(t,e)}connectWithFallback(t,e=2500){clearTimeout(this.fallbackTimer);let r=!1,s=!0,i,n,a=this.transportName(t),o=l=>{this.log("transport",`falling back to ${a}...`,l),this.off([i,n]),s=!1,this.replaceTransport(t),this.transportConnect()};if(this.getSession(`phx:fallback:${a}`))return o("memorized");this.fallbackTimer=setTimeout(o,e),n=this.onError(l=>{this.log("transport","error",l),s&&!r&&(clearTimeout(this.fallbackTimer),o(l))}),this.fallbackRef&&this.off([this.fallbackRef]),this.fallbackRef=this.onOpen(()=>{if(r=!0,!s){let l=this.transportName(t);return this.primaryPassedHealthCheck||this.storeSession(`phx:fallback:${l}`,"true"),this.log("transport",`established ${l} fallback`)}clearTimeout(this.fallbackTimer),this.fallbackTimer=setTimeout(o,e),this.ping(l=>{this.log("transport","connected to primary after",l),this.primaryPassedHealthCheck=!0,clearTimeout(this.fallbackTimer)})}),this.transportConnect()}clearHeartbeats(){clearTimeout(this.heartbeatTimer),clearTimeout(this.heartbeatTimeoutTimer)}onConnOpen(){this.hasLogger()&&this.log("transport",`connected to ${this.endPointURL()}`),this.closeWasClean=!1,this.disconnecting=!1,this.establishedConnections++,this.flushSendBuffer(),this.reconnectTimer.reset(),this.autoSendHeartbeat&&this.resetHeartbeat(),this.triggerStateCallbacks("open")}heartbeatTimeout(){if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.hasLogger()&&this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this.triggerChanError(new Error("heartbeat timeout")),this.closeWasClean=!1,this.teardown(()=>this.reconnectTimer.scheduleTimeout(),As,"heartbeat timeout")}}resetHeartbeat(){this.conn&&this.conn.skipHeartbeat||(this.pendingHeartbeatRef=null,this.clearHeartbeats(),this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}teardown(t,e,r){if(!this.conn)return t&&t();const s=this.conn;this.waitForBufferDone(s,()=>{e?s.close(e,r||""):s.close(),this.waitForSocketClosed(s,()=>{this.conn===s&&(this.conn.onopen=function(){},this.conn.onerror=function(){},this.conn.onmessage=function(){},this.conn.onclose=function(){},this.conn=null),t&&t()})})}waitForBufferDone(t,e,r=1){if(r===5||!t.bufferedAmount){e();return}setTimeout(()=>{this.waitForBufferDone(t,e,r+1)},150*r)}waitForSocketClosed(t,e,r=1){if(r===5||t.readyState===G.closed){e();return}setTimeout(()=>{this.waitForSocketClosed(t,e,r+1)},150*r)}onConnClose(t){this.conn&&(this.conn.onclose=()=>{}),this.hasLogger()&&this.log("transport","close",t),this.triggerChanError(t),this.clearHeartbeats(),this.closeWasClean||this.reconnectTimer.scheduleTimeout(),this.triggerStateCallbacks("close",t)}onConnError(t){this.hasLogger()&&this.log("transport","error",t);let e=this.transport,r=this.establishedConnections;this.triggerStateCallbacks("error",t,e,r),(e===this.transport||r>0)&&this.triggerChanError(t)}triggerChanError(t){this.channels.forEach(e=>{e.isErrored()||e.isLeaving()||e.isClosed()||e.trigger(Z.error,t)})}connectionState(){switch(this.conn&&this.conn.readyState){case G.connecting:return"connecting";case G.open:return"open";case G.closing:return"closing";default:return"closed"}}isConnected(){return this.connectionState()==="open"}remove(t){this.off(t.stateChangeRefs),this.channels=this.channels.filter(e=>e!==t)}off(t){for(let e in this.stateChangeCallbacks)this.stateChangeCallbacks[e]=this.stateChangeCallbacks[e].filter(([r])=>t.indexOf(r)===-1)}channel(t,e={}){let r=new Cs(t,e,this);return this.channels.push(r),r}push(t){if(this.hasLogger()){let{topic:e,event:r,payload:s,ref:i,join_ref:n}=t;this.log("push",`${e} ${r} (${n}, ${i})`,s)}this.isConnected()?this.encode(t,e=>this.conn.send(e)):this.sendBuffer.push(()=>this.encode(t,e=>this.conn.send(e)))}makeRef(){let t=this.ref+1;return t===this.ref?this.ref=0:this.ref=t,this.ref.toString()}sendHeartbeat(){if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.heartbeatTimeout();return}this.pendingHeartbeatRef=this.makeRef(),this.heartbeatSentAt=Date.now(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this.heartbeatTimeoutTimer=setTimeout(()=>this.heartbeatTimeout(),this.heartbeatIntervalMs)}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(t=>t()),this.sendBuffer=[])}onConnMessage(t){this.decode(t.data,e=>{let{topic:r,event:s,payload:i,ref:n,join_ref:a}=e;if(n&&n===this.pendingHeartbeatRef){const o=this.heartbeatSentAt?Date.now()-this.heartbeatSentAt:void 0;this.clearHeartbeats();try{this.heartbeatCallback(i.status==="ok"?"ok":"error",o)}catch(l){this.log("error","error in heartbeat callback",l)}this.pendingHeartbeatRef=null,this.heartbeatSentAt=null,this.autoSendHeartbeat&&(this.heartbeatTimer=setTimeout(()=>this.sendHeartbeat(),this.heartbeatIntervalMs))}this.hasLogger()&&this.log("receive",`${i.status||""} ${r} ${s} ${n&&"("+n+")"||""}`.trim(),i);for(let o=0;o<this.channels.length;o++){const l=this.channels[o];l.isMember(r,s,i,a)&&l.trigger(s,i,n,a)}this.triggerStateCallbacks("message",e)})}triggerStateCallbacks(t,...e){try{this.stateChangeCallbacks[t].forEach(([r,s])=>{try{s(...e)}catch(i){this.log("error",`error in ${t} callback`,i)}})}catch(r){this.log("error",`error triggering ${t} callbacks`,r)}}leaveOpenTopic(t){let e=this.channels.find(r=>r.topic===t&&(r.isJoined()||r.isJoining()));e&&(this.hasLogger()&&this.log("transport",`leaving duplicate topic "${t}"`),e.leave())}};class Pe{constructor(e,r){const s=js(r);this.presence=new Os(e.getChannel(),s),this.presence.onJoin((i,n,a)=>{const o=Pe.onJoinPayload(i,n,a);e.getChannel().trigger("presence",o)}),this.presence.onLeave((i,n,a)=>{const o=Pe.onLeavePayload(i,n,a);e.getChannel().trigger("presence",o)}),this.presence.onSync(()=>{e.getChannel().trigger("presence",{event:"sync"})})}get state(){return Pe.transformState(this.presence.state)}static transformState(e){return e=Is(e),Object.getOwnPropertyNames(e).reduce((r,s)=>{const i=e[s];return r[s]=Qe(i),r},{})}static onJoinPayload(e,r,s){const i=Gt(r),n=Qe(s);return{event:"join",key:e,currentPresences:i,newPresences:n}}static onLeavePayload(e,r,s){const i=Gt(r),n=Qe(s);return{event:"leave",key:e,currentPresences:i,leftPresences:n}}}function Qe(t){return t.metas.map(e=>(e.presence_ref=e.phx_ref,delete e.phx_ref,delete e.phx_ref_prev,e))}function Is(t){return JSON.parse(JSON.stringify(t))}function js(t){return(t==null?void 0:t.events)&&{events:t.events}}function Gt(t){return t!=null&&t.metas?Qe(t):[]}var Jt;(function(t){t.SYNC="sync",t.JOIN="join",t.LEAVE="leave"})(Jt||(Jt={}));class Ls{get state(){return this.presenceAdapter.state}constructor(e,r){this.channel=e,this.presenceAdapter=new Pe(this.channel.channelAdapter,r)}}function Us(t){if(t instanceof Error)return t;if(typeof t=="string")return new Error(t);if(t&&typeof t=="object"){const e=t;if(typeof e.code=="number"){const r=typeof e.reason=="string"&&e.reason?` (${e.reason})`:"";return new Error(`socket closed: ${e.code}${r}`,{cause:t})}return new Error("channel error: transport failure",{cause:t})}return new Error("channel error: connection lost")}class Ns{constructor(e,r,s){const i=Bs(s);this.channel=e.getSocket().channel(r,i),this.socket=e}get state(){return this.channel.state}set state(e){this.channel.state=e}get joinedOnce(){return this.channel.joinedOnce}get joinPush(){return this.channel.joinPush}get rejoinTimer(){return this.channel.rejoinTimer}on(e,r){return this.channel.on(e,r)}off(e,r){this.channel.off(e,r)}subscribe(e){return this.channel.join(e)}unsubscribe(e){return this.channel.leave(e)}teardown(){this.channel.teardown()}onClose(e){this.channel.onClose(e)}onError(e){return this.channel.onError(e)}push(e,r,s){let i;try{i=this.channel.push(e,r,s)}catch{throw new Error(`tried to push '${e}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`)}if(this.channel.pushBuffer.length>vs){const n=this.channel.pushBuffer.shift();n.cancelTimeout(),this.socket.log("channel",`discarded push due to buffer overflow: ${n.event}`,n.payload())}return i}updateJoinPayload(e){const r=this.channel.joinPush.payload();this.channel.joinPush.payload=()=>Object.assign(Object.assign({},r),e)}canPush(){return this.socket.isConnected()&&this.state===re.joined}isJoined(){return this.state===re.joined}isJoining(){return this.state===re.joining}isClosed(){return this.state===re.closed}isLeaving(){return this.state===re.leaving}updateFilterBindings(e){this.channel.filterBindings=e}updatePayloadTransform(e){this.channel.onMessage=e}getChannel(){return this.channel}}function Bs(t){return{config:Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config)}}var Yt;(function(t){t.ALL="*",t.INSERT="INSERT",t.UPDATE="UPDATE",t.DELETE="DELETE"})(Yt||(Yt={}));var me;(function(t){t.BROADCAST="broadcast",t.PRESENCE="presence",t.POSTGRES_CHANGES="postgres_changes",t.SYSTEM="system"})(me||(me={}));var Q;(function(t){t.SUBSCRIBED="SUBSCRIBED",t.TIMED_OUT="TIMED_OUT",t.CLOSED="CLOSED",t.CHANNEL_ERROR="CHANNEL_ERROR"})(Q||(Q={}));class Oe{get state(){return this.channelAdapter.state}set state(e){this.channelAdapter.state=e}get joinedOnce(){return this.channelAdapter.joinedOnce}get timeout(){return this.socket.timeout}get joinPush(){return this.channelAdapter.joinPush}get rejoinTimer(){return this.channelAdapter.rejoinTimer}constructor(e,r={config:{}},s){var i,n;if(this.topic=e,this.params=r,this.socket=s,this.bindings={},this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},r.config),this.channelAdapter=new Ns(this.socket.socketAdapter,e,this.params),this.presence=new Ls(this),this._onClose(()=>{this.socket._remove(this)}),this._updateFilterTransform(),this.broadcastEndpointURL=Or(this.socket.socketAdapter.endPointURL()),this.private=this.params.config.private||!1,!this.private&&(!((n=(i=this.params.config)===null||i===void 0?void 0:i.broadcast)===null||n===void 0)&&n.replay))throw new Error(`tried to use replay on public channel '${this.topic}'. It must be a private channel.`)}subscribe(e,r=this.timeout){var s,i,n;if(this.socket.isConnected()||this.socket.connect(),this.channelAdapter.isClosed()){const{config:{broadcast:a,presence:o,private:l}}=this.params,c=(i=(s=this.bindings.postgres_changes)===null||s===void 0?void 0:s.map(f=>f.filter))!==null&&i!==void 0?i:[],d=!!this.bindings[me.PRESENCE]&&this.bindings[me.PRESENCE].length>0||((n=this.params.config.presence)===null||n===void 0?void 0:n.enabled)===!0,u={},h={broadcast:a,presence:Object.assign(Object.assign({},o),{enabled:d}),postgres_changes:c,private:l};this.socket.accessTokenValue&&(u.access_token=this.socket.accessTokenValue),this._onError(f=>{e==null||e(Q.CHANNEL_ERROR,Us(f))}),this._onClose(()=>e==null?void 0:e(Q.CLOSED)),this.updateJoinPayload(Object.assign({config:h},u)),this._updateFilterMessage(),this.channelAdapter.subscribe(r).receive("ok",async({postgres_changes:f})=>{if(this.socket._isManualToken()||this.socket.setAuth(),f===void 0){e==null||e(Q.SUBSCRIBED);return}this._updatePostgresBindings(f,e)}).receive("error",f=>{this.state=re.errored;const p=Object.values(f).join(", ")||"error";e==null||e(Q.CHANNEL_ERROR,new Error(p,{cause:f}))}).receive("timeout",()=>{e==null||e(Q.TIMED_OUT)})}return this}_updatePostgresBindings(e,r){var s;const i=this.bindings.postgres_changes,n=(s=i==null?void 0:i.length)!==null&&s!==void 0?s:0,a=[];for(let o=0;o<n;o++){const l=i[o],{filter:{event:c,schema:d,table:u,filter:h}}=l,f=e&&e[o];if(f&&f.event===c&&Oe.isFilterValueEqual(f.schema,d)&&Oe.isFilterValueEqual(f.table,u)&&Oe.isFilterValueEqual(f.filter,h))a.push(Object.assign(Object.assign({},l),{id:f.id}));else{this.unsubscribe(),this.state=re.errored,r==null||r(Q.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=a,this.state!=re.errored&&r&&r(Q.SUBSCRIBED)}presenceState(){return this.presence.state}async track(e,r={}){return await this.send({type:"presence",event:"track",payload:e},r.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,r,s){const i=this.channelAdapter.isJoined()||this.channelAdapter.isJoining(),n=e===me.PRESENCE||e===me.POSTGRES_CHANGES;if(i&&n)throw this.socket.log("channel",`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`),new Error(`cannot add \`${e}\` callbacks for ${this.topic} after \`subscribe()\`.`);return this._on(e,r,s)}async httpSend(e,r,s={}){var i;if(r==null)return Promise.reject(new Error("Payload is required for httpSend()"));const n=r instanceof ArrayBuffer||ArrayBuffer.isView(r),a={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":n?"application/octet-stream":"application/json"};this.socket.accessTokenValue&&(a.Authorization=`Bearer ${this.socket.accessTokenValue}`);const o=new URL(this.broadcastEndpointURL);o.pathname+=`/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(e)}`,this.private&&o.searchParams.set("private","true");const l={method:"POST",headers:a,body:n?r:JSON.stringify(r)},c=await this._fetchWithTimeout(o.toString(),l,(i=s.timeout)!==null&&i!==void 0?i:this.timeout);if(c.status===202)return{success:!0};if(c.status===404)return Promise.reject(new Error("httpSend() requires Realtime server v2.97.0 or newer; the endpoint returned 404. Update your Supabase CLI to a recent version, or upgrade the Realtime server in your self-hosted setup. See https://github.com/supabase/supabase-js/blob/master/packages/core/realtime-js/migrations/httpsend-server-version.md"));let d=c.statusText;try{const u=await c.json();d=u.error||u.message||d}catch{}return Promise.reject(new Error(d))}async send(e,r={}){var s,i;if(!this.channelAdapter.canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:n,payload:a}=e,o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:n,payload:a,private:this.private}]})};try{const c=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(s=r.timeout)!==null&&s!==void 0?s:this.timeout);return await((i=c.body)===null||i===void 0?void 0:i.cancel()),c.ok?"ok":"error"}catch(c){return c instanceof Error&&c.name==="AbortError"?"timed out":"error"}}else return new Promise(n=>{var a,o,l;const c=this.channelAdapter.push(e.type,e,r.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(o=(a=this.params)===null||a===void 0?void 0:a.config)===null||o===void 0?void 0:o.broadcast)===null||l===void 0)&&l.ack)&&n("ok"),c.receive("ok",()=>n("ok")),c.receive("error",()=>n("error")),c.receive("timeout",()=>n("timed out"))})}updateJoinPayload(e){this.channelAdapter.updateJoinPayload(e)}async unsubscribe(e=this.timeout){return new Promise(r=>{this.channelAdapter.unsubscribe(e).receive("ok",()=>r("ok")).receive("timeout",()=>r("timed out")).receive("error",()=>r("error"))})}teardown(){this.channelAdapter.teardown()}async _fetchWithTimeout(e,r,s){const i=new AbortController,n=setTimeout(()=>i.abort(),s),a=await this.socket.fetch(e,Object.assign(Object.assign({},r),{signal:i.signal}));return clearTimeout(n),a}_on(e,r,s){const i=e.toLocaleLowerCase(),n=this.channelAdapter.on(e,s),a={type:i,filter:r,callback:s,ref:n};return this.bindings[i]?this.bindings[i].push(a):this.bindings[i]=[a],this._updateFilterMessage(),this}_onClose(e){this.channelAdapter.onClose(e)}_onError(e){this.channelAdapter.onError(e)}_updateFilterMessage(){this.channelAdapter.updateFilterBindings((e,r,s)=>{var i,n,a,o,l,c,d;const u=e.event.toLocaleLowerCase();if(this._notThisChannelEvent(u,s))return!1;const h=(i=this.bindings[u])===null||i===void 0?void 0:i.find(f=>f.ref===e.ref);if(!h)return!0;if(["broadcast","presence","postgres_changes"].includes(u))if("id"in h){const f=h.id,p=(n=h.filter)===null||n===void 0?void 0:n.event;return f&&((a=r.ids)===null||a===void 0?void 0:a.includes(f))&&(p==="*"||(p==null?void 0:p.toLocaleLowerCase())===((o=r.data)===null||o===void 0?void 0:o.type.toLocaleLowerCase()))}else{const f=(c=(l=h==null?void 0:h.filter)===null||l===void 0?void 0:l.event)===null||c===void 0?void 0:c.toLocaleLowerCase();return f==="*"||f===((d=r==null?void 0:r.event)===null||d===void 0?void 0:d.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===u})}_notThisChannelEvent(e,r){const{close:s,error:i,leave:n,join:a}=Cr;return r&&[s,i,n,a].includes(e)&&r!==this.joinPush.ref}_updateFilterTransform(){this.channelAdapter.updatePayloadTransform((e,r,s)=>{if(typeof r=="object"&&"ids"in r){const i=r.data,{schema:n,table:a,commit_timestamp:o,type:l,errors:c}=i;return Object.assign(Object.assign({},{schema:n,table:a,commit_timestamp:o,eventType:l,new:{},old:{},errors:c}),this._getPayloadRecords(i))}return r})}copyBindings(e){if(this.joinedOnce)throw new Error("cannot copy bindings into joined channel");for(const r in e.bindings)for(const s of e.bindings[r])this._on(s.type,s.filter,s.callback)}static isFilterValueEqual(e,r){return(e??void 0)===(r??void 0)}_getPayloadRecords(e){const r={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(r.new=Vt(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(r.old=Vt(e.columns,e.old_record)),r}}class Ds{constructor(e,r){this.socket=new $s(e,r)}get timeout(){return this.socket.timeout}get endPoint(){return this.socket.endPoint}get transport(){return this.socket.transport}get heartbeatIntervalMs(){return this.socket.heartbeatIntervalMs}get heartbeatCallback(){return this.socket.heartbeatCallback}set heartbeatCallback(e){this.socket.heartbeatCallback=e}get heartbeatTimer(){return this.socket.heartbeatTimer}get pendingHeartbeatRef(){return this.socket.pendingHeartbeatRef}get reconnectTimer(){return this.socket.reconnectTimer}get vsn(){return this.socket.vsn}get encode(){return this.socket.encode}get decode(){return this.socket.decode}get reconnectAfterMs(){return this.socket.reconnectAfterMs}get sendBuffer(){return this.socket.sendBuffer}get stateChangeCallbacks(){return this.socket.stateChangeCallbacks}connect(){this.socket.connect()}disconnect(e,r,s,i=1e4){return new Promise(n=>{setTimeout(()=>n("timeout"),i),this.socket.disconnect(()=>{e(),n("ok")},r,s)})}push(e){this.socket.push(e)}log(e,r,s){this.socket.log(e,r,s)}makeRef(){return this.socket.makeRef()}onOpen(e){this.socket.onOpen(e)}onClose(e){this.socket.onClose(e)}onError(e){this.socket.onError(e)}onMessage(e){this.socket.onMessage(e)}isConnected(){return this.socket.isConnected()}isConnecting(){return this.socket.connectionState()==_t.connecting}isDisconnecting(){return this.socket.connectionState()==_t.closing}connectionState(){return this.socket.connectionState()}endPointURL(){return this.socket.endPointURL()}sendHeartbeat(){this.socket.sendHeartbeat()}getSocket(){return this.socket}}const Xt={HEARTBEAT_INTERVAL:25e3},Ms=[1e3,2e3,5e3,1e4],qs=1e4;function zs(){const t=new Map;return{get length(){return t.size},clear(){t.clear()},getItem(e){return t.has(e)?t.get(e):null},key(e){var r;return(r=Array.from(t.keys())[e])!==null&&r!==void 0?r:null},removeItem(e){t.delete(e)},setItem(e,r){t.set(e,String(r))}}}function Hs(){try{if(typeof globalThis<"u"&&globalThis.sessionStorage)return globalThis.sessionStorage}catch{}return zs()}const Fs=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class Ws{get endPoint(){return this.socketAdapter.endPoint}get timeout(){return this.socketAdapter.timeout}get transport(){return this.socketAdapter.transport}get heartbeatCallback(){return this.socketAdapter.heartbeatCallback}get heartbeatIntervalMs(){return this.socketAdapter.heartbeatIntervalMs}get heartbeatTimer(){return this.worker?this._workerHeartbeatTimer:this.socketAdapter.heartbeatTimer}get pendingHeartbeatRef(){return this.worker?this._pendingWorkerHeartbeatRef:this.socketAdapter.pendingHeartbeatRef}get reconnectTimer(){return this.socketAdapter.reconnectTimer}get vsn(){return this.socketAdapter.vsn}get encode(){return this.socketAdapter.encode}get decode(){return this.socketAdapter.decode}get reconnectAfterMs(){return this.socketAdapter.reconnectAfterMs}get sendBuffer(){return this.socketAdapter.sendBuffer}get stateChangeCallbacks(){return this.socketAdapter.stateChangeCallbacks}constructor(e,r){var s;if(this.channels=new Array,this.accessTokenValue=null,this.accessToken=null,this.apiKey=null,this.httpEndpoint="",this.headers={},this.params={},this.ref=0,this.serializer=new ms,this._manuallySetToken=!1,this._authPromise=null,this._workerHeartbeatTimer=void 0,this._pendingWorkerHeartbeatRef=null,this._pendingDisconnectTimer=null,this._disconnectOnEmptyChannelsAfterMs=0,this._resolveFetch=n=>n?(...a)=>n(...a):(...a)=>fetch(...a),!(!((s=r==null?void 0:r.params)===null||s===void 0)&&s.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=r.params.apikey;const i=this._initializeOptions(r);this.socketAdapter=new Ds(e,i),this.httpEndpoint=Or(e),this.fetch=this._resolveFetch(r==null?void 0:r.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.isConnected())){this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this._setupConnectionHandlers();try{this.socketAdapter.connect()}catch(e){const r=e.message;throw r.includes("Node.js")?new Error(`${r}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${r}`)}this._handleNodeJsRaceCondition()}}endpointURL(){return this.socketAdapter.endPointURL()}async disconnect(e,r){return this._cancelPendingDisconnect(),this.isDisconnecting()?"ok":await this.socketAdapter.disconnect(()=>{clearInterval(this._workerHeartbeatTimer),this._terminateWorker()},e,r)}getChannels(){return this.channels}async removeChannel(e){const r=await e.unsubscribe();return r==="ok"&&e.teardown(),r}async removeAllChannels(){const e=this.channels.map(async s=>{const i=await s.unsubscribe();return s.teardown(),i}),r=await Promise.all(e);return await this.disconnect(),r}log(e,r,s){this.socketAdapter.log(e,r,s)}connectionState(){return this.socketAdapter.connectionState()||_t.closed}isConnected(){return this.socketAdapter.isConnected()}isConnecting(){return this.socketAdapter.isConnecting()}isDisconnecting(){return this.socketAdapter.isDisconnecting()}channel(e,r={config:{}}){const s=`realtime:${e}`,i=this.getChannels().find(n=>n.topic===s);if(i)return i;{const n=new Oe(`realtime:${e}`,r,this);return this._cancelPendingDisconnect(),this.channels.push(n),n}}push(e){this.socketAdapter.push(e)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){this.socketAdapter.sendHeartbeat()}onHeartbeat(e){this.socketAdapter.heartbeatCallback=this._wrapHeartbeatCallback(e)}_makeRef(){return this.socketAdapter.makeRef()}_remove(e){this.channels=this.channels.filter(r=>r.topic!==e.topic),this.channels.length===0&&(this.log("transport","no channels remaining, scheduling disconnect"),this._schedulePendingDisconnect())}_schedulePendingDisconnect(){if(this._cancelPendingDisconnect(),this._disconnectOnEmptyChannelsAfterMs===0){this.log("transport","disconnecting immediately - no channels"),this.disconnect();return}this._pendingDisconnectTimer=setTimeout(()=>{this._pendingDisconnectTimer=null,this.channels.length===0&&(this.log("transport","deferred disconnect fired - no channels, disconnecting"),this.disconnect())},this._disconnectOnEmptyChannelsAfterMs),this.log("transport",`deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`)}_cancelPendingDisconnect(){this._pendingDisconnectTimer!==null&&(this.log("transport","pending disconnect cancelled - channel activity detected"),clearTimeout(this._pendingDisconnectTimer),this._pendingDisconnectTimer=null)}async _performAuth(e=null){let r,s=!1;if(e)r=e,s=!0;else if(this.accessToken)try{r=await this.accessToken()}catch(i){this.log("error","Error fetching access token from callback",i),r=this.accessTokenValue}else r=this.accessTokenValue;s?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=r&&(this.accessTokenValue=r,this.channels.forEach(i=>{const n={access_token:r,version:hs};r&&i.updateJoinPayload(n),i.joinedOnce&&i.channelAdapter.isJoined()&&i.channelAdapter.push(Cr.access_token,{access_token:r})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(r=>{this.log("error",`Error setting auth in ${e}`,r)})}_setupConnectionHandlers(){this.socketAdapter.onOpen(()=>{(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).catch(r=>{this.log("error","error waiting for auth on connect",r)}),this.worker&&!this.workerRef&&this._startWorkerHeartbeat()}),this.socketAdapter.onClose(()=>{this.worker&&this.workerRef&&this._terminateWorker()}),this.socketAdapter.onMessage(e=>{e.ref&&e.ref===this._pendingWorkerHeartbeatRef&&(this._pendingWorkerHeartbeatRef=null)})}_handleNodeJsRaceCondition(){this.socketAdapter.isConnected()&&this.socketAdapter.getSocket().onConnOpen()}_wrapHeartbeatCallback(e){return(r,s)=>{r=="sent"&&this._setAuthSafely(),e&&e(r,s)}}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=r=>{this.log("worker","worker error",r.message),this._terminateWorker(),this.disconnect()},this.workerRef.onmessage=r=>{r.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_workerObjectUrl(e){let r;if(e)r=e;else{const s=new Blob([Fs],{type:"application/javascript"});r=URL.createObjectURL(s)}return r}_initializeOptions(e){var r,s,i,n,a,o,l,c,d,u,h,f;this.worker=(r=e==null?void 0:e.worker)!==null&&r!==void 0?r:!1,this.accessToken=(s=e==null?void 0:e.accessToken)!==null&&s!==void 0?s:null;const p={};p.timeout=(i=e==null?void 0:e.timeout)!==null&&i!==void 0?i:gs,p.heartbeatIntervalMs=(n=e==null?void 0:e.heartbeatIntervalMs)!==null&&n!==void 0?n:Xt.HEARTBEAT_INTERVAL,this._disconnectOnEmptyChannelsAfterMs=(a=e==null?void 0:e.disconnectOnEmptyChannelsAfterMs)!==null&&a!==void 0?a:2*((o=e==null?void 0:e.heartbeatIntervalMs)!==null&&o!==void 0?o:Xt.HEARTBEAT_INTERVAL),p.transport=(l=e==null?void 0:e.transport)!==null&&l!==void 0?l:ds.getWebSocketConstructor(),p.params=e==null?void 0:e.params,p.logger=e==null?void 0:e.logger,p.heartbeatCallback=this._wrapHeartbeatCallback(e==null?void 0:e.heartbeatCallback),p.sessionStorage=(c=e==null?void 0:e.sessionStorage)!==null&&c!==void 0?c:Hs(),p.reconnectAfterMs=(d=e==null?void 0:e.reconnectAfterMs)!==null&&d!==void 0?d:_=>Ms[_-1]||qs;let g,w;const b=(u=e==null?void 0:e.vsn)!==null&&u!==void 0?u:ps;switch(b){case fs:g=(_,m)=>m(JSON.stringify(_)),w=(_,m)=>m(JSON.parse(_));break;case Rr:g=this.serializer.encode.bind(this.serializer),w=this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${p.vsn}`)}if(p.vsn=b,p.encode=(h=e==null?void 0:e.encode)!==null&&h!==void 0?h:g,p.decode=(f=e==null?void 0:e.decode)!==null&&f!==void 0?f:w,p.beforeReconnect=this._reconnectAuth.bind(this),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,p.params=Object.assign(Object.assign({},p.params),{log_level:this.logLevel})),this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl,p.autoSendHeartbeat=!this.worker}return p}async _reconnectAuth(){await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()}}var je=class extends Error{constructor(t,e){var r;super(t),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((r=e.icebergType)==null?void 0:r.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function Ks(t,e,r){const s=new URL(e,t);if(r)for(const[i,n]of Object.entries(r))n!==void 0&&s.searchParams.set(i,n);return s.toString()}async function Vs(t){return!t||t.type==="none"?{}:t.type==="bearer"?{Authorization:`Bearer ${t.token}`}:t.type==="header"?{[t.name]:t.value}:t.type==="custom"?await t.getHeaders():{}}function Gs(t){const e=t.fetchImpl??globalThis.fetch;return{async request({method:r,path:s,query:i,body:n,headers:a}){const o=Ks(t.baseUrl,s,i),l=await Vs(t.auth),c=await e(o,{method:r,headers:{...n?{"Content-Type":"application/json"}:{},...l,...a},body:n?JSON.stringify(n):void 0}),d=await c.text(),u=(c.headers.get("content-type")||"").includes("application/json"),h=u&&d?JSON.parse(d):d;if(!c.ok){const f=u?h:void 0,p=f==null?void 0:f.error;throw new je((p==null?void 0:p.message)??`Request failed with status ${c.status}`,{status:c.status,icebergType:p==null?void 0:p.type,icebergCode:p==null?void 0:p.code,details:f})}return{status:c.status,headers:c.headers,data:h}}}}function We(t){return t.join("")}var Js=class{constructor(t,e=""){this.client=t,this.prefix=e}async listNamespaces(t){const e=t?{parent:We(t.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(s=>({namespace:s}))}async createNamespace(t,e){const r={namespace:t.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:r})).data}async dropNamespace(t){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${We(t.namespace)}`})}async loadNamespaceMetadata(t){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${We(t.namespace)}`})).data.properties}}async namespaceExists(t){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${We(t.namespace)}`}),!0}catch(e){if(e instanceof je&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(t,e){try{return await this.createNamespace(t,e)}catch(r){if(r instanceof je&&r.status===409)return;throw r}}};function ue(t){return t.join("")}var Ys=class{constructor(t,e="",r){this.client=t,this.prefix=e,this.accessDelegation=r}async listTables(t){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables`})).data.identifiers}async createTable(t,e){const r={};return this.accessDelegation&&(r["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables`,body:e,headers:r})).data.metadata}async updateTable(t,e){const r=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables/${t.name}`,body:e});return{"metadata-location":r.data["metadata-location"],metadata:r.data.metadata}}async dropTable(t,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables/${t.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(t){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables/${t.name}`,headers:e})).data.metadata}async tableExists(t){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${ue(t.namespace)}/tables/${t.name}`,headers:e}),!0}catch(r){if(r instanceof je&&r.status===404)return!1;throw r}}async createTableIfNotExists(t,e){try{return await this.createTable(t,e)}catch(r){if(r instanceof je&&r.status===409)return await this.loadTable({namespace:t.namespace,name:e.name});throw r}}},Xs=class{constructor(t){var s;let e="v1";t.catalogName&&(e+=`/${t.catalogName}`);const r=t.baseUrl.endsWith("/")?t.baseUrl:`${t.baseUrl}/`;this.client=Gs({baseUrl:r,auth:t.auth,fetchImpl:t.fetch}),this.accessDelegation=(s=t.accessDelegation)==null?void 0:s.join(","),this.namespaceOps=new Js(this.client,e),this.tableOps=new Ys(this.client,e,this.accessDelegation)}async listNamespaces(t){return this.namespaceOps.listNamespaces(t)}async createNamespace(t,e){return this.namespaceOps.createNamespace(t,e)}async dropNamespace(t){await this.namespaceOps.dropNamespace(t)}async loadNamespaceMetadata(t){return this.namespaceOps.loadNamespaceMetadata(t)}async listTables(t){return this.tableOps.listTables(t)}async createTable(t,e){return this.tableOps.createTable(t,e)}async updateTable(t,e){return this.tableOps.updateTable(t,e)}async dropTable(t,e){await this.tableOps.dropTable(t,e)}async loadTable(t){return this.tableOps.loadTable(t)}async namespaceExists(t){return this.namespaceOps.namespaceExists(t)}async tableExists(t){return this.tableOps.tableExists(t)}async createNamespaceIfNotExists(t,e){return this.namespaceOps.createNamespaceIfNotExists(t,e)}async createTableIfNotExists(t,e){return this.tableOps.createTableIfNotExists(t,e)}};function Le(t){"@babel/helpers - typeof";return Le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Le(t)}function Zs(t,e){if(Le(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(Le(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Qs(t){var e=Zs(t,"string");return Le(e)=="symbol"?e:e+""}function ei(t,e,r){return(e=Qs(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Zt(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function k(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?Zt(Object(r),!0).forEach(function(s){ei(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):Zt(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}var dt=class extends Error{constructor(t,e="storage",r,s){super(t),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=r,this.statusCode=s}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}};function ut(t){return typeof t=="object"&&t!==null&&"__isStorageError"in t}var Et=class extends dt{constructor(t,e,r,s="storage"){super(t,s,e,r),this.name=s==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=r}toJSON(){return k({},super.toJSON())}},Ir=class extends dt{constructor(t,e,r="storage"){super(t,r),this.name=r==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};function rt(t,e,r){const s=k({},t),i=e.toLowerCase();for(const n of Object.keys(s))n.toLowerCase()===i&&delete s[n];return s[i]=r,s}function ti(t){const e={};for(const[r,s]of Object.entries(t))e[r.toLowerCase()]=s;return e}const ri=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),si=t=>{if(typeof t!="object"||t===null)return!1;const e=Object.getPrototypeOf(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in t)&&!(Symbol.iterator in t)},Tt=t=>{if(Array.isArray(t))return t.map(r=>Tt(r));if(typeof t=="function"||t!==Object(t))return t;const e={};return Object.entries(t).forEach(([r,s])=>{const i=r.replace(/([-_][a-z])/gi,n=>n.toUpperCase().replace(/[-_]/g,""));e[i]=Tt(s)}),e},ii=t=>!t||typeof t!="string"||t.length===0||t.length>100||t.trim()!==t||t.includes("/")||t.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(t),Qt=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error;if(typeof e.error=="object"&&e.error!==null){const r=e.error;if(typeof r.message=="string")return r.message}}return JSON.stringify(t)},ni=async(t,e,r,s)=>{if(t!==null&&typeof t=="object"&&"json"in t&&typeof t.json=="function"){const i=t;let n=parseInt(String(i.status),10);Number.isFinite(n)||(n=500),i.json().then(a=>{const o=(a==null?void 0:a.statusCode)||(a==null?void 0:a.code)||n+"";e(new Et(Qt(a),n,o,s))}).catch(()=>{const a=n+"";e(new Et(i.statusText||`HTTP ${n} error`,n,a,s))})}else e(new Ir(Qt(t),t,s))},ai=(t,e,r,s)=>{const i={method:t,headers:(e==null?void 0:e.headers)||{}};if(t==="GET"||t==="HEAD"||!s)return k(k({},i),r);if(si(s)){var n;const a=(e==null?void 0:e.headers)||{};let o;for(const[l,c]of Object.entries(a))l.toLowerCase()==="content-type"&&(o=c);i.headers=rt(a,"Content-Type",(n=o)!==null&&n!==void 0?n:"application/json"),i.body=JSON.stringify(s)}else i.body=s;return e!=null&&e.duplex&&(i.duplex=e.duplex),k(k({},i),r)};async function Ee(t,e,r,s,i,n,a){return new Promise((o,l)=>{t(r,ai(e,s,i,n)).then(c=>{if(!c.ok)throw c;if(s!=null&&s.noResolveJson)return c;if(a==="vectors"){const d=c.headers.get("content-type");if(c.headers.get("content-length")==="0"||c.status===204)return{};if(!d||!d.includes("application/json"))return{}}return c.json()}).then(c=>o(c)).catch(c=>ni(c,l,s,a))})}function jr(t="storage"){return{get:async(e,r,s,i)=>Ee(e,"GET",r,s,i,void 0,t),post:async(e,r,s,i,n)=>Ee(e,"POST",r,i,n,s,t),put:async(e,r,s,i,n)=>Ee(e,"PUT",r,i,n,s,t),head:async(e,r,s,i)=>Ee(e,"HEAD",r,k(k({},s),{},{noResolveJson:!0}),i,void 0,t),remove:async(e,r,s,i,n)=>Ee(e,"DELETE",r,i,n,s,t)}}const oi=jr("storage"),{get:Ue,post:F,put:At,head:li,remove:jt}=oi,D=jr("vectors");var xe=class{constructor(t,e={},r,s="storage"){this.shouldThrowOnError=!1,this.url=t,this.headers=ti(e),this.fetch=ri(r),this.namespace=s}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(t,e){return this.headers=rt(this.headers,t,e),this}async handleOperation(t){var e=this;try{return{data:await t(),error:null}}catch(r){if(e.shouldThrowOnError)throw r;if(ut(r))return{data:null,error:r};throw r}}};let Lr;Lr=Symbol.toStringTag;var ci=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[Lr]="StreamDownloadBuilder",this.promise=null}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:(await t.downloadFn()).body,error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(ut(e))return{data:null,error:e};throw e}}};let Ur;Ur=Symbol.toStringTag;var di=class{constructor(t,e){this.downloadFn=t,this.shouldThrowOnError=e,this[Ur]="BlobDownloadBuilder",this.promise=null}asStream(){return new ci(this.downloadFn,this.shouldThrowOnError)}then(t,e){return this.getPromise().then(t,e)}catch(t){return this.getPromise().catch(t)}finally(t){return this.getPromise().finally(t)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var t=this;try{return{data:await(await t.downloadFn()).blob(),error:null}}catch(e){if(t.shouldThrowOnError)throw e;if(ut(e))return{data:null,error:e};throw e}}};const ui={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},er={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var hi=class extends xe{constructor(t,e={},r,s){super(t,e,s,"storage"),this.bucketId=r}async uploadOrUpdate(t,e,r,s){var i=this;return i.handleOperation(async()=>{let n;const a=k(k({},er),s);let o=k(k({},i.headers),t==="POST"&&{"x-upsert":String(a.upsert)});const l=a.metadata;if(typeof Blob<"u"&&r instanceof Blob?(n=new FormData,n.append("cacheControl",a.cacheControl),l&&n.append("metadata",i.encodeMetadata(l)),n.append("",r)):typeof FormData<"u"&&r instanceof FormData?(n=r,n.has("cacheControl")||n.append("cacheControl",a.cacheControl),l&&!n.has("metadata")&&n.append("metadata",i.encodeMetadata(l))):(n=r,o["cache-control"]=`max-age=${a.cacheControl}`,o["content-type"]=a.contentType,l&&(o["x-metadata"]=i.toBase64(i.encodeMetadata(l))),(typeof ReadableStream<"u"&&n instanceof ReadableStream||n&&typeof n=="object"&&"pipe"in n&&typeof n.pipe=="function")&&!a.duplex&&(a.duplex="half")),s!=null&&s.headers)for(const[h,f]of Object.entries(s.headers))o=rt(o,h,f);const c=i._removeEmptyFolders(e),d=i._getFinalPath(c),u=await(t=="PUT"?At:F)(i.fetch,`${i.url}/object/${d}`,n,k({headers:o},a!=null&&a.duplex?{duplex:a.duplex}:{}));return{path:c,id:u.Id,fullPath:u.Key}})}async upload(t,e,r){return this.uploadOrUpdate("POST",t,e,r)}async uploadToSignedUrl(t,e,r,s){var i=this;const n=i._removeEmptyFolders(t),a=i._getFinalPath(n),o=new URL(i.url+`/object/upload/sign/${a}`);return o.searchParams.set("token",e),i.handleOperation(async()=>{let l;const c=k(k({},er),s);let d=k(k({},i.headers),{"x-upsert":String(c.upsert)});const u=c.metadata;if(typeof Blob<"u"&&r instanceof Blob?(l=new FormData,l.append("cacheControl",c.cacheControl),u&&l.append("metadata",i.encodeMetadata(u)),l.append("",r)):typeof FormData<"u"&&r instanceof FormData?(l=r,l.has("cacheControl")||l.append("cacheControl",c.cacheControl),u&&!l.has("metadata")&&l.append("metadata",i.encodeMetadata(u))):(l=r,d["cache-control"]=`max-age=${c.cacheControl}`,d["content-type"]=c.contentType,u&&(d["x-metadata"]=i.toBase64(i.encodeMetadata(u))),(typeof ReadableStream<"u"&&l instanceof ReadableStream||l&&typeof l=="object"&&"pipe"in l&&typeof l.pipe=="function")&&!c.duplex&&(c.duplex="half")),s!=null&&s.headers)for(const[h,f]of Object.entries(s.headers))d=rt(d,h,f);return{path:n,fullPath:(await At(i.fetch,o.toString(),l,k({headers:d},c!=null&&c.duplex?{duplex:c.duplex}:{}))).Key}})}async createSignedUploadUrl(t,e){var r=this;return r.handleOperation(async()=>{let s=r._getFinalPath(t);const i=k({},r.headers);e!=null&&e.upsert&&(i["x-upsert"]="true");const n=await F(r.fetch,`${r.url}/object/upload/sign/${s}`,{},{headers:i}),a=new URL(r.url+n.url),o=a.searchParams.get("token");if(!o)throw new dt("No token returned by API");return{signedUrl:a.toString(),path:t,token:o}})}async update(t,e,r){return this.uploadOrUpdate("PUT",t,e,r)}async move(t,e,r){var s=this;return s.handleOperation(async()=>await F(s.fetch,`${s.url}/object/move`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers}))}async copy(t,e,r){var s=this;return s.handleOperation(async()=>({path:(await F(s.fetch,`${s.url}/object/copy`,{bucketId:s.bucketId,sourceKey:t,destinationKey:e,destinationBucket:r==null?void 0:r.destinationBucket},{headers:s.headers})).Key}))}async createSignedUrl(t,e,r){var s=this;return s.handleOperation(async()=>{let i=s._getFinalPath(t);const n=typeof(r==null?void 0:r.transform)=="object"&&r.transform!==null&&Object.keys(r.transform).length>0;let a=await F(s.fetch,`${s.url}/object/sign/${i}`,k({expiresIn:e},n?{transform:r.transform}:{}),{headers:s.headers});const o=new URLSearchParams;r!=null&&r.download&&o.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&o.set("cacheNonce",String(r.cacheNonce));const l=o.toString();return{signedUrl:encodeURI(`${s.url}${a.signedURL}${l?`&${l}`:""}`)}})}async createSignedUrls(t,e,r){var s=this;return s.handleOperation(async()=>{const i=await F(s.fetch,`${s.url}/object/sign/${s.bucketId}`,{expiresIn:e,paths:t},{headers:s.headers}),n=new URLSearchParams;r!=null&&r.download&&n.set("download",r.download===!0?"":r.download),(r==null?void 0:r.cacheNonce)!=null&&n.set("cacheNonce",String(r.cacheNonce));const a=n.toString();return i.map(o=>k(k({},o),{},{signedUrl:o.signedURL?encodeURI(`${s.url}${o.signedURL}${a?`&${a}`:""}`):null}))})}download(t,e,r){const s=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image/authenticated":"object",i=new URLSearchParams;e!=null&&e.transform&&this.applyTransformOptsToQuery(i,e.transform),(e==null?void 0:e.cacheNonce)!=null&&i.set("cacheNonce",String(e.cacheNonce));const n=i.toString(),a=this._getFinalPath(t),o=()=>Ue(this.fetch,`${this.url}/${s}/${a}${n?`?${n}`:""}`,{headers:this.headers,noResolveJson:!0},r);return new di(o,this.shouldThrowOnError)}async info(t){var e=this;const r=e._getFinalPath(t);return e.handleOperation(async()=>Tt(await Ue(e.fetch,`${e.url}/object/info/${r}`,{headers:e.headers})))}async exists(t){var e=this;const r=e._getFinalPath(t);try{return await li(e.fetch,`${e.url}/object/${r}`,{headers:e.headers}),{data:!0,error:null}}catch(i){if(e.shouldThrowOnError)throw i;if(ut(i)){var s;const n=i instanceof Et?i.status:i instanceof Ir?(s=i.originalError)===null||s===void 0?void 0:s.status:void 0;if(n!==void 0&&[400,404].includes(n))return{data:!1,error:i}}throw i}}getPublicUrl(t,e){const r=this._getFinalPath(t),s=new URLSearchParams;e!=null&&e.download&&s.set("download",e.download===!0?"":e.download),e!=null&&e.transform&&this.applyTransformOptsToQuery(s,e.transform),(e==null?void 0:e.cacheNonce)!=null&&s.set("cacheNonce",String(e.cacheNonce));const i=s.toString(),n=typeof(e==null?void 0:e.transform)=="object"&&e.transform!==null&&Object.keys(e.transform).length>0?"render/image":"object";return{data:{publicUrl:encodeURI(`${this.url}/${n}/public/${r}`)+(i?`?${i}`:"")}}}async remove(t){var e=this;return e.handleOperation(async()=>await jt(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:t},{headers:e.headers}))}async list(t,e,r){var s=this;return s.handleOperation(async()=>{const i=k(k(k({},ui),e),{},{prefix:t||""});return await F(s.fetch,`${s.url}/object/list/${s.bucketId}`,i,{headers:s.headers},r)})}async listV2(t,e){var r=this;return r.handleOperation(async()=>{const s=k({},t);return await F(r.fetch,`${r.url}/object/list-v2/${r.bucketId}`,s,{headers:r.headers},e)})}encodeMetadata(t){return JSON.stringify(t)}toBase64(t){return typeof Buffer<"u"?Buffer.from(t).toString("base64"):btoa(t)}_getFinalPath(t){return`${this.bucketId}/${t.replace(/^\/+/,"")}`}_removeEmptyFolders(t){return t.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}applyTransformOptsToQuery(t,e){return e.width&&t.set("width",e.width.toString()),e.height&&t.set("height",e.height.toString()),e.resize&&t.set("resize",e.resize),e.format&&t.set("format",e.format),e.quality&&t.set("quality",e.quality.toString()),t}};const fi="2.108.2",qe={"X-Client-Info":`storage-js/${fi}`};var pi=class extends xe{constructor(t,e={},r,s){const i=new URL(t);s!=null&&s.useNewHostname&&/supabase\.(co|in|red)$/.test(i.hostname)&&!i.hostname.includes("storage.supabase.")&&(i.hostname=i.hostname.replace("supabase.","storage.supabase."));const n=i.href.replace(/\/$/,""),a=k(k({},qe),e);super(n,a,r,"storage")}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=e.listBucketOptionsToQueryString(t);return await Ue(e.fetch,`${e.url}/bucket${r}`,{headers:e.headers})})}async getBucket(t){var e=this;return e.handleOperation(async()=>await Ue(e.fetch,`${e.url}/bucket/${t}`,{headers:e.headers}))}async createBucket(t,e={public:!1}){var r=this;return r.handleOperation(async()=>await F(r.fetch,`${r.url}/bucket`,{id:t,name:t,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async updateBucket(t,e){var r=this;return r.handleOperation(async()=>await At(r.fetch,`${r.url}/bucket/${t}`,{id:t,name:t,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:r.headers}))}async emptyBucket(t){var e=this;return e.handleOperation(async()=>await F(e.fetch,`${e.url}/bucket/${t}/empty`,{},{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await jt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(t){const e={};return t&&("limit"in t&&(e.limit=String(t.limit)),"offset"in t&&(e.offset=String(t.offset)),t.search&&(e.search=t.search),t.sortColumn&&(e.sortColumn=t.sortColumn),t.sortOrder&&(e.sortOrder=t.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},gi=class extends xe{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},qe),e);super(s,i,r,"storage")}async createBucket(t){var e=this;return e.handleOperation(async()=>await F(e.fetch,`${e.url}/bucket`,{name:t},{headers:e.headers}))}async listBuckets(t){var e=this;return e.handleOperation(async()=>{const r=new URLSearchParams;(t==null?void 0:t.limit)!==void 0&&r.set("limit",t.limit.toString()),(t==null?void 0:t.offset)!==void 0&&r.set("offset",t.offset.toString()),t!=null&&t.sortColumn&&r.set("sortColumn",t.sortColumn),t!=null&&t.sortOrder&&r.set("sortOrder",t.sortOrder),t!=null&&t.search&&r.set("search",t.search);const s=r.toString(),i=s?`${e.url}/bucket?${s}`:`${e.url}/bucket`;return await Ue(e.fetch,i,{headers:e.headers})})}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await jt(e.fetch,`${e.url}/bucket/${t}`,{},{headers:e.headers}))}from(t){var e=this;if(!ii(t))throw new dt("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const r=new Xs({baseUrl:this.url,catalogName:t,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),s=this.shouldThrowOnError;return new Proxy(r,{get(i,n){const a=i[n];return typeof a!="function"?a:async(...o)=>{try{return{data:await a.apply(i,o),error:null}}catch(l){if(s)throw l;return{data:null,error:l}}}}})}},vi=class extends xe{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},qe),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createIndex(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/CreateIndex`,t,{headers:e.headers})||{})}async getIndex(t,e){var r=this;return r.handleOperation(async()=>await D.post(r.fetch,`${r.url}/GetIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers}))}async listIndexes(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/ListIndexes`,t,{headers:e.headers}))}async deleteIndex(t,e){var r=this;return r.handleOperation(async()=>await D.post(r.fetch,`${r.url}/DeleteIndex`,{vectorBucketName:t,indexName:e},{headers:r.headers})||{})}},mi=class extends xe{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},qe),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async putVectors(t){var e=this;if(t.vectors.length<1||t.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/PutVectors`,t,{headers:e.headers})||{})}async getVectors(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/GetVectors`,t,{headers:e.headers}))}async listVectors(t){var e=this;if(t.segmentCount!==void 0){if(t.segmentCount<1||t.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(t.segmentIndex!==void 0&&(t.segmentIndex<0||t.segmentIndex>=t.segmentCount))throw new Error(`segmentIndex must be between 0 and ${t.segmentCount-1}`)}return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/ListVectors`,t,{headers:e.headers}))}async queryVectors(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/QueryVectors`,t,{headers:e.headers}))}async deleteVectors(t){var e=this;if(t.keys.length<1||t.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/DeleteVectors`,t,{headers:e.headers})||{})}},yi=class extends xe{constructor(t,e={},r){const s=t.replace(/\/$/,""),i=k(k({},qe),{},{"Content-Type":"application/json"},e);super(s,i,r,"vectors")}async createBucket(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}async getBucket(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:t},{headers:e.headers}))}async listBuckets(t={}){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/ListVectorBuckets`,t,{headers:e.headers}))}async deleteBucket(t){var e=this;return e.handleOperation(async()=>await D.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:t},{headers:e.headers})||{})}},bi=class extends yi{constructor(t,e={}){super(t,e.headers||{},e.fetch)}from(t){return new wi(this.url,this.headers,t,this.fetch)}async createBucket(t){var e=()=>super.createBucket,r=this;return e().call(r,t)}async getBucket(t){var e=()=>super.getBucket,r=this;return e().call(r,t)}async listBuckets(t={}){var e=()=>super.listBuckets,r=this;return e().call(r,t)}async deleteBucket(t){var e=()=>super.deleteBucket,r=this;return e().call(r,t)}},wi=class extends vi{constructor(t,e,r,s){super(t,e,s),this.vectorBucketName=r}async createIndex(t){var e=()=>super.createIndex,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async listIndexes(t={}){var e=()=>super.listIndexes,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName}))}async getIndex(t){var e=()=>super.getIndex,r=this;return e().call(r,r.vectorBucketName,t)}async deleteIndex(t){var e=()=>super.deleteIndex,r=this;return e().call(r,r.vectorBucketName,t)}index(t){return new _i(this.url,this.headers,this.vectorBucketName,t,this.fetch)}},_i=class extends mi{constructor(t,e,r,s,i){super(t,e,i),this.vectorBucketName=r,this.indexName=s}async putVectors(t){var e=()=>super.putVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async getVectors(t){var e=()=>super.getVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async listVectors(t={}){var e=()=>super.listVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async queryVectors(t){var e=()=>super.queryVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}async deleteVectors(t){var e=()=>super.deleteVectors,r=this;return e().call(r,k(k({},t),{},{vectorBucketName:r.vectorBucketName,indexName:r.indexName}))}},ki=class extends pi{constructor(t,e={},r,s){super(t,e,r,s)}from(t){return new hi(this.url,this.headers,t,this.fetch)}get vectors(){return new bi(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new gi(this.url+"/iceberg",this.headers,this.fetch)}};const Nr="2.108.2",ee=30*1e3,Ae=3,ft=Ae*ee,Si=2*ee,xi="http://localhost:9999",Ei="supabase.auth.token",Ti={"X-Client-Info":`gotrue-js/${Nr}`},Rt="X-Supabase-Api-Version",Br={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Ai=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Ri=10*60*1e3;class Ne extends Error{constructor(e,r,s){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=r,this.code=s}toJSON(){return{name:this.name,message:this.message,status:this.status,code:this.code}}}function v(t){return typeof t=="object"&&t!==null&&"__isAuthError"in t}class Ci extends Ne{constructor(e,r,s){super(e,r,s),this.name="AuthApiError",this.status=r,this.code=s}}function Pi(t){return v(t)&&t.name==="AuthApiError"}class W extends Ne{constructor(e,r){super(e),this.name="AuthUnknownError",this.originalError=r}}class J extends Ne{constructor(e,r,s,i){super(e,s,i),this.name=r,this.status=s}}class I extends J{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ke(t){return v(t)&&t.name==="AuthSessionMissingError"}class he extends J{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Ve extends J{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class Ge extends J{constructor(e,r=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}function Oi(t){return v(t)&&t.name==="AuthImplicitGrantRedirectError"}class tr extends J{constructor(e,r=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=r}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{details:this.details})}}class $i extends J{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ct extends J{constructor(e,r){super(e,"AuthRetryableFetchError",r,void 0)}}function rr(t){return v(t)&&t.name==="AuthRetryableFetchError"}class sr extends J{constructor(e="Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)"){super(e,"AuthRefreshDiscardedError",409,void 0)}}function Ii(t){return v(t)&&t.name==="AuthRefreshDiscardedError"}class ir extends J{constructor(e,r,s){super(e,"AuthWeakPasswordError",r,"weak_password"),this.reasons=s}toJSON(){return Object.assign(Object.assign({},super.toJSON()),{reasons:this.reasons})}}class st extends J{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const it="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),nr=` 	
\r=`.split(""),ji=(()=>{const t=new Array(128);for(let e=0;e<t.length;e+=1)t[e]=-1;for(let e=0;e<nr.length;e+=1)t[nr[e].charCodeAt(0)]=-2;for(let e=0;e<it.length;e+=1)t[it[e].charCodeAt(0)]=e;return t})();function ar(t,e,r){if(t!==null)for(e.queue=e.queue<<8|t,e.queuedBits+=8;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(it[s]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const s=e.queue>>e.queuedBits-6&63;r(it[s]),e.queuedBits-=6}}function Dr(t,e,r){const s=ji[t];if(s>-1)for(e.queue=e.queue<<6|s,e.queuedBits+=6;e.queuedBits>=8;)r(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(s===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(t)}"`)}}function or(t){const e=[],r=a=>{e.push(String.fromCodePoint(a))},s={utf8seq:0,codepoint:0},i={queue:0,queuedBits:0},n=a=>{Ni(a,s,r)};for(let a=0;a<t.length;a+=1)Dr(t.charCodeAt(a),i,n);return e.join("")}function Li(t,e){if(t<=127){e(t);return}else if(t<=2047){e(192|t>>6),e(128|t&63);return}else if(t<=65535){e(224|t>>12),e(128|t>>6&63),e(128|t&63);return}else if(t<=1114111){e(240|t>>18),e(128|t>>12&63),e(128|t>>6&63),e(128|t&63);return}throw new Error(`Unrecognized Unicode codepoint: ${t.toString(16)}`)}function Ui(t,e){for(let r=0;r<t.length;r+=1){let s=t.charCodeAt(r);if(s>55295&&s<=56319){const i=(s-55296)*1024&65535;s=(t.charCodeAt(r+1)-56320&65535|i)+65536,r+=1}Li(s,e)}}function Ni(t,e,r){if(e.utf8seq===0){if(t<=127){r(t);return}for(let s=1;s<6;s+=1)if(!(t>>7-s&1)){e.utf8seq=s;break}if(e.utf8seq===2)e.codepoint=t&31;else if(e.utf8seq===3)e.codepoint=t&15;else if(e.utf8seq===4)e.codepoint=t&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(t<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|t&63,e.utf8seq-=1,e.utf8seq===0&&r(e.codepoint)}}function ye(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};for(let i=0;i<t.length;i+=1)Dr(t.charCodeAt(i),r,s);return new Uint8Array(e)}function Bi(t){const e=[];return Ui(t,r=>e.push(r)),new Uint8Array(e)}function ce(t){const e=[],r={queue:0,queuedBits:0},s=i=>{e.push(i)};return t.forEach(i=>ar(i,r,s)),ar(null,r,s),e.join("")}function Di(t){return Math.round(Date.now()/1e3)+t}function Mi(){return Symbol("auth-callback")}const U=()=>typeof window<"u"&&typeof document<"u",ae={tested:!1,writable:!1},Mr=()=>{if(!U())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(ae.tested)return ae.writable;const t=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(t,t),globalThis.localStorage.removeItem(t),ae.tested=!0,ae.writable=!0}catch{ae.tested=!0,ae.writable=!1}return ae.writable};function qi(t){const e={},r=new URL(t);if(r.hash&&r.hash[0]==="#")try{new URLSearchParams(r.hash.substring(1)).forEach((i,n)=>{e[n]=i})}catch{}return r.searchParams.forEach((s,i)=>{e[i]=s}),e}const qr=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),zi=t=>typeof t=="object"&&t!==null&&"status"in t&&"ok"in t&&"json"in t&&typeof t.json=="function",ve=async(t,e,r)=>{await t.setItem(e,JSON.stringify(r))},z=async(t,e)=>{const r=await t.getItem(e);if(!r)return null;try{return JSON.parse(r)}catch{return null}},P=async(t,e)=>{await t.removeItem(e)};class ht{constructor(){this.promise=new ht.promiseConstructor((e,r)=>{this.resolve=e,this.reject=r})}}ht.promiseConstructor=Promise;function Je(t){const e=t.split(".");if(e.length!==3)throw new st("Invalid JWT structure");for(let s=0;s<e.length;s++)if(!Ai.test(e[s]))throw new st("JWT not in base64url format");return{header:JSON.parse(or(e[0])),payload:JSON.parse(or(e[1])),signature:ye(e[2]),raw:{header:e[0],payload:e[1]}}}async function Hi(t){return await new Promise(e=>{setTimeout(()=>e(null),t)})}function Fi(t,e){return new Promise((s,i)=>{(async()=>{for(let n=0;n<1/0;n++)try{const a=await t(n);if(!e(n,null,a)){s(a);return}}catch(a){if(!e(n,a)){i(a);return}}})()})}function Wi(t){return("0"+t.toString(16)).substr(-2)}function Ki(){const e=new Uint32Array(56);if(typeof crypto>"u"){const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",s=r.length;let i="";for(let n=0;n<56;n++)i+=r.charAt(Math.floor(Math.random()*s));return i}return crypto.getRandomValues(e),Array.from(e,Wi).join("")}async function Vi(t){const r=new TextEncoder().encode(t),s=await crypto.subtle.digest("SHA-256",r),i=new Uint8Array(s);return Array.from(i).map(n=>String.fromCharCode(n)).join("")}async function Gi(t){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),t;const r=await Vi(t);return btoa(r).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function oe(t,e,r=!1){const s=Ki();let i=s;r&&(i+="/recovery"),await ve(t,`${e}-code-verifier`,i);const n=await Gi(s);return[n,s===n?"plain":"s256"]}const Ji=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function Yi(t){const e=t.headers.get(Rt);if(!e||!e.match(Ji))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function Xi(t){if(!t)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(t<=e)throw new Error("JWT has expired")}function Zi(t){switch(t){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Qi=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function X(t){if(!Qi.test(t))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function H(t){if(!t.passkey)throw new Error("@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).")}function pt(){const t={};return new Proxy(t,{get:(e,r)=>{if(r==="__isUserNotAvailableProxy")return!0;if(typeof r=="symbol"){const s=r.toString();if(s==="Symbol(Symbol.toPrimitive)"||s==="Symbol(Symbol.toStringTag)"||s==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${r}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,r)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${r}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function en(t,e){return new Proxy(t,{get:(r,s,i)=>{if(s==="__isInsecureUserWarningProxy")return!0;if(typeof s=="symbol"){const n=s.toString();if(n==="Symbol(Symbol.toPrimitive)"||n==="Symbol(Symbol.toStringTag)"||n==="Symbol(util.inspect.custom)"||n==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(r,s,i)}return!e.value&&typeof s=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(r,s,i)}})}function lr(t){return JSON.parse(JSON.stringify(t))}const le=t=>{if(typeof t=="object"&&t!==null){const e=t;if(typeof e.msg=="string")return e.msg;if(typeof e.message=="string")return e.message;if(typeof e.error_description=="string")return e.error_description;if(typeof e.error=="string")return e.error}return JSON.stringify(t)},tn=[500,501,502,503,504,520,521,522,523,524,525,526,527,528,529,530];async function cr(t){var e;if(!zi(t))throw new Ct(le(t),0);if(tn.includes(t.status))throw new Ct(le(t),t.status);let r;try{r=await t.json()}catch(n){throw new W(le(n),n)}let s;const i=Yi(t);if(i&&i.getTime()>=Br["2024-01-01"].timestamp&&typeof r=="object"&&r&&typeof r.code=="string"?s=r.code:typeof r=="object"&&r&&typeof r.error_code=="string"&&(s=r.error_code),s){if(s==="weak_password")throw new ir(le(r),t.status,((e=r.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(s==="session_not_found")throw new I}else if(typeof r=="object"&&r&&typeof r.weak_password=="object"&&r.weak_password&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.reasons.reduce((n,a)=>n&&typeof a=="string",!0))throw new ir(le(r),t.status,r.weak_password.reasons);throw new Ci(le(r),t.status||500,s)}const rn=(t,e,r,s)=>{const i={method:t,headers:(e==null?void 0:e.headers)||{}};return t==="GET"?i:(i.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),i.body=JSON.stringify(s),Object.assign(Object.assign({},i),r))};async function y(t,e,r,s){var i;const n=Object.assign({},s==null?void 0:s.headers);n[Rt]||(n[Rt]=Br["2024-01-01"].name),s!=null&&s.jwt&&(n.Authorization=`Bearer ${s.jwt}`);const a=(i=s==null?void 0:s.query)!==null&&i!==void 0?i:{};s!=null&&s.redirectTo&&(a.redirect_to=s.redirectTo);const o=Object.keys(a).length?"?"+new URLSearchParams(a).toString():"",l=await sn(t,e,r+o,{headers:n,noResolveJson:s==null?void 0:s.noResolveJson},{},s==null?void 0:s.body);return s!=null&&s.xform?s==null?void 0:s.xform(l):{data:Object.assign({},l),error:null}}async function sn(t,e,r,s,i,n){const a=rn(e,s,i,n);let o;try{o=await t(r,Object.assign({},a))}catch(l){throw console.error(l),new Ct(le(l),0)}if(o.ok||await cr(o),s!=null&&s.noResolveJson)return o;try{return await o.json()}catch(l){await cr(l)}}function M(t){var e;let r=null;on(t)&&(r=Object.assign({},t),t.expires_at||(r.expires_at=Di(t.expires_in)));const s=(e=t.user)!==null&&e!==void 0?e:typeof(t==null?void 0:t.id)=="string"?t:null;return{data:{session:r,user:s},error:null}}function dr(t){const e=M(t);return!e.error&&t.weak_password&&typeof t.weak_password=="object"&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.message&&typeof t.weak_password.message=="string"&&t.weak_password.reasons.reduce((r,s)=>r&&typeof s=="string",!0)&&(e.data.weak_password=t.weak_password),e}function se(t){var e;return{data:{user:(e=t.user)!==null&&e!==void 0?e:t},error:null}}function nn(t){return{data:t,error:null}}function an(t){const{action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n}=t,a=ct(t,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),o={action_link:e,email_otp:r,hashed_token:s,redirect_to:i,verification_type:n},l=Object.assign({},a);return{data:{properties:o,user:l},error:null}}function ur(t){return t}function on(t){return!!t.access_token&&!!t.refresh_token&&!!t.expires_in}const gt=["global","local","others"];class ln{constructor({url:e="",headers:r={},fetch:s,experimental:i}){this.url=e,this.headers=r,this.fetch=qr(s),this.experimental=i??{},this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)},this.customProviders={listProviders:this._listCustomProviders.bind(this),createProvider:this._createCustomProvider.bind(this),getProvider:this._getCustomProvider.bind(this),updateProvider:this._updateCustomProvider.bind(this),deleteProvider:this._deleteCustomProvider.bind(this)},this.passkey={listPasskeys:this._adminListPasskeys.bind(this),deletePasskey:this._adminDeletePasskey.bind(this)}}async signOut(e,r=gt[0]){if(gt.indexOf(r)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${gt.join(", ")}`);try{return await y(this.fetch,"POST",`${this.url}/logout?scope=${r}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(s){if(v(s))return{data:null,error:s};throw s}}async inviteUserByEmail(e,r={}){try{return await y(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:r.data},headers:this.headers,redirectTo:r.redirectTo,xform:se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async generateLink(e){try{const{options:r}=e,s=ct(e,["options"]),i=Object.assign(Object.assign({},s),r);return"newEmail"in s&&(i.new_email=s==null?void 0:s.newEmail,delete i.newEmail),await y(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:i,headers:this.headers,xform:an,redirectTo:r==null?void 0:r.redirectTo})}catch(r){if(v(r))return{data:{properties:null,user:null},error:r};throw r}}async createUser(e){try{return await y(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:se})}catch(r){if(v(r))return{data:{user:null},error:r};throw r}}async listUsers(e){var r,s,i,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await y(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:ur});if(d.error)throw d.error;const u=await d.json(),h=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,f=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return f.length>0&&(f.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(p.split(";")[1].split("=")[1]);c[`${w}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(v(c))return{data:{users:[]},error:c};throw c}}async getUserById(e){X(e);try{return await y(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:se})}catch(r){if(v(r))return{data:{user:null},error:r};throw r}}async updateUserById(e,r){X(e);try{return await y(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:r,headers:this.headers,xform:se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async deleteUser(e,r=!1){X(e);try{return await y(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:r},xform:se})}catch(s){if(v(s))return{data:{user:null},error:s};throw s}}async _listFactors(e){X(e.userId);try{const{data:r,error:s}=await y(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:i=>({data:{factors:i},error:null})});return{data:r,error:s}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _deleteFactor(e){X(e.userId),X(e.id);try{return{data:await y(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _listOAuthClients(e){var r,s,i,n,a,o,l;try{const c={nextPage:null,lastPage:0,total:0},d=await y(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(s=(r=e==null?void 0:e.page)===null||r===void 0?void 0:r.toString())!==null&&s!==void 0?s:"",per_page:(n=(i=e==null?void 0:e.perPage)===null||i===void 0?void 0:i.toString())!==null&&n!==void 0?n:""},xform:ur});if(d.error)throw d.error;const u=await d.json(),h=(a=d.headers.get("x-total-count"))!==null&&a!==void 0?a:0,f=(l=(o=d.headers.get("link"))===null||o===void 0?void 0:o.split(","))!==null&&l!==void 0?l:[];return f.length>0&&(f.forEach(p=>{const g=parseInt(p.split(";")[0].split("=")[1].substring(0,1)),w=JSON.parse(p.split(";")[1].split("=")[1]);c[`${w}Page`]=g}),c.total=parseInt(h)),{data:Object.assign(Object.assign({},u),c),error:null}}catch(c){if(v(c))return{data:{clients:[]},error:c};throw c}}async _createOAuthClient(e){try{return await y(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _getOAuthClient(e){try{return await y(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _updateOAuthClient(e,r){try{return await y(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(v(s))return{data:null,error:s};throw s}}async _deleteOAuthClient(e){try{return await y(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _regenerateOAuthClientSecret(e){try{return await y(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _listCustomProviders(e){try{const r={};return e!=null&&e.type&&(r.type=e.type),await y(this.fetch,"GET",`${this.url}/admin/custom-providers`,{headers:this.headers,query:r,xform:s=>{var i;return{data:{providers:(i=s==null?void 0:s.providers)!==null&&i!==void 0?i:[]},error:null}}})}catch(r){if(v(r))return{data:{providers:[]},error:r};throw r}}async _createCustomProvider(e){try{return await y(this.fetch,"POST",`${this.url}/admin/custom-providers`,{body:e,headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _getCustomProvider(e){try{return await y(this.fetch,"GET",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _updateCustomProvider(e,r){try{return await y(this.fetch,"PUT",`${this.url}/admin/custom-providers/${e}`,{body:r,headers:this.headers,xform:s=>({data:s,error:null})})}catch(s){if(v(s))return{data:null,error:s};throw s}}async _deleteCustomProvider(e){try{return await y(this.fetch,"DELETE",`${this.url}/admin/custom-providers/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}async _adminListPasskeys(e){H(this.experimental),X(e.userId);try{return await y(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/passkeys`,{headers:this.headers,xform:r=>({data:r,error:null})})}catch(r){if(v(r))return{data:null,error:r};throw r}}async _adminDeletePasskey(e){H(this.experimental),X(e.userId),X(e.passkeyId);try{return await y(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/passkeys/${e.passkeyId}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(r){if(v(r))return{data:null,error:r};throw r}}}function hr(t={}){return{getItem:e=>t[e]||null,setItem:(e,r)=>{t[e]=r},removeItem:e=>{delete t[e]}}}globalThis&&Mr()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug");class cn extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}function dn(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function zr(t){if(!/^0x[a-fA-F0-9]{40}$/.test(t))throw new Error(`@supabase/auth-js: Address "${t}" is invalid.`);return t.toLowerCase()}function un(t){return parseInt(t,16)}function hn(t){const e=new TextEncoder().encode(t);return"0x"+Array.from(e,s=>s.toString(16).padStart(2,"0")).join("")}function fn(t){var e;const{chainId:r,domain:s,expirationTime:i,issuedAt:n=new Date,nonce:a,notBefore:o,requestId:l,resources:c,scheme:d,uri:u,version:h}=t;{if(!Number.isInteger(r))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${r}`);if(!s)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(a&&a.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${a}`);if(!u)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(h!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`);if(!((e=t.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${t.statement}`)}const f=zr(t.address),p=d?`${d}://${s}`:s,g=t.statement?`${t.statement}
`:"",w=`${p} wants you to sign in with your Ethereum account:
${f}

${g}`;let b=`URI: ${u}
Version: ${h}
Chain ID: ${r}${a?`
Nonce: ${a}`:""}
Issued At: ${n.toISOString()}`;if(i&&(b+=`
Expiration Time: ${i.toISOString()}`),o&&(b+=`
Not Before: ${o.toISOString()}`),l&&(b+=`
Request ID: ${l}`),c){let _=`
Resources:`;for(const m of c){if(!m||typeof m!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${m}`);_+=`
- ${m}`}b+=_}return`${w}
${b}`}class O extends Error{constructor({message:e,code:r,cause:s,name:i}){var n;super(e,{cause:s}),this.__isWebAuthnError=!0,this.name=(n=i??(s instanceof Error?s.name:void 0))!==null&&n!==void 0?n:"Unknown Error",this.code=r}toJSON(){return{name:this.name,message:this.message,code:this.code}}}class nt extends O{constructor(e,r){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r,message:e}),this.name="WebAuthnUnknownError",this.originalError=r}}function pn({error:t,options:e}){var r,s,i;const{publicKey:n}=e;if(!n)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new O({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else if(t.name==="ConstraintError"){if(((r=n.authenticatorSelection)===null||r===void 0?void 0:r.requireResidentKey)===!0)return new O({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:t});if(e.mediation==="conditional"&&((s=n.authenticatorSelection)===null||s===void 0?void 0:s.userVerification)==="required")return new O({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:t});if(((i=n.authenticatorSelection)===null||i===void 0?void 0:i.userVerification)==="required")return new O({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:t})}else{if(t.name==="InvalidStateError")return new O({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:t});if(t.name==="NotAllowedError")return new O({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="NotSupportedError")return n.pubKeyCredParams.filter(o=>o.type==="public-key").length===0?new O({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:t}):new O({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:t});if(t.name==="SecurityError"){const a=window.location.hostname;if(Hr(a)){if(n.rp.id!==a)return new O({message:`The RP ID "${n.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new O({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="TypeError"){if(n.user.id.byteLength<1||n.user.id.byteLength>64)return new O({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:t})}else if(t.name==="UnknownError")return new O({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new O({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}function gn({error:t,options:e}){const{publicKey:r}=e;if(!r)throw Error("options was missing required publicKey property");if(t.name==="AbortError"){if(e.signal instanceof AbortSignal)return new O({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:t})}else{if(t.name==="NotAllowedError")return new O({message:t.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t});if(t.name==="SecurityError"){const s=window.location.hostname;if(Hr(s)){if(r.rpId!==s)return new O({message:`The RP ID "${r.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:t})}else return new O({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:t})}else if(t.name==="UnknownError")return new O({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:t})}return new O({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t})}class vn{createNewAbortSignal(){if(this.controller){const r=new Error("Cancelling existing WebAuthn API call for new one");r.name="AbortError",this.controller.abort(r)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Pt=new vn;function fr(t){if(!t)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(t);const{challenge:e,user:r,excludeCredentials:s}=t,i=ct(t,["challenge","user","excludeCredentials"]),n=ye(e).buffer,a=Object.assign(Object.assign({},r),{id:ye(r.id).buffer}),o=Object.assign(Object.assign({},i),{challenge:n,user:a});if(s&&s.length>0){o.excludeCredentials=new Array(s.length);for(let l=0;l<s.length;l++){const c=s[l];o.excludeCredentials[l]=Object.assign(Object.assign({},c),{id:ye(c.id).buffer,type:c.type||"public-key",transports:c.transports})}}return o}function pr(t){if(!t)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(t);const{challenge:e,allowCredentials:r}=t,s=ct(t,["challenge","allowCredentials"]),i=ye(e).buffer,n=Object.assign(Object.assign({},s),{challenge:i});if(r&&r.length>0){n.allowCredentials=new Array(r.length);for(let a=0;a<r.length;a++){const o=r[a];n.allowCredentials[a]=Object.assign(Object.assign({},o),{id:ye(o.id).buffer,type:o.type||"public-key",transports:o.transports})}}return n}function gr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t;return{id:t.id,rawId:t.id,response:{attestationObject:ce(new Uint8Array(t.response.attestationObject)),clientDataJSON:ce(new Uint8Array(t.response.clientDataJSON))},type:"public-key",clientExtensionResults:t.getClientExtensionResults(),authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function vr(t){var e;if("toJSON"in t&&typeof t.toJSON=="function")return t.toJSON();const r=t,s=t.getClientExtensionResults(),i=t.response;return{id:t.id,rawId:t.id,response:{authenticatorData:ce(new Uint8Array(i.authenticatorData)),clientDataJSON:ce(new Uint8Array(i.clientDataJSON)),signature:ce(new Uint8Array(i.signature)),userHandle:i.userHandle?ce(new Uint8Array(i.userHandle)):void 0},type:"public-key",clientExtensionResults:s,authenticatorAttachment:(e=r.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Hr(t){return t==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(t)}function at(){var t,e;return!!(U()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((t=navigator==null?void 0:navigator.credentials)===null||t===void 0?void 0:t.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function Fr(t){try{const e=await navigator.credentials.create(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new nt("Browser returned unexpected credential type",e)}:{data:null,error:new nt("Empty credential response",e)}}catch(e){return{data:null,error:pn({error:e,options:t})}}}async function Wr(t){try{const e=await navigator.credentials.get(t);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new nt("Browser returned unexpected credential type",e)}:{data:null,error:new nt("Empty credential response",e)}}catch(e){return{data:null,error:gn({error:e,options:t})}}}const mn={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},yn={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function ot(...t){const e=i=>i!==null&&typeof i=="object"&&!Array.isArray(i),r=i=>i instanceof ArrayBuffer||ArrayBuffer.isView(i),s={};for(const i of t)if(i)for(const n in i){const a=i[n];if(a!==void 0)if(Array.isArray(a))s[n]=a;else if(r(a))s[n]=a;else if(e(a)){const o=s[n];e(o)?s[n]=ot(o,a):s[n]=ot(a)}else s[n]=a}return s}function bn(t,e){return ot(mn,t,e||{})}function wn(t,e){return ot(yn,t,e||{})}class _n{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:r,friendlyName:s,signal:i},n){var a;try{const{data:o,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:r});if(!o)return{data:null,error:l};const c=i??Pt.createNewAbortSignal();if(o.webauthn.type==="create"){const{user:d}=o.webauthn.credential_options.publicKey;if(!d.name){const u=s;if(u)d.name=`${d.id}:${u}`;else{const f=(await this.client.getUser()).data.user,p=((a=f==null?void 0:f.user_metadata)===null||a===void 0?void 0:a.name)||(f==null?void 0:f.email)||(f==null?void 0:f.id)||"User";d.name=`${d.id}:${p}`}}d.displayName||(d.displayName=d.name)}switch(o.webauthn.type){case"create":{const d=bn(o.webauthn.credential_options.publicKey,n==null?void 0:n.create),{data:u,error:h}=await Fr({publicKey:d,signal:c});return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}case"request":{const d=wn(o.webauthn.credential_options.publicKey,n==null?void 0:n.request),{data:u,error:h}=await Wr(Object.assign(Object.assign({},o.webauthn.credential_options),{publicKey:d,signal:c}));return u?{data:{factorId:e,challengeId:o.id,webauthn:{type:o.webauthn.type,credential_response:u}},error:null}:{data:null,error:h}}}}catch(o){return v(o)?{data:null,error:o}:{data:null,error:new W("Unexpected error in challenge",o)}}}async _verify({challengeId:e,factorId:r,webauthn:s}){return this.client.mfa.verify({factorId:r,challengeId:e,webauthn:s})}async _authenticate({factorId:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new Ne("rpId is required for WebAuthn authentication")};try{if(!at())return{data:null,error:new W("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this.challenge({factorId:e,webauthn:{rpId:r,rpOrigins:s},signal:i},{request:n});if(!a)return{data:null,error:o};const{webauthn:l}=a;return this._verify({factorId:e,challengeId:a.challengeId,webauthn:{type:l.type,rpId:r,rpOrigins:s,credential_response:l.credential_response}})}catch(a){return v(a)?{data:null,error:a}:{data:null,error:new W("Unexpected error in authenticate",a)}}}async _register({friendlyName:e,webauthn:{rpId:r=typeof window<"u"?window.location.hostname:void 0,rpOrigins:s=typeof window<"u"?[window.location.origin]:void 0,signal:i}={}},n){if(!r)return{data:null,error:new Ne("rpId is required for WebAuthn registration")};try{if(!at())return{data:null,error:new W("Browser does not support WebAuthn",null)};const{data:a,error:o}=await this._enroll({friendlyName:e});if(!a)return await this.client.mfa.listFactors().then(d=>{var u;return(u=d.data)===null||u===void 0?void 0:u.all.find(h=>h.factor_type==="webauthn"&&h.friendly_name===e&&h.status!=="unverified")}).then(d=>d?this.client.mfa.unenroll({factorId:d==null?void 0:d.id}):void 0),{data:null,error:o};const{data:l,error:c}=await this._challenge({factorId:a.id,friendlyName:a.friendly_name,webauthn:{rpId:r,rpOrigins:s},signal:i},{create:n});return l?this._verify({factorId:a.id,challengeId:l.challengeId,webauthn:{rpId:r,rpOrigins:s,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:c}}catch(a){return v(a)?{data:null,error:a}:{data:null,error:new W("Unexpected error in register",a)}}}}dn();const kn={url:xi,storageKey:Ei,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Ti,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:5e3,skipAutoInitialize:!1,experimental:{}},fe={};class Be{get jwks(){var e,r;return(r=(e=fe[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&r!==void 0?r:{keys:[]}}set jwks(e){fe[this.storageKey]=Object.assign(Object.assign({},fe[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,r;return(r=(e=fe[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&r!==void 0?r:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){fe[this.storageKey]=Object.assign(Object.assign({},fe[this.storageKey]),{cachedAt:e})}constructor(e){var r,s,i;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.lastRefreshFailure=null,this._sessionRemovalEpoch=0,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lock=null,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const n=Object.assign(Object.assign({},kn),e);if(this.storageKey=n.storageKey,this.instanceID=(r=Be.nextInstanceID[this.storageKey])!==null&&r!==void 0?r:0,Be.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!n.debug,typeof n.debug=="function"&&(this.logger=n.debug),this.instanceID>0&&U()){const a=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(a),this.logDebugMessages&&console.trace(a)}if(this.persistSession=n.persistSession,this.autoRefreshToken=n.autoRefreshToken,this.experimental=(s=n.experimental)!==null&&s!==void 0?s:{},this.admin=new ln({url:n.url,headers:n.headers,fetch:n.fetch,experimental:this.experimental}),this.url=n.url,this.headers=n.headers,this.fetch=qr(n.fetch),this.detectSessionInUrl=n.detectSessionInUrl,this.flowType=n.flowType,this.hasCustomAuthorizationHeader=n.hasCustomAuthorizationHeader,this.throwOnError=n.throwOnError,this.lockAcquireTimeout=n.lockAcquireTimeout,n.lock!=null&&(this.lock=n.lock),this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new _n(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.passkey={startRegistration:this._startPasskeyRegistration.bind(this),verifyRegistration:this._verifyPasskeyRegistration.bind(this),startAuthentication:this._startPasskeyAuthentication.bind(this),verifyAuthentication:this._verifyPasskeyAuthentication.bind(this),list:this._listPasskeys.bind(this),update:this._updatePasskey.bind(this),delete:this._deletePasskey.bind(this)},this.persistSession?(n.storage?this.storage=n.storage:Mr()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=hr(this.memoryStorage)),n.userStorage&&(this.userStorage=n.userStorage)):(this.memoryStorage={},this.storage=hr(this.memoryStorage)),U()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(a){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",a)}(i=this.broadcastChannel)===null||i===void 0||i.addEventListener("message",async a=>{this._debug("received broadcast notification from other tab or client",a),(a.data.event==="TOKEN_REFRESHED"||a.data.event==="SIGNED_IN")&&(this.lastRefreshFailure=null);try{await this._notifyAllSubscribers(a.data.event,a.data.session,!1)}catch(o){this._debug("#broadcastChannel","error",o)}})}n.skipAutoInitialize||this.initialize().catch(a=>{this._debug("#initialize()","error",a)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Nr}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()):await this._initialize())(),await this.initializePromise)}async _initialize(){var e;try{let r={},s="none";if(U()&&(r=qi(window.location.href),this._isImplicitGrantCallback(r)?s="implicit":await this._isPKCECallback(r)&&(s="pkce")),U()&&this.detectSessionInUrl&&s!=="none"){const{data:i,error:n}=await this._getSessionFromURL(r,s);if(n){if(this._debug("#_initialize()","error detecting session from URL",n),Oi(n)){const l=(e=n.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:n}}return{error:n}}const{session:a,redirectType:o}=i;return this._debug("#_initialize()","detected session in URL",a,"redirect type",o),await this._saveSession(a),setTimeout(async()=>{o==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",a):await this._notifyAllSubscribers("SIGNED_IN",a)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(r){return v(r)?this._returnResult({error:r}):this._returnResult({error:new W("Unexpected error during initialization",r)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var r,s,i;try{const n=await y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(s=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.data)!==null&&s!==void 0?s:{},gotrue_meta_security:{captcha_token:(i=e==null?void 0:e.options)===null||i===void 0?void 0:i.captchaToken}},xform:M}),{data:a,error:o}=n;if(o||!a)return this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(v(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signUp(e){var r,s,i;try{let n;if("email"in e){const{email:d,password:u,options:h}=e;let f=null,p=null;this.flowType==="pkce"&&([f,p]=await oe(this.storage,this.storageKey)),n=await y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:h==null?void 0:h.emailRedirectTo,body:{email:d,password:u,data:(r=h==null?void 0:h.data)!==null&&r!==void 0?r:{},gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken},code_challenge:f,code_challenge_method:p},xform:M})}else if("phone"in e){const{phone:d,password:u,options:h}=e;n=await y(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:d,password:u,data:(s=h==null?void 0:h.data)!==null&&s!==void 0?s:{},channel:(i=h==null?void 0:h.channel)!==null&&i!==void 0?i:"sms",gotrue_meta_security:{captcha_token:h==null?void 0:h.captchaToken}},xform:M})}else throw new Ve("You must provide either an email or phone number and a password");const{data:a,error:o}=n;if(o||!a)return await P(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:o});const l=a.session,c=a.user;return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(n){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithPassword(e){try{let r;if("email"in e){const{email:n,password:a,options:o}=e;r=await y(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:n,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:dr})}else if("phone"in e){const{phone:n,password:a,options:o}=e;r=await y(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:n,password:a,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},xform:dr})}else throw new Ve("You must provide either an email or phone number and a password");const{data:s,error:i}=r;if(i)return this._returnResult({data:{user:null,session:null},error:i});if(!s||!s.session||!s.user){const n=new he;return this._returnResult({data:{user:null,session:null},error:n})}return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",s.session)),this._returnResult({data:Object.assign({user:s.user,session:s.session},s.weak_password?{weakPassword:s.weak_password}:null),error:i})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOAuth(e){var r,s,i,n;return await this._handleProviderSignIn(e.provider,{redirectTo:(r=e.options)===null||r===void 0?void 0:r.redirectTo,scopes:(s=e.options)===null||s===void 0?void 0:s.scopes,queryParams:(i=e.options)===null||i===void 0?void 0:i.queryParams,skipBrowserRedirect:(n=e.options)===null||n===void 0?void 0:n.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this.lock!=null?this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e)):this._exchangeCodeForSession(e)}async signInWithWeb3(e){const{chain:r}=e;switch(r){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`)}}async signInWithEthereum(e){var r,s,i,n,a,o,l,c,d,u,h;let f,p;if("message"in e)f=e.message,p=e.signature;else{const{chain:g,wallet:w,statement:b,options:_}=e;let m;if(U())if(typeof w=="object")m=w;else{const Y=window;if("ethereum"in Y&&typeof Y.ethereum=="object"&&"request"in Y.ethereum&&typeof Y.ethereum.request=="function")m=Y.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!(_!=null&&_.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");m=w}const T=new URL((r=_==null?void 0:_.url)!==null&&r!==void 0?r:window.location.href),B=await m.request({method:"eth_requestAccounts"}).then(Y=>Y).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!B||B.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const R=zr(B[0]);let L=(s=_==null?void 0:_.signInWithEthereum)===null||s===void 0?void 0:s.chainId;if(!L){const Y=await m.request({method:"eth_chainId"});L=un(Y)}const Yr={domain:T.host,address:R,statement:b,uri:T.href,version:"1",chainId:L,nonce:(i=_==null?void 0:_.signInWithEthereum)===null||i===void 0?void 0:i.nonce,issuedAt:(a=(n=_==null?void 0:_.signInWithEthereum)===null||n===void 0?void 0:n.issuedAt)!==null&&a!==void 0?a:new Date,expirationTime:(o=_==null?void 0:_.signInWithEthereum)===null||o===void 0?void 0:o.expirationTime,notBefore:(l=_==null?void 0:_.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(c=_==null?void 0:_.signInWithEthereum)===null||c===void 0?void 0:c.requestId,resources:(d=_==null?void 0:_.signInWithEthereum)===null||d===void 0?void 0:d.resources};f=fn(Yr),p=await m.request({method:"personal_sign",params:[hn(f),R]})}try{const{data:g,error:w}=await y(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:f,signature:p},!((u=e.options)===null||u===void 0)&&u.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:M});if(w)throw w;if(!g||!g.session||!g.user){const b=new he;return this._returnResult({data:{user:null,session:null},error:b})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:w})}catch(g){if(v(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async signInWithSolana(e){var r,s,i,n,a,o,l,c,d,u,h,f;let p,g;if("message"in e)p=e.message,g=e.signature;else{const{chain:w,wallet:b,statement:_,options:m}=e;let T;if(U())if(typeof b=="object")T=b;else{const R=window;if("solana"in R&&typeof R.solana=="object"&&("signIn"in R.solana&&typeof R.solana.signIn=="function"||"signMessage"in R.solana&&typeof R.solana.signMessage=="function"))T=R.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof b!="object"||!(m!=null&&m.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");T=b}const B=new URL((r=m==null?void 0:m.url)!==null&&r!==void 0?r:window.location.href);if("signIn"in T&&T.signIn){const R=await T.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},m==null?void 0:m.signInWithSolana),{version:"1",domain:B.host,uri:B.href}),_?{statement:_}:null));let L;if(Array.isArray(R)&&R[0]&&typeof R[0]=="object")L=R[0];else if(R&&typeof R=="object"&&"signedMessage"in R&&"signature"in R)L=R;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in L&&"signature"in L&&(typeof L.signedMessage=="string"||L.signedMessage instanceof Uint8Array)&&L.signature instanceof Uint8Array)p=typeof L.signedMessage=="string"?L.signedMessage:new TextDecoder().decode(L.signedMessage),g=L.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in T)||typeof T.signMessage!="function"||!("publicKey"in T)||typeof T!="object"||!T.publicKey||!("toBase58"in T.publicKey)||typeof T.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");p=[`${B.host} wants you to sign in with your Solana account:`,T.publicKey.toBase58(),..._?["",_,""]:[""],"Version: 1",`URI: ${B.href}`,`Issued At: ${(i=(s=m==null?void 0:m.signInWithSolana)===null||s===void 0?void 0:s.issuedAt)!==null&&i!==void 0?i:new Date().toISOString()}`,...!((n=m==null?void 0:m.signInWithSolana)===null||n===void 0)&&n.notBefore?[`Not Before: ${m.signInWithSolana.notBefore}`]:[],...!((a=m==null?void 0:m.signInWithSolana)===null||a===void 0)&&a.expirationTime?[`Expiration Time: ${m.signInWithSolana.expirationTime}`]:[],...!((o=m==null?void 0:m.signInWithSolana)===null||o===void 0)&&o.chainId?[`Chain ID: ${m.signInWithSolana.chainId}`]:[],...!((l=m==null?void 0:m.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${m.signInWithSolana.nonce}`]:[],...!((c=m==null?void 0:m.signInWithSolana)===null||c===void 0)&&c.requestId?[`Request ID: ${m.signInWithSolana.requestId}`]:[],...!((u=(d=m==null?void 0:m.signInWithSolana)===null||d===void 0?void 0:d.resources)===null||u===void 0)&&u.length?["Resources",...m.signInWithSolana.resources.map(L=>`- ${L}`)]:[]].join(`
`);const R=await T.signMessage(new TextEncoder().encode(p),"utf8");if(!R||!(R instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");g=R}}try{const{data:w,error:b}=await y(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:p,signature:ce(g)},!((h=e.options)===null||h===void 0)&&h.captchaToken?{gotrue_meta_security:{captcha_token:(f=e.options)===null||f===void 0?void 0:f.captchaToken}}:null),xform:M});if(b)throw b;if(!w||!w.session||!w.user){const _=new he;return this._returnResult({data:{user:null,session:null},error:_})}return w.session&&(await this._saveSession(w.session),await this._notifyAllSubscribers("SIGNED_IN",w.session)),this._returnResult({data:Object.assign({},w),error:b})}catch(w){if(v(w))return this._returnResult({data:{user:null,session:null},error:w});throw w}}async _exchangeCodeForSession(e){const r=await z(this.storage,`${this.storageKey}-code-verifier`),[s,i]=(r??"").split("/");try{if(!s&&this.flowType==="pkce")throw new $i;const{data:n,error:a}=await y(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:s},xform:M});if(await P(this.storage,`${this.storageKey}-code-verifier`),a)throw a;if(!n||!n.session||!n.user){const o=new he;return this._returnResult({data:{user:null,session:null,redirectType:null},error:o})}return n.session&&(await this._saveSession(n.session),await this._notifyAllSubscribers(i==="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",n.session)),this._returnResult({data:Object.assign(Object.assign({},n),{redirectType:i??null}),error:a})}catch(n){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(n))return this._returnResult({data:{user:null,session:null,redirectType:null},error:n});throw n}}async signInWithIdToken(e){try{const{options:r,provider:s,token:i,access_token:n,nonce:a}=e,o=await y(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:s,id_token:i,access_token:n,nonce:a,gotrue_meta_security:{captcha_token:r==null?void 0:r.captchaToken}},xform:M}),{data:l,error:c}=o;if(c)return this._returnResult({data:{user:null,session:null},error:c});if(!l||!l.session||!l.user){const d=new he;return this._returnResult({data:{user:null,session:null},error:d})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:c})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async signInWithOtp(e){var r,s,i,n,a;try{if("email"in e){const{email:o,options:l}=e;let c=null,d=null;this.flowType==="pkce"&&([c,d]=await oe(this.storage,this.storageKey));const{error:u}=await y(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:o,data:(r=l==null?void 0:l.data)!==null&&r!==void 0?r:{},create_user:(s=l==null?void 0:l.shouldCreateUser)!==null&&s!==void 0?s:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:c,code_challenge_method:d},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:u})}if("phone"in e){const{phone:o,options:l}=e,{data:c,error:d}=await y(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:o,data:(i=l==null?void 0:l.data)!==null&&i!==void 0?i:{},create_user:(n=l==null?void 0:l.shouldCreateUser)!==null&&n!==void 0?n:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(a=l==null?void 0:l.channel)!==null&&a!==void 0?a:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:c==null?void 0:c.message_id},error:d})}throw new Ve("You must provide either an email or phone number.")}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async verifyOtp(e){var r,s;try{let i,n;"options"in e&&(i=(r=e.options)===null||r===void 0?void 0:r.redirectTo,n=(s=e.options)===null||s===void 0?void 0:s.captchaToken);const{data:a,error:o}=await y(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:n}}),redirectTo:i,xform:M});if(o)throw o;if(!a)throw new Error("An error occurred on token verification.");const l=a.session,c=a.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:c,session:l},error:null})}catch(i){if(v(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async signInWithSSO(e){var r,s,i,n,a;try{let o=null,l=null;this.flowType==="pkce"&&([o,l]=await oe(this.storage,this.storageKey));const c=await y(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(s=(r=e.options)===null||r===void 0?void 0:r.redirectTo)!==null&&s!==void 0?s:void 0}),!((i=e==null?void 0:e.options)===null||i===void 0)&&i.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:o,code_challenge_method:l}),headers:this.headers,xform:nn});return!((n=c.data)===null||n===void 0)&&n.url&&U()&&!(!((a=e.options)===null||a===void 0)&&a.skipBrowserRedirect)&&window.location.assign(c.data.url),this._returnResult(c)}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(o))return this._returnResult({data:null,error:o});throw o}}async reauthenticate(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate()):await this._reauthenticate()}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)throw s;if(!r)throw new I;const{error:i}=await y(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:r.access_token});return this._returnResult({data:{user:null,session:null},error:i})})}catch(e){if(v(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const r=`${this.url}/resend`;if("email"in e){const{email:s,type:i,options:n}=e;let a=null,o=null;this.flowType==="pkce"&&([a,o]=await oe(this.storage,this.storageKey));const{error:l}=await y(this.fetch,"POST",r,{headers:this.headers,body:{email:s,type:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken},code_challenge:a,code_challenge_method:o},redirectTo:n==null?void 0:n.emailRedirectTo});return l&&await P(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:l})}else if("phone"in e){const{phone:s,type:i,options:n}=e,{data:a,error:o}=await y(this.fetch,"POST",r,{headers:this.headers,body:{phone:s,type:i,gotrue_meta_security:{captcha_token:n==null?void 0:n.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:a==null?void 0:a.message_id},error:o})}throw new Ve("You must provide either an email or phone number and a type")}catch(r){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async getSession(){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async e=>e)):await this._useSession(async e=>e)}async _acquireLock(e,r){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const s=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),i=(async()=>(await s,await r()))();return this.pendingInLock.push((async()=>{try{await i}catch{}})()),i}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const s=r();for(this.pendingInLock.push((async()=>{try{await s}catch{}})()),await s;this.pendingInLock.length;){const i=[...this.pendingInLock];await Promise.all(i),this.pendingInLock.splice(0,i.length)}return await s}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const r=await this.__loadSession();return await e(r)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lock!=null&&!this.lockAcquired&&this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const r=await z(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",r),r!==null&&(this._isValidSession(r)?e=r:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const s=e.expires_at?e.expires_at*1e3-Date.now()<ft:!1;if(this._debug("#__loadSession()",`session has${s?"":" not"} expired`,"expires_at",e.expires_at),!s){if(this.userStorage){const a=await z(this.userStorage,this.storageKey+"-user");a!=null&&a.user?e.user=a.user:e.user=pt()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const a={value:this.suppressGetSessionWarning};e.user=en(e.user,a),a.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);if(n){if(!!(e.expires_at&&e.expires_at*1e3>Date.now())){const o=await z(this.storage,this.storageKey);if(o&&o.refresh_token===e.refresh_token)return this._returnResult({data:{session:e},error:null})}return this._returnResult({data:{session:null},error:n})}return this._returnResult({data:{session:i},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;let r;return this.lock!=null?r=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser()):r=await this._getUser(),r.data.user&&(this.suppressGetSessionWarning=!0),r}async _getUser(e){try{return e?await y(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:se}):await this._useSession(async r=>{var s,i,n;const{data:a,error:o}=r;if(o)throw o;return!(!((s=a.session)===null||s===void 0)&&s.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new I}:await y(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(n=(i=a.session)===null||i===void 0?void 0:i.access_token)!==null&&n!==void 0?n:void 0,xform:se})})}catch(r){if(v(r))return Ke(r)&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:r});throw r}}async updateUser(e,r={}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,r)):await this._updateUser(e,r)}async _updateUser(e,r={}){try{return await this._useSession(async s=>{const{data:i,error:n}=s;if(n)throw n;if(!i.session)throw new I;const a=i.session;let o=null,l=null;this.flowType==="pkce"&&e.email!=null&&([o,l]=await oe(this.storage,this.storageKey));const{data:c,error:d}=await y(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:r==null?void 0:r.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:o,code_challenge_method:l}),jwt:a.access_token,xform:se});if(d)throw d;return a.user=c.user,await this._saveSession(a),await this._notifyAllSubscribers("USER_UPDATED",a),this._returnResult({data:{user:a.user},error:null})})}catch(s){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(s))return this._returnResult({data:{user:null},error:s});throw s}}async setSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e)):await this._setSession(e)}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new I;const r=Date.now()/1e3;let s=r,i=!0,n=null;const{payload:a}=Je(e.access_token);if(a.exp&&(s=a.exp,i=s<=r),i){const{data:o,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!o)return{data:{user:null,session:null},error:null};n=o}else{const{data:o,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});n={access_token:e.access_token,refresh_token:e.refresh_token,user:o.user,token_type:"bearer",expires_in:s-r,expires_at:s},await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)}return this._returnResult({data:{user:n.user,session:n},error:null})}catch(r){if(v(r))return this._returnResult({data:{session:null,user:null},error:r});throw r}}async refreshSession(e){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e)):await this._refreshSession(e)}async _refreshSession(e){try{return await this._useSession(async r=>{var s;if(!e){const{data:a,error:o}=r;if(o)throw o;e=(s=a.session)!==null&&s!==void 0?s:void 0}if(!(e!=null&&e.refresh_token))throw new I;const{data:i,error:n}=await this._callRefreshToken(e.refresh_token);return n?this._returnResult({data:{user:null,session:null},error:n}):i?this._returnResult({data:{user:i.user,session:i},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(r){if(v(r))return this._returnResult({data:{user:null,session:null},error:r});throw r}}async _getSessionFromURL(e,r){var s;try{if(!U())throw new Ge("No browser detected.");if(e.error||e.error_description||e.error_code)throw new Ge(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(r){case"implicit":if(this.flowType==="pkce")throw new tr("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new Ge("Not a valid implicit grant flow url.");break;default:}if(r==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new tr("No code detected.");const{data:m,error:T}=await this._exchangeCodeForSession(e.code);if(T)throw T;const B=new URL(window.location.href);return B.searchParams.delete("code"),window.history.replaceState(window.history.state,"",B.toString()),{data:{session:m.session,redirectType:(s=m.redirectType)!==null&&s!==void 0?s:null},error:null}}const{provider_token:i,provider_refresh_token:n,access_token:a,refresh_token:o,expires_in:l,expires_at:c,token_type:d}=e;if(!a||!l||!o||!d)throw new Ge("No session defined in URL");const u=Math.round(Date.now()/1e3),h=parseInt(l);let f=u+h;c&&(f=parseInt(c));const p=f-u;p*1e3<=ee&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${h}s`);const g=f-h;u-g>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",g,f,u):u-g<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",g,f,u);const{data:w,error:b}=await this._getUser(a);if(b)throw b;const _={provider_token:i,provider_refresh_token:n,access_token:a,expires_in:h,expires_at:f,refresh_token:o,token_type:d,user:w.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:_,redirectType:e.type},error:null})}catch(i){if(v(i))return this._returnResult({data:{session:null,redirectType:null},error:i});throw i}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error||e.error_description||e.error_code)}async _isPKCECallback(e){const r=await z(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&r)}async signOut(e={scope:"global"}){return await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e)):await this._signOut(e)}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async r=>{var s;const{data:i,error:n}=r;if(n&&!Ke(n))return this._returnResult({error:n});const a=(s=i.session)===null||s===void 0?void 0:s.access_token;if(a){const{error:o}=await this.admin.signOut(a,e);if(o&&!(Pi(o)&&(o.status===404||o.status===401||o.status===403)||Ke(o)))return this._returnResult({error:o})}return e!=="others"&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const r=Mi(),s={id:r,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",r),this.stateChangeEmitters.delete(r)}};return this._debug("#onAuthStateChange()","registered callback with id",r),this.stateChangeEmitters.set(r,s),(async()=>(await this.initializePromise,this.lock!=null?await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(r)}):await this._emitInitialSession(r)))(),{data:{subscription:s}}}async _emitInitialSession(e){return await this._useSession(async r=>{var s,i;try{const{data:{session:n},error:a}=r;if(a)throw a;await((s=this.stateChangeEmitters.get(e))===null||s===void 0?void 0:s.callback("INITIAL_SESSION",n)),this._debug("INITIAL_SESSION","callback id",e,"session",n)}catch(n){await((i=this.stateChangeEmitters.get(e))===null||i===void 0?void 0:i.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",n),Ke(n)?console.warn(n):console.error(n)}})}async resetPasswordForEmail(e,r={}){let s=null,i=null;this.flowType==="pkce"&&([s,i]=await oe(this.storage,this.storageKey,!0));try{return await y(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:s,code_challenge_method:i,gotrue_meta_security:{captcha_token:r.captchaToken}},headers:this.headers,redirectTo:r.redirectTo})}catch(n){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(n))return this._returnResult({data:null,error:n});throw n}}async getUserIdentities(){var e;try{const{data:r,error:s}=await this.getUser();if(s)throw s;return this._returnResult({data:{identities:(e=r.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var r;try{const{data:s,error:i}=await this._useSession(async n=>{var a,o,l,c,d;const{data:u,error:h}=n;if(h)throw h;const f=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(a=e.options)===null||a===void 0?void 0:a.redirectTo,scopes:(o=e.options)===null||o===void 0?void 0:o.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await y(this.fetch,"GET",f,{headers:this.headers,jwt:(d=(c=u.session)===null||c===void 0?void 0:c.access_token)!==null&&d!==void 0?d:void 0})});if(i)throw i;return U()&&!(!((r=e.options)===null||r===void 0)&&r.skipBrowserRedirect)&&window.location.assign(s==null?void 0:s.url),this._returnResult({data:{provider:e.provider,url:s==null?void 0:s.url},error:null})}catch(s){if(v(s))return this._returnResult({data:{provider:e.provider,url:null},error:s});throw s}}async linkIdentityIdToken(e){return await this._useSession(async r=>{var s;try{const{error:i,data:{session:n}}=r;if(i)throw i;const{options:a,provider:o,token:l,access_token:c,nonce:d}=e,u=await y(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(s=n==null?void 0:n.access_token)!==null&&s!==void 0?s:void 0,body:{provider:o,id_token:l,access_token:c,nonce:d,link_identity:!0,gotrue_meta_security:{captcha_token:a==null?void 0:a.captchaToken}},xform:M}),{data:h,error:f}=u;return f?this._returnResult({data:{user:null,session:null},error:f}):!h||!h.session||!h.user?this._returnResult({data:{user:null,session:null},error:new he}):(h.session&&(await this._saveSession(h.session),await this._notifyAllSubscribers("USER_UPDATED",h.session)),this._returnResult({data:h,error:f}))}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}})}async unlinkIdentity(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:a}=r;if(a)throw a;return await y(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(i=(s=n.session)===null||s===void 0?void 0:s.access_token)!==null&&i!==void 0?i:void 0})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _refreshAccessToken(e){const r="#_refreshAccessToken()";this._debug(r,"begin");try{const s=Date.now();return await Fi(async i=>(i>0&&await Hi(200*Math.pow(2,i-1)),this._debug(r,"refreshing attempt",i),await y(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:M})),(i,n)=>{const a=200*Math.pow(2,i);return n&&rr(n)&&Date.now()+a-s<ee})}catch(s){if(this._debug(r,"error",s),v(s))return this._returnResult({data:{session:null,user:null},error:s});throw s}finally{this._debug(r,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,r){const s=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:r.redirectTo,scopes:r.scopes,queryParams:r.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",r,"url",s),U()&&!r.skipBrowserRedirect&&window.location.assign(s),{data:{provider:e,url:s},error:null}}async _recoverAndRefresh(){var e,r;const s="#_recoverAndRefresh()";this._debug(s,"begin");try{const i=await z(this.storage,this.storageKey);if(i&&this.userStorage){let a=await z(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!a&&(a={user:i.user},await ve(this.userStorage,this.storageKey+"-user",a)),i.user=(e=a==null?void 0:a.user)!==null&&e!==void 0?e:pt()}else if(i&&!i.user&&!i.user){const a=await z(this.storage,this.storageKey+"-user");a&&(a!=null&&a.user)?(i.user=a.user,await P(this.storage,this.storageKey+"-user"),await ve(this.storage,this.storageKey,i)):i.user=pt()}if(this._debug(s,"session from storage",i),!this._isValidSession(i)){this._debug(s,"session is not valid"),i!==null&&await this._removeSession();return}const n=((r=i.expires_at)!==null&&r!==void 0?r:1/0)*1e3-Date.now()<ft;if(this._debug(s,`session has${n?"":" not"} expired with margin of ${ft}s`),n){if(this.autoRefreshToken&&i.refresh_token){const{error:a}=await this._callRefreshToken(i.refresh_token);a&&(Ii(a)?this._debug(s,"refresh discarded by commit guard",a):this._debug(s,"refresh failed",a))}}else if(i.user&&i.user.__isUserNotAvailableProxy===!0)try{const{data:a,error:o}=await this._getUser(i.access_token);!o&&(a!=null&&a.user)?(i.user=a.user,await this._saveSession(i),await this._notifyAllSubscribers("SIGNED_IN",i)):this._debug(s,"could not get user data, skipping SIGNED_IN notification")}catch(a){console.error("Error getting user data:",a),this._debug(s,"error getting user data, skipping SIGNED_IN notification",a)}else await this._notifyAllSubscribers("SIGNED_IN",i)}catch(i){this._debug(s,"error",i),console.error(i);return}finally{this._debug(s,"end")}}async _callRefreshToken(e){var r,s;if(!e)throw new I;if(this.refreshingDeferred)return this.refreshingDeferred.promise;if(this.lastRefreshFailure&&this.lastRefreshFailure.refreshToken===e&&Date.now()<this.lastRefreshFailure.expiresAt)return this._debug("#_callRefreshToken()","returning cached failure (cooldown active)"),this.lastRefreshFailure.result;const i="#_callRefreshToken()";this._debug(i,"begin");try{this.refreshingDeferred=new ht;const n=await z(this.storage,this.storageKey),{data:a,error:o}=await this._refreshAccessToken(e);if(o)throw o;if(!a.session)throw new I;const l=await z(this.storage,this.storageKey);if(n!==null&&(l===null||l.refresh_token!==n.refresh_token)){this._debug(i,"commit guard: storage changed since refresh started, discarding rotated tokens",{startedWith:"present",nowHolds:l?"replaced":"cleared"});const h={data:null,error:new sr};return this.refreshingDeferred.resolve(h),h}const d=this._sessionRemovalEpoch;if(await this._saveSession(a.session),this._sessionRemovalEpoch!==d){this._debug(i,"commit guard (post-save): _removeSession ran during _saveSession, undoing write"),await P(this.storage,this.storageKey),this.userStorage&&await P(this.userStorage,this.storageKey+"-user");const h={data:null,error:new sr};return this.refreshingDeferred.resolve(h),h}await this._notifyAllSubscribers("TOKEN_REFRESHED",a.session);const u={data:a.session,error:null};return this.lastRefreshFailure=null,this.refreshingDeferred.resolve(u),u}catch(n){if(this._debug(i,"error",n),v(n)){const a={data:null,error:n};if(!rr(n)){const o=await z(this.storage,this.storageKey);!!(o!=null&&o.expires_at&&o.expires_at*1e3>Date.now())?this._debug(i,"proactive refresh failed, access token still valid — preserving session"):await this._removeSession()}return this.lastRefreshFailure={refreshToken:e,result:a,expiresAt:Date.now()+Si},(r=this.refreshingDeferred)===null||r===void 0||r.resolve(a),a}throw(s=this.refreshingDeferred)===null||s===void 0||s.reject(n),n}finally{this.refreshingDeferred=null,this._debug(i,"end")}}async _notifyAllSubscribers(e,r,s=!0){const i=`#_notifyAllSubscribers(${e})`;this._debug(i,"begin",r,`broadcast = ${s}`);try{this.broadcastChannel&&s&&this.broadcastChannel.postMessage({event:e,session:r});const n=[],a=Array.from(this.stateChangeEmitters.values()).map(async o=>{try{await o.callback(e,r)}catch(l){n.push(l)}});if(await Promise.all(a),n.length>0){for(let o=0;o<n.length;o+=1)console.error(n[o]);throw n[0]}}finally{this._debug(i,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await P(this.storage,`${this.storageKey}-code-verifier`);const r=Object.assign({},e),s=r.user&&r.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!s&&r.user&&await ve(this.userStorage,this.storageKey+"-user",{user:r.user});const i=Object.assign({},r);delete i.user;const n=lr(i);await ve(this.storage,this.storageKey,n)}else{const i=lr(r);await ve(this.storage,this.storageKey,i)}}async _removeSession(){this._sessionRemovalEpoch+=1,this._debug("#_removeSession()"),this.lastRefreshFailure=null,this.suppressGetSessionWarning=!1,await P(this.storage,this.storageKey),await P(this.storage,this.storageKey+"-code-verifier"),await P(this.storage,this.storageKey+"-user"),this.userStorage&&await P(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&U()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(r){console.error("removing visibilitychange callback failed",r)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),ee);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const r=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=r,r&&typeof r=="object"&&typeof r.unref=="function"?r.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(r)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const r=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,r&&clearTimeout(r)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async dispose(){var e;this._removeVisibilityChangedCallback(),await this._stopAutoRefresh(),(e=this.broadcastChannel)===null||e===void 0||e.close(),this.broadcastChannel=null,this.stateChangeEmitters.clear()}async _autoRefreshTokenTick(){if(this._debug("#_autoRefreshTokenTick()","begin"),this.lock!=null){try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/ee);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${ee}ms, refresh threshold is ${Ae} ticks`),i<=Ae&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e instanceof cn)this._debug("auto refresh token tick lock not available");else throw e}return}if(this.refreshingDeferred!==null){this._debug("#_autoRefreshTokenTick()","refresh already in flight, skipping");return}try{const e=Date.now();try{await this._useSession(async r=>{const{data:{session:s}}=r;if(!s||!s.refresh_token||!s.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const i=Math.floor((s.expires_at*1e3-e)/ee);this._debug("#_autoRefreshTokenTick()",`access token expires in ${i} ticks, a tick lasts ${ee}ms, refresh threshold is ${Ae} ticks`),i<=Ae&&await this._callRefreshToken(s.refresh_token)})}catch(r){console.error("Auto refresh tick failed with error. This is likely a transient error.",r)}}finally{this._debug("#_autoRefreshTokenTick()","end")}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!U()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const r=`#_onVisibilityChanged(${e})`;if(this._debug(r,"visibilityState",document.visibilityState),document.visibilityState==="visible"){if(this.autoRefreshToken&&this._startAutoRefresh(),!e)if(await this.initializePromise,this.lock!=null)await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(r,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()});else{if(document.visibilityState!=="visible"){this._debug(r,"visibilityState is no longer visible, skipping recovery");return}await this._recoverAndRefresh()}}else document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,r,s){const i=[`provider=${encodeURIComponent(r)}`];if(s!=null&&s.redirectTo&&i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`),s!=null&&s.scopes&&i.push(`scopes=${encodeURIComponent(s.scopes)}`),this.flowType==="pkce"){const[n,a]=await oe(this.storage,this.storageKey),o=new URLSearchParams({code_challenge:`${encodeURIComponent(n)}`,code_challenge_method:`${encodeURIComponent(a)}`});i.push(o.toString())}if(s!=null&&s.queryParams){const n=new URLSearchParams(s.queryParams);i.push(n.toString())}return s!=null&&s.skipBrowserRedirect&&i.push(`skip_http_redirect=${s.skipBrowserRedirect}`),`${e}?${i.join("&")}`}async _unenroll(e){try{return await this._useSession(async r=>{var s;const{data:i,error:n}=r;return n?this._returnResult({data:null,error:n}):await y(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(s=i==null?void 0:i.session)===null||s===void 0?void 0:s.access_token})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _enroll(e){try{return await this._useSession(async r=>{var s,i;const{data:n,error:a}=r;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:c}=await y(this.fetch,"POST",`${this.url}/factors`,{body:o,headers:this.headers,jwt:(s=n==null?void 0:n.session)===null||s===void 0?void 0:s.access_token});return c?this._returnResult({data:null,error:c}):(e.factorType==="totp"&&l.type==="totp"&&(!((i=l==null?void 0:l.totp)===null||i===void 0)&&i.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _verify(e){const r=async()=>{try{return await this._useSession(async s=>{var i;const{data:n,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?gr(e.webauthn.credential_response):vr(e.webauthn.credential_response)})}:{code:e.code}),{data:l,error:c}=await y(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:o,headers:this.headers,jwt:(i=n==null?void 0:n.session)===null||i===void 0?void 0:i.access_token});return c?this._returnResult({data:null,error:c}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+l.expires_in},l)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",l),this._returnResult({data:l,error:c}))})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challenge(e){const r=async()=>{try{return await this._useSession(async s=>{var i;const{data:n,error:a}=s;if(a)return this._returnResult({data:null,error:a});const o=await y(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(i=n==null?void 0:n.session)===null||i===void 0?void 0:i.access_token});if(o.error)return o;const{data:l}=o;if(l.type!=="webauthn")return{data:l,error:null};switch(l.webauthn.type){case"create":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:fr(l.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},l),{webauthn:Object.assign(Object.assign({},l.webauthn),{credential_options:Object.assign(Object.assign({},l.webauthn.credential_options),{publicKey:pr(l.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}};return this.lock!=null?this._acquireLock(this.lockAcquireTimeout,r):r()}async _challengeAndVerify(e){const{data:r,error:s}=await this._challenge({factorId:e.factorId});return s?this._returnResult({data:null,error:s}):await this._verify({factorId:e.factorId,challengeId:r.id,code:e.code})}async _listFactors(){var e;const{data:{user:r},error:s}=await this.getUser();if(s)return{data:null,error:s};const i={all:[],phone:[],totp:[],webauthn:[]};for(const n of(e=r==null?void 0:r.factors)!==null&&e!==void 0?e:[])i.all.push(n),n.status==="verified"&&i[n.factor_type].push(n);return{data:i,error:null}}async _getAuthenticatorAssuranceLevel(e){var r,s,i,n;if(e)try{const{payload:f}=Je(e);let p=null;f.aal&&(p=f.aal);let g=p;const{data:{user:w},error:b}=await this.getUser(e);if(b)return this._returnResult({data:null,error:b});((s=(r=w==null?void 0:w.factors)===null||r===void 0?void 0:r.filter(T=>T.status==="verified"))!==null&&s!==void 0?s:[]).length>0&&(g="aal2");const m=f.amr||[];return{data:{currentLevel:p,nextLevel:g,currentAuthenticationMethods:m},error:null}}catch(f){if(v(f))return this._returnResult({data:null,error:f});throw f}const{data:{session:a},error:o}=await this.getSession();if(o)return this._returnResult({data:null,error:o});if(!a)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Je(a.access_token);let c=null;l.aal&&(c=l.aal);let d=c;((n=(i=a.user.factors)===null||i===void 0?void 0:i.filter(f=>f.status==="verified"))!==null&&n!==void 0?n:[]).length>0&&(d="aal2");const h=l.amr||[];return{data:{currentLevel:c,nextLevel:d,currentAuthenticationMethods:h},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?await y(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:s.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new I})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _approveAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new I});const a=await y(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"approve"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&U()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _denyAuthorization(e,r){try{return await this._useSession(async s=>{const{data:{session:i},error:n}=s;if(n)return this._returnResult({data:null,error:n});if(!i)return this._returnResult({data:null,error:new I});const a=await y(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:i.access_token,body:{action:"deny"},xform:o=>({data:o,error:null})});return a.data&&a.data.redirect_url&&U()&&!(r!=null&&r.skipBrowserRedirect)&&window.location.assign(a.data.redirect_url),a})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;return s?this._returnResult({data:null,error:s}):r?await y(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:r.access_token,xform:i=>({data:i,error:null})}):this._returnResult({data:null,error:new I})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;return i?this._returnResult({data:null,error:i}):s?(await y(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:s.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new I})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async fetchJwk(e,r={keys:[]}){let s=r.keys.find(o=>o.kid===e);if(s)return s;const i=Date.now();if(s=this.jwks.keys.find(o=>o.kid===e),s&&this.jwks_cached_at+Ri>i)return s;const{data:n,error:a}=await y(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(a)throw a;return!n.keys||n.keys.length===0||(this.jwks=n,this.jwks_cached_at=i,s=n.keys.find(o=>o.kid===e),!s)?null:s}async getClaims(e,r={}){try{let s=e;if(!s){const{data:f,error:p}=await this.getSession();if(p||!f.session)return this._returnResult({data:null,error:p});s=f.session.access_token}const{header:i,payload:n,signature:a,raw:{header:o,payload:l}}=Je(s);if(!(r!=null&&r.allowExpired))try{Xi(n.exp)}catch(f){throw new st(f instanceof Error?f.message:"JWT validation failed")}const c=!i.alg||i.alg.startsWith("HS")||!i.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(i.kid,r!=null&&r.keys?{keys:r.keys}:r==null?void 0:r.jwks);if(!c){const{error:f}=await this.getUser(s);if(f)throw f;return{data:{claims:n,header:i,signature:a},error:null}}const d=Zi(i.alg),u=await crypto.subtle.importKey("jwk",c,d,!0,["verify"]);if(!await crypto.subtle.verify(d,u,a,Bi(`${o}.${l}`)))throw new st("Invalid JWT signature");return{data:{claims:n,header:i,signature:a},error:null}}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async signInWithPasskey(e){var r,s,i;H(this.experimental);try{if(!at())return this._returnResult({data:null,error:new W("Browser does not support WebAuthn",null)});const{data:n,error:a}=await this._startPasskeyAuthentication({options:{captchaToken:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}});if(a||!n)return this._returnResult({data:null,error:a});const o=pr(n.options),l=(i=(s=e==null?void 0:e.options)===null||s===void 0?void 0:s.signal)!==null&&i!==void 0?i:Pt.createNewAbortSignal(),{data:c,error:d}=await Wr({publicKey:o,signal:l});if(d||!c)return this._returnResult({data:null,error:d??new W("WebAuthn ceremony failed",null)});const u=vr(c);return this._verifyPasskeyAuthentication({challengeId:n.challenge_id,credential:u})}catch(n){if(v(n))return this._returnResult({data:null,error:n});throw n}}async registerPasskey(e){var r,s;H(this.experimental);try{if(!at())return this._returnResult({data:null,error:new W("Browser does not support WebAuthn",null)});const{data:i,error:n}=await this._startPasskeyRegistration();if(n||!i)return this._returnResult({data:null,error:n});const a=fr(i.options),o=(s=(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.signal)!==null&&s!==void 0?s:Pt.createNewAbortSignal(),{data:l,error:c}=await Fr({publicKey:a,signal:o});if(c||!l)return this._returnResult({data:null,error:c??new W("WebAuthn ceremony failed",null)});const d=gr(l);return this._verifyPasskeyRegistration({challengeId:i.challenge_id,credential:d})}catch(i){if(v(i))return this._returnResult({data:null,error:i});throw i}}async _startPasskeyRegistration(){H(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new I});const{data:i,error:n}=await y(this.fetch,"POST",`${this.url}/passkeys/registration/options`,{headers:this.headers,jwt:r.access_token,body:{}});return n?this._returnResult({data:null,error:n}):this._returnResult({data:i,error:null})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _verifyPasskeyRegistration(e){H(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new I});const{data:n,error:a}=await y(this.fetch,"POST",`${this.url}/passkeys/registration/verify`,{headers:this.headers,jwt:s.access_token,body:{challenge_id:e.challengeId,credential:e.credential}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _startPasskeyAuthentication(e){var r;H(this.experimental);try{const{data:s,error:i}=await y(this.fetch,"POST",`${this.url}/passkeys/authentication/options`,{headers:this.headers,body:{gotrue_meta_security:{captcha_token:(r=e==null?void 0:e.options)===null||r===void 0?void 0:r.captchaToken}}});return i?this._returnResult({data:null,error:i}):this._returnResult({data:s,error:null})}catch(s){if(v(s))return this._returnResult({data:null,error:s});throw s}}async _verifyPasskeyAuthentication(e){H(this.experimental);try{const{data:r,error:s}=await y(this.fetch,"POST",`${this.url}/passkeys/authentication/verify`,{headers:this.headers,body:{challenge_id:e.challengeId,credential:e.credential},xform:M});return s?this._returnResult({data:null,error:s}):(r.session&&(await this._saveSession(r.session),await this._notifyAllSubscribers("SIGNED_IN",r.session)),this._returnResult({data:r,error:null}))}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _listPasskeys(){H(this.experimental);try{return await this._useSession(async e=>{const{data:{session:r},error:s}=e;if(s)return this._returnResult({data:null,error:s});if(!r)return this._returnResult({data:null,error:new I});const{data:i,error:n}=await y(this.fetch,"GET",`${this.url}/passkeys`,{headers:this.headers,jwt:r.access_token,xform:a=>({data:a,error:null})});return n?this._returnResult({data:null,error:n}):this._returnResult({data:i,error:null})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _updatePasskey(e){H(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new I});const{data:n,error:a}=await y(this.fetch,"PATCH",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,body:{friendly_name:e.friendlyName}});return a?this._returnResult({data:null,error:a}):this._returnResult({data:n,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}async _deletePasskey(e){H(this.experimental);try{return await this._useSession(async r=>{const{data:{session:s},error:i}=r;if(i)return this._returnResult({data:null,error:i});if(!s)return this._returnResult({data:null,error:new I});const{error:n}=await y(this.fetch,"DELETE",`${this.url}/passkeys/${e.passkeyId}`,{headers:this.headers,jwt:s.access_token,noResolveJson:!0});return n?this._returnResult({data:null,error:n}):this._returnResult({data:null,error:null})})}catch(r){if(v(r))return this._returnResult({data:null,error:r});throw r}}}Be.nextInstanceID={};const Sn=Be,xn="2.108.2";let Re="",lt;if(typeof Deno<"u"){var vt;Re="deno",lt=(vt=Deno.version)===null||vt===void 0?void 0:vt.deno}else if(typeof document<"u")Re="web";else if(typeof navigator<"u"&&navigator.product==="ReactNative")Re="react-native";else{var mt;Re="node",lt=typeof process<"u"?(mt=process.version)===null||mt===void 0?void 0:mt.replace(/^v/,""):void 0}const Kr=[`runtime=${Re}`];lt&&Kr.push(`runtime-version=${lt}`);const En={"X-Client-Info":`supabase-js/${xn}; ${Kr.join("; ")}`},Tn={headers:En},An={schema:"public"},Rn={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},Cn={},Pn={enabled:!1,respectSamplingDecision:!0};function On(t,e,r,s){function i(n){return n instanceof r?n:new r(function(a){a(n)})}return new(r||(r=Promise))(function(n,a){function o(d){try{c(s.next(d))}catch(u){a(u)}}function l(d){try{c(s.throw(d))}catch(u){a(u)}}function c(d){d.done?n(d.value):i(d.value).then(o,l)}c((s=s.apply(t,[])).next())})}let yt=null;const $n="@opentelemetry/api";function In(){return yt===null&&(yt=import($n).catch(()=>null)),yt}function jn(){return On(this,void 0,void 0,function*(){try{const t=yield In();if(!t||!t.propagation||!t.context)return null;const e={};t.propagation.inject(t.context.active(),e);const r=e.traceparent;return r?{traceparent:r,tracestate:e.tracestate,baggage:e.baggage}:null}catch{return null}})}function Ln(t){if(!t||typeof t!="string")return null;const e=t.split("-");if(e.length!==4)return null;const[r,s,i,n]=e;if(r.length!==2||s.length!==32||i.length!==16||n.length!==2)return null;const a=/^[0-9a-f]+$/i;return!a.test(r)||!a.test(s)||!a.test(i)||!a.test(n)||s==="00000000000000000000000000000000"||i==="0000000000000000"?null:{version:r,traceId:s,parentId:i,traceFlags:n,isSampled:(parseInt(n,16)&1)===1}}function Un(t,e){if(!t||!e||e.length===0)return!1;let r;if(t instanceof URL)r=t;else try{r=new URL(t)}catch{return!1}for(const s of e)try{if(typeof s=="string"){if(Nn(r.hostname,s))return!0}else if(s instanceof RegExp){if(s.test(r.hostname))return!0}else if(typeof s=="function"&&s(r))return!0}catch{continue}return!1}function Nn(t,e){if(e===t)return!0;if(e.startsWith("*.")){const r=e.slice(2);if(t.endsWith(r)&&(t===r||t.endsWith("."+r)))return!0}return!1}function Bn(t){const e=[];try{const r=new URL(t);e.push(r.hostname)}catch{}return e.push("*.supabase.co","*.supabase.in"),e.push("localhost","127.0.0.1","[::1]"),e}function De(t){"@babel/helpers - typeof";return De=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},De(t)}function Dn(t,e){if(De(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var s=r.call(t,e);if(De(s)!="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Mn(t){var e=Dn(t,"string");return De(e)=="symbol"?e:e+""}function qn(t,e,r){return(e=Mn(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function mr(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter(function(i){return Object.getOwnPropertyDescriptor(t,i).enumerable})),r.push.apply(r,s)}return r}function C(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?mr(Object(r),!0).forEach(function(s){qn(t,s,r[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):mr(Object(r)).forEach(function(s){Object.defineProperty(t,s,Object.getOwnPropertyDescriptor(r,s))})}return t}const zn=t=>t?(...e)=>t(...e):(...e)=>fetch(...e),Hn=()=>Headers,Fn=(t,e,r,s,i)=>{const n=zn(s),a=Hn(),o=(i==null?void 0:i.enabled)===!0,l=(i==null?void 0:i.respectSamplingDecision)!==!1,c=o?Bn(e):null;return async(d,u)=>{var h;const f=(h=await r())!==null&&h!==void 0?h:t;let p=new a(u==null?void 0:u.headers);if(p.has("apikey")||p.set("apikey",t),p.has("Authorization")||p.set("Authorization",`Bearer ${f}`),c){const g=await Wn(d,c,l);g&&(g.traceparent&&!p.has("traceparent")&&p.set("traceparent",g.traceparent),g.tracestate&&!p.has("tracestate")&&p.set("tracestate",g.tracestate),g.baggage&&!p.has("baggage")&&p.set("baggage",g.baggage))}return n(d,C(C({},u),{},{headers:p}))}};async function Wn(t,e,r){if(!Un(typeof t=="string"||t instanceof URL?t:t.url,e))return null;const s=await jn();if(!s||!s.traceparent)return null;if(r){const i=Ln(s.traceparent);if(i&&!i.isSampled)return null}return s}function yr(t){return typeof t=="boolean"?{enabled:t}:t}function Kn(t){return t.endsWith("/")?t:t+"/"}function Vn(t,e){var r,s,i,n,a,o;const{db:l,auth:c,realtime:d,global:u}=t,{db:h,auth:f,realtime:p,global:g}=e,w=yr(t.tracePropagation),b=yr(e.tracePropagation),_={db:C(C({},h),l),auth:C(C({},f),c),realtime:C(C({},p),d),storage:{},global:C(C(C({},g),u),{},{headers:C(C({},(r=g==null?void 0:g.headers)!==null&&r!==void 0?r:{}),(s=u==null?void 0:u.headers)!==null&&s!==void 0?s:{})}),tracePropagation:{enabled:(i=(n=w==null?void 0:w.enabled)!==null&&n!==void 0?n:b==null?void 0:b.enabled)!==null&&i!==void 0?i:!1,respectSamplingDecision:(a=(o=w==null?void 0:w.respectSamplingDecision)!==null&&o!==void 0?o:b==null?void 0:b.respectSamplingDecision)!==null&&a!==void 0?a:!0},accessToken:async()=>""};return t.accessToken?_.accessToken=t.accessToken:delete _.accessToken,_}function Gn(t){const e=t==null?void 0:t.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(Kn(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var Jn=class extends Sn{constructor(t){super(t)}},Yn=class{constructor(t,e,r){var s,i;this.supabaseUrl=t,this.supabaseKey=e;const n=Gn(t);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",n),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",n),this.storageUrl=new URL("storage/v1",n),this.functionsUrl=new URL("functions/v1",n);const a=`sb-${n.hostname.split(".")[0]}-auth-token`,o={db:An,realtime:Cn,auth:C(C({},Rn),{},{storageKey:a}),global:Tn,tracePropagation:Pn},l=Vn(r??{},o);if(this.settings=l,this.storageKey=(s=l.auth.storageKey)!==null&&s!==void 0?s:"",this.headers=(i=l.global.headers)!==null&&i!==void 0?i:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(d,u)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(u)} is not possible`)}});else{var c;this.auth=this._initSupabaseAuthClient((c=l.auth)!==null&&c!==void 0?c:{},this.headers,l.global.fetch)}this.fetch=Fn(e,t,this._getAccessToken.bind(this),l.global.fetch,l.tracePropagation),this.realtime=this._initRealtimeClient(C({headers:this.headers,accessToken:this._getAccessToken.bind(this),fetch:this.fetch},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(d=>this.realtime.setAuth(d)).catch(d=>console.warn("Failed to set initial Realtime auth token:",d)),this.rest=new cs(new URL("rest/v1",n).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new ki(this.storageUrl.href,this.headers,this.fetch,r==null?void 0:r.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new es(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(t){return this.rest.from(t)}schema(t){return this.rest.schema(t)}rpc(t,e={},r={head:!1,get:!1,count:void 0}){return this.rest.rpc(t,e,r)}channel(t,e={config:{}}){return this.realtime.channel(t,e)}getChannels(){return this.realtime.getChannels()}removeChannel(t){return this.realtime.removeChannel(t)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var t=this,e,r;if(t.accessToken)return await t.accessToken();const{data:s}=await t.auth.getSession();return(e=(r=s.session)===null||r===void 0?void 0:r.access_token)!==null&&e!==void 0?e:t.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,storageKey:n,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,lockAcquireTimeout:u,skipAutoInitialize:h},f,p){const g={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new Jn({url:this.authUrl.href,headers:C(C({},g),f),storageKey:n,autoRefreshToken:t,persistSession:e,detectSessionInUrl:r,storage:s,userStorage:i,flowType:a,lock:o,debug:l,throwOnError:c,experimental:d,fetch:p,lockAcquireTimeout:u,skipAutoInitialize:h,hasCustomAuthorizationHeader:Object.keys(this.headers).some(w=>w.toLowerCase()==="authorization")})}_initRealtimeClient(t){return new Ws(this.realtimeUrl.href,C(C({},t),{},{params:C(C({},{apikey:this.supabaseKey}),t==null?void 0:t.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((t,e)=>{this._handleTokenChanged(t,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(t,e,r){(t==="TOKEN_REFRESHED"||t==="SIGNED_IN")&&this.changedAccessToken!==r?(this.changedAccessToken=r,this.realtime.setAuth(r)):t==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const Xn=(t,e,r)=>new Yn(t,e,r);function Zn(){if(typeof window<"u")return!1;const t=globalThis.process;if(!t)return!1;const e=t.version;if(e==null)return!1;const r=e.match(/^v(\d+)\./);return r?parseInt(r[1],10)<=18:!1}Zn()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const Qn="https://fnifbmaccwymjbkkhpvb.supabase.co",ea="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuaWZibWFjY3d5bWpia2tocHZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1NzU3NzAsImV4cCI6MjA5ODE1MTc3MH0.H9i8S6lfaxFyWjVQdhVna-vtPj5Os7_6Lo8YvSlgKaY",E=Xn(Qn,ea);async function br(){const t=document.getElementById("app");t.innerHTML=`
    <div class="landing-page">
      <!-- Navigation -->
      <nav class="landing-nav glass-card">
        <div class="container nav-container">
          <a href="/" class="nav-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="logo-text">UniSphere</span>
          </a>

          <div class="nav-links hide-mobile">
            <a href="#features" class="nav-link">Features</a>
            <a href="#about" class="nav-link">About</a>
            <a href="#contact" class="nav-link">Contact</a>
          </div>

          <div class="nav-actions">
            <button class="btn btn-ghost" onclick="window.router.navigate('/login')">Login</button>
            <button class="btn btn-primary" onclick="window.router.navigate('/register')">Get Started</button>
          </div>

          <button class="mobile-menu-btn hide-tablet-up">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-bg">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        <div class="container hero-container">
          <div class="hero-content slide-up">
            <div class="hero-badge">
              <span class="badge">Connect Across Universities</span>
            </div>
            <h1 class="hero-title">
              Network with Students Across
              <span class="gradient-text">Pakistan</span>
            </h1>
            <p class="hero-subtitle">
              UniSphere connects students from different universities for collaboration,
              networking, study discussions, and building lifelong friendships.
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" onclick="window.router.navigate('/register')">
                Start Networking
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button class="btn btn-outline btn-lg" onclick="window.router.navigate('/login')">
                Sign In
              </button>
            </div>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">Universities</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Students</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">100+</span>
                <span class="stat-label">Departments</span>
              </div>
            </div>
          </div>
          <div class="hero-image fade-in">
            <div class="hero-mockup">
              <div class="mockup-card glass-card">
                <div class="mockup-header">
                  <div class="mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div class="mockup-content">
                  <div class="mockup-avatar">
                    <span>AS</span>
                  </div>
                  <div class="mockup-info">
                    <div class="mockup-name"></div>
                    <div class="mockup-meta"></div>
                  </div>
                  <div class="mockup-actions">
                    <div class="mockup-btn"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section id="features" class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Why Choose UniSphere?</h2>
            <p class="section-subtitle">Everything you need to build meaningful academic connections</p>
          </div>
          <div class="features-grid">
            <div class="feature-card card slide-up" style="animation-delay: 0.1s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>
              <h3 class="feature-title">Smart Discovery</h3>
              <p class="feature-desc">Find students by university, department, or interests with our powerful search filters.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.2s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 class="feature-title">Private Messaging</h3>
              <p class="feature-desc">Connect through secure, real-time messaging for study groups or one-on-one chats.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.3s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 class="feature-title">Build Network</h3>
              <p class="feature-desc">Grow your professional network with connections that last beyond graduation.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.4s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
              <h3 class="feature-title">Rich Profiles</h3>
              <p class="feature-desc">Showcase your academic journey with detailed profiles and professional bios.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.5s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 class="feature-title">Secure Platform</h3>
              <p class="feature-desc">Your data is protected with industry-standard security and privacy controls.</p>
            </div>
            <div class="feature-card card slide-up" style="animation-delay: 0.6s">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-600)" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3 class="feature-title">Real-time Updates</h3>
              <p class="feature-desc">Stay connected with instant notifications and live status updates.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="about-section">
        <div class="container">
          <div class="about-content">
            <div class="about-text slide-up">
              <h2 class="section-title">Connecting Pakistan's Future Leaders</h2>
              <p class="about-desc">
                UniSphere was created with a simple mission: break down the barriers between universities
                and enable students to collaborate, learn, and grow together. Whether you're looking
                for study partners, professional networking, or just making new friends, UniSphere
                makes it happen.
              </p>
              <div class="about-features">
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Cross-university connections</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Study group formation</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Professional networking</span>
                </div>
                <div class="about-feature">
                  <svg viewBox="0 0 24 24" fill="var(--success-500)" width="20" height="20">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  <span>Knowledge sharing</span>
                </div>
              </div>
            </div>
            <div class="about-image fade-in">
              <div class="about-cards">
                <div class="about-card card">
                  <div class="about-card-icon avatar-lg">
                    <span style="background: var(--gradient-primary)">MK</span>
                  </div>
                  <h4>Muhammad Khan</h4>
                  <p>NUST, Computer Science</p>
                </div>
                <div class="about-card card" style="margin-top: 60px">
                  <div class="about-card-icon avatar-lg">
                    <span style="background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)">FA</span>
                  </div>
                  <h4>Fatima Ahmed</h4>
                  <p>LUMS, Business Admin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-card glass-card">
            <h2 class="cta-title">Ready to Expand Your Network?</h2>
            <p class="cta-subtitle">Join thousands of students already connecting on UniSphere</p>
            <div class="cta-actions">
              <button class="btn btn-primary btn-lg" onclick="window.router.navigate('/register')">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <div class="footer-logo">
                <div class="logo-icon">
                  <svg viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="14" stroke="url(#grad2)" stroke-width="2"/>
                    <circle cx="10" cy="12" r="3" fill="url(#grad2)"/>
                    <circle cx="22" cy="12" r="3" fill="url(#grad2)"/>
                    <circle cx="16" cy="21" r="3" fill="url(#grad2)"/>
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#3b82f6"/>
                        <stop offset="100%" style="stop-color:#a855f7"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span>UniSphere</span>
              </div>
              <p class="footer-tagline">Connecting Students Across Pakistan</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#about">About Us</a>
                <a href="/register">Get Started</a>
              </div>
              <div class="footer-column">
                <h4>Support</h4>
                <a href="#contact">Contact</a>
                <a href="#">Help Center</a>
                <a href="#">Privacy</a>
              </div>
              <div class="footer-column">
                <h4>Connect</h4>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a>
                <a href="#">Instagram</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} UniSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

    <style>
      .landing-page {
        min-height: 100vh;
        background: var(--bg-primary);
      }

      /* Navigation */
      .landing-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: var(--space-4) 0;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      .nav-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .nav-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: var(--font-size-lg);
      }

      .logo-icon {
        width: 36px;
        height: 36px;
      }

      .logo-icon svg {
        width: 100%;
        height: 100%;
      }

      .nav-links {
        display: flex;
        gap: var(--space-8);
      }

      .nav-link {
        color: var(--text-secondary);
        font-weight: 500;
        transition: color var(--transition-fast);
      }

      .nav-link:hover {
        color: var(--text-primary);
      }

      .nav-actions {
        display: flex;
        gap: var(--space-2);
      }

      .mobile-menu-btn {
        color: var(--text-primary);
        padding: var(--space-2);
      }

      /* Hero Section */
      .hero-section {
        position: relative;
        min-height: 100vh;
        display: flex;
        align-items: center;
        padding: 120px 0 80px;
        overflow: hidden;
      }

      .hero-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .hero-gradient {
        position: absolute;
        top: -50%;
        right: -20%;
        width: 80%;
        height: 150%;
        background: radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
      }

      .hero-pattern {
        position: absolute;
        inset: 0;
        background-image: radial-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      }

      .hero-container {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .hero-container {
          grid-template-columns: 1fr 1fr;
        }
      }

      .hero-content {
        position: relative;
        z-index: 1;
      }

      .hero-badge {
        margin-bottom: var(--space-4);
      }

      .hero-title {
        font-size: clamp(2rem, 5vw, var(--font-size-5xl));
        font-weight: 700;
        line-height: var(--line-height-tight);
        margin-bottom: var(--space-6);
        color: var(--text-primary);
      }

      .gradient-text {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-8);
        max-width: 540px;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-4);
        margin-bottom: var(--space-10);
      }

      .hero-stats {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        flex-wrap: wrap;
      }

      .stat-item {
        text-align: center;
      }

      .stat-number {
        display: block;
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
      }

      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .stat-divider {
        width: 1px;
        height: 40px;
        background: var(--border-color);
      }

      .hero-image {
        position: relative;
      }

      .hero-mockup {
        position: relative;
        perspective: 1000px;
      }

      .mockup-card {
        padding: var(--space-6);
        max-width: 320px;
        margin: 0 auto;
        transform: rotateY(-5deg) rotateX(5deg);
        transition: transform var(--transition-slow);
      }

      .mockup-card:hover {
        transform: rotateY(0) rotateX(0);
      }

      .mockup-header {
        margin-bottom: var(--space-4);
      }

      .mockup-dots {
        display: flex;
        gap: var(--space-2);
      }

      .mockup-dots span {
        width: 12px;
        height: 12px;
        border-radius: var(--radius-full);
        background: var(--bg-tertiary);
      }

      .mockup-dots span:first-child { background: var(--error-500); }
      .mockup-dots span:nth-child(2) { background: var(--warning-500); }
      .mockup-dots span:last-child { background: var(--success-500); }

      .mockup-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-4);
      }

      .mockup-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-lg);
      }

      .mockup-info {
        width: 100%;
        text-align: center;
      }

      .mockup-name {
        width: 60%;
        height: 16px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-sm);
        margin: 0 auto var(--space-2);
      }

      .mockup-meta {
        width: 40%;
        height: 12px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-sm);
        margin: 0 auto;
      }

      .mockup-actions {
        width: 100%;
      }

      .mockup-btn {
        height: 40px;
        background: var(--gradient-primary);
        border-radius: var(--radius-lg);
      }

      /* Features Section */
      .features-section {
        padding: var(--space-20) 0;
        background: var(--bg-secondary);
      }

      .section-header {
        text-align: center;
        margin-bottom: var(--space-16);
      }

      .section-title {
        font-size: var(--font-size-3xl);
        font-weight: 700;
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }

      .section-subtitle {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        max-width: 600px;
        margin: 0 auto;
      }

      .features-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .features-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .features-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .feature-card {
        padding: var(--space-8);
        text-align: center;
      }

      .feature-icon {
        width: 64px;
        height: 64px;
        margin: 0 auto var(--space-4);
        background: var(--primary-50);
        border-radius: var(--radius-xl);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      [data-theme="dark"] .feature-icon {
        background: rgba(59, 130, 246, 0.1);
      }

      .feature-icon svg {
        width: 32px;
        height: 32px;
      }

      .feature-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--space-3);
        color: var(--text-primary);
      }

      .feature-desc {
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
      }

      /* About Section */
      .about-section {
        padding: var(--space-20) 0;
      }

      .about-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-12);
        align-items: center;
      }

      @media (min-width: 1024px) {
        .about-content {
          grid-template-columns: 1fr 1fr;
        }
      }

      .about-text {
        max-width: 540px;
      }

      .about-desc {
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-6);
      }

      .about-features {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .about-feature {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        color: var(--text-secondary);
      }

      .about-cards {
        position: relative;
      }

      .about-card {
        padding: var(--space-6);
        text-align: center;
        max-width: 240px;
      }

      .about-card h4 {
        font-weight: 600;
        margin: var(--space-4) 0 var(--space-2);
        color: var(--text-primary);
      }

      .about-card p {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      /* CTA Section */
      .cta-section {
        padding: var(--space-16) 0;
      }

      .cta-card {
        padding: var(--space-12);
        text-align: center;
        background: var(--gradient-primary);
        position: relative;
        overflow: hidden;
      }

      .cta-card::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }

      .cta-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: white;
        margin-bottom: var(--space-4);
        position: relative;
      }

      .cta-subtitle {
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: var(--space-8);
        position: relative;
      }

      .cta-actions .btn-primary {
        background: white;
        color: var(--primary-600);
        position: relative;
      }

      .cta-actions .btn-primary:hover {
        background: var(--gray-100);
      }

      /* Footer */
      .landing-footer {
        background: var(--bg-secondary);
        padding: var(--space-16) 0 var(--space-8);
      }

      .footer-content {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-10);
        margin-bottom: var(--space-10);
      }

      @media (min-width: 768px) {
        .footer-content {
          grid-template-columns: 2fr 3fr;
        }
      }

      .footer-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
        margin-bottom: var(--space-3);
      }

      .footer-tagline {
        color: var(--text-tertiary);
      }

      .footer-links {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--space-6);
      }

      .footer-column h4 {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      }

      .footer-column a {
        display: block;
        color: var(--text-tertiary);
        margin-bottom: var(--space-2);
        font-size: var(--font-size-sm);
      }

      .footer-column a:hover {
        color: var(--primary-600);
      }

      .footer-bottom {
        padding-top: var(--space-8);
        border-top: 1px solid var(--border-color);
        text-align: center;
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }
    </style>
  `,window.router=$}function x(t,e="info",r=4e3){const s=document.getElementById("toast-container"),i=document.createElement("div");i.className=`toast toast-${e}`,i.innerHTML=`
    <span>${t}</span>
  `,s.appendChild(i),setTimeout(()=>{i.style.animation="slideIn 0.3s ease-out reverse",setTimeout(()=>i.remove(),300)},r)}async function ta(){const t=document.getElementById("app");t.innerHTML=`
    <div class="auth-page">
      <div class="auth-container auth-container-sm">
        <div class="auth-header">
          <a href="/" class="auth-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>UniSphere</span>
          </a>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-subtitle">Sign in to continue networking</p>
        </div>

        <form id="login-form" class="auth-form">
          <div class="form-group">
            <label class="form-label" for="email">Email Address</label>
            <input type="email" id="email" name="email" class="form-input"
              placeholder="Enter your email" required autocomplete="email">
            <span class="form-error" id="email-error"></span>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Password</label>
            <div class="input-with-icon">
              <input type="password" id="password" name="password" class="form-input"
                placeholder="Enter your password" required autocomplete="current-password">
              <button type="button" class="toggle-password" onclick="togglePasswordVisibility()">
                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg class="eye-off-icon hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <span class="form-error" id="password-error"></span>
          </div>

          <div class="form-row-between">
            <label class="form-checkbox">
              <input type="checkbox" id="remember" name="remember">
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link" onclick="showForgotPassword(event)">Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Sign In</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Signing in...</span>
            </span>
          </button>

          <div class="auth-divider">
            <span>or continue with</span>
          </div>

          <div class="social-buttons">
            <button type="button" class="btn btn-secondary social-btn" disabled>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
          </div>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a href="/register">Create one</a></p>
        </div>

        <!-- Forgot Password Modal -->
        <div id="forgot-modal" class="modal hidden">
          <div class="modal-backdrop" onclick="hideForgotPassword()"></div>
          <div class="modal-content">
            <div class="modal-header">
              <h3>Reset Password</h3>
              <button class="modal-close" onclick="hideForgotPassword()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div class="modal-body">
              <p class="modal-desc">Enter your email address and we'll send you a link to reset your password.</p>
              <div class="form-group">
                <label class="form-label" for="reset-email">Email Address</label>
                <input type="email" id="reset-email" class="form-input" placeholder="your.email@example.com">
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" onclick="hideForgotPassword()">Cancel</button>
              <button class="btn btn-primary" onclick="sendResetEmail()">Send Reset Link</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-8) var(--space-4);
        background: var(--bg-secondary);
      }

      .auth-container-sm {
        max-width: 420px;
      }

      .auth-header {
        text-align: center;
        margin-bottom: var(--space-8);
      }

      .auth-logo {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-6);
      }

      .auth-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .auth-subtitle {
        color: var(--text-secondary);
      }

      .auth-form {
        background: var(--bg-primary);
        padding: var(--space-8);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
      }

      @media (max-width: 767px) {
        .auth-form {
          padding: var(--space-6);
        }
      }

      .input-with-icon {
        position: relative;
      }

      .input-with-icon .form-input {
        padding-right: 44px;
      }

      .toggle-password {
        position: absolute;
        right: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        padding: var(--space-1);
        transition: color var(--transition-fast);
      }

      .toggle-password:hover {
        color: var(--text-secondary);
      }

      .form-row-between {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-6);
      }

      .forgot-link {
        font-size: var(--font-size-sm);
        color: var(--primary-600);
      }

      .auth-submit {
        width: 100%;
      }

      .btn-loading {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .btn-loading .spinner {
        width: 16px;
        height: 16px;
      }

      .auth-divider {
        display: flex;
        align-items: center;
        margin: var(--space-6) 0;
        color: var(--text-muted);
        font-size: var(--font-size-sm);
      }

      .auth-divider::before,
      .auth-divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--border-color);
      }

      .auth-divider span {
        padding: 0 var(--space-4);
      }

      .social-buttons {
        display: flex;
        gap: var(--space-3);
      }

      .social-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
      }

      .auth-footer {
        text-align: center;
        margin-top: var(--space-6);
        color: var(--text-secondary);
      }

      .auth-footer a {
        font-weight: 500;
      }

      /* Modal Styles */
      .modal {
        position: fixed;
        inset: 0;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-4);
      }

      .modal-backdrop {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .modal-content {
        position: relative;
        background: var(--bg-primary);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        width: 100%;
        max-width: 420px;
        animation: modalEnter 0.2s ease-out;
      }

      @keyframes modalEnter {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-5) var(--space-6);
        border-bottom: 1px solid var(--border-color);
      }

      .modal-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .modal-close {
        color: var(--text-muted);
        padding: var(--space-1);
      }

      .modal-close:hover {
        color: var(--text-primary);
      }

      .modal-body {
        padding: var(--space-6);
      }

      .modal-desc {
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
      }

      .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-6);
        border-top: 1px solid var(--border-color);
      }
    </style>
  `,ra()}function ra(){const t=document.getElementById("login-form");t.addEventListener("submit",async e=>{e.preventDefault();const r=t.email.value.trim(),s=t.password.value;if(t.remember.checked,!r){wr("email","Please enter your email");return}if(_r("email"),!s){wr("password","Please enter your password");return}_r("password");const i=t.querySelector(".auth-submit");i.disabled=!0,i.querySelector(".btn-text").classList.add("hidden"),i.querySelector(".btn-loading").classList.remove("hidden");try{const{data:n,error:a}=await E.auth.signInWithPassword({email:r,password:s});if(a){a.message.includes("Invalid login credentials")?x("Invalid email or password. Please try again.","error"):x(a.message,"error");return}x("Signed in successfully!","success"),$.navigate("/dashboard")}catch{x("An error occurred. Please try again.","error")}finally{i.disabled=!1,i.querySelector(".btn-text").classList.remove("hidden"),i.querySelector(".btn-loading").classList.add("hidden")}}),window.togglePasswordVisibility=()=>{const e=document.getElementById("password"),r=document.querySelector(".eye-icon"),s=document.querySelector(".eye-off-icon");e.type==="password"?(e.type="text",r.classList.add("hidden"),s.classList.remove("hidden")):(e.type="password",r.classList.remove("hidden"),s.classList.add("hidden"))},window.showForgotPassword=e=>{e.preventDefault(),document.getElementById("forgot-modal").classList.remove("hidden")},window.hideForgotPassword=()=>{document.getElementById("forgot-modal").classList.add("hidden")},window.sendResetEmail=async()=>{const e=document.getElementById("reset-email").value.trim();if(!e){x("Please enter your email address","error");return}const{error:r}=await E.auth.resetPasswordForEmail(e);r?x(r.message,"error"):(x("Password reset email sent! Check your inbox.","success"),hideForgotPassword())}}function wr(t,e){const r=document.getElementById(`${t}-error`),s=document.getElementById(t);r&&(r.textContent=e),s&&s.classList.add("error")}function _r(t){const e=document.getElementById(`${t}-error`),r=document.getElementById(t);e&&(e.textContent=""),r&&r.classList.remove("error")}const sa=["Abdul Wali Khan University","Air University","Allama Iqbal Open University","Bahauddin Zakariya University","Bahria University","Bahria University, Lahore Campus","Beaconhouse National University","COMSATS University Islamabad","COMSATS University Islamabad, Lahore Campus","FAST National University","Fatima Jinnah Medical University, Lahore","Forman Christian College (A Chartered University)","Gomal University","Government College University Lahore","Green International University, Lahore","Hajvery University, Lahore","Imperial College of Business Studies, Lahore","Information Technology University of the Punjab, Lahore","Institute for Art and Culture, Lahore","Institute of Management Sciences, Lahore","International Islamic University","Karachi University","Khyber Medical University","King Edward Medical University, Lahore","Kinnaird College for Women, Lahore","Lahore College for Women University","Lahore Garrison University","Lahore Leads University","Lahore School of Economics","Lahore University of Biological and Applied Sciences","Lahore University of Management Sciences (LUMS)","Military College of Signals","Minhaj University Lahore","National College of Arts, Lahore","National College of Business Administration and Economics, Lahore","National Institute of Technology, Lahore","National University of Computer and Emerging Sciences, Lahore Campus","National University of Modern Languages, Lahore Campus","National University of Sciences and Technology (NUST)","NUR International University, Lahore","Pakistan Institute of Engineering and Applied Sciences","Pakistan Institute of Fashion and Design, Lahore","PIQC Institute of Quality, Lahore","Punjab Tianjin University of Technology, Lahore","Qarshi University, Lahore","Quaid-i-Azam University","Rashid Latif Khan University, Lahore","Riphah International University, Lahore Campus","Superior University, Lahore","SZABIST","University of Central Punjab, Lahore","University of Child Health Sciences, Lahore","University of Education, Lahore","University of Engineering and Technology Lahore","University of Health Sciences, Lahore","University of Home Economics, Lahore","University of Lahore","University of Management and Technology, Lahore","University of Peshawar","University of Sargodha","University of Science and Technology, Lahore","University of South Asia, Lahore","University of the Punjab, Lahore","University of Veterinary and Animal Sciences, Lahore","Virtual University of Pakistan","Other"];let Ye=null;async function Lt(){if(Ye)return Ye;const{data:t,error:e}=await E.from("universities").select("name").order("name");if(e||!(t!=null&&t.length))return sa;const r=t.map(({name:s})=>s).filter(Boolean);return Ye=[...r.filter(s=>s!=="Other"),...r.includes("Other")?["Other"]:[]],Ye}const Ut=["Computer Science","Software Engineering","Information Technology","Electrical Engineering","Mechanical Engineering","Civil Engineering","Chemical Engineering","Business Administration","Commerce","Economics","Finance","Marketing","Human Resource Management","Medicine (MBBS)","Dentistry (BDS)","Pharmacy","Nursing","Physiotherapy","Law","Architecture","Fine Arts","Design","Media Studies","Mass Communication","English","Education","Psychology","Sociology","International Relations","Political Science","Mathematics","Physics","Chemistry","Biology","Other"],Nt=[1,2,3,4,5,6,7,8];let et=null;async function ia(){const t=document.getElementById("app"),e=await Lt();t.innerHTML=`
    <div class="auth-page">
      <div class="auth-container">
        <div class="auth-header">
          <a href="/" class="auth-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
                <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
                <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#3b82f6"/>
                    <stop offset="100%" style="stop-color:#a855f7"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span>UniSphere</span>
          </a>
          <h1 class="auth-title">Create Account</h1>
          <p class="auth-subtitle">Join the student network across Pakistan</p>
        </div>

        <form id="register-form" class="auth-form">
          <div class="form-section">
            <h3 class="form-section-title">Basic Information</h3>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="fullname">Full Name *</label>
                <input type="text" id="fullname" name="fullname" class="form-input"
                  placeholder="Enter your full name" required>
                <span class="form-error" id="fullname-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="username">Username *</label>
                <input type="text" id="username" name="username" class="form-input"
                  placeholder="Choose a username" required>
                <span class="form-error" id="username-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Account Details</h3>

            <div class="form-group">
              <label class="form-label" for="email">Email Address *</label>
              <input type="email" id="email" name="email" class="form-input"
                placeholder="your.email@university.edu" required>
              <span class="form-error" id="email-error"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="password">Password *</label>
                <div class="input-with-icon">
                  <input type="password" id="password" name="password" class="form-input"
                    placeholder="Create a strong password" required>
                  <button type="button" class="toggle-password" onclick="togglePassword(this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <div class="password-strength">
                  <div class="strength-bar">
                    <span></span><span></span><span></span><span></span>
                  </div>
                  <span class="strength-text" id="strength-text">Enter password</span>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="confirm-password">Confirm Password *</label>
                <div class="input-with-icon">
                  <input type="password" id="confirm-password" name="confirmPassword" class="form-input"
                    placeholder="Re-enter your password" required>
                  <button type="button" class="toggle-password" onclick="togglePassword(this)">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                </div>
                <span class="form-error" id="confirm-password-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Academic Information</h3>

            <div class="form-group">
              <label class="form-label" for="university">University *</label>
              <select id="university" name="university" class="form-input" required>
                <option value="">Select your university</option>
                ${e.map(r=>`<option value="${r}">${r}</option>`).join("")}
              </select>
              <span class="form-error" id="university-error"></span>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="department">Department *</label>
                <select id="department" name="department" class="form-input" required>
                  <option value="">Select department</option>
                  ${Ut.map(r=>`<option value="${r}">${r}</option>`).join("")}
                </select>
                <span class="form-error" id="department-error"></span>
              </div>

              <div class="form-group">
                <label class="form-label" for="semester">Semester *</label>
                <select id="semester" name="semester" class="form-input" required>
                  <option value="">Select semester</option>
                  ${Nt.map(r=>`<option value="${r}">Semester ${r}</option>`).join("")}
                </select>
                <span class="form-error" id="semester-error"></span>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3 class="form-section-title">Profile Setup</h3>

            <div class="form-group">
              <label class="form-label">Profile Picture</label>
              <div class="profile-upload">
                <div class="profile-preview" id="profile-preview">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="upload-info">
                  <input type="file" id="profile-image" name="profileImage" accept="image/jpeg,image/png" class="hidden">
                  <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-image').click()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    Choose Photo
                  </button>
                  <span class="upload-hint">JPG, PNG up to 2MB</span>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="bio">Bio</label>
              <textarea id="bio" name="bio" class="form-input" rows="3" maxlength="500"
                placeholder="Tell others about yourself, your interests, and what you're looking to connect for..."></textarea>
              <span class="form-hint">Maximum 500 characters</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-checkbox">
              <input type="checkbox" id="terms" required>
              <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-lg auth-submit">
            <span class="btn-text">Create Account</span>
            <span class="btn-loading hidden">
              <span class="spinner"></span>
              <span>Creating...</span>
            </span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a href="/login">Sign in</a></p>
        </div>
      </div>
    </div>

    <style>
      .auth-page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--space-8) var(--space-4);
        background: var(--bg-secondary);
      }

      .auth-container {
        width: 100%;
        max-width: 640px;
      }

      .auth-header {
        text-align: center;
        margin-bottom: var(--space-8);
      }

      .auth-logo {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-primary);
        font-weight: 600;
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-6);
      }

      .auth-title {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-2);
      }

      .auth-subtitle {
        color: var(--text-secondary);
      }

      .auth-form {
        background: var(--bg-primary);
        padding: var(--space-8);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-lg);
      }

      @media (max-width: 767px) {
        .auth-form {
          padding: var(--space-6);
        }
      }

      .form-section {
        margin-bottom: var(--space-8);
        padding-bottom: var(--space-6);
        border-bottom: 1px solid var(--border-color);
      }

      .form-section:last-of-type {
        border-bottom: none;
        margin-bottom: var(--space-6);
      }

      .form-section-title {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-4);
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .form-row {
          grid-template-columns: 1fr 1fr;
        }
      }

      .input-with-icon {
        position: relative;
      }

      .input-with-icon .form-input {
        padding-right: 44px;
      }

      .toggle-password {
        position: absolute;
        right: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        padding: var(--space-1);
        transition: color var(--transition-fast);
      }

      .toggle-password:hover {
        color: var(--text-secondary);
      }

      .password-strength {
        margin-top: var(--space-2);
        display: flex;
        align-items: center;
        gap: var(--space-3);
      }

      .strength-bar {
        display: flex;
        gap: var(--space-1);
      }

      .strength-bar span {
        width: 40px;
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        transition: background var(--transition-fast);
      }

      .strength-bar.weak span:first-child {
        background: var(--error-500);
      }

      .strength-bar.fair span:nth-child(-n+2) {
        background: var(--warning-500);
      }

      .strength-bar.good span:nth-child(-n+3) {
        background: var(--primary-500);
      }

      .strength-bar.strong span {
        background: var(--success-500);
      }

      .strength-text {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
      }

      .profile-upload {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .profile-preview {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-full);
        background: var(--bg-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
      }

      .profile-preview svg {
        width: 40px;
        height: 40px;
        color: var(--text-muted);
      }

      .profile-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .upload-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .upload-hint {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
      }

      .auth-submit {
        width: 100%;
        margin-top: var(--space-4);
      }

      .btn-loading {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .btn-loading .spinner {
        width: 16px;
        height: 16px;
      }

      .auth-footer {
        text-align: center;
        margin-top: var(--space-6);
        color: var(--text-secondary);
      }

      .auth-footer a {
        font-weight: 500;
      }
    </style>
  `,na()}function na(){const t=document.getElementById("register-form"),e=document.getElementById("password"),r=document.getElementById("confirm-password"),s=document.getElementById("profile-image");e.addEventListener("input",i=>{const n=i.target.value,a=Vr(n);la(a)}),s.addEventListener("change",i=>{const n=i.target.files[0];if(n){if(!["image/jpeg","image/png"].includes(n.type)){x("Please choose a JPG or PNG image","error"),i.target.value="";return}if(n.size>2*1024*1024){x("Image size should be less than 2MB","error");return}et=n;const a=new FileReader;a.onload=o=>{const l=document.getElementById("profile-preview");l.innerHTML=`<img src="${o.target.result}" alt="Profile preview">`},a.readAsDataURL(n)}}),document.getElementById("username").addEventListener("blur",async i=>{const n=i.target.value.trim();n.length>=3&&(await ca(n)?K("username"):q("username","This username is already taken"))}),r.addEventListener("input",()=>{e.value!==r.value?q("confirm-password","Passwords do not match"):K("confirm-password")}),t.addEventListener("submit",async i=>{if(i.preventDefault(),!aa())return;const n=t.querySelector(".auth-submit");n.disabled=!0,n.querySelector(".btn-text").classList.add("hidden"),n.querySelector(".btn-loading").classList.remove("hidden");try{await da(t)}catch(a){x(a.message,"error")}finally{n.disabled=!1,n.querySelector(".btn-text").classList.remove("hidden"),n.querySelector(".btn-loading").classList.add("hidden")}}),window.togglePassword=i=>{const n=i.parentElement.querySelector("input");n.type=n.type==="password"?"text":"password"}}function aa(){let t=!0;const e=document.getElementById("register-form");e.fullname.value.trim().length<2?(q("fullname","Name must be at least 2 characters"),t=!1):K("fullname");const s=e.username.value.trim();s.length<3?(q("username","Username must be at least 3 characters"),t=!1):/^[a-zA-Z0-9_]+$/.test(s)?K("username"):(q("username","Username can only contain letters, numbers, and underscores"),t=!1);const i=e.email.value.trim();oa(i)?K("email"):(q("email","Please enter a valid email address"),t=!1);const n=e.password.value;return n.length<8?(q("password","Password must be at least 8 characters"),t=!1):Vr(n).score<2?(q("password","Password is too weak. Include uppercase, lowercase, and numbers"),t=!1):K("password"),n!==e.confirmPassword.value?(q("confirm-password","Passwords do not match"),t=!1):K("confirm-password"),e.university.value?K("university"):(q("university","Please select your university"),t=!1),e.department.value?K("department"):(q("department","Please select your department"),t=!1),e.semester.value?K("semester"):(q("semester","Please select your semester"),t=!1),t}function q(t,e){const r=document.getElementById(`${t}-error`),s=document.getElementById(t.replace("-",""));r&&(r.textContent=e),s&&s.classList.add("error")}function K(t){const e=document.getElementById(`${t}-error`),r=document.getElementById(t.replace("-",""));e&&(e.textContent=""),r&&r.classList.remove("error")}function oa(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}function Vr(t){let e=0;t.length>=8&&e++,t.length>=12&&e++,/[a-z]/.test(t)&&/[A-Z]/.test(t)&&e++,/\d/.test(t)&&e++,/[^a-zA-Z0-9]/.test(t)&&e++;const r=["weak","weak","fair","good","strong"],s=["Too weak","Weak","Fair","Good","Strong"];return{score:e,level:r[e]||"weak",feedback:s[e]||"Too weak"}}function la(t){const e=document.querySelector(".strength-bar"),r=document.getElementById("strength-text");e.className="strength-bar "+t.level,r.textContent=t.feedback}async function ca(t){const{data:e,error:r}=await E.rpc("is_username_available",{candidate:t});return r?!0:e===!0}async function da(t){const e=new FormData(t),{data:r,error:s}=await E.auth.signUp({email:e.get("email"),password:e.get("password"),options:{data:{full_name:e.get("fullname"),username:e.get("username"),university:e.get("university"),department:e.get("department"),semester:parseInt(e.get("semester")),bio:e.get("bio")||""}}});if(s)throw new Error(s.message);if(!r.user)throw new Error("Failed to create account. Please try again.");let i="";if(et&&r.session){const n=et.type==="image/png"?"png":"jpg",a=`${r.user.id}/avatar.${n}`,{error:o}=await E.storage.from("profile-images").upload(a,et);if(!o){const{data:l}=E.storage.from("profile-images").getPublicUrl(a);i=l.publicUrl}}if(i){const{error:n}=await E.from("profiles").update({profile_image:i}).eq("id",r.user.id);n&&console.error("Profile image update error:",n)}x("Account created successfully! Please check your email to verify.","success"),$.navigate("/login")}function S(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function j(t){if(!t)return"";try{const e=new URL(t,window.location.origin);return["http:","https:"].includes(e.protocol)?S(e.href):""}catch{return""}}function we(){var r;const t=te(),e=((r=t==null?void 0:t.full_name)==null?void 0:r.split(" ").map(s=>s[0]).join("").substring(0,2).toUpperCase())||"U";return`
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="url(#grad)" stroke-width="2"/>
              <circle cx="10" cy="12" r="3" fill="url(#grad)"/>
              <circle cx="22" cy="12" r="3" fill="url(#grad)"/>
              <circle cx="16" cy="21" r="3" fill="url(#grad)"/>
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#3b82f6"/>
                  <stop offset="100%" style="stop-color:#a855f7"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span>UniSphere</span>
        </div>
        <button class="sidebar-toggle hide-tablet-up" onclick="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="sidebar-user">
        <div class="user-avatar">
          ${j(t==null?void 0:t.profile_image)?`<img src="${j(t.profile_image)}" alt="${S(t.full_name)}">`:`<span>${e}</span>`}
        </div>
        <div class="user-info">
          <span class="user-name">${S((t==null?void 0:t.full_name)||"Student")}</span>
          <span class="user-university">${S((t==null?void 0:t.university)||"University")}</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a href="/dashboard" class="nav-item ${window.location.pathname==="/dashboard"?"active":""}" onclick="navigateTo(event, '/dashboard')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Dashboard</span>
        </a>
        <a href="/profile" class="nav-item ${window.location.pathname==="/profile"?"active":""}" onclick="navigateTo(event, '/profile')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>My Profile</span>
        </a>
        <a href="/search" class="nav-item ${window.location.pathname==="/search"?"active":""}" onclick="navigateTo(event, '/search')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Find Students</span>
        </a>
        <a href="/messages" class="nav-item ${window.location.pathname==="/messages"?"active":""}" onclick="navigateTo(event, '/messages')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Messages</span>
          <span class="nav-badge hidden" id="message-badge">0</span>
        </a>
        <a href="/settings" class="nav-item ${window.location.pathname==="/settings"?"active":""}" onclick="navigateTo(event, '/settings')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span>Settings</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-item logout-btn" onclick="handleLogout()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </aside>

    <style>
      .sidebar {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        width: 280px;
        background: var(--bg-primary);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        z-index: 100;
        transform: translateX(-100%);
        transition: transform var(--transition-base);
      }

      @media (min-width: 1024px) {
        .sidebar {
          transform: translateX(0);
        }
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-4) var(--space-5);
        border-bottom: 1px solid var(--border-color);
      }

      .sidebar-logo {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-weight: 600;
        font-size: var(--font-size-lg);
        color: var(--text-primary);
      }

      .sidebar-toggle {
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      .sidebar-user {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4) var(--space-5);
        border-bottom: 1px solid var(--border-color);
      }

      .user-avatar {
        width: 48px;
        height: 48px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        overflow: hidden;
      }

      .user-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .user-info {
        min-width: 0;
      }

      .user-name {
        display: block;
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .user-university {
        display: block;
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .sidebar-nav {
        flex: 1;
        padding: var(--space-4) var(--space-3);
        overflow-y: auto;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        margin-bottom: var(--space-1);
        border-radius: var(--radius-lg);
        color: var(--text-secondary);
        font-weight: 500;
        transition: all var(--transition-fast);
        position: relative;
      }

      .nav-item svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }

      .nav-item:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      .nav-item.active {
        background: var(--primary-50);
        color: var(--primary-600);
      }

      [data-theme="dark"] .nav-item.active {
        background: rgba(59, 130, 246, 0.15);
      }

      .nav-badge {
        margin-left: auto;
        padding: var(--space-1) var(--space-2);
        background: var(--error-500);
        color: white;
        border-radius: var(--radius-full);
        font-size: var(--font-size-xs);
        font-weight: 600;
        min-width: 20px;
        text-align: center;
      }

      .sidebar-footer {
        padding: var(--space-4) var(--space-3);
        border-top: 1px solid var(--border-color);
      }

      .logout-btn {
        color: var(--error-600);
      }

      .logout-btn:hover {
        background: var(--error-50);
      }

      [data-theme="dark"] .logout-btn:hover {
        background: rgba(239, 68, 68, 0.1);
      }
    </style>
  `}function _e(){window.navigateTo=(t,e)=>{t.preventDefault(),closeSidebar(),$.navigate(e)},window.toggleSidebar=()=>{const t=document.getElementById("sidebar"),e=document.getElementById("sidebar-overlay");t.classList.toggle("open"),e&&e.classList.toggle("hidden")},window.closeSidebar=()=>{const t=document.getElementById("sidebar"),e=document.getElementById("sidebar-overlay");window.innerWidth<1024&&(t==null||t.classList.remove("open"),e==null||e.classList.add("hidden"))},window.handleLogout=async()=>{await E.auth.signOut(),showToast("Logged out successfully","success"),$.navigate("/")}}function ua(){const t=localStorage.getItem("theme")||"light";return document.documentElement.setAttribute("data-theme",t),t}function Gr(){const e=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";return document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e),e}ua();function Ot(){return document.documentElement.getAttribute("data-theme")}function ke(t="",e=!1){var i;const r=te(),s=((i=r==null?void 0:r.full_name)==null?void 0:i.split(" ").map(n=>n[0]).join("").substring(0,2).toUpperCase())||"U";return`
    <header class="header">
      <div class="header-left">
        <button class="menu-toggle hide-tablet-up" onclick="toggleSidebar()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        ${t?`<h1 class="page-title">${t}</h1>`:""}
      </div>

      ${e?`
        <div class="header-search hide-tablet">
          <div class="search-input">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" id="header-search" placeholder="Search students..." onclick="window.router.navigate('/search')">
          </div>
        </div>
      `:""}

      <div class="header-right">
        <button class="header-icon" onclick="handleThemeToggle()" title="Toggle theme">
          <svg class="sun-icon ${Ot()==="dark"?"hidden":""}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg class="moon-icon ${Ot()==="light"?"hidden":""}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <button class="header-icon" onclick="window.router.navigate('/messages')" title="Messages">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>

        <div class="header-user" onclick="window.router.navigate('/settings')">
          <div class="avatar avatar-sm">
            ${r!=null&&r.profile_image?`<img src="${r.profile_image}" alt="${r.full_name}">`:`<span>${s}</span>`}
          </div>
        </div>
      </div>
    </header>

    <style>
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        padding: var(--space-4) var(--space-6);
        background: var(--bg-primary);
        border-bottom: 1px solid var(--border-color);
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .menu-toggle {
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      .page-title {
        font-size: var(--font-size-xl);
        font-weight: 600;
        color: var(--text-primary);
      }

      .header-search {
        flex: 1;
        max-width: 400px;
      }

      .search-input {
        position: relative;
      }

      .search-input svg {
        position: absolute;
        left: var(--space-3);
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
      }

      .search-input input {
        width: 100%;
        padding: var(--space-2) var(--space-3);
        padding-left: 40px;
        background: var(--bg-tertiary);
        border: 1px solid transparent;
        border-radius: var(--radius-lg);
        color: var(--text-primary);
        transition: all var(--transition-fast);
      }

      .search-input input:focus {
        outline: none;
        background: var(--bg-primary);
        border-color: var(--border-focus);
      }

      .search-input input::placeholder {
        color: var(--text-muted);
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .header-icon {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--text-secondary);
        border-radius: var(--radius-lg);
        transition: all var(--transition-fast);
      }

      .header-icon:hover {
        background: var(--bg-tertiary);
        color: var(--text-primary);
      }

      .header-user {
        cursor: pointer;
        padding: var(--space-1);
      }

      @media (max-width: 767px) {
        .header {
          padding: var(--space-3) var(--space-4);
        }
      }
    </style>
  `}function Se(){window.handleThemeToggle=()=>{const t=Gr(),e=document.querySelector(".sun-icon"),r=document.querySelector(".moon-icon");t==="dark"?(e==null||e.classList.add("hidden"),r==null||r.classList.remove("hidden")):(e==null||e.classList.remove("hidden"),r==null||r.classList.add("hidden"))}}async function Bt(t){const{data:e,error:r}=await E.rpc("request_connection",{target_user_id:t});if(r)throw r;return e}async function ha(){var o,l;const t=document.getElementById("app"),e=await Me(),r=((o=e==null?void 0:e.full_name)==null?void 0:o.split(" ").map(c=>c[0]).join("").substring(0,2).toUpperCase())||"U",s=await ga(),i=await va(),n=await ma(),a=await ya();t.innerHTML=`
    <div class="dashboard-layout">
      ${we()}

      <div class="main-content with-sidebar">
        ${fa()}
        ${ke("Dashboard",!0)}

        <main class="dashboard-main">
          <div class="container">
            <!-- Welcome Card -->
            <div class="welcome-card glass-card slide-up">
              <div class="welcome-content">
                <h2>Welcome back, ${S(((l=e==null?void 0:e.full_name)==null?void 0:l.split(" ")[0])||"Student")}!</h2>
                <p>Connect with students across Pakistan and expand your network.</p>
              </div>
              <div class="welcome-avatar">
                <div class="avatar avatar-xl">
                  ${j(e==null?void 0:e.profile_image)?`<img src="${j(e.profile_image)}" alt="${S(e.full_name)}">`:`<span>${r}</span>`}
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid slide-up" style="animation-delay: 0.1s">
              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--primary-50); color: var(--primary-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${s.connections}</span>
                  <span class="stat-label">Connections</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--accent-50); color: var(--accent-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${s.messages}</span>
                  <span class="stat-label">Messages</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--success-50); color: var(--success-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${s.students}</span>
                  <span class="stat-label">Students</span>
                </div>
              </div>

              <div class="stat-card card">
                <div class="stat-icon" style="background: var(--warning-50); color: var(--warning-600);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div class="stat-info">
                  <span class="stat-value">${S((e==null?void 0:e.university)||"University")}</span>
                  <span class="stat-label">Your University</span>
                </div>
              </div>
            </div>

            <!-- Main Content Grid -->
            <div class="dashboard-grid">
              <!-- Suggested Students -->
              <section class="dashboard-section slide-up" style="animation-delay: 0.2s">
                <div class="section-header">
                  <h3>Suggested Students</h3>
                  <a href="/search" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/search')">View All</a>
                </div>
                <div class="students-list">
                  ${i.length>0?i.map(c=>kr(c)).join(""):'<p class="empty-text">No suggestions available. Complete your profile for better matches!</p>'}
                </div>
              </section>

              <!-- Recent Students -->
              <section class="dashboard-section slide-up" style="animation-delay: 0.3s">
                <div class="section-header">
                  <h3>Recently Joined</h3>
                  <a href="/search" class="btn btn-ghost btn-sm" onclick="navigateTo(event, '/search')">View All</a>
                </div>
                <div class="students-list">
                  ${n.length>0?n.map(c=>kr(c)).join(""):'<p class="empty-text">No recent students to show.</p>'}
                </div>
              </section>

              <!-- Pending Requests -->
              ${a.length>0?`
                <section class="dashboard-section full-width slide-up" style="animation-delay: 0.4s">
                  <div class="section-header">
                    <h3>Connection Requests (${a.length})</h3>
                  </div>
                  <div class="requests-list">
                    ${a.map(c=>pa(c)).join("")}
                  </div>
                </section>
              `:""}
            </div>
          </div>
        </main>
      </div>
    </div>
  `,_e(),Se()}function fa(){return`
    <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }
    </style>
  `}function kr(t){var r;const e=((r=t.full_name)==null?void 0:r.split(" ").map(s=>s[0]).join("").substring(0,2).toUpperCase())||"S";return`
    <div class="student-card card" onclick="viewProfile('${t.id}')">
      <div class="student-avatar avatar">
        ${j(t.profile_image)?`<img src="${j(t.profile_image)}" alt="${S(t.full_name)}">`:`<span>${e}</span>`}
      </div>
      <div class="student-info">
        <h4 class="student-name">${S(t.full_name)}</h4>
        <p class="student-meta">${S(t.university)}</p>
        <p class="student-detail">${S(t.department)} - Sem ${t.semester}</p>
      </div>
      <button class="btn btn-primary btn-sm" onclick="connectWith(event, '${t.id}')">Connect</button>
    </div>
  `}function pa(t){var r,s,i,n,a;const e=((s=(r=t.profiles)==null?void 0:r.full_name)==null?void 0:s.split(" ").map(o=>o[0]).join("").substring(0,2).toUpperCase())||"S";return`
    <div class="request-card card">
      <div class="request-user">
        <div class="student-avatar avatar">
          ${j((i=t.profiles)==null?void 0:i.profile_image)?`<img src="${j(t.profiles.profile_image)}" alt="${S(t.profiles.full_name)}">`:`<span>${e}</span>`}
        </div>
        <div class="student-info">
          <h4 class="student-name">${S(((n=t.profiles)==null?void 0:n.full_name)||"Student")}</h4>
          <p class="student-meta">${S(((a=t.profiles)==null?void 0:a.university)||"")}</p>
        </div>
      </div>
      <div class="request-actions">
        <button class="btn btn-primary btn-sm" onclick="acceptRequest(event, '${t.id}')">Accept</button>
        <button class="btn btn-secondary btn-sm" onclick="rejectRequest(event, '${t.id}')">Decline</button>
      </div>
    </div>
  `}async function ga(){const t=te();if(!t)return{connections:0,messages:0,students:0};try{const{count:e}=await E.from("connections").select("*",{count:"exact",head:!0}).or(`requester_id.eq.${t.id},receiver_id.eq.${t.id}`).eq("status","accepted"),{count:r}=await E.from("messages").select("*",{count:"exact",head:!0}).eq("receiver_id",t.id).eq("read",!1),{count:s}=await E.from("profiles").select("*",{count:"exact",head:!0});return{connections:e||0,messages:r||0,students:s||0}}catch{return{connections:0,messages:0,students:0}}}async function va(){const t=te();if(!t)return[];try{const{data:e}=await E.from("connections").select("requester_id, receiver_id").or(`requester_id.eq.${t.id},receiver_id.eq.${t.id}`),r=new Set([t.id]);for(const a of e||[])r.add(a.requester_id),r.add(a.receiver_id);const[s,i]=await Promise.all([E.from("profiles").select("*").eq("university",t.university).limit(10),E.from("profiles").select("*").eq("department",t.department).limit(10)]),n=new Map;for(const a of[...s.data||[],...i.data||[]])r.has(a.id)||n.set(a.id,a);return[...n.values()].slice(0,5)}catch{return[]}}async function ma(){const t=te();if(!t)return[];try{const{data:e}=await E.from("profiles").select("*").neq("id",t.id).order("created_at",{ascending:!1}).limit(5);return e||[]}catch{return[]}}async function ya(){const t=te();if(!t)return[];try{const{data:e}=await E.from("connections").select(`
        id,
        requester_id,
        profiles!connections_requester_id_fkey(id, full_name, university, profile_image)
      `).eq("receiver_id",t.id).eq("status","pending");return e||[]}catch{return[]}}window.viewProfile=t=>{$.navigate(`/profile?id=${t}`)};window.connectWith=async(t,e)=>{t.stopPropagation();try{const r=await Bt(e);x(r==="accepted"?"You are already connected":"Connection request sent!",r==="accepted"?"info":"success")}catch{x("Failed to send connection request","error")}};window.acceptRequest=async(t,e)=>{t.stopPropagation();const{error:r}=await E.from("connections").update({status:"accepted"}).eq("id",e);r?x("Failed to accept request","error"):(x("Connection accepted!","success"),$.navigate("/dashboard"))};window.rejectRequest=async(t,e)=>{t.stopPropagation();const{error:r}=await E.from("connections").update({status:"rejected"}).eq("id",e);r?x("Failed to reject request","error"):$.navigate("/dashboard")};window.navigateTo=(t,e)=>{t.preventDefault(),$.navigate(e)};let $t=null;async function ba(){const t=document.getElementById("app"),e=await Lt();window.cleanupCurrentPage=()=>clearTimeout($t),t.innerHTML=`
    <div class="dashboard-layout">
      ${we()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${ke("Find Students")}

        <main class="search-main">
          <div class="container">
            <!-- Search Filters -->
            <div class="search-filters glass-card slide-up">
              <div class="filters-header">
                <h3>Search Filters</h3>
                <button class="btn btn-ghost btn-sm" onclick="clearFilters()">Clear All</button>
              </div>
              <div class="filters-grid">
                <div class="form-group">
                  <label class="form-label" for="search-name">Name</label>
                  <input type="text" id="search-name" class="form-input" placeholder="Search by name..." oninput="handleSearch()">
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-university">University</label>
                  <select id="search-university" class="form-input" onchange="handleSearch()">
                    <option value="">All Universities</option>
                    ${e.map(r=>`<option value="${r}">${r}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-department">Department</label>
                  <select id="search-department" class="form-input" onchange="handleSearch()">
                    <option value="">All Departments</option>
                    ${Ut.map(r=>`<option value="${r}">${r}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label" for="search-semester">Semester</label>
                  <select id="search-semester" class="form-input" onchange="handleSearch()">
                    <option value="">All Semesters</option>
                    ${Nt.map(r=>`<option value="${r}">Semester ${r}</option>`).join("")}
                  </select>
                </div>
              </div>
            </div>

            <!-- Results -->
            <div class="search-results slide-up" style="animation-delay: 0.1s">
              <div class="results-header">
                <span class="results-count" id="results-count">Loading...</span>
              </div>
              <div class="results-grid" id="results-grid">
                <div class="loading-container">
                  <div class="loading-skeleton"></div>
                  <div class="loading-skeleton"></div>
                  <div class="loading-skeleton"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .search-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .search-filters {
        padding: var(--space-6);
        margin-bottom: var(--space-6);
      }

      .filters-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--space-4);
      }

      .filters-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .filters-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .filters-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .filters-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .search-results {
        min-height: 400px;
      }

      .results-header {
        margin-bottom: var(--space-4);
      }

      .results-count {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
      }

      .results-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .results-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .results-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      .result-card {
        padding: var(--space-5);
        cursor: pointer;
        transition: all var(--transition-base);
      }

      .result-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      .result-header {
        display: flex;
        align-items: center;
        gap: var(--space-4);
        margin-bottom: var(--space-3);
      }

      .result-avatar {
        width: 64px;
        height: 64px;
        border-radius: var(--radius-lg);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-lg);
        overflow: hidden;
        flex-shrink: 0;
      }

      .result-avatar img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .result-info {
        flex: 1;
        min-width: 0;
      }

      .result-name {
        font-size: var(--font-size-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .result-university {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin-bottom: var(--space-1);
      }

      .result-department {
        font-size: var(--font-size-xs);
        color: var(--text-tertiary);
      }

      .result-bio {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        line-height: var(--line-height-relaxed);
        margin-bottom: var(--space-3);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .result-footer {
        display: flex;
        gap: var(--space-2);
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding: var(--space-4);
      }

      .loading-skeleton {
        height: 180px;
        border-radius: var(--radius-lg);
      }

      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
        color: var(--text-tertiary);
      }

      .empty-state svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      .empty-state h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }
    </style>
  `,_e(),Se(),wa(),handleSearch()}function wa(){window.handleSearch=()=>{clearTimeout($t),$t=setTimeout(_a,300)},window.clearFilters=()=>{document.getElementById("search-name").value="",document.getElementById("search-university").value="",document.getElementById("search-department").value="",document.getElementById("search-semester").value="",handleSearch()},window.viewProfile=t=>{$.navigate(`/profile?id=${t}`)},window.connectWith=async(t,e)=>{t.stopPropagation();try{const r=await Bt(e);x(r==="accepted"?"You are already connected":"Connection request sent!",r==="accepted"?"info":"success")}catch{x("Failed to send request","error")}}}async function _a(){const t=te(),e=document.getElementById("results-grid"),r=document.getElementById("results-count"),s=document.getElementById("search-name").value.trim(),i=document.getElementById("search-university").value,n=document.getElementById("search-department").value,a=document.getElementById("search-semester").value;let o=E.from("profiles").select("*",{count:"exact"}).neq("id",(t==null?void 0:t.id)||"");s&&(o=o.ilike("full_name",`%${s}%`)),i&&(o=o.eq("university",i)),n&&(o=o.eq("department",n)),a&&(o=o.eq("semester",parseInt(a))),o=o.limit(30);try{const{data:l,count:c,error:d}=await o;if(d)throw d;if(r.textContent=`${c||0} student${c!==1?"s":""} found`,!l||l.length===0){e.innerHTML=`
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <h4>No students found</h4>
          <p>Try adjusting your search filters</p>
        </div>
      `;return}e.innerHTML=l.map(u=>ka(u)).join("")}catch{e.innerHTML=`
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <h4>Failed to load results</h4>
        <p>Please try again</p>
      </div>
    `}}function ka(t){var r;const e=((r=t.full_name)==null?void 0:r.split(" ").map(s=>s[0]).join("").substring(0,2).toUpperCase())||"S";return`
    <div class="result-card card" onclick="viewProfile('${t.id}')">
      <div class="result-header">
        <div class="result-avatar">
          ${j(t.profile_image)?`<img src="${j(t.profile_image)}" alt="${S(t.full_name)}">`:`<span>${e}</span>`}
        </div>
        <div class="result-info">
          <h4 class="result-name">${S(t.full_name)}</h4>
          <p class="result-university">${S(t.university)}</p>
          <p class="result-department">${S(t.department)} - Semester ${t.semester}</p>
        </div>
      </div>
      ${t.bio?`<p class="result-bio">${S(t.bio)}</p>`:""}
      <div class="result-footer">
        <button class="btn btn-primary btn-sm" onclick="connectWith(event, '${t.id}')">
          Connect
        </button>
        <button class="btn btn-secondary btn-sm" onclick="viewProfile('${t.id}')">
          View Profile
        </button>
      </div>
    </div>
  `}let bt=null;async function Sa(t=null){var l;const e=document.getElementById("app"),r=te(),s=new URLSearchParams(window.location.search);if(bt=t||s.get("id")||(r==null?void 0:r.id),!bt){$.navigate("/login");return}const i=await xa(bt);if(!i){e.innerHTML=`
      <div class="dashboard-layout">
        ${we()}
        <div class="main-content with-sidebar">
          <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
          ${ke("Profile")}
          <main class="profile-main">
            <div class="container">
              <div class="empty-state fade-in">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <h4>Profile not found</h4>
                <p>This student profile doesn't exist or has been removed.</p>
                <button class="btn btn-primary" onclick="window.router.navigate('/search')">Find Students</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    `,_e(),Se();return}const n=(r==null?void 0:r.id)===i.id,a=await Ea(r==null?void 0:r.id,i.id),o=((l=i.full_name)==null?void 0:l.split(" ").map(c=>c[0]).join("").substring(0,2).toUpperCase())||"S";e.innerHTML=`
    <div class="dashboard-layout">
      ${we()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${ke(n?"My Profile":"Student Profile")}

        <main class="profile-main">
          <div class="container">
            <!-- Profile Header -->
            <div class="profile-header glass-card slide-up">
              <div class="profile-cover"></div>
              <div class="profile-content">
                <div class="profile-avatar-wrapper">
                  <div class="profile-avatar avatar-xl">
                    ${j(i.profile_image)?`<img src="${j(i.profile_image)}" alt="${S(i.full_name)}">`:`<span>${o}</span>`}
                  </div>
                </div>
                <div class="profile-info">
                  <h1 class="profile-name">${S(i.full_name)}</h1>
                  <p class="profile-username">@${S(i.username)}</p>
                  <p class="profile-bio">${S(i.bio||"No bio yet")}</p>
                  <div class="profile-meta">
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                      ${S(i.university)}
                    </span>
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
                        <path d="M22 12h-4"/>
                        <line x1="12" y1="2" x2="12" y2="6"/>
                        <path d="M12 12l4 2v-2a10 10 0 0 0-4 4"/>
                      </svg>
                      ${S(i.department)}
                    </span>
                    <span class="meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                      </svg>
                      Semester ${i.semester}
                    </span>
                  </div>
                </div>
                <div class="profile-actions">
                  ${n?`
                    <button class="btn btn-primary" onclick="window.router.navigate('/settings')">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit Profile
                    </button>
                  `:`
                    <button class="btn btn-primary" id="connect-btn" onclick="handleConnection()">
                      ${Ta(a)}
                    </button>
                    ${a==="accepted"?`
                      <button class="btn btn-secondary" onclick="startChat('${i.id}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        Message
                      </button>
                    `:""}
                  `}
                </div>
              </div>
            </div>

            <!-- Profile Details -->
            <div class="profile-details slide-up" style="animation-delay: 0.1s">
              <div class="details-grid">
                <div class="detail-card card">
                  <h3 class="detail-title">Academic Information</h3>
                  <div class="detail-list">
                    <div class="detail-item">
                      <span class="detail-label">University</span>
                      <span class="detail-value">${S(i.university)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Department</span>
                      <span class="detail-value">${S(i.department)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Semester</span>
                      <span class="detail-value">Semester ${i.semester}</span>
                    </div>
                  </div>
                </div>

                <div class="detail-card card">
                  <h3 class="detail-title">Account Details</h3>
                  <div class="detail-list">
                    <div class="detail-item">
                      <span class="detail-label">Joined</span>
                      <span class="detail-value">${Aa(i.created_at)}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Username</span>
                      <span class="detail-value">@${S(i.username)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .profile-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .profile-header {
        position: relative;
        margin-bottom: var(--space-6);
        overflow: hidden;
      }

      .profile-cover {
        height: 120px;
        background: var(--gradient-primary);
      }

      @media (min-width: 768px) {
        .profile-cover {
          height: 180px;
        }
      }

      .profile-content {
        padding: 0 var(--space-6) var(--space-6);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      @media (min-width: 768px) {
        .profile-content {
          flex-direction: row;
          text-align: left;
          align-items: flex-end;
          gap: var(--space-6);
        }
      }

      .profile-avatar-wrapper {
        margin-top: -48px;
        margin-bottom: var(--space-4);
      }

      @media (min-width: 768px) {
        .profile-avatar-wrapper {
          margin: 0;
          margin-top: -40px;
        }
      }

      .profile-avatar {
        border: 4px solid var(--bg-primary);
        box-shadow: var(--shadow-lg);
      }

      .profile-info {
        flex: 1;
      }

      .profile-name {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: var(--space-1);
      }

      .profile-username {
        color: var(--text-secondary);
        margin-bottom: var(--space-3);
      }

      .profile-bio {
        color: var(--text-secondary);
        margin-bottom: var(--space-4);
        max-width: 500px;
      }

      .profile-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-4);
        justify-content: center;
      }

      @media (min-width: 768px) {
        .profile-meta {
          justify-content: flex-start;
        }
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .meta-item svg {
        color: var(--primary-500);
      }

      .profile-actions {
        display: flex;
        gap: var(--space-3);
        margin-top: var(--space-4);
      }

      .profile-details {
        margin-top: var(--space-6);
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 768px) {
        .details-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .detail-card {
        padding: var(--space-6);
      }

      .detail-title {
        font-size: var(--font-size-lg);
        font-weight: 600;
        margin-bottom: var(--space-4);
        color: var(--text-primary);
      }

      .detail-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
      }

      .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-3) 0;
        border-bottom: 1px solid var(--border-color);
      }

      .detail-item:last-child {
        border-bottom: none;
      }

      .detail-label {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .detail-value {
        color: var(--text-primary);
        font-weight: 500;
      }

      .empty-state {
        text-align: center;
        padding: var(--space-12) var(--space-4);
      }

      .empty-state svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        color: var(--text-muted);
      }

      .empty-state h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }

      .empty-state p {
        color: var(--text-tertiary);
        margin-bottom: var(--space-4);
      }
    </style>
  `,_e(),Se(),Ra(r,i,a)}async function xa(t){const{data:e,error:r}=await E.from("profiles").select("*").eq("id",t).maybeSingle();return e}async function Ea(t,e){if(!t||!e||t===e)return null;const{data:r,error:s}=await E.from("connections").select("status, requester_id").or(`and(requester_id.eq.${t},receiver_id.eq.${e}),and(requester_id.eq.${e},receiver_id.eq.${t})`).maybeSingle();return r?r.status:"none"}function Ta(t){switch(t){case"pending":return"Request Pending";case"accepted":return"Connected";case"rejected":return"Connect";default:return"Connect"}}function Aa(t){return new Date(t).toLocaleDateString("en-US",{month:"long",year:"numeric"})}function Ra(t,e,r){window.handleConnection=async()=>{if(!t){$.navigate("/login");return}const s=document.getElementById("connect-btn");if(r==="pending"){x("Connection request already pending","info");return}if(r==="accepted"){x("Already connected","info");return}try{if(await Bt(e.id)==="accepted"){x("Already connected","info");return}x("Connection request sent!","success"),s.textContent="Request Pending",r="pending"}catch{x("Failed to send request","error")}},window.startChat=s=>{$.navigate(`/messages?user=${s}`)}}let Xe=[],ie=null,be=null;async function Ca(){const t=document.getElementById("app"),e=te();if(!e){$.navigate("/login");return}window.cleanupCurrentPage=xr;const s=new URLSearchParams(window.location.search).get("user");if(Xe=await Pa(e.id),t.innerHTML=`
    <div class="dashboard-layout">
      ${we()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${ke("Messages")}

        <main class="messages-main">
          <div class="messages-container">
            <!-- Conversations List -->
            <div class="conversations-panel" id="conversations-panel">
              <div class="conversations-header">
                <h3>Chats</h3>
              </div>
              <div class="conversations-list" id="conversations-list">
                ${Xe.length>0?Xe.map(i=>$a(i,e.id,s)).join(""):Ia()}
              </div>
            </div>

            <!-- Chat Window -->
            <div class="chat-panel" id="chat-panel">
              <div class="chat-placeholder" id="chat-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <h4>Select a conversation</h4>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
              <div class="chat-active hidden" id="chat-active">
                <div class="chat-header" id="chat-header"></div>
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input" id="chat-input-area"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .messages-main {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 65px);
      }

      .messages-container {
        display: flex;
        flex: 1;
        overflow: hidden;
        background: var(--bg-secondary);
      }

      .conversations-panel {
        width: 320px;
        background: var(--bg-primary);
        border-right: 1px solid var(--border-color);
        display: flex;
        flex-direction: column;
        transition: all var(--transition-base);
      }

      @media (max-width: 767px) {
        .conversations-panel {
          width: 100%;
          position: absolute;
          left: 0;
          top: 65px;
          bottom: 0;
          z-index: 10;
        }

        .conversations-panel.hidden-mobile {
          transform: translateX(-100%);
        }
      }

      .conversations-header {
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-color);
      }

      .conversations-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
      }

      .conversations-list {
        flex: 1;
        overflow-y: auto;
      }

      .conversation-item {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-3) var(--space-4);
        cursor: pointer;
        transition: background var(--transition-fast);
        border-bottom: 1px solid var(--border-color);
      }

      .conversation-item:hover {
        background: var(--bg-tertiary);
      }

      .conversation-item.active {
        background: var(--primary-50);
      }

      [data-theme="dark"] .conversation-item.active {
        background: rgba(59, 130, 246, 0.1);
      }

      .conversation-avatar {
        position: relative;
        flex-shrink: 0;
      }

      .conversation-avatar .online-indicator {
        position: absolute;
        bottom: 0;
        right: 0;
      }

      .conversation-info {
        flex: 1;
        min-width: 0;
      }

      .conversation-name {
        font-weight: 600;
        color: var(--text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conversation-preview {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .conversation-meta {
        text-align: right;
        flex-shrink: 0;
      }

      .conversation-time {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
        margin-bottom: var(--space-1);
      }

      .unread-badge {
        background: var(--primary-500);
        color: white;
        font-size: var(--font-size-xs);
        font-weight: 600;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-full);
        min-width: 20px;
        text-align: center;
      }

      .empty-conversations {
        padding: var(--space-8);
        text-align: center;
        color: var(--text-tertiary);
      }

      .empty-conversations svg {
        width: 48px;
        height: 48px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      /* Chat Panel */
      .chat-panel {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: var(--bg-primary);
      }

      @media (max-width: 767px) {
        .chat-panel {
          position: absolute;
          left: 0;
          top: 65px;
          right: 0;
          bottom: 0;
          z-index: 5;
          transform: translateX(100%);
          transition: transform var(--transition-base);
        }

        .chat-panel.active {
          transform: translateX(0);
        }
      }

      .chat-placeholder {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--text-muted);
        padding: var(--space-8);
        text-align: center;
      }

      .chat-placeholder svg {
        width: 64px;
        height: 64px;
        margin-bottom: var(--space-4);
        opacity: 0.5;
      }

      .chat-placeholder h4 {
        color: var(--text-secondary);
        margin-bottom: var(--space-2);
      }

      .chat-active {
        flex: 1;
        display: flex;
        flex-direction: column;
      }

      .chat-header {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: var(--space-4);
        border-bottom: 1px solid var(--border-color);
        background: var(--bg-primary);
      }

      .chat-back-btn {
        display: none;
        color: var(--text-secondary);
        padding: var(--space-2);
        margin: calc(var(--space-2) * -1);
      }

      @media (max-width: 767px) {
        .chat-back-btn {
          display: block;
        }
      }

      .chat-user-info {
        flex: 1;
      }

      .chat-user-name {
        font-weight: 600;
        color: var(--text-primary);
      }

      .chat-user-status {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: var(--space-4);
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        background: var(--bg-secondary);
      }

      .message {
        max-width: 70%;
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-xl);
        position: relative;
      }

      .message-sent {
        background: var(--primary-500);
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: var(--radius-sm);
      }

      .message-received {
        background: var(--bg-primary);
        align-self: flex-start;
        border-bottom-left-radius: var(--radius-sm);
        box-shadow: var(--shadow-sm);
      }

      .message-text {
        line-height: var(--line-height-normal);
        word-wrap: break-word;
      }

      .message-time {
        font-size: var(--font-size-xs);
        margin-top: var(--space-1);
        opacity: 0.7;
      }

      .message-sent .message-time {
        text-align: right;
      }

      .messages-date-separator {
        text-align: center;
        color: var(--text-muted);
        font-size: var(--font-size-xs);
        padding: var(--space-2) 0;
      }

      .chat-input {
        padding: var(--space-4);
        border-top: 1px solid var(--border-color);
        background: var(--bg-primary);
      }

      .input-wrapper {
        display: flex;
        gap: var(--space-3);
        align-items: flex-end;
      }

      .input-wrapper textarea {
        flex: 1;
        padding: var(--space-3) var(--space-4);
        background: var(--bg-tertiary);
        border: none;
        border-radius: var(--radius-xl);
        resize: none;
        max-height: 120px;
        color: var(--text-primary);
        font-family: inherit;
      }

      .input-wrapper textarea:focus {
        outline: none;
        background: var(--bg-secondary);
      }

      .input-wrapper textarea::placeholder {
        color: var(--text-muted);
      }

      .send-btn {
        width: 44px;
        height: 44px;
        background: var(--gradient-primary);
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
        transition: transform var(--transition-fast);
      }

      .send-btn:hover {
        transform: scale(1.05);
      }

      .send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
  `,_e(),Se(),s){const i=await Oa(s);i&&Sr(e,i)}window.selectConversation=i=>{const n=Xe.find(a=>{var o;return((o=a.other_user)==null?void 0:o.id)===i});n&&e&&Sr(e,n.other_user)},window.backToList=()=>{const i=document.getElementById("conversations-panel"),n=document.getElementById("chat-panel");i==null||i.classList.remove("hidden-mobile"),n==null||n.classList.remove("active"),xr()}}async function Pa(t){try{const{data:e,error:r}=await E.from("messages").select(`
        id,
        sender_id,
        receiver_id,
        message,
        created_at,
        read
      `).or(`sender_id.eq.${t},receiver_id.eq.${t}`).order("created_at",{ascending:!1});if(r||!e)return[];const s=new Map;for(const o of e){const l=o.sender_id===t?o.receiver_id:o.sender_id;if(s.has(l)||s.set(l,{other_user_id:l,last_message:o,unread_count:0}),o.receiver_id===t&&!o.read){const c=s.get(l);c.unread_count++}}const i=Array.from(s.keys()),{data:n}=await E.from("profiles").select("*").in("id",i),a=[];for(const[o,l]of s){const c=n==null?void 0:n.find(d=>d.id===o);a.push({...l,other_user:c})}return a}catch{return[]}}async function Oa(t){const{data:e}=await E.from("profiles").select("*").eq("id",t).maybeSingle();return e}function $a(t,e,r){var l;const s=t.other_user;if(!s)return"";const i=((l=s.full_name)==null?void 0:l.split(" ").map(c=>c[0]).join("").substring(0,2).toUpperCase())||"S",n=s.id===r,a=Na(t.last_message.created_at),o=t.last_message.message.substring(0,50);return`
    <div class="conversation-item ${n?"active":""}" onclick="selectConversation('${s.id}')">
      <div class="conversation-avatar">
        <div class="avatar">
          ${j(s.profile_image)?`<img src="${j(s.profile_image)}" alt="${S(s.full_name)}">`:`<span>${i}</span>`}
        </div>
      </div>
      <div class="conversation-info">
        <div class="conversation-name">${S(s.full_name)}</div>
        <div class="conversation-preview">${S(o)}${o.length>=50?"...":""}</div>
      </div>
      <div class="conversation-meta">
        <div class="conversation-time">${a}</div>
        ${t.unread_count>0?`<div class="unread-badge">${t.unread_count}</div>`:""}
      </div>
    </div>
  `}function Ia(){return`
    <div class="empty-conversations">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      <p>No conversations yet</p>
      <p style="font-size: var(--font-size-sm); margin-top: var(--space-2);">
        Start by connecting with other students
      </p>
    </div>
  `}async function Sr(t,e){var c;ie={currentUser:t,otherUser:e};const r=document.getElementById("chat-placeholder"),s=document.getElementById("chat-active"),i=document.getElementById("conversations-panel"),n=document.getElementById("chat-panel");r==null||r.classList.add("hidden"),s==null||s.classList.remove("hidden"),window.innerWidth<768&&(i==null||i.classList.add("hidden-mobile"),n==null||n.classList.add("active"));const a=document.getElementById("chat-header"),o=((c=e.full_name)==null?void 0:c.split(" ").map(d=>d[0]).join("").substring(0,2).toUpperCase())||"S";a.innerHTML=`
    <button class="chat-back-btn" onclick="backToList()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
    </button>
    <div class="avatar">
      ${j(e.profile_image)?`<img src="${j(e.profile_image)}" alt="${S(e.full_name)}">`:`<span>${o}</span>`}
    </div>
    <div class="chat-user-info">
      <div class="chat-user-name">${S(e.full_name)}</div>
      <div class="chat-user-status">${S(e.university)}</div>
    </div>
  `;const l=document.getElementById("chat-input-area");l.innerHTML=`
    <div class="input-wrapper">
      <textarea id="message-input" placeholder="Type a message..." rows="1" maxlength="2000" onkeydown="handleMessageKeydown(event)"></textarea>
      <button class="send-btn" onclick="sendMessage()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  `,await Dt(t.id,e.id),La(t.id,e.id)}async function Dt(t,e){const{data:r,error:s}=await E.from("messages").select("*").or(`and(sender_id.eq.${t},receiver_id.eq.${e}),and(sender_id.eq.${e},receiver_id.eq.${t})`).order("created_at",{ascending:!0}),i=document.getElementById("chat-messages");!r||r.length===0?i.innerHTML=`
      <div class="messages-date-separator">Start of conversation</div>
    `:i.innerHTML=r.map(n=>ja(n,t)).join(""),i.scrollTop=i.scrollHeight,await Ua(t,e)}function ja(t,e){const r=t.sender_id===e,s=Jr(t.created_at);return`
    <div class="message ${r?"message-sent":"message-received"}">
      <div class="message-text">${S(t.message)}</div>
      <div class="message-time">${s}</div>
    </div>
  `}function La(t,e){be&&clearInterval(be),be=setInterval(async()=>{ie&&await Dt(t,e)},5e3)}function xr(){ie=null,be&&(clearInterval(be),be=null)}async function Ua(t,e){await E.from("messages").update({read:!0}).eq("receiver_id",t).eq("sender_id",e).eq("read",!1)}window.sendMessage=async()=>{const t=document.getElementById("message-input"),e=t.value.trim();if(!e||!ie)return;t.value="";const{error:r}=await E.from("messages").insert({sender_id:ie.currentUser.id,receiver_id:ie.otherUser.id,message:e});if(r){x("Failed to send message","error");return}await Dt(ie.currentUser.id,ie.otherUser.id)};window.handleMessageKeydown=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),window.sendMessage())};function Jr(t){return new Date(t).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:!0})}function Na(t){const e=new Date(t),s=Math.floor((new Date-e)/(1e3*60*60*24));return s===0?Jr(t):s===1?"Yesterday":s<7?e.toLocaleDateString("en-US",{weekday:"short"}):e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}let Ze=null;async function Ba(){var n;const t=document.getElementById("app"),e=await Me(),r=await Lt();if(!e){$.navigate("/login");return}const s=((n=e.full_name)==null?void 0:n.split(" ").map(a=>a[0]).join("").substring(0,2).toUpperCase())||"U",i=Ot();t.innerHTML=`
    <div class="dashboard-layout">
      ${we()}

      <div class="main-content with-sidebar">
        <div id="sidebar-overlay" class="sidebar-overlay hidden" onclick="closeSidebar()"></div>
        ${ke("Settings")}

        <main class="settings-main">
          <div class="container">
            <!-- Settings Grid -->
            <div class="settings-grid">
              <!-- Profile Section -->
              <div class="settings-section slide-up">
                <div class="section-header">
                  <h3>Profile Settings</h3>
                  <p class="section-desc">Update your personal information</p>
                </div>

                <form id="profile-form" class="settings-form card">
                  <div class="form-group">
                    <label class="form-label">Profile Picture</label>
                    <div class="profile-upload">
                      <div class="profile-preview" id="profile-preview">
                        ${j(e.profile_image)?`<img src="${j(e.profile_image)}" alt="${S(e.full_name)}">`:`<span>${s}</span>`}
                      </div>
                      <div class="upload-info">
                        <input type="file" id="profile-image" accept="image/jpeg,image/png" class="hidden">
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('profile-image').click()">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          Change Photo
                        </button>
                        <span class="upload-hint">JPG, PNG up to 2MB</span>
                      </div>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="university">University</label>
                      <select id="university" class="form-input" required>
                        ${r.map(a=>`<option value="${a}" ${e.university===a?"selected":""}>${a}</option>`).join("")}
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="fullname">Full Name</label>
                      <input type="text" id="fullname" class="form-input" value="${S(e.full_name||"")}" required>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="username">Username</label>
                      <input type="text" id="username" class="form-input" value="${S(e.username||"")}" required>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="bio">Bio</label>
                    <textarea id="bio" class="form-input" rows="3" maxlength="500" placeholder="Tell others about yourself...">${S(e.bio||"")}</textarea>
                    <span class="form-hint">Maximum 500 characters</span>
                  </div>

                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="department">Department</label>
                      <select id="department" class="form-input">
                        ${Ut.map(a=>`<option value="${a}" ${e.department===a?"selected":""}>${a}</option>`).join("")}
                      </select>
                    </div>

                    <div class="form-group">
                      <label class="form-label" for="semester">Semester</label>
                      <select id="semester" class="form-input">
                        ${Nt.map(a=>`<option value="${a}" ${e.semester===a?"selected":""}>Semester ${a}</option>`).join("")}
                      </select>
                    </div>
                  </div>

                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                      <span class="btn-text">Save Changes</span>
                      <span class="btn-loading hidden">
                        <span class="spinner"></span>
                        <span>Saving...</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Security Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.1s">
                <div class="section-header">
                  <h3>Security</h3>
                  <p class="section-desc">Manage your password and security settings</p>
                </div>

                <form id="password-form" class="settings-form card">
                  <div class="form-group">
                    <label class="form-label" for="current-password">Current Password</label>
                    <input type="password" id="current-password" class="form-input" placeholder="Enter current password">
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="new-password">New Password</label>
                    <input type="password" id="new-password" class="form-input" placeholder="Enter new password">
                  </div>

                  <div class="form-group">
                    <label class="form-label" for="confirm-new-password">Confirm New Password</label>
                    <input type="password" id="confirm-new-password" class="form-input" placeholder="Confirm new password">
                  </div>

                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary">
                      <span class="btn-text">Update Password</span>
                      <span class="btn-loading hidden">
                        <span class="spinner"></span>
                        <span>Updating...</span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Appearance Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.2s">
                <div class="section-header">
                  <h3>Appearance</h3>
                  <p class="section-desc">Customize how UniSphere looks</p>
                </div>

                <div class="settings-form card">
                  <div class="theme-toggle">
                    <div class="theme-info">
                      <span class="theme-label">Dark Mode</span>
                      <span class="theme-desc">Switch between light and dark themes</span>
                    </div>
                    <button type="button" class="toggle-btn ${i==="dark"?"active":""}" onclick="handleThemeToggle()">
                      <span class="toggle-slider"></span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Account Section -->
              <div class="settings-section slide-up" style="animation-delay: 0.3s">
                <div class="section-header">
                  <h3>Account</h3>
                  <p class="section-desc">Manage your account settings</p>
                </div>

                <div class="settings-form card">
                  <div class="account-info">
                    <div class="info-item">
                      <span class="info-label">Email Address</span>
                      <span class="info-value">${S(e.email||"Not set")}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">University</span>
                      <span class="info-value">${S(e.university||"Not set")}</span>
                    </div>
                    <div class="info-item">
                      <span class="info-label">Account Created</span>
                      <span class="info-value">${Ma(e.created_at)}</span>
                    </div>
                  </div>

                  <div class="danger-zone">
                    <h4 class="danger-title">Danger Zone</h4>
                    <button class="btn btn-outline" style="color: var(--error-600); border-color: var(--error-600);" onclick="handleLogout()">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <style>
      .sidebar-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
      }

      .settings-main {
        padding: var(--space-6) 0;
        flex: 1;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-6);
      }

      @media (min-width: 1024px) {
        .settings-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      .settings-section {
        margin-bottom: var(--space-6);
      }

      .section-header {
        margin-bottom: var(--space-4);
      }

      .section-header h3 {
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--text-primary);
      }

      .section-desc {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
        margin-top: var(--space-1);
      }

      .settings-form {
        padding: var(--space-6);
      }

      .settings-form.card {
        margin-bottom: 0;
      }

      .form-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-4);
      }

      @media (min-width: 640px) {
        .form-row {
          grid-template-columns: 1fr 1fr;
        }
      }

      .profile-upload {
        display: flex;
        align-items: center;
        gap: var(--space-4);
      }

      .profile-preview {
        width: 80px;
        height: 80px;
        border-radius: var(--radius-full);
        background: var(--gradient-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        flex-shrink: 0;
        color: white;
        font-weight: 600;
        font-size: var(--font-size-xl);
      }

      .profile-preview img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .upload-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .upload-hint {
        font-size: var(--font-size-xs);
        color: var(--text-muted);
      }

      .form-actions {
        margin-top: var(--space-6);
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-color);
      }

      .btn-loading {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .btn-loading .spinner {
        width: 16px;
        height: 16px;
      }

      /* Theme Toggle */
      .theme-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-3) 0;
      }

      .theme-info {
        display: flex;
        flex-direction: column;
      }

      .theme-label {
        font-weight: 500;
        color: var(--text-primary);
      }

      .theme-desc {
        font-size: var(--font-size-sm);
        color: var(--text-tertiary);
      }

      .toggle-btn {
        position: relative;
        width: 52px;
        height: 28px;
        background: var(--bg-tertiary);
        border-radius: var(--radius-full);
        transition: background var(--transition-fast);
        cursor: pointer;
      }

      .toggle-btn.active {
        background: var(--primary-500);
      }

      .toggle-slider {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: var(--radius-full);
        transition: transform var(--transition-fast);
        box-shadow: var(--shadow-sm);
      }

      .toggle-btn.active .toggle-slider {
        transform: translateX(24px);
      }

      /* Account Info */
      .account-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }

      .info-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-3) 0;
        border-bottom: 1px solid var(--border-color);
      }

      .info-item:last-child {
        border-bottom: none;
      }

      .info-label {
        color: var(--text-tertiary);
        font-size: var(--font-size-sm);
      }

      .info-value {
        color: var(--text-primary);
        font-weight: 500;
      }

      /* Danger Zone */
      .danger-zone {
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-color);
      }

      .danger-title {
        color: var(--error-600);
        font-size: var(--font-size-sm);
        font-weight: 600;
        margin-bottom: var(--space-3);
      }
    </style>
  `,_e(),Se(),Da(e)}function Da(t){document.getElementById("profile-image").addEventListener("change",r=>{const s=r.target.files[0];if(s){if(!["image/jpeg","image/png"].includes(s.type)){x("Please choose a JPG or PNG image","error"),r.target.value="";return}if(s.size>2*1024*1024){x("Image size should be less than 2MB","error");return}Ze=s;const i=new FileReader;i.onload=n=>{const a=document.getElementById("profile-preview");a.innerHTML=`<img src="${n.target.result}" alt="Preview">`},i.readAsDataURL(s)}}),document.getElementById("profile-form").addEventListener("submit",async r=>{r.preventDefault();const s=r.target.querySelector(".btn-primary");s.disabled=!0,s.querySelector(".btn-text").classList.add("hidden"),s.querySelector(".btn-loading").classList.remove("hidden");try{const i=document.getElementById("fullname").value.trim(),n=document.getElementById("username").value.trim(),a=document.getElementById("bio").value.trim(),o=document.getElementById("university").value,l=document.getElementById("department").value,c=parseInt(document.getElementById("semester").value);if(i.length<2||!/^[A-Za-z0-9_]{3,30}$/.test(n)){x("Enter a valid name and a 3–30 character username","error");return}if(a.length>500){x("Bio must be 500 characters or fewer","error");return}let d=t.profile_image;if(Ze){const h=Ze.type==="image/png"?"png":"jpg",f=`${t.id}/avatar.${h}`,{error:p}=await E.storage.from("profile-images").upload(f,Ze,{upsert:!0});if(!p){const{data:g}=E.storage.from("profile-images").getPublicUrl(f);d=g.publicUrl}}const{error:u}=await E.from("profiles").update({full_name:i,username:n,bio:a,university:o,department:l,semester:c,profile_image:d}).eq("id",t.id);u?x(u.message,"error"):(x("Profile updated successfully!","success"),await Me())}catch{x("Failed to update profile","error")}finally{s.disabled=!1,s.querySelector(".btn-text").classList.remove("hidden"),s.querySelector(".btn-loading").classList.add("hidden")}}),document.getElementById("password-form").addEventListener("submit",async r=>{r.preventDefault();const s=document.getElementById("current-password").value,i=document.getElementById("new-password").value,n=document.getElementById("confirm-new-password").value;if(!s||!i||!n){x("Please fill in all password fields","error");return}if(i.length<8){x("New password must be at least 8 characters","error");return}if(i!==n){x("New passwords do not match","error");return}const a=r.target.querySelector(".btn-primary");a.disabled=!0,a.querySelector(".btn-text").classList.add("hidden"),a.querySelector(".btn-loading").classList.remove("hidden");try{const{error:o}=await E.auth.signInWithPassword({email:t.email,password:s});if(o){x("Current password is incorrect","error");return}const{error:l}=await E.auth.updateUser({password:i});l?x(l.message,"error"):(x("Password updated successfully!","success"),document.getElementById("password-form").reset())}catch{x("Failed to update password","error")}finally{a.disabled=!1,a.querySelector(".btn-text").classList.remove("hidden"),a.querySelector(".btn-loading").classList.add("hidden")}}),window.handleThemeToggle=()=>{const r=Gr(),s=document.querySelector(".toggle-btn");r==="dark"?s==null||s.classList.add("active"):s==null||s.classList.remove("active")},window.handleLogout=async()=>{await E.auth.signOut(),x("Logged out successfully","success"),$.navigate("/")}}function Ma(t){return new Date(t).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}const $={routes:{"/":br,"/login":ta,"/register":ia,"/dashboard":ha,"/search":ba,"/profile":Sa,"/messages":Ca,"/settings":Ba},protectedRoutes:["/dashboard","/search","/profile","/messages","/settings"],navigate(t,e=!0){e&&history.pushState({},"",t),this.handleRoute()},async handleRoute(){const t=window.location.pathname,e=window.location.hash.slice(1),r=this.routes[t]||br,s=await qa();if(this.protectedRoutes.includes(t)&&!s){this.navigate("/login",!1);return}if((t==="/login"||t==="/register")&&s){this.navigate("/dashboard",!1);return}const i=document.getElementById("app");typeof window.cleanupCurrentPage=="function"&&window.cleanupCurrentPage(),window.cleanupCurrentPage=null,i.innerHTML="",i.className="page-enter",e&&typeof r=="function"?await r(e):await r()}};let ne=null,$e=null;function qa(){return ne}function te(){return $e}async function Me(){if(!ne)return null;const{data:t,error:e}=await E.from("profiles").select("*").eq("id",ne.id).maybeSingle();return e||($e=t?{...t,email:ne.email||""}:null),$e}async function za(){const{data:{session:t}}=await E.auth.getSession();ne=(t==null?void 0:t.user)||null,ne&&await Me(),E.auth.onAuthStateChange((e,r)=>{(async()=>(ne=(r==null?void 0:r.user)||null,e!=="TOKEN_REFRESHED"&&(ne?await Me():$e=null,e!=="INITIAL_SESSION"&&$.handleRoute())))()})}async function Ha(){await za(),window.addEventListener("popstate",()=>$.handleRoute()),$.handleRoute()}Ha();
