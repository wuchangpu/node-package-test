export const refreshMaxJax = function(el) {
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
    MathJax.Hub.Queue([
      "Typeset",
      MathJax.Hub,
      el,
      function() {
        // console.log('refresh callback')
        $(el)
          .removeAttr("mathjax-content")
          .find("[mathjax-content]")
          .removeAttr("mathjax-content"); // console.log('refreshed')
      }
    ]); // 通知mathjax重新渲染
  } else {
    console.error("common_refreshMathjax:MathJax 未初始化");
    $("[mathjax-content]").removeAttr("mathjax-content");
  }
};
/**
 * 通知mathjax重新渲染
 */
export const common_refreshMathjax = function(selector) {
  let vm = this; // IS_ENV_DEV && console.log('refreshMathjax', vm.$el)
  let el = selector ? vm.$$el.find(selector)[0] : vm.$el;
  refreshMaxJax(el);
};
