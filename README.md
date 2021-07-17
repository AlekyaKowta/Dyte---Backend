# Webhook Microservices

#### Problem Statement

The goal of the given problem statement was to create a webhooks microservice using [Moleculer](https://moleculer.services/) and [Express](https://expressjs.com/) 

## What is a Webhook?

Webhooks are user-defined HTTP callbacks that are triggered by some event in a web application. It helps in facilitating the intergration of different applications. They are used to make web applications communicate with each other when a certain event occurs.

## What are Microservices?

Microservices or Microservice Architecture is a method where small, self-contained modules are developed to ensure more flexibility to your code.

# How to Run the code:

1. Download, Install and Run MongoDB.

2. Clone the repository and start the server

   ```
   git clone https://github.com/AlekyaKowta/Dyte---Backend.git
   npm install
   cd src 
   node index.js
   ```

3. Start webhooks.js

   ```
   cd ..
   node webhooks.js
   ```

# About the Application

This application uses MongoDB.

The backend, created with Express has the following routes:

- Register - It accepts target URL as a parameter and creates a unique ID for each URL using uuid. The unique ID is returned back and the URL along with the UID is saved into the database using mongoose models
- Update - This accepts two parameters - the ID and a new URL. The update status is returned back. The function updates the new URL in place of the old one in the database.
- List - This lists all the targetURLs that are present in the database
- Delete - This takes an ID as a parameter and deletes the corresponding URL from the database. The delete status is returned.
- Trigger - This accepts an IP Address as the parameter. A function called getPosts is created to send an HTTP post request to all the URLs in the database using fetch. If a certain post request has failed, it will retry sending another post request to that URL. It returns the status of the post requests.

Webhooks:

Moleculer is a fast, modern and powerful microservices framework for Node.js. The "Service" represents a microservice in the framework.

We have created a service called "webhooks". The webhooks service has the following actions:

- Register
- Update
- List
- Delete
- Trigger

The ServiceBroker is called - this handles the action calls and forwards the events. It is the main component of the Molecular Framework. 

## Screenshots

#### Register

![image-20210717153322620](assets\image-20210717153322620.png)

The Unique ID of URL is returned

![image-20210717153421114](assets\image-20210717153421114.png)

#### Update

![image-20210717153936401](assets\image-20210717153936401.png)

The update status is returned

![image-20210717154003860](assets\image-20210717154003860.png)

#### List

![image-20210717154116609](assets\image-20210717154116609.png)

![image-20210717154152653](assets\image-20210717154152653.png)

#### Delete

The delete status is returned

![image-20210717154311709](assets\image-20210717154311709.png)

#### Trigger

The trigger status is returned

![image-20210717154405876](assets\image-20210717154405876.png)

