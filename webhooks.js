const { ADDRGETNETWORKPARAMS } = require("dns");
const { ServiceBroker } = require("moleculer");
const fetch = require('node-fetch');

// Create a ServiceBroker
const broker = new ServiceBroker();

// Define a service
broker.createService({
    name: "webhooks",
    actions: {
        async register(ctx) {
            obj = {targetURL:ctx.params.targetURL}
           
                // fetch("http://localhost:3000/register", {
                //   method: "post",
                //   body: JSON.stringify(obj),
                //   headers: { "Content-Type": "application/json" },
                // })
                //   //.then((response) => response.json())
                //   .then((responseData) => {
                    
                //     return responseData;
                //   })
                //   .catch((error) => console.warn(error));

                var response = await fetch("http://localhost:3000/register", {
                    method: "post",
                    body: JSON.stringify(obj),
                    headers: { "Content-Type": "application/json" },
                  })
                  
                return response.text()

        },

        async update(ctx) {
            obj = {id: ctx.params.id, newURL:ctx.params.newURL}
            //BODY
            // fetch("http://localhost:3000/update/"+  ctx.params.id+ "/" +ctx.params.newURL, {
            //       method: "put",
            //       body: JSON.stringify(obj),
            //       headers: { "Content-Type": "application/json" },
            //     })
                  
            //       .then((responseData) => {
                    
            //         return responseData;
            //       })
            //       .catch((error) => console.warn(error));

            var response = await fetch("http://localhost:3000/update/"+  ctx.params.id+ "/" +ctx.params.newURL, {
                method: "put",
                body: JSON.stringify(obj),
                headers: { "Content-Type": "application/json" },
              })

            return response.text()
        },

       async list(ctx) {
            // fetch("http://localhost:3000/list")
            //       .then((response) => response.json())
            //       .then((responseData) => {
                    
            //         return responseData;
            //       })
            //       .catch((error) => console.warn(error));

            var response = await fetch("http://localhost:3000/list")
            var data = response.json()
            return data
            
        },

        trigger(ctx) {
            return Number(ctx.params.a) + Number(ctx.params.b);
        },

        async delete(ctx){

            obj = {id: ctx.params.id}
            // fetch("http://localhost:3000/delete/"+ ctx.params.id, {
            //       method: "delete",
            //       body: JSON.stringify(obj),
            //       headers: { "Content-Type": "application/json" },
            //     })
                  
            //       .then((responseData) => {
                    
            //         return responseData;
            //       })
            //       .catch((error) => console.warn(error));

            var response = await fetch("http://localhost:3000/delete/"+ ctx.params.id, {
                method: "delete",
                body: JSON.stringify(obj),
                headers: { "Content-Type": "application/json" },
              })

              return response.text()

        },
    }
});

// Start the broker
broker.start()
    // Call the service
    // .then(() => broker.call("math.add", { a: 5, b: 3 }))
    // // Print the response
    // .then(res => console.log("5 + 3 =", res))
    // .catch(err => console.error(`Error occured! ${err.message}`));
    .then(() => broker.call("webhooks.register", {targetURL:"https://github.com"}))
    .then(res => console.log("Unique ID of targetURL", res))
    .catch(err => console.error(`Error occured! ${err.message}`));

    //Broker.start() for each service separately 
broker.start()
    .then(() => broker.call("webhooks.update", {id:"60f14ef528cc1e2548e05658", newURL:"https%3A%2F%2Famazon.com"}))
    .then(res => console.log("Status Update", res))
    .catch(err => console.error(`Error occured! ${err.message}`));

broker.start()
    .then(() => broker.call("webhooks.list", {}))
    .then(res => console.log("All URLs", res))
    .catch(err => console.error(`Error occured! ${err.message}`));

broker.start()
    .then(()=>broker.call("webhooks.delete", {id: "60f14e8228cc1e2548e05654"}))
    .then(res => console.log("Status Delete", res))
    .catch(err => console.error(`Error occured! ${err.message}`));
