<template>
    <div>
        <TopBar>
            <div slot="title">
            <router-link to="/"><button id="button">PhoneZone</button></router-link>    
            </div>
        </TopBar>
        <div id="SignInContainer">
             <h1>Sign In</h1>
        Firstname:
        <input  type = "text" class="signin" placeholder="Please enter your firstname" v-model="firstname">
        Lastname:
        <input  type = "text" class="signin" placeholder="Please enter your lastname" v-model="lastname">
        Username: 
        <input type = "text" class="signin" placeholder="Please enter your email address" v-model="username"/>
        Password: 
        <input class="signin" type="text" v-if="pwdType" v-model="password" placeholder="Enter your password"/>
        <input class="signin" type="password" placeholder="Enter your password" v-model="password" v-else />
        Confirm Your Password:
        <input class="signin" type="text" v-if="pwdType" v-model="cofirmPw" placeholder="Enter your password again"/>
        <input class="signin" type="password" placeholder="Enter your password again" v-model="cofirmPw" v-else />

        <button type="button" @click="userSignin">Sign in</button>
        <router-link to="/login">Already have account?</router-link>  
        </div>
        <img :src="seen ? seenImg : unseenImg" @click="changeType()" v-on:mouseover="hoverEye" v-on:mouseout="outEye" class="icon-eye" />
       
    </div>
</template>

<script>
import userDataService from "../services/userDataService"
import TopBar from "../components/TopBar"

    export default{
        name: "login_page",
        components: {
            TopBar
        },
        data(){
            return{
                username: "",
                password: "",
                cofirmPw:"",
                firstname: "",
                lastname: "",
                data: [],
                seen: "",
                unseenImg: require("../assets/see0.png"), 
                seenImg: require("../assets/see1.png"),   
                pwdType: false
            }
        },
        methods: {
          // change the view of eye symbol 
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
            async userSignin(){
                try{
                    let base64 = require("js-base64").Base64
                    if(this.password == "" || this.cofirmPw ==""){
                        alert("Password cannot be empty")
                    }
                    else if(this.password != this.cofirmPw){
                        alert("Two passwords entered are not same")
                    }else{
                      // insert signup info to the database
                        this.data = await userDataService.signInDetail(this.username, this.$md5(this.password), this.firstname,this.lastname)
                        if(this.data.data.checked){
                        this.$router.push({path: "/login"})  //back to the main page
                    }else{
                        alert(this.data.data.message);
                        }
                    }
                }
                catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<style scoped>
#button{
    font-size: 35px;
    color: black;
    background: white;
    position: absolute;
    top: -15px;
}

.input{
    height: 20px;
}

#SignInContainer{
    text-align: center; 
	background-color: #fff;
	border-radius: 20px;
	width: 300px;
	height: 350px;
	margin: auto;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
    display: grid;
    grid-template-rows: auto;
    grid-row-gap: 3px;
}

.signin{
    margin-top: 5px;
    height: 40px;
}

.icon-eye{
    height: 30px;
    width: 30px;
    position: absolute;
    left: 63%;
    top: 77%;
}
</style>