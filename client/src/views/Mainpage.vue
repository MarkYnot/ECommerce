<template>
  <div>
    
    <!-- Navigation Bar area -->
    <TopBar>

      <div slot="title" @click="changeSearchTag(),changeItemState()">
        <button id="button">PhoneZone</button>
      </div>

      <div slot="login" v-if="!this.state">
        <router-link to="/login">
          <button>Log In</button>
        </router-link>
      </div>

      <div slot="signin" v-if="!this.state">
        <router-link to="/signin">
          <button>Sign In</button>
        </router-link>
      </div>

      <div slot="logout" v-if="this.state">
        <router-link to="/">
          <button @click="logout">Log out</button>
        </router-link>
      </div>

      <div slot="profile" v-if="this.state">
        <router-link to="/profile">
          <button id="profile">Hi,{{ this.firstname }}</button>
        </router-link>
      </div>

      <div slot= "button">
           <button @click="getResult(title)">Search</button>
      </div>

      <div slot= "textInput">
        <input type="text" placeholder="search here" v-model="title" id="inputBox"/>
      </div>

       <div slot="dropDownList">
           <select v-if="searchFlag" @change="getFilteredResult($event)" v-model="brand" class="dropDown">
             <option value="all" class="dropDown">All</option>
              <option v-for="(brandItems,index) in brandList" :key="index" v-bind:value="brandItems" class="dropDown">{{brandItems}}</option>
             
          </select>
        </div>

      <div slot="brand">
        <p v-if="searchFlag">Brand</p>
      </div>
                       
      <div slot="slider">
          <el-slider v-model='price' :min="13.33" :max="1000" @change="priceSorted" v-if="searchFlag"></el-slider>
      </div>

      <div slot="price">
        <p v-if="searchFlag">Price</p>
      </div>

            <div slot="cart" v-if="this.state">
        <router-link to="/cart">
          <button>Shopping Cart</button>
        </router-link>
      </div>

      <div slot="cart" v-if="!this.state">
        <router-link to="/login">
          <button>Shopping Cart</button>
        </router-link>
      </div>
    </TopBar>

    <!-- Switch to Search State -->
    <div class="container" v-if="searchFlag">
      <div class="accessory-result"> 
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li v-for="item in goodList">
                <div class="pic">
                  <a href="#"><img v-lazy="'/static/'+item.image" alt=""> </a>
                </div>
                <div class="main">
                  <div class="name">{{item.title}}</div>
                  <div class="price">{{item.price}}</div>
                  <button @click="getItemDetails(item.title), findItemQuantity(item.title), getSeller(item.seller), getReviewer(item.seller)">View Phone list</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Switch to Home State -->
    <div v-if="!itemState && !searchFlag">
      <div id="totalContainer">
      <div id="soldOut">
        <div>
          <h1>Sold out soon</h1>
        </div>
        <div v-for="(item,index) in lowStock" :key="index" :id="lowStockClassName(index)" class="stock">
          <p class="title">{{ item.title }}</p>
          <img :src="'/static/'+item.image" alt="" class="img1">
          <p class="price"> Price: {{ item.price }}$</p>
          <button @click="getItemDetails(item.title), findItemQuantity(item.title), getSeller(item.seller), getReviewer(item.reviews)">View Phone list</button>
        </div>
      </div>
      <div id="BestSell">
        <div>
          <h1>Best Sellers</h1>
        </div>
        <div v-for="(item,index) in bestSell" :key="index" :id="bestSellClassName(index)" class="sell">
          <p class="title">{{ item.sell.title }}</p>
          <img :src="'/static/'+item.sell.image" alt="" class="img2">
          <p class="rating">Average_Rating: {{ item.avg_rate }}</p>
          <button @click="getItemDetails(item.sell.title),findItemQuantity(item.sell.title), getSeller(item.sell.seller), getReviewer(item.sell.reviews)">View Phone list</button>
        </div>
      </div>
    </div>
    </div>

    <!-- Item State -->
    <div v-if="itemState && !searchFlag">
      <h1>ItemState</h1>
      <div id="page-wrap">
        <div id="img-wrap">
          <img :src="'/static/'+testItem.item.image">
        </div>
        <div class="item-details">
          <h3 id="title">Title: {{ this.testItem.item.title }}</h3>
          <h3 id="brand">Brand: {{ this.testItem.item.brand }}</h3>
          <h3 id="sell">Seller: {{ this.sellFirstName }} {{ this.sellLastName }}</h3>
          <h3 id="stock">Avaliable Stock: {{ this.testItem.item.stock }}</h3>
          <h3 id="price">Price: ${{ this.testItem.item.price }}</h3>
          <h3 id="review">Review: </h3>
          <div class="container vue">
            <div v-if="index < reviews.length" v-for="(commentIndex,index) in commentsToShow">
              <div>{{reviewName[index]}} says:</div>
                <i><div>Rating: {{reviews[index].rating}}</div></i>
                <i><span v-if="!readMoreActivated">Comment: {{reviews[index].comment.slice(0, 200)}} ...</span></i>
                <i><span v-if="readMoreActivated">Comment: {{reviews[index].comment}}</span></i>
                <!-- <button class="btn btn-success" @click="activateReadMore">
                  <span v-if="readMoreActivated">Read Less</span>
                  <span v-else>Read More</span>
                </button> -->
                <hr />
            </div>
            <div>
              <button @click="noMore()">Show More Reviews</button>
              <button @click="commentsToShow -= 3">Show Less Reviews</button>
              <button class="btn btn-success" @click="activateReadMore">
                  <span v-if="readMoreActivated">Read Less</span>
                  <span v-else>Read More</span>
                </button>
            </div>
          </div>
          <div class="alredy-added"> 
          <h3>Already Add:
          <input type="text" v-model="this.addedQuantity" v-bind:disabled="disabled"></input></h3>
          </div>
          <div slot="addto" v-if="!this.state">
            <router-link to="/login">
              <button id="add-to-cart">Add to Cart</button>
            </router-link>
          </div>
          <div slot="addto" v-if="this.state">
              <button id="add-to-cart" @click="addToCart()">Add to Cart</button>
         </div>
        </div>
      </div>
    </div>
    



