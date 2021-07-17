const { v4: uuidv4 } = require("uuid");
const express = require("express");
const Register = require("./models/Register");
const fetch = require("node-fetch");

require("./db/mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
  const UUID = uuidv4();
  const register = new Register({ targetURL: req.body.targetURL, UID: UUID });

  try {
    await register.save();
    res.send(UUID);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update with the MongoDB ID

app.put("/update/:id/:newURL", async (req, res) => {
  try {
    const update = await Register.findByIdAndUpdate(
      req.params.id,
      { targetURL: req.params.newURL },
      { new: true, runValidators: true }
    );

    if (!update) {
      return res.status(404).send("Couldn't update");
    }
    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send(e);
  }
});

//Update with the unique ID returned

app.put("/updatewUID/:id/:newURL", async (req, res) => {
  try {
    const update = await Register.findOneAndUpdate(
      { UID: req.params.id },
      { targetURL: req.params.newURL }
    );

    if (!update) {
      return res.status(404).send("Couldn't update");
    }
    res.status(200).send("Success!");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/list", async (req, res) => {
  try {
    const urls = await Register.find({});
    res.send(urls);
    console.log(urls);
  } catch (e) {
    res.status(500).send();
  }
});

//Delete with the MongoDB ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const url = await Register.findByIdAndDelete(req.params.id);
    if (!url) {
      return res.status(404).send("Failed");
    }
    res.send("Successfully deleted");
    //res.send(url)
  } catch (e) {
    res.status(500).send();
  }
});

//Delete with the Unique ID returned
app.delete("/deletewUID/:id", async (req, res) => {
  try {
    const url = await Register.findOneAndDelete({ UID: req.params.id });
    if (!url) {
      return res.status(404).send("Failed");
    }
    res.send("Successfully deleted");
    //res.send(url)
  } catch (e) {
    res.status(500).send();
  }
});

app.get("/trigger/:ipAddress", async (req, res) => {
  try {
    const urls = await Register.find({});
    //console.log(urls)
    var targetURLS = urls.map(({ targetURL }) => targetURL);
    console.log(targetURLS);
    //res.send(targetURLS);

    async function getPosts(count) {
      if (count <= 5) {
        let array = [];
        const body = { IPAddress: req.params.ipAddress, timestamp: Date.now() };
        for (let i = 0; i < targetURLS.length; i++) {
          console.log("fetching", targetURLS[i]);
          try {
            let p1 = await fetch(targetURLS[i], {
              method: "post",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            });
            let p2 = await p1.text();

            array.push(p2);
            console.log("adding", p2);
          } catch (e) {
            getPosts(count + 1);
            console.error(e.message);
          }
        }
        console.log("length", array.length);
      }
    }

    getPosts(0).then(() => {
      console.log("done");
    });

    res.send("Done");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post("/trigger/", async (req, res) => {
  res.send(req.body.IPAddress);
});

app.listen(port, () => {
  console.log("Server listening to port " + port);
});
