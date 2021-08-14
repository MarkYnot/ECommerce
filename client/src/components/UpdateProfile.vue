<template>
  <div>
    <h1>User profit</h1>

    firstname:
    <input type = "text" v-model="firstname"><br>
    <br>

    lastname:
    <input type = "text" v-model="lastname"><br>
    <br>

    Email: 
    <input type = "text" v-model="username"><br>
  
    <button type="button" @click="updateInfo">Update</button>
        

  </div>
</template>

<script>
  import userDataService from "../services/userDataService"
  
  export default {
    data() {
      return {
        firstname: "",
        lastname: "",
        username: "",
        password:"",
        userid:""
      }
    },
    mounted(){
      this.userProfit();
    },
    methods: {
      // save use profile in cookies
      // before save, use base64 to keep content secure
      userProfit(){
        let base64 = require("js-base64").Base64
        this.firstname = this.$cookies.get('firstname');
        this.lastname = this.$cookies.get('lastname');
        this.username = this.$cookies.get('username');
        this.userid = this.$cookies.get('userid');
         this.firstname = base64.decode(this.firstname)
        this.lastname = base64.decode(this.lastname)
        this.username = base64.decode(this.username)
        this.userid = base64.decode(this.userid)
        this.profilePage = true;
      },

      updateInfo(){
      
        this.$prompt(
          'Please enter your passowrd first:', 
          'Password',
          {
              confirmButtonText: 'confirm',
              cancelButtonText: 'cancel',
              inputErrorMessage: 'InPut could not be empty',
              inputType: 'password',
              inputValidator: (value) => {       
                  if(!value) {
                      return 'Input could not be empty';
                  }
                  
              },
              }).then(async({value}) => {
               let base64 = require("js-base64").Base64
                this.password = value;
                this.password = this.$md5(this.password)
                this.userid = this.$cookies.get("userid")
                this.userid = base64.decode(this.userid)
                var result = await userDataService.LoginVerify(this.userid, this.password)
                let res = result.data
                console.log(res);
                      
                if(res.status == 0){
                  var  updatedResult = await userDataService.getUpdatedProfit(this.firstname, this.lastname, this.username,this.userid)
                   
                  let response = updatedResult.data.result;
                  this.firstname = base64.encode(this.firstname)
                  this.lastname = base64.encode(this.lastname)
                  this.username = base64.encode(this.username)
                  this.userid = base64.encode(this.userid)
                  
                  this.$cookies.set("firstname", this.firstname, "30min");
                  this.$cookies.set("lastname",this.lastname,"30min");
                  this.$cookies.set("username",this.username,"30min");
                  this.$cookies.set("state", true,"30min");
                  this.$cookies.set("userid", this.userid, "30min");
                  if(response.list.nModified ==1 ){
                        alert("successfully updated ")
                  this.firstname = base64.decode(this.firstname)
                  this.lastname = base64.decode(this.lastname)
                  this.username = base64.decode(this.username)
                  this.userid = base64.decode(this.userid)
                  }else{
                  this.firstname = base64.decode(this.firstname)
                  this.lastname = base64.decode(this.lastname)
                  this.username = base64.decode(this.username)
                  this.userid = base64.decode(this.userid)
                  }
                }else{
                  alert("password incorrect, please try again")
                  return;
                }
              })
            } 
        }
}
</script>

