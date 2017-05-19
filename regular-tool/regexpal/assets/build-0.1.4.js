(function(){if(window.XRegExp)return;var i={RegExp:RegExp,exec:RegExp.prototype.exec,match:String.prototype.match,replace:String.prototype.replace};var m={extended:/(?:[^[#\s\\]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?)+|(\s*#[^\n\r\u2028\u2029]*\s*|\s+)([?*+]|{[0-9]+(?:,[0-9]*)?})?/g,singleLine:/(?:[^[\\.]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?)+|\./g,characterClass:/(?:[^\\[]+|\\(?:[\S\s]|$))+|\[\^?(]?)(?:[^\\\]]+|\\(?:[\S\s]|$))*]?/g,capturingGroup:/(?:[^[(\\]+|\\(?:[\S\s]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?|\((?=\?))+|(\()(?:<([$\w]+)>)?/g,namedBackreference:/(?:[^\\[]+|\\(?:[^k]|$)|\[\^?]?(?:[^\\\]]+|\\(?:[\S\s]|$))*]?|\\k(?!<[$\w]+>))+|\\k<([$\w]+)>([0-9]?)/g,replacementVariable:/(?:[^$]+|\$(?![1-9$&`']|{[$\w]+}))+|\$(?:([1-9]\d*|[$&`'])|{([$\w]+)})/g};XRegExp=function(d,e){e=e||"";if(e.indexOf("x")>-1){d=i.replace.call(d,m.extended,function(b,a,c){return a?(c||"(?:)"):b})}var f=false;if(e.indexOf("k")>-1){var j=[];d=i.replace.call(d,m.capturingGroup,function(b,a,c){if(a){if(c)f=true;j.push(c||null);return"("}else{return b}});if(f){d=i.replace.call(d,m.namedBackreference,function(b,a,c){var g=a?j.indexOf(a):-1;return g>-1?"\\"+(g+1)+(c?"(?:)"+c:""):b})}}d=i.replace.call(d,m.characterClass,function(b,a){return a?i.replace.call(b,"]","\\]"):b});if(e.indexOf("s")>-1){d=i.replace.call(d,m.singleLine,function(b){return b==="."?"[\\S\\s]":b})}var h=i.RegExp(d,i.replace.call(e,/[sxk]+/g,""));if(f)h._0=j;return h};RegExp.prototype.addFlags=function(b){b=(b||"")+(this.global?"g":"")+(this.ignoreCase?"i":"")+(this.multiline?"m":"");var a=new XRegExp(this.source,b);if(!a._0&&this._0)a._0=this._0.slice(0);return a};RegExp.prototype.exec=function(b){var a=i.exec.call(this,b);if(!(this._0&&a&&a.length>1))return a;for(var c=1;c<a.length;c++){var g=this._0[c-1];if(g)a[g]=a[c]}return a};String.prototype.match=function(b){if(!b._0||b.global)return i.match.call(this,b);return b.exec(this)};String.prototype.replace=function(f,j){if(!(f instanceof i.RegExp&&f._0))return i.replace.apply(this,arguments);if(typeof j==="function"){return i.replace.call(this,f,function(){arguments[0]=new String(arguments[0]);for(var b=0;b<f._0.length;b++){if(f._0[b])arguments[0][f._0[b]]=arguments[b+1]}return j.apply(window,arguments)})}else{return i.replace.call(this,f,function(){var e=arguments;return i.replace.call(j,m.replacementVariable,function(b,a,c){if(a){switch(a){case"$":return"$";case"&":return e[0];case"`":return e[e.length-1].slice(0,e[e.length-2]);case"'":return e[e.length-1].slice(e[e.length-2]+e[0].length);default:var g="";a=+a;while(a>f._0.length){g=a.split("").pop()+g;a=Math.floor(a/10)}return(a?e[a]:"$")+g}}else if(c){var d=f._0.indexOf(c);return d>-1?e[d+1]:b}else{return b}})})}}})();XRegExp.cache=function(b,a){var c="/"+b+"/"+(a||"");return XRegExp.cache[c]||(XRegExp.cache[c]=new XRegExp(b,a))};XRegExp.overrideNative=function(){RegExp=XRegExp};if(!Array.prototype.indexOf){Array.prototype.indexOf=function(b,a){var c=this.length;for(var g=(a<0)?Math.max(0,c+a):a||0;g<c;g++){if(this[g]===b)return g}return-1}}function $(b){if(b.nodeName)return b;if(typeof b==="string")return document.getElementById(b);return false};var trim=function(){var a=/^\s\s*/,c=/\s\s*$/;return function(b){return b.replace(a,"").replace(c,"")}}();function replaceHtml(b,a){var c=$(b);/*@cc_on c.innerHTML=a;return c;@*/var g=c.cloneNode(false);g.innerHTML=a;c.parentNode.replaceChild(g,c);return g};function replaceOuterHtml(b,a){b=replaceHtml(b,"");if(b.outerHTML){var c=b.id,g=b.className,d=b.nodeName;b.outerHTML="<"+d+" id=\""+c+"\" class=\""+g+"\">"+a+"</"+d+">";b=$(c)}else{b.innerHTML=a}return b};function getElementsByClassName(b,a,c){var g=($(c)||document).getElementsByTagName(a||"*"),d=[];for(var e=0;e<g.length;e++){if(hasClass(b,g[e]))d.push(g[e])}return d};function hasClass(b,a){return XRegExp.cache("(?:^|\\s)"+b+"(?:\\s|$)").test($(a).className)};function addClass(b,a){a=$(a);if(!hasClass(b,a)){a.className=trim(a.className+" "+b)}};function removeClass(b,a){a=$(a);a.className=trim(a.className.replace(XRegExp.cache("(?:^|\\s)"+b+"(?:\\s|$)","g")," "))};function toggleClass(b,a){if(hasClass(b,a)){removeClass(b,a)}else{addClass(b,a)}};function swapClass(b,a,c){removeClass(b,c);addClass(a,c)};function replaceSelection(b,a){if(b.setSelectionRange){var c=b.selectionStart,g=b.selectionEnd,d=(c+a.length);b.value=(b.value.substring(0,c)+a+b.value.substring(g));b.setSelectionRange(d,d)}else if(document.selection){var e=document.selection.createRange();e.text=a;e.select()}};function extend(b,a){for(var c in a)b[c]=a[c];return b};function purge(b){var a=b.attributes,c,g,d;if(a){g=a.length;for(c=0;c<g;c+=1){d=a[c].name;if(typeof b[d]==='function'){b[d]=null}}}a=b.childNodes;if(a){g=a.length;for(c=0;c<g;c+=1){purge(b.childNodes[c])}}};var isWebKit=navigator.userAgent.indexOf("WebKit")>-1,isIE/*@cc_on=true @*/,isIE6=isIE&&!window.XMLHttpRequest;var RegexPal={fields:{search:new SmartField("search"),input:new SmartField("input"),options:{flags:{g:$("flagG"),i:$("flagI"),m:$("flagM"),s:$("flagS")},highlightSyntax:$("highlightSyntax"),highlightMatches:$("highlightMatches"),invertMatches:$("invertMatches")}}};extend(RegexPal,function(){var d=RegexPal.fields,e=d.options;return{highlightMatches:function(){var g={matchPair:/`~\{((?:[^}]+|\}(?!~`))*)\}~`((?:[^`]+|`(?!~\{(?:[^}]+|\}(?!~`))*\}~`))*)(?:`~\{((?:[^}]+|\}(?!~`))*)\}~`)?/g,sansTrailingAlternator:/^(?:[^\\|]+|\\[\S\s]?|\|(?=[\S\s]))*/};return function(){var b=String(d.search.textbox.value),a=String(d.input.textbox.value);if(XRegExp.cache('<[bB] class="?err"?>').test(d.search.bg.innerHTML)||(!b.length&&!e.invertMatches.checked)||!e.highlightMatches.checked){d.input.clearBg();return}try{var c=new XRegExp(g.sansTrailingAlternator.exec(b)[0],(e.flags.g.checked?"g":"")+(e.flags.i.checked?"i":"")+(e.flags.m.checked?"m":"")+(e.flags.s.checked?"s":""))}catch(err){d.input.clearBg();return}if(e.invertMatches.checked){var output=("`~{"+a.replace(c,"}~`$&`~{")+"}~`").replace(XRegExp.cache("`~\\{\\}~`|\\}~``~\\{","g"),"")}else{var output=a.replace(c,"`~{$&}~`")}output=output.replace(XRegExp.cache("[<&>]","g"),"_").replace(g.matchPair,"<b>$1</b>$2<i>$3</i>");d.input.setBgHtml(output)}}(),highlightSearchSyntax:function(){if(e.highlightSyntax.checked){d.search.setBgHtml(parseRegex(d.search.textbox.value))}else{d.search.clearBg()}},permalink:function(){var b=(e.flags.i.checked?"i":"")+(e.flags.m.checked?"m":"")+(e.flags.s.checked?"s":""),a=encodeURIComponent(d.search.textbox.value),c=encodeURIComponent(d.input.textbox.value);location="./?flags="+b+"&regex="+a+"&input="+c}}}());var parseRegex=function(){var q={regexToken:/\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,characterClassParts:/^(<opening>\[\^?)(<contents>]?(?:[^\\\]]+|\\[\S\s]?)*)(<closing>]?)$/.addFlags("k"),characterClassToken:/[^\\-]+|-|\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)/g,quantifier:/^(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??$/},k={NONE:0,RANGE_HYPHEN:1,METACLASS:2,ALTERNATOR:3};function l(b){return'<b class="err">'+b+'</b>'};function r(b){if(b.length>1&&b.charAt(0)==="\\"){var a=b.slice(1);if(XRegExp.cache("^c[A-Za-z]$").test(a)){return"ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a.charAt(1).toUpperCase())+1}else if(XRegExp.cache("^(?:x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})$").test(a)){return parseInt(a.slice(1),16)}else if(XRegExp.cache("^(?:[0-3][0-7]{0,2}|[4-7][0-7]?)$").test(a)){return parseInt(a,8)}else if(a.length===1&&"cuxDdSsWw".indexOf(a)>-1){return false}else if(a.length===1){switch(a){case"b":return 8;case"f":return 12;case"n":return 10;case"r":return 13;case"t":return 9;case"v":return 11;default:return a.charCodeAt(0)}}}else if(b!=="\\"){return b.charCodeAt(0)}return false};function v(b){var a="",c=q.characterClassParts.exec(b),g=q.characterClassToken,d={rangeable:false,type:k.NONE},e,f;a+=c.closing?c.opening:l(c.opening);while(e=g.exec(c.contents)){f=e[0];if(f.charAt(0)==="\\"){if(XRegExp.cache("^\\\\[cux]$").test(f)){a+=l(f);d={rangeable:d.type!==k.RANGE_HYPHEN}}else if(XRegExp.cache("^\\\\[dsw]$","i").test(f)){a+="<b>"+f+"</b>";d={rangeable:d.type!==k.RANGE_HYPHEN,type:k.METACLASS}}else if(f==="\\"){a+=l(f)}else{a+="<b>"+f.replace(XRegExp.cache("[<&>]"),"_")+"</b>";d={rangeable:d.type!==k.RANGE_HYPHEN,charCode:r(f)}}}else if(f==="-"){if(d.rangeable){var j=g.lastIndex,h=g.exec(c.contents);if(h){var i=r(h[0]);if((i!==false&&d.charCode>i)||d.type===k.METACLASS||XRegExp.cache("^\\\\[dsw]$","i").test(h[0])){a+=l("-")}else{a+="<u>-</u>"}d={rangeable:false,type:k.RANGE_HYPHEN}}else{if(c.closing){a+="-"}else{a+="<u>-</u>";break}}g.lastIndex=j}else{a+="-";d={rangeable:d.type!==k.RANGE_HYPHEN}}}else{a+=f.replace(XRegExp.cache("[<&>]","g"),"_");d={rangeable:(f.length>1||d.type!==k.RANGE_HYPHEN),charCode:f.charCodeAt(f.length-1)}}}return a+c.closing};return function(a){var c="",g=0,d=0,e=[],f={quantifiable:false,type:k.NONE},j,h;function i(b){return'<b class="g'+d+'">'+b+'</b>'};while(j=q.regexToken.exec(a)){h=j[0];switch(h.charAt(0)){case"[":c+="<i>"+v(h)+"</i>";f={quantifiable:true};break;case"(":if(h.length===2){c+=l(h)}else{if(h.length===1)g++;d=d===5?1:d+1;e.push({index:c.length+14,opening:h});c+=i(h)}f={quantifiable:false};break;case")":if(!e.length){c+=l(")");f={quantifiable:false}}else{c+=i(")");f={quantifiable:!XRegExp.cache("^[=!]").test(e[e.length-1].opening.charAt(2)),style:"g"+d};d=d===1?5:d-1;e.pop()}break;case"\\":if(XRegExp.cache("^[1-9]").test(h.charAt(1))){var m="",n=+h.slice(1);while(n>g){m=XRegExp.cache("[0-9]$").exec(n)[0]+m;n=Math.floor(n/10)}if(n>0){c+="<b>\\"+n+"</b>"+m}else{var s=XRegExp.cache("^\\\\([0-3][0-7]{0,2}|[4-7][0-7]?|[89])([0-9]*)").exec(h);c+="<b>\\"+s[1]+"</b>"+s[2]}}else if(XRegExp.cache("^[0bBcdDfnrsStuvwWx]").test(h.charAt(1))){if(XRegExp.cache("^\\\\[cux]$").test(h)){c+=l(h);f={quantifiable:false};break}c+="<b>"+h+"</b>";if("bB".indexOf(h.charAt(1))>-1){f={quantifiable:false};break}}else if(h==="\\"){c+=l(h)}else{c+=h.replace(XRegExp.cache("[<&>]"),"_")}f={quantifiable:true};break;default:if(q.quantifier.test(h)){if(f.quantifiable){var o=XRegExp.cache("^\\{([0-9]+)(?:,([0-9]*))?").exec(h);if(o&&((o[1]>65535)||(o[2]&&((o[2]>65535)||(+o[1]>+o[2]))))){c+=l(h)}else{c+=(f.style?'<b class="'+f.style+'">':'<b>')+h+'</b>'}}else{c+=l(h)}f={quantifiable:false}}else if(h==="|"){if(f.type===k.NONE||(f.type===k.ALTERNATOR&&!e.length)){c+=l(h)}else{c+=e.length?i("|"):"<b>|</b>"}f={quantifiable:false,type:k.ALTERNATOR}}else if("^$".indexOf(h)>-1){c+="<b>"+h+"</b>";f={quantifiable:false}}else if(h==="."){c+="<b>.</b>";f={quantifiable:true}}else{c+=h.replace(XRegExp.cache("[<&>]","g"),"_");f={quantifiable:true}}}}var t=0;for(var p=0;p<e.length;p++){var u=e[p].index+t;c=(c.slice(0,u)+l(e[p].opening)+c.slice(u+e[p].opening.length));t+=l("").length}return c}}();function SmartField(a){a=$(a);var c=a.getElementsByTagName("textarea")[0],g=document.createElement("pre");c.id=a.id+"Text";g.id=a.id+"Bg";a.insertBefore(g,c);c.onkeydown=function(b){SmartField.prototype._3(b)};c.onkeyup=function(b){SmartField.prototype._4(b)};if(isIE)a.style.overflowX="hidden";if(c.spellcheck)c.spellcheck=false;if(isWebKit)c.style.marginLeft=0;this.field=a;this.textbox=c;this.bg=g};extend(SmartField.prototype,{setBgHtml:function(b){if(isIE)b=b.replace(XRegExp.cache("^\\r\\n"),"\r\n\r\n");this.bg=replaceOuterHtml(this.bg,b+"<br>&nbsp;");this.setDimensions()},clearBg:function(){this.setBgHtml(this.textbox.value.replace(XRegExp.cache("[<&>]","g"),"_"))},setDimensions:function(){this.textbox.style.width="";var b=this.textbox.scrollWidth,a=this.textbox.offsetWidth;this.textbox.style.width=(b===a?a-1:b+8)+"px";this.textbox.style.height=Math.max(this.bg.offsetHeight,this.field.offsetHeight-2)+"px"},_3:function(b){b=b||event;if(!this._5(b))return false;var a=b.srcElement||b.target;switch(a){case RegexPal.fields.search.textbox:setTimeout(function(){RegexPal.highlightSearchSyntax.call(RegexPal)},0);break}if(isWebKit&&a.selectionEnd===a.value.length){a.parentNode.scrollTop=a.scrollHeight}this._6(b)},_4:function(b){b=b||event;var a=b.srcElement||b.target;this._1=0;if(this._2){this._2=false;switch(a){case RegexPal.fields.search.textbox:case RegexPal.fields.input.textbox:RegexPal.highlightMatches();break}}},_6:function(b){var a=b.srcElement||b.target;this._1++;if(this._1>2){RegexPal.fields.input.clearBg();this._2=true}else{switch(a){case RegexPal.fields.search.textbox:case RegexPal.fields.input.textbox:setTimeout(function(){RegexPal.highlightMatches.call(RegexPal)},0);break}}},_5:function(b){var a=b.srcElement||b.target,c=RegexPal.fields;if(this._7.indexOf(b.keyCode)>-1)return false;if((b.keyCode===9)&&(a===c.input.textbox||(a===c.search.textbox&&!b.shiftKey))){if(a===c.input.textbox){if(b.shiftKey){c.search.textbox.focus()}else{replaceSelection(a,"\t");if(window.opera)setTimeout(function(){a.focus()},0)}}else{c.input.textbox.focus()}if(b.preventDefault)b.preventDefault();else b.returnValue=false}return true},_2:false,_1:0,_7:[16,17,18,19,20,27,33,34,35,36,37,38,39,40,44,45,112,113,114,115,116,117,118,119,120,121,122,123,144,145]});(function(){var a=RegexPal.fields,c=a.options;onresize=function(b){a.input.field.style.height=Math.max((window.innerHeight||document.documentElement.clientHeight)-210,60)+"px";a.search.setDimensions();a.input.setDimensions()};onresize();RegexPal.highlightSearchSyntax();RegexPal.highlightMatches();for(var g in c.flags){c.flags[g].onclick=RegexPal.highlightMatches}c.highlightSyntax.onclick=RegexPal.highlightSearchSyntax;c.highlightMatches.onclick=RegexPal.highlightMatches;c.invertMatches.onclick=RegexPal.highlightMatches;function d(b){return function(){b.clearBg();b.textbox.value="";b.textbox.onfocus=null}};if(a.search.textbox.value==="此处输入正则表达式"){a.search.textbox.onfocus=d(a.search)}if(a.input.textbox.value==="此处输入要匹配的文本"){a.input.textbox.onfocus=d(a.input)}var e=$("quickReferenceDropdown"),f=$("quickReference"),j=getElementsByClassName("pin","img",f)[0],h=getElementsByClassName("close","img",f)[0];e.onmouseover=function(b){removeClass("hidden",f);addClass("hover",this)};e.onmouseout=function(b){if(!hasClass("pinned",f)){addClass("hidden",f);removeClass("hover",this)}};f.onmouseover=function(b){e.onmouseover()};f.onmouseout=function(b){e.onmouseout()};j.onclick=function(b){this.src="./assets/"+(hasClass("pinned",f)?"pin":"pinned")+".gif";toggleClass("pinned",f)};h.onclick=function(b){swapClass("pinned","hidden",f);j.src="./assets/pin.gif"};if(isIE6){var i=$("optionsDropdown");i.onmouseenter=function(){addClass("hover",this)};i.onmouseleave=function(){removeClass("hover",this)};onunload=function(b){a.search.clearBg();a.input.clearBg();purge(document.body)}}})();