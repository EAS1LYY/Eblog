<template>
  <div style="width: 100%;min-height: 100vh">
    <waterFall :items="pictureList" :column-width="200" :gutter="100" />
  </div>
  </template>
  
  <script >
  import waterFall from '../components/waterFall'
  export default {
    components:{waterFall},
    data(){
    return{
      pictureList:[
        {alt:'2024-05-04',src:'1.jpg'},
        {alt:'2024-05-04',src:'2.jpg'},
        {alt:'2024-03-23',src:'3.jpg'},
        {alt:'2024-03-23',src:'4.jpg'},
        {alt:'2024-03-23',src:'5.jpg'},
        {alt:'2024-03-23',src:'6.jpg'},
        {alt:'2024-03-23',src:'7.jpg'},
        {alt:'2024-03-23',src:'8.jpg'},
        {alt:'2024-03-23',src:'9.jpg'},
        {alt:'2024-03-23',src:'10.jpg'},
      ]
      }
    }
  }
  
  </script>
  
  <style scoped>
  
  </style>
  