<template>
 <!-- managlisting   -- addlisting page -->
  <div id="addLis">
     <h1>Add listing</h1>
       <input type = "text" v-model="title" placeholder="enter product title"/><br>
       <input type = "text" v-model="price" placeholder="enter product price"><br>
       <input type = "text" v-model="brand" placeholder="enter product brand"><br>
        <input type = "text" placeholder= "enter image name" v-model="image"><br>
         <input type = "text" v-model="stock" placeholder="enter stock"><br>
         <br>

                   <!-- use element ui to request the data from backend URL -->
          <el-upload
                    class="upload"
                   
                    action="http://localhost:3000/api/upload"
                    :on-preview="handlePreview"
                    :on-success="uploadSucess"
                    single
                    :limit="1"
                    :on-exceed="handleExceed"
                     ref='upload'
                    list-type="picture">
                <el-button size="small" type="primary" >Upload</el-button>
                 
            </el-upload><br>
       
        
        <button class="add-button" type="button" @click="addPage">Add</button>

       
  </div>
</template>

<script>
import ProductDataService from "../services/ProductDataService"
  export default {
    data() {
      return {
        title:"", 
        price:'',
        brand:"",
        image:"",
        userid:"",
        stock:'',
                 
    }
  },

  methods:{
    /**
     * this function is used to implement addListing function in profile page
     */
    async addPage(){
      //use to determine if users enter contents
      if(this.title != "" && this.price != "" && this.brand != "" && this.stock != "" && this.image != ""){
        if(this.stock < 0){

          alert("invaild stock number");
          return;
        }
        let base64 = require("js-base64").Base64
        this.userid = this.$cookies.get('userid');
         this.userid = base64.decode(this.userid)
        
        // must get the data from backend first
        var response = await ProductDataService.addListing(this.title, this.price, this.brand, this.image, this.stock, this.userid)
        var res= response.data;
        
        if(res.status == "1"){
          alert(res.msg)    
        }else{

           alert("you have successfully added");
      

        }
      }else{
        alert("please fullfill all the infomation")

     }
    },

    handlePreview(file){
     console.log(file)
    },


    handleExceed(file){

      this.$message.warning(`only one file should be chosen`)
    },
       
    uploadSucess(response,file,fileList){
      console.log(response)
      let name = response.name;
      this.image = name;

        if(response.flag ==true){
         this.$message.warning(`uploaded success`)
         return;
         }
      }
      

  }
    
  }
</script>

<style>
.add-button{
      text-align: center; 
     position: relative;
     right: -140px;
     top: 0px;
     width:200px;
      margin-top: 5px;
       display: grid;
    grid-template-rows: auto;
    grid-row-gap: 5px;
}


.upload{
      text-align: center; 
     position: relative;
     right: -70px;
     top: -8px;
     width:300px;
      margin-top: 5px;
      /* margin-top: 5px;
    height: 40px;
    width:300px; */
     display: grid;
    grid-template-rows: auto;
    grid-row-gap: 5px;
 
}

#addList{
  text-align: center; 
	background-color: #fff;
	border-radius: 20px;
	width: 500px;
	height: 350px;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 5px;
}
</style>