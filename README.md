# COMP5347 Assignment 2 - PhoneZone

The overview of this project is build an eCommerce web application which name is PhoneZone. For this web application, the user can check all the information of phone products which stored in the database and also supported sign-in/sign-up, checkout, manage profiles all relevant operations.

## Description

In terms of using the PhoneZone web application, firstly the user have to register an account and then they can use the registered account to log in. With the correct email and password, they can use the fully functions of the application like shopping operations and managing user account operations. Without logged in, they can only view the item details as well as best seller, sold out soon, stock and review information. After logging in, they can add phone products to their own shopping cart list and manage their shopping cart such as delete, add and confirm transaction operations. As for the user page, it supports updating profile in the database, changing password and managing their own product list such as enabling/ disabling and remove the listing item.

## Getting Started

### Before you start, you have killed your 3000 and 8000 port

- npx kill-port 3000
- npx kill-port 8080

### Installing

- Database Initialisation

  - Create two databases 

    - One name is Product
      - Create products collection
    - One name is User
      - Create users collection

  - Import data

    - mongoimport --db Product --collection products --file path/phonelisting_demo.json --jsonArray
    - mongoimport --db User --collection users --file path/userlist_demo.json file --jsonArray
    
  - User Robot 3T update database
    - db.getCollection('products').update({"brand":"Samsung"},{$set:{"image":"Samung.jpeg"}},false,true)
    - db.getCollection('products').update({"brand":"Apple"},{$set:{"image":"Apple.jpeg"}},false,true)
    - db.getCollection('products').update({"brand":"Sony"},{$set:{"image":"Sony.jpeg"}},false,true)
    - db.getCollection('products').update({"brand":"Huawei"},{$set:{"image":"Huawei.jpeg"}},false,true)
    - db.getCollection('products').update({"brand":"Nokia"},{$set:{"image":"Nokia.jpeg"}},false,true)
    - db.getCollection('products').update({"brand":"LG"},{$set:{"image":"LG.jpeg"}},false,true)
    - example
      - ![image](https://github.sydney.edu.au/COMP5347-2021/WebDev_G8/blob/master/README%20image/example.png)

  - *Note: make sure your databases' name and collection name are same with the backend of the application

  - Configure files in MongoDB

    ![image](https://github.sydney.edu.au/COMP5347-2021/WebDev_G8/blob/master/README%20image/WechatIMG1772.png)

    *Note: if you have any questions, please check and review this link https://docs.mongodb.com/manual/reference/configuration-options/

- To install all needed dependencies
  - npm install

### Executing program

- For front end (client folder)
  - npm run serve
- For back end (server folder)
  - npm run serve
- Please note that if you would like to run the application, make sure you are in the client folder and server folder run these commands
- *Note: First run back end then run front end

### Warning(upload image)

- if an image is existing in the folder /client/public/static/
- the upload is not allowed and return to the user profit page 

### Authors

- Dairu Xiao 470052680
- Junjie Lin 510200093
- Mengjie Zhou 470169449

