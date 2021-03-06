const { ADDRGETNETWORKPARAMS } = require("dns");
const { ServiceBroker } = require("moleculer");
const fetch = require("node-fetch");

// Create a ServiceBroker
const broker = new ServiceBroker();

// Define a service
broker.createService({
  name: "webhooks",
  actions: {
    async register(ctx) {
      obj = { targetURL: ctx.params.targetURL };

      var response = await fetch("http://localhost:3000/register", {
        method: "post",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      });

      return response.text();
    },

    async update(ctx) {
      obj = { id: ctx.params.id, newURL: ctx.params.newURL };

      var response = await fetch(
        "http://localhost:3000/update/" +
          ctx.params.id +
          "/" +
          ctx.params.newURL,
        {
          method: "put",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.text();
    },

    async list(ctx) {
      var response = await fetch("http://localhost:3000/list");
      var data = response.json();
      return data;
    },

    async trigger(ctx) {
      obj = { IPAddress: ctx.params.IPAddress };
      response = await fetch("http://localhost:3000/trigger/" + ctx.params.ip);

      return response.text();
    },

    async delete(ctx) {
      obj = { id: ctx.params.id };

      var response = await fetch(
        "http://localhost:3000/delete/" + ctx.params.id,
        {
          method: "delete",
          body: JSON.stringify(obj),
          headers: { "Content-Type": "application/json" },
        }
      );

      return response.text();
    },
  },
});

// Start the broker
broker
  .start()
  // Call the service
  .then(() =>
    broker.call("webhooks.register", {
      targetURL: "http://localhost:3000/trigger",
    })
  )
  .then((res) => console.log("Unique ID of targetURL", res))
  .catch((err) => console.error(`Error occured! ${err.message}`));

//Broker.start() for each service separately
broker
  .start()
  .then(() =>
    broker.call("webhooks.update", {
      id: "60f2aab3f5adb241408898c6",
      newURL: "http%3A%2F%2Flocalhost%3A3000%2Ftrigger",
    })
  )
  .then((res) => console.log("Status Update", res))
  .catch((err) => console.error(`Error occured! ${err.message}`));

broker
  .start()
  .then(() => broker.call("webhooks.list", {}))
  .then((res) => console.log("All URLs", res))
  .catch((err) => console.error(`Error occured! ${err.message}`));

broker
  .start()
  .then(() =>
    broker.call("webhooks.delete", { id: "60f2ac8ff5adb241408898d2" })
  )
  .then((res) => console.log("Status Delete", res))
  .catch((err) => console.error(`Error occured! ${err.message}`));

broker
  .start()
  .then(() => broker.call("webhooks.trigger", { ip: "123.123.123.123" }))
  .then((res) => console.log("Status Trigger", res))
  .catch((err) => console.error(`Error occured! ${err.message}`));
