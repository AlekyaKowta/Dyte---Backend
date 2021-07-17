const { v4: uuidv4 } = require("uuid");
const express = require("express");
const Register = require("./models/Register");
const fetch = require("node-fetch")

require("./db/mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/register", async (req, res) => {
  const UUID = uuidv4();
  //const register = new Register(req.body) //{targetUrl: , UID: }
  const register = new Register({ targetURL: req.body.targetURL, UID: UUID });

  //res.send(UUID)

  //const ID = Register.find({targetURL:req.body})
  try {
    await register.save();
    res.send(UUID);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.put("/update/:id/:newURL", async (req, res) => {
  //res.send(req.params)

  try {
    //   const update =  await User.findByIdAndUpdate(req.params.id, req.body, {new : true, runValidators:true} )
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
    //var targetURLS = urls.map(({ targetURL }) => targetURL)
    //console.log(targetURLS)
  } catch (e) {
    res.status(500).send();
  }
});

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

// app.get("/trigger/:ipAddress", async (req, res) => {
//   try {
//     const urls = await Register.find({});
//     //console.log(urls)
//     var targetURLS = urls.map(({ targetURL }) => targetURL);
//     console.log(targetURLS);
//     res.send(targetURLS);

//     let array = new Array();
//     const body = { IPAddress: req.params.ipAddress, timestamp: Date.now() };
//     function get(targetURLS) {
//       return new Promise((resolve, reject) => {
//         fetch(targetURLS, {
//           method: "post",
//           body: JSON.stringify(body),
//           headers: { "Content-Type": "application/json" },
//         })
//           //.then((res) => res.json())
//           .then((res) => {
//             return res.text();
//           })

//           .catch((err) => {
//             reject(err);
//           });
//       });
//     }

//     async function result() {
//       for (let i = 0; i < targetURLS.length; i++) {
//         const value = await get(targetURLS[i]);
//         array.push(value);
//       }
//       console.log(array.length);
//     }

//     result();

//     // const body = { IPAddress: req.params.ipAddress, timestamp: Date.now() };

//     // for (var i = 0; i < targetURLS.length; i++) {
//     //   //httpPost(targetURL[i], 0, req)
//     //   fetch(targetURLS[i], {
//     //     method: "post",
//     //     body: JSON.stringify(body),
//     //     headers: { "Content-Type": "application/json" },
//     //   })
//     //     .then((response) => response.json())
//     //     .then((response) => console.log(response))

//     //     .catch((e) => console.log);
//     // }

//     //res.send("Done")
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });

app.get("/trigger/:ipAddress", async (req, res) => {
    try {
      const urls = await Register.find({});
      //console.log(urls)
      var targetURLS = urls.map(({ targetURL }) => targetURL);
      console.log(targetURLS);
      res.send(targetURLS);

      async function getPosts(){
        let array = [];
        const body = { IPAddress: req.params.ipAddress, timestamp: Date.now() };
        for (let i = 0; i < targetURLS.length; i++)   {
          console.log('fetching',targetURLS[i]);
          try {
            let p1 = await fetch(targetURLS[i], {
                        method: "post",
                        body: JSON.stringify(body),
                        headers: { "Content-Type": "application/json" },
                      });
            let p2 = await p1.text();
            
            array.push(p2);
            console.log('adding',p2);
          }
          catch (e) {
            console.error(e.message);
          }
        };
        console.log ('length',array.length);
      };
      
      getPosts().then(()=>{console.log('done')});
    }
    catch (e) {
      res.status(400).send(e);
    }
  });

app.post("/trigger/", async (req, res) => {
  res.send(req.body.IPAddress);
});

app.listen(port, () => {
  console.log("Server listening to port " + port);
});

//Max 5 retries
// function httpPost(targetURL, count, req){
//     const body = { IPAddress: req.params.ipAddress, timestamp: Date.now() };
//     if (count<=5){
//         fetch(targetURL, {
//             method: "post",
//             body: JSON.stringify(body),
//             headers: {"Content-Type": "application/json"},
//         })
//         .then(data => console.log("Success ", data))
//         .catch((e)=>{
//             console.log(e)
//                 httpPost(targetURL, count+1)
//         })
//     }
//  }
