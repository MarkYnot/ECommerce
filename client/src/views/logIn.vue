<template>
    <div>
        <TopBar>
        <div slot="title">
            <router-link to="/"><button id="button">PhoneZone</button></router-link>    
        </div>

        </TopBar>
<!--     login page -->
        <div  id="login">
        <h1>Login Page</h1> 
            <input type="text" placeholder="Enter your username(email)" v-model="username">
            <input type="text" v-if="pwdType" v-model="password" placeholder="Enter your password"/>
            <input type="password" placeholder="Enter your password" v-model="password" v-else />
            <button class="login" type="button" @click="userLogin">Log in</button>
            <router-link to="/signIn">Don't have account yet? Sign in Right now</router-link>
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
                data: [],
                seen: "",
                unseenImg: require("../assets/see0.png"),  
                seenImg: require("../assets/see1.png"),   
                pwdType: false
            }
        },
        methods: {
            changeType: function() {
            this.seen = !this.seen;   //change the view of eye symbol 
            this.pwdType = !this.pwdType;   
            },
            hoverEye: function(event) {
                this.seen = !this.seen;
            },
            outEye: function(event) {
                this.seen = !this.seen;
            },

        //request the user data from backend and use mp5 to secure the sensitive user infomation
            async userLogin(){
                if(this.password == "" || this.username == ""){
                    alert("Password and username cannot be empty")
                }else{
                    this.data = await userDataService.getLoginDetail(this.username, this.$md5(this.password))
                this.data = this.data.data
                let base64 = require("js-base64").Base64
                try{
                    if(this.data.checked){
                        let firstname = base64.encode(this.data.user[0].firstname)
                        let lastname = base64.encode(this.data.user[0].lastname)
                        let username = base64.encode(this.data.user[0].email)
                        let userid = base64.encode(this.data.user[0]._id)
                        this.$cookies.set("firstname", firstname, "30min"); //asve info into cookie with base64 encode to enhance the security. 
                        this.$cookies.set("lastname",lastname,"30min");
                        this.$cookies.set("state", true,"30min");
                        this.$cookies.set("username", username,"30min");
                        this.$cookies.set("userid", userid, "30min");
                        
                        this.$router.push({path: "/"})
                    }else{
                        alert(this.data.message)
                    }
                }catch(err){
                    console.log(err)
                }
                }
                
            }
        }
    }
</script>

<style scoped>
#login{
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
    grid-row-gap: 5px;
}

.login{
    margin-top: 5px;
}

.icon-eye{
    height: 30px;
    width: 30px;
    position: absolute;
    left: 63%;
    top: 48.5%;
}

#button{
    font-size: 35px;
    color: black;
    background: white;
    position: absolute;
    top: -15px;
  }
</style>