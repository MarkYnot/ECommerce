<template>
<div>
  <div class="NavBar">
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
       
        background-color="white"  
        text-color="black"
        active-text-color="#ffd04b">
        
        <el-menu-item index="1" @click="userProfit">
       
          <span slot="title">User profit</span>
        </el-menu-item>
        <el-menu-item index="2" @click="changePassword">
           <span slot="title">Change Password</span>
        </el-menu-item>
     
      <el-menu-item index="3" @click="manageList">
           <span slot="title">Manage Listing</span>
          </el-menu-item>
        </el-menu>
    
    </el-scrollbar>
      
        <router-link to="/">
          <button class ="button" @click="logout">Log out</button>
        </router-link>


        <backButton></backButton>

        
  </div>

     <!-- update profile page -->
    <div class="display-Window" v-if="profilePage">
        <UpdateProfile></UpdateProfile>
        </div> 

        <!-- change password page -->
        <div class="display-Window" v-if="passwordPage">
         <ChangePassword></ChangePassword>
        </div> 

        <!-- manage List page -->
      <div v-if="manageListPage">
         
          <button @click="addListingPage">Add</button>
        
          <div class="container">
             <div class="accessory-result"> 
               <div class="accessory-list-wrap">
                 <div class="accessory-list col-4">
                   <ul>
                      <li v-for="item in manageGoodList">
                        <div class="pic">
                      
                           <a href="#"><img v-lazy="'/static/'+item.image" alt=""> </a>
                       </div>
                              <div class="main">
                                  <div class="name">{{item.title}}</div>
                                   <div class="price">{{item.price}}</div>
                                    <div>
                        <a href="javascript:;"  class="ableButton" @click="changeAbled(item.title)" >Able</a>
                        <a href="javascript:;"  class="disableButton"  @click="changeDisabled(item.title)">Disabled</a>
                        <a href="javascript:;"  class="deleteButton" @click="deleteUserProduct(item.title)">delete</a>
                      </div>
                      
                            </div>
                     </li>
                   </ul>
                 </div>
               </div>
             </div>
           </div>  
        </div> 
        
         <!-- add page -->
         <div class="display-Window" v-if="addPage">
            <AddListing></AddListing>
         </div>

       <!-- vertical line to seperate the window -->
       <div class="verticalBar"></div>

</div>
</template>
 
<script>
import './../assets/css/product.css'
 import  backButton from "../components/BackButton.vue"
import productDataService from "../services/ProductDataService"
import UpdateProfile from '../components/UpdateProfile.vue'
import ChangePassword from "./../components/ChangePassword"
import AddListing from "./../components/AddListing"
export default {
  data() {
    return {
      manageGoodList:[],
      selectGoodList:[],
      userid: "",
      productid:"",
      profilePage: false,
      passwordPage: false,
      manageListPage: false,
      loginState: false,
      addPage: false               
    }
  },
  components: {  
    UpdateProfile,
    ChangePassword,
    AddListing,
     backButton
  },
  mounted(){
     this.userProfit();
     
  },
  
  methods: {
    userProfit(){
      this.profilePage = true;
      this.passwordPage = false;
      this.manageListPage = false;
      this.addPage = false;
    },

    changePassword(){

      this.profilePage = false;
      this.passwordPage = true;
      this.manageListPage = false;
      this.addPage = false;
    },

    logout(){
       this.$cookies.remove("firstname")
       this.$cookies.remove("lastname")
       this.$cookies.remove("username")
       this.$cookies.remove("state");
        this.$cookies.remove("userid");
       
    },


    async manageList(){
      this.profilePage = false;
      this.passwordPage = false;
      this.manageListPage = true;
      this.addPage = false;
      let base64 = require("js-base64").Base64
      this.userid = this.$cookies.get("userid")
      this.userid = base64.decode(this.userid)
      var result = await productDataService.getUserProducts(this.userid);
      
      var res = result.data;
       console.log(res)
      var productList = res.result.list;
     this.manageGoodList = productList;
    
     
},
   async changeAbled(title){
      var response = await productDataService.getItemDetail(title)
         this.selectGoodList = response.data
         if(this.selectGoodList.item.stock == 0){
           alert("the stock is 0, so it can only be unavailable")
             return;
         }else{
        this.productid = this.selectGoodList.item._id
        var abledResult = await productDataService.ableProduct(this.productid) 
        var response = abledResult.data
        if(response.result.list.nModified ==1){
                 alert("The product is availble now  and will show in the store")
            }
         }
    },
      async changeDisabled(title){
        var response = await productDataService.getItemDetail(title)
         this.selectGoodList = response.data
         this.productid = this.selectGoodList.item._id
         var disabledResult = await productDataService.disableProduct(this.productid)
          var response = disabledResult.data
            if(response.result.list.nModified ==1){
                 alert("The product is disabled and will not show in the store")
            }
           
      },

        addListingPage(){
             if(this.$cookies.get("firstname")){
             this.profilePage = false
             this.passwordPage = false
             this.manageListPage = false
             this.addPage = true
        }else{

              alert("please login first")
        }
          },

      async deleteUserProduct(title){

        let confirmation = confirm("Delete confirmed?")
        if(confirmation){
         var response = await productDataService.getItemDetail(title)
         this.selectGoodList = response.data
         this.productid = this.selectGoodList.item._id
         

        var deleteResult = await productDataService.deleteUserProduct(this.productid)
        var res = deleteResult.data
        if(res.result.list.deletedCount !== 0){
                 alert("Delete succuessful");
                 this.manageList();     
            }
              this.addPage = false;

        }else{

          return;
        }
      }
    }
}


</script>
 
<style>
.scrollbar-wrapper {
      height: 100%;
      overflow-x: hidden !important;
      overflow-y: hidden
}

.NavBar{
     
      position: relative;
      top:200px;
     width:15%;
     height:100%;
     float:left;
     padding:0 21px;
     line-height:0px;

}

.verticalBar {
        position: absolute; 
        left:153px;
        top:0.01px;
        width: 2px;
        height: 630px;
        background: grey;
        /* display: inline-block; */
        margin-top: 31px;
        vertical-align: top;
        margin-right: 29px;
        margin-left: 22px;
    }

.display-Window{
       position: relative;
       left:400px;
       top:200px;
       width: 100%;
       height: 100%;
 }

 .button{
    position: absolute;
    top:-60px;
    left:50px;

 }

 .deleteButton{
     position: relative;
     left:30px;
      top:4px;
      font: black;
 }


.ableButton{
     position: relative;
     left:0px;
      top:-90px;
      

}
 
.disableButton{
     position: relative;
     left:60px;
      top:-90px;

}
 



</style>

