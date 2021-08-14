<template>
    <div id="top-bar">
        <!-- use slot to connect mainpage and topbar-->
        <div id="products-link">
           <slot name="title"></slot>
         </div>
         
         <div id="search-link">
           <slot name="button"></slot>
         </div>
        
        <div id="search-input"> 
          <slot name="textInput"></slot>
        </div>

        <div id="brandList">
         <slot name="dropDownList"></slot>
        </div> 

        <div id="brand">
          <slot name="brand"></slot>
        </div>

        <div id="range-slider">
          <slot name="slider"></slot>
        </div>  

        <div id="price">
          <slot name="price"></slot>
        </div>

        <div class="login-link">
          <slot name="login"></slot>
        </div>

        <div class="signin-link">
          <slot name="signin"></slot>
        </div>

        <div class="login-link">
          <slot name="logout"></slot>
        </div>

        <div class="profile">
           <slot name="profile"></slot>  
        </div>      
        
        <div class="cart-link">
          <slot name="cart"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
}
</script>


<style scoped>
  #top-bar {
    border-bottom: 1px solid #ddd;
    height: 75px;
    width: 100%;
  }

  #products-link {
    text-align: center;
    display: block;
    color: black;
    font-size: 22px;
    left: 32px;
    position: absolute;
    top: 16px;
    text-decoration: none;
  }

  #products-link h1 {
      margin: 0;
  }

  .login-link {
    position: absolute;
    left: 81%;
  }


  .signin-link {
    position: absolute;
    left: 75%;
  }

  .cart-link {
    position: absolute;
    left: 87%;
  }

  #cart-link {
    position: absolute;
    left: 87%;
  }

  #search-link {
    position: absolute;
    left: 68.5%;
  }

  #search-input {
    position: absolute;
    left: 52.5%;
    height: 10px;
  }

  #brandList{
    position: absolute;
    left: 36.5%;
    height: 10px;
  }

   #range-slider{
    position: absolute;
    left: 20.5%;
    height: 10px;
    width: 10%;
    top: 3%;
  }

  #price{
    position: absolute;
    left: 31%;
    top: 2.3%;
  }

  #brand{
    position: absolute;
    left: 46%;
  }

  .profile{
    position: absolute;
    left: 90%;
    top: 10%;
    width: auto;
  }
</style>