</div>
    
</template>

<script>
import VueSlider from "vue-slider-component";
import './../assets/css/product.css'

// import component into mainpage
import TopBar from './../components/TopBar.vue';  //topBar
import ProductDataService from "../services/ProductDataService"; // product URL request
import userDataService from "../services/userDataService";  //user URL request

export default {
  name: "HomePageList",
  data() {
    return {

      lowStock: [],
      bestSell: [],
      goodList:[],
      title:"",
      brand:"",
      searchFlag:false,
      value:'',
      price:'',
      brandList: [],
      firstname: "",
      lastname: "",
      email: "",
      userid: "",
      state: false,
      itemState: false,
      testItem: [],
      values:[],
      cartItems:[],
      quantity: 0,
      addedQuantity: 0,
      disabled: true,
      i: 0,
      reviews: [],
      showmore: false,
      commentsToShow: 3,
      totalComments: 0,
      readMoreActivated: false,
      sellFirstName: "",
      sellLastName: "",
      commentIndex: 0,
      reviewName: [],

    };
  },
  components:{
      TopBar,
      VueSlider,
    },
  methods: {
    activateReadMore() {
      if(this.readMoreActivated == false) {
        this.readMoreActivated = true;
      } else {
        this.readMoreActivated = false;
      }
    },
    //get the best sell and last stock from backend
    async getHomeStateData() {
      try{
        let data = await ProductDataService.getBestAndStockPhone()
        this.lowStock = data.data.stock
        this.bestSell = data.data.sell
        console.log(this.lowStock)
      }catch(err){
        console.log(err);
      }
    },
    lowStockClassName(index){
      return `lowStock_item-${index}`
    },
    bestSellClassName(index){
      return `bestSell_item-${index}`
    },
    photoClassName(index){
      return `photo_item-${index}`
    },

    //get search result based on the searchbox input 
    async getResult(){
        if(this.title!=""){
          let res = await ProductDataService.search(this.title)//request to backend
          res = res.data
          if(res.status==0){
            this.goodList = res.result.list;

            if(res.result.count==0){ //if the result is null
              alert("Not match find, please try again");
              return;
            }
            this.searchFlag = true; //seach page is switch on
            this.brandList = [];
            for(const item of this.goodList){

            if(item.brand){
                var brand = item.brand
                if(!this.brandList.includes(brand)){
                  this.brandList.push(brand)  //all brand is rendered into the drop drow down list     
                  }
                }
              } 
            } 
          }else{
            alert("Search box could not be empty")
        }
      },
      //get the result when slider is moving
    priceSorted(){
      console.log(this.price)
      var sortPriceGoods= [];
      var allPrice = [];
      for(const item of this.goodList){

        allPrice.push(item.price);
        if(item.price > this.price){
           sortPriceGoods.push(item)
          
        }
      }

        if(sortPriceGoods ==null||sortPriceGoods.length==0 || (sortPriceGoods.length==1&&sortPriceGoods[0].length==0)){
            this.$confirm("not matched found,try again?","confirmation",{
      
              confirmButtonText:"confirm",
              cancelButtonText:"cancel",
              showClose: true,
              type:"warning",
            }).then(async function(){
               let res = await ProductDataService.search(this.title)
               res = res.data
               if(res.status==0){
                 this.goodList = res.result.list;
                 this.price = 0;
               }
            })
        }else{

              this.goodList = sortPriceGoods; 
        }
          
     
          //Min and Max is based on the minimum and maximum price of searched result
          //  this.values = [];
          //  var max = Math.max.apply(null, allPrice);
          //  var min = Math.min.apply(null, allPrice);
          //  this.values.push(max);
          //  this.values.push(min);
          //  console.log(this.values)
           
       
      
    },
     async getFilteredResult(e){
      if(e.target.value =="all"){ //if the option all is selected
        this.getResult();
      }else{
        var filterGoods = [];
       let res = await ProductDataService.search(this.title) // get the search result from backend again
          res = res.data
          if(res.status==0){
            this.goodList = res.result.list;
        for(const item of this.goodList){

            if(item.brand == e.target.value){
              filterGoods.push(item) //get the goods from selected brand
            }  
          }
          this.goodList = filterGoods;

          console.log(e.target.value)
          console.log(e)
        }

      }
    },
    changeSearchTag(){
      this.searchFlag = false;
    },
    logout(){
      let message = confirm("Do you want to log out right now")
      
      if(message){
        //empty all information
      this.firstname = ""
      this.lastname = ""
      this.email = ""
      this.userid = ""
      this.state = false
      //remove all cookies
      this.$cookies.remove("state") 
      this.$cookies.remove("firstname")
      this.$cookies.remove("lastname")
      this.$cookies.remove("userid")
      this.$cookies.remove("username")
      }
      
    },
    login(){
      let base64 = require("js-base64").Base64 //encode/decode snesitive information 
      //get encoded information form cookies
      this.state = this.$cookies.get("state");
      this.firstname = this.$cookies.get("firstname")
      this.lastname = this.$cookies.get("lastname")
      this.email = this.$cookies.get("username")
      this.userid = this.$cookies.get("userid")
      // if no information incookies, non-login state
      if(this.firstname == null && this.lastname == null && this.email == null && this.state == null &&this.userid == null){
          this.state = false
      }else{
        // decoded information from cookies
        this.firstname = base64.decode(this.firstname)
        this.lastname = base64.decode(this.lastname)
        this.email = base64.decode(this.email)
        this.userid = base64.decode(this.userid)
        this.state = this.$cookies.get("state");
      }
      
      
    },
    async getItemDetails(title) {
      this.itemState = true; //switch to the item page
      this.searchFlag = false;
      try{
        this.testItem = await ProductDataService.getItemDetail(title); //request the item detail infomation from backend
        this.testItem = this.testItem.data;
        this.reviews = this.testItem.item.reviews;
        // console.log("get item successfully");
        // console.log(this.testItem);
        console.log(this.testItem);
      }catch(err){
        console.log(err)
      }
    },
    changeItemState() {
      this.itemState = false; //switch off the item state
    },
    addToCart() {
      this.$prompt ('Please enter the quantity of this phone as you want:',
                    'Quantity Number',
                    {
                      confirmButtonText: 'confirm',
                      cancelButtonText: 'cancel',
                      inputErrorMessage: 'InPut could not be empty',
                      inputValidator: (value) => {
                        let re = /^[1-9]+[0-9]*]*$/;       
                        if(!value) {  //if no input in the propmpt window
                          return 'Input could not be empty';
                        }else if(!re.test(value)) { //if the number is not integer type 
                          return 'Plese enter valid quantity number';
                        }else if(value > this.testItem.item.stock) { // if the stock is 0
                          return 'The stock is not avalible';
                        } else if((this.addedQuantity + parseInt(value))> this.testItem.item.stock) { //  if afer added the curretninput then will exceed the total stock
                          return 'The stock is not avalible';
                        }
                    },
                    }).then(async({value}) => {
                      this.quantity = parseInt(value);
                      this.addedQuantity = this.addedQuantity + this.quantity;
                      console.log(this.firstname);
                      console.log(this.email);
                      console.log(this.userid);
                      console.log(this.testItem.item.title);
                      // sned the request with parameter to insert into the cartList
                      let res = await userDataService.addItemToUser(this.firstname, this.lastname,this.testItem.item.title, this.quantity); 
      
                    }) 
    },
    async findItemQuantity(title) {
      if (this.state) {
        let data = await userDataService.getCartList(this.firstname, this.lastname);
        console.log(data.data.cartlist);
        this.cartItems = data.data.cartlist;
        console.log("this cart now" + this.cartItems);
        console.log("lengthis " + this.cartItems.length);
        if(this.cartItems.length > 0) {
          for (let i = 0; i < this.cartItems.length; i++) {
            if (title == this.cartItems[i].title) {
              this.addedQuantity = this.cartItems[i].addQuantity;
            }
          }
        }
      }
    },
    getSeller(seller) {
        userDataService.getSellerName(seller)
        .then(response => {
          let res = response.data;
          this.sellFirstName = res.user[0].firstname;
          this.sellLastName = res.user[0].lastname;
        })
        .catch(e => {
          console.log(e);
        })
     
    },
    getReviewer(reviews) {
      for(let i = 0; i < reviews.length; i++) {
        userDataService.getSellerName(reviews[i].reviewer)
        .then(response => {
          let res = response.data;
          let FirstName = res.user[0].firstname;
          let LastName = res.user[0].lastname;
          let fullName = FirstName + " " +LastName;
          this.reviewName.push(fullName);
        })
        .catch(e => {
          console.log(e);
        })
      }

    },

    noMore(){

      if(this.commentsToShow > this.reviews.length){
           alert("no more reviews")
      }else{

        this.commentsToShow += 3;
      }

    }
  },
  mounted(){
    this.getHomeStateData(); //initial the homeState
    this.login(); // initial the login state
  }
};
</script>

