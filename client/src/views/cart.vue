<template>


    <div v-if="cartItems.length > 0 && loginState">
        <BackButton></BackButton>
        <div id="page-wrap">
            <h1>Shopping Cart</h1>
            <div v-for="(item,index) in cartItems" :key="index">
                <div class="product-container">
                    <img class="product-image" v-lazy="'/static/'+item.image" alt="">
                    <div class="details-wrap">
                        <h3>{{ item.title }}</h3>
                        <p>${{ item.price }}</p>
                    </div>
                    <div class="edit-quantity">
                        <button class="edit-btn" @click="editCart('minus',item)">-</button>
                        <input class="edit-text" type="text" v-model="item.addQuantity">
                        <button class="edit-btn" @click="editCart('add',item)">+</button>
                    </div>
                    <button class="remove-from-cart" @click="removeItem(item.title)">Remove From Cart</button>
                </div>
            </div>
            <div class="price-text">
                <span class="total-price">Total Price: ${{computedPrice | currency('$') }}</span>
            </div>
            <div class="proceed-transaction">
                <button class="checkout-button" @click="clearStock()">Confirm The Transaction</button>
            </div>
        </div>
    </div>

    
    <div v-else-if="cartItems.length == 0">
    <BackButton></BackButton>
        <div id="page-wrap">
            <h1>Shopping Cart</h1>
            <p>You haven't added anything to your cart yet!</p>
        </div>
    </div>

    <div v-else-if="!loginState">

        <BackButton></BackButton>
        <div id="page-wrap">
            <h1>Shopping Cart</h1>
            <p>You are not logged in! Please log in your account!</p>
        </div>
    </div>

</template>


<script>
import BackButton from "./../components/BackButton.vue";
import userDataService from "../services/userDataService";
import ProductDataService from "../services/ProductDataService"; // product URL request



export default {
    inject: ['reload'],
    name: "cart",
    components: {
        BackButton
    },
    data() {
        return {
            email: "",
            firstname: "",
            lastname: "",
            cartItems: [],
            loginState: false,
        }
    },
    computed: {
        computedPrice () {
            let money = 0;
            this.cartItems.forEach( (item) => {
                money += parseFloat(item.price)*parseInt(item.addQuantity);
            })
            return money;
        }

    },
    methods: {

        getUserDetail() {
            let base64 = require("js-base64").Base64;
            this.firstname = this.$cookies.get("firstname");
            this.lastname = this.$cookies.get("lastname");
            this.email = this.$cookies.get("username");
            this.firstname = base64.decode(this.firstname);
            this.lastname = base64.decode(this.lastname);
            this.email = base64.decode(this.email);
            this.loginState = this.$cookies.get("state");

            // console.log(this.firstname);
            // console.log(this.email);
        },
        async getCartItems() {
            //get the user from the backend
            let data = await userDataService.getCartList(this.firstname, this.lastname);
            this.cartItems = data.data.cartlist;
        },

        async removeItem(productTitle) {

            console.log(productTitle);
            let res = await userDataService.deleteItem(this.firstname, this.lastname, productTitle);
            if (res.status =="0") {
                console.log("delete succ");
                this.getCartItems();
            }
            //this.$router.go(0);
            this.reload();
          
        },

        async editCart (flag, item) {

            let editNumber = item.addQuantity;
            let productTitle = item.title;
            if (flag == 'minus' && item.addQuantity >= 2) {
                editNumber--;
                //this.reload();
                let res = await userDataService.updateItemNumber(this.firstname, this.lastname, item.title, editNumber);
                if(res.status == "0") {
                    console.log("update succ");
                    this.getCartItems();
                }
            } else if (flag == 'add' && item.stock > item.addQuantity) {
                editNumber++;
                //this.reload();
                let res = await userDataService.updateItemNumber(this.firstname, this.lastname, item.title, editNumber);
                if(res.status == "0") {
                    console.log("update succ");
                    this.getCartItems();
                }
            } else if (flag == 'minus' && item.addQuantity == 1) {
                let res = await userDataService.deleteItem(this.firstname, this.lastname, productTitle);
                if (res.status =="0") {
                    console.log("delete succ");
                    this.getCartItems();
                }
                //this.$router.go(0);
                //this.reload();
                
            }

            this.reload();

        },
        changeState() {
            if(this.changeState == true) {
                this.changeState = false;
            } else {
                this.changeState = true;
            }
        },
        async clearStock() {
            let confirmation = confirm("Are you sure to confirm the transaction?");
            if (confirmation) {
                //clear the user cartlist and product number in the user data and product stock data
                for (let i = 0; i < this.cartItems.length; i++) {
                    let productTitle = this.cartItems[i].title;
                    let num = this.cartItems[i].addQuantity;
                    let stock = this.cartItems[i].stock;
                    console.log(productTitle);
                    if (num > stock) {
                        //ensure every item's stock is enoght to checkout
                        alert("please minus the quantity of"+productTitle);
                        return;
                    } else {
                        let after = stock - num;
                        let res = await ProductDataService.deleteProductNumber(productTitle, after);
                    }
                    let res = await userDataService.deleteItem(this.firstname, this.lastname, productTitle);

                }
                this.reload();
                this.$router.go(-1);

            }

        }


    },
    mounted() {
        this.getUserDetail();
        this.getCartItems();
    }

}
</script>


<style scoped>

  #page-wrap {
    margin: auto;
    max-width: 1020px;
    min-height: 100vh;
    
  }

  .total-price {
    font-weight: bold;
    font-size: 25px;
    margin-left: 75%;
  }

    .checkout-button {
        background-color: #f05d23;
        width: 35%;
        margin-top: 65px;
        margin-left: 30%;
  }

  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }


  .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

    .product-image {
    flex: 1;
    height: 100px;
    margin: auto;
    max-width: 100px;
  }

    .details-wrap {
    padding: 0 16px;
    flex: 3;
  }


    .remove-from-cart {
    flex: 1;
    margin: auto;
    max-width: 180px;
  }

  .edit-quantity {
      flex: 1;
      margin: auto;
  }

  .edit-btn {
    border-radius: 5px;
    font-size: 15px;
    padding: 6px;
  }

  .edit-text {
    max-width: 18px;
    font-size: 14px;
    margin-left: 1px;
    margin-right: 1px;
  }

   .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }

.select-ipt {
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;

}



</style>
