<template>
    <div class="credit-ul">
    <p class="credit-p">{{cardTitle}}</p>
    <div class="credit-u">
        <viewer :images="greditData">
        <div class="credit-li" v-for="(item,index) in greditData" :key="item + index">
            <!-- {{        JSON.stringify(item)}} -->
            <img :src="item" alt="">
            <p v-if=" cardTitle === '身份证图片'">{{carNane[index]}}</p>
        </div>
    </viewer>
    </div>
    </div>     
</template>

<script>
export default {
  name: 'pictureArra',
//   components: { errorA, errorB }
  props: {
    greditData: {
        type: Array,
        required: true
    },
    cardTitle: {
        type: String,
        required: true
    }
  },
  watch: {
    greditData: function (){
        console.log(this.greditData)
    }
  },
  data(){
    return{
      carNane:[
          '身份证正面',
          '身份证反面',
          '驾驶证'
      ]  
    }        
  },
  created() {
    //   console.log('greditData',this.greditData)
  }
}
</script>

<style <style lang="scss" scoped>
.credit-ul {
    .credit-p {
        background-color: #00AFAA;
        color: white;
        padding: 10px;
        margin: 0;
    }
    .credit-u {
        padding-left: 20px;
        border: 1px solid #d8dce5;
        padding-bottom: 20px;
      .credit-li {
          display: inline-block;
          padding: 20px;
          background:rgba(255,255,255,1);
          box-shadow:0px 2px 6px 0px rgba(19,78,110,0.2);
          border-radius:5px;
          margin-top: 20px;
          margin-left: 20px;
          img{
              width: 200px;
              height: 300px;
          }
          p {
              text-align: center;
          }
      }
    }   
}
</style>
