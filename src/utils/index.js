import { httpGet, httpFormPost, httpPost, $httpImgUpoad } from "@/service";

import deepCopy from "./deepCopy";

function install(Vue) {
  // 全局正则
  Vue.prototype.$reg = {
    phone: /^1[3-9]\d{9}$/,
    idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    // psd: /^[^\u4E00-\u9FA5\s]{8,20}$/,  // 匹配除去中文和空格外的任意字符(数字，字母，符号)
    // psd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/, // 必须包含大小写和数字
    // 8-20位，大小写字母数字特殊符号至少三种混合
    psd: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/,
    // 匹配数字，字母，符号（必须得两种以上组合）
    // psd: /(?!.*\s)(?!^[\u4E00-\u9FA5]+$)(?!^[a-zA-Z]+$)(?!^[\d]+$)(?!^[^\u4E00-\u9FA5a-zA-Z\d]+$)^.{8,20}$/,
    jobNumber: /^.+$/,
    positiveInteger: /^\d+$/, // 正整数
    percentage: /^(100|(([1-9]){1}[0-9]?|0?)((\.)([0-9]){1,2})?)$/,
    isExternal: /^(https?:|mailto:|tel:)/
  };

  // 数据请求
  Vue.prototype.$get = httpGet; // get请求
  Vue.prototype.$formPost = httpFormPost; // post请求
  Vue.prototype.$post = httpPost; // postJson请求
  Vue.prototype.$httpImgUpoad = $httpImgUpoad; // post请求

  // sessionStorage封装
  Vue.prototype.$session = {
    get(key) {
      return sessionStorage.getItem(key)
        ? JSON.parse(sessionStorage.getItem(key))
        : "";
    },
    set(key, val) {
      sessionStorage.setItem(key, JSON.stringify(val));
    },
    remove(key) {
      sessionStorage.removeItem(key);
    }
  };

  /**************
   * 全局directive
   **************/

  // 解决键盘挡住输入框指令
  Vue.directive("keyBoard", {
    inserted: function(el) {
      const oHeight = document.body.clientHeight;
      window.addEventListener(
        "resize",
        function() {
          if (oHeight > document.body.clientHeight) {
            // 键盘弹出
            el.scrollIntoView(false);
          }
        },
        false
      );
    }
  });

  // 进入页面input自动聚焦
  Vue.directive("focus", {
    inserted(el, { value }) {
      if (value) el.focus();
    }
  });

  /**************
   * 全局filter
   **************/

  // 价格过滤器 格式 ￥20.00
  Vue.filter("currency", value => {
    if (!value) return "￥0.00";
    return `${(value / 100).toFixed(2)}`;
  });

  // 价格过滤器 格式 20.00元
  Vue.filter("price", value => {
    if (!value) return "0.00";
    return `${(value / 100).toFixed(2)}`;
  });

  /*
   * 补零
   */
  //num是传入的数字, n是保留几位数
  Vue.filter("addZero", (num, n) => {
    return (Array(n).join(0) + num).slice(-n);
  });
  //传入大于n位数时,返回原数字
  Vue.filter("addZeroByJudge", (num, n) => {
    if (num < Math.pow(10, n - 1)) {
      return (Array(n).join(0) + num).slice(-n);
    } else {
      return num;
    }
  });

  // 时间过滤器
  Vue.filter("filterTime", (value, formatDefault = "YYYY/MM/DD hh:mm:ss") => {
    if (!value) return "";
    let date = new Date(value - 0);
    let format = formatDefault;
    if (/(Y+)/.test(format)) {
      format = format
        .replace(RegExp.$1, date.getFullYear() + "")
        .substr(4 - RegExp.$1.length);
    }
    let o = {
      "M+": date.getMonth() + 1,
      "D+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let key in o) {
      if (new RegExp(`(${key})`).test(format)) {
        let str = o[key] + "";
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
        );
      }
    }
    return format;
  });

  // 全局变量
  Vue.prototype.globalVar = {};

  // 全局方法

  Vue.prototype.$deepCopy = deepCopy;

  Vue.prototype.formatTime = (value, formatDefault = "YYYY/MM/DD hh:mm:ss") => {
    if (!value) return "";
    let date = new Date(value - 0);
    let format = formatDefault;
    if (/(Y+)/.test(format)) {
      format = format
        .replace(RegExp.$1, date.getFullYear() + "")
        .substr(4 - RegExp.$1.length);
    }
    let o = {
      "M+": date.getMonth() + 1,
      "D+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds()
    };
    for (let key in o) {
      if (new RegExp(`(${key})`).test(format)) {
        let str = o[key] + "";
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : ("00" + str).substr(str.length)
        );
      }
    }
    return format;
  };

  // 通知mathjax重新渲染
  Vue.prototype.refreshMaxJax = function(el) {
    if ("MathJax" in window) {
      MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX", "output/PreviewHTML"],
        tex2jax: {
          inlineMath: [["\\[", "\\]"]],
          displayMath: [["\\(", "\\)"]],
          processEscapes: false
        },
        "HTML-CSS": { availableFonts: ["TeX"] }
      });
      window.MathJax.Hub.Queue([
        "Typeset",
        window.MathJax.Hub,
        el
        // function() {
        //   $(el)
        //     .removeAttr("mathjax-content")
        //     .find("[mathjax-content]")
        //     .removeAttr("mathjax-content");
        // }
      ]);
    } else {
      console.error("refreshMaxJax：MathJax 未初始化");
      // $("[mathjax-content]").removeAttr("mathjax-content");
    }
  };
}

export default install;
