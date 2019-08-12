<template>
  <div class="mathjax">
    <button @click="showMathJax">显示MathJax</button>
    <!-- <div ref="mathjax">{{ mathjax }}</div> -->
    <p ref="mathjax">When $$a \ne 0$$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$</p>
  </div>
</template>

<script>
const mjAPI = require("mathjax-node");
export default {
  name: "mathjax",
  data(){
    return {
      show: false,
      mathjax: 'When $$a \ne 0$$, there are two solutions to \(ax^2 + bx + c = 0\) and they are $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$'
    }
  },
  created() {
    console.log('mjAPI', mjAPI);
    // mjAPI.config({
    //   MathJax: {
    //     // traditional MathJax configuration
    //   }
    // });
    // mjAPI.start();

    // var yourMath = "E = mc^2";

    // mjAPI.typeset(
    //   {
    //     math: yourMath,
    //     format: "TeX", // or "inline-TeX", "MathML"
    //     mml: true // or svg:true, or html:true
    //   },
    //   function(data) {
    //     if (!data.errors) {
    //       console.log(data.mml);
    //     }
    //     // will produce:
    //     // <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
    //     //   <mi>E</mi>
    //     //   <mo>=</mo>
    //     //   <mi>m</mi>
    //     //   <msup>
    //     //     <mi>c</mi>
    //     //     <mn>2</mn>
    //     //   </msup>
    //     // </math>
    //   }
    // );
  },
  mounted(){
    this.refreshMaxJax(this.$refs.mathjax);
  },
  methods:{
    showMathJax(){
      this.show = true;
        this.refreshMaxJax(this.$refs.mathjax);
      this.$nextTick(() => {
      });
    },
  }
};
</script>