<style>
  #inputBox{
    height: 50px;
    width: 147%;
  }

  #btn btn-success {
    height: 10px;
  }

  .dropDown{
    height: 50px;
    width:150%;
  }

  #button{
    font-size: 35px;
    color: black;
    background: white;
    position: absolute;
    top: -15px;
  }

  #profile{
    font-size: 17px;
    color: black;
    background: transparent;
    position: absolute;
    width: auto;
  text-decoration:underline;
  }


  .viewBtn{
  margin-bottom: 5px;
}

.title{
  border-bottom: 1px solid grey;
}

.price{
  border-top: 1px solid grey;
  padding-top: 7px;
  padding-bottom: 7px;
  font-size: 15px;
  border-bottom: 1px solid grey ;
}

.rating{
  border-top: 1px solid grey;
  font-size: 15px;
  padding-top: 7px;
  padding-bottom: 7px;
  border-bottom: 1px solid grey ;
}

#totalContainer {
  display: grid;
  grid-template-rows: 1;
  grid-template-columns: 40% 40%;
  grid-column-gap: 5%;
  max-width: 90%;
  margin-left: 10%;
  margin-top: 5%;
}

#soldOut {
  grid-row: 1;
  grid-column: 1;
  border: 1px solid black;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 5px;
}

#BestSell {
  grid-row: 1;
  grid-column: 2;
  border: 1px solid black;
  display: grid;
  grid-template-rows: auto;
  grid-row-gap: 5px;
}

.stock{
  border: 1px solid grey;
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  display: grid;
  grid-template-rows:auto;
  height: auto;
}

.sell{
  border: 1px solid grey;
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
  display: grid;
  grid-template-rows: auto;
  height: auto;
}

.img1{
  grid-row: 2;
  width: 50%;
  height: 55%;
}

.img2{
  grid-row: 2;
  width: 50%;
  height: 55%;
}
</style>
