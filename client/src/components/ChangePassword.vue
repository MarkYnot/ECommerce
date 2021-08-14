<template>
  <div>
    <!-- change password page -->
    <h1>Change Password</h1>
    Current password:
    <input class="signin" type="text" v-if="pwdType" v-model="currentPassword" placeholder="Enter your password"/>
    <input class="signin" type="password" placeholder="Enter your password" v-model="currentPassword" v-else /><br>
    <br>
    New Password: 
    <input class="signin" type="text" v-if="pwdType" v-model="newPassword" placeholder="Enter your password"/>
    <input class="signin" type="password" placeholder="Enter your password" v-model="newPassword" v-else /><br>
    <br> 
    <img :src="seen ? seenImg : unseenImg" @click="changeType()" v-on:mouseover="hoverEye" v-on:mouseout="outEye" class="icon-eye" />
    <button type="button" @click="passwordChange">Change</button>
  </div>
</template>
 
<script>
  import userDataService from "../services/userDataService"

  export default {
    data() {
      return {      
        username: "",
        password:"",
        
        newPassword:"",
        currentPassword:"",

        seen: "",
        unseenImg: require("../assets/see0.png"),  
        seenImg: require("../assets/see1.png"),   
        pwdType: false
      }
    },
  
    methods: {
      // the following three functions are used to switch eye picture
      // Also switch shown password type and unshown password type
      changeType: function() {
        this.seen = !this.seen;   
        this.pwdType = !this.pwdType;   
      },
      hoverEye: function(event) {
            this.seen = !this.seen;
      },
      outEye: function(event) {
            this.seen = !this.seen;
      },
      // this function is used to cahnge password.
      async passwordChange(){
       
       let confirmation = confirm("Changed confirmed?")
        if(confirmation){
      if(this.currentPassword != "" && this.newPassword != ""){
        let base64 = require("js-base64").Base64
        this.username = this.$cookies.get('username');
        this.username = base64.decode(this.username)
        this.password = this.currentPassword;

        //use md5 to save password
        // check the old password is correct
        var result = await userDataService.getLoginDetail(this.username, this.$md5(this.password));
        let res = result.data
        if(res.checked){
          // update password, put new password into database
          var changeResult = await userDataService.changePassword(this.username, this.$md5(this.newPassword));
          let response = changeResult.data;
          console.log(response)
          // display the message to reminder users
          if(response.result.list.nModified ==1){
              alert("successfully changed your password");
          }else{
              alert(response.message);
          }
        }else{
          alert("The old password is not correct, please try again")
        }
      }else{
        alert("The current password and new password could be empty")
      }
    }

      },
  }
};
</script>
 

<style>
.icon-eye{
    height: 30px;
    width: 30px;
    position: absolute;
    left: 38%;
    top: 48.5%;
}
</style>