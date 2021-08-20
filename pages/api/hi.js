
const { MongoClient } = require('mongodb');


export default async function handler(req, res){
    /// ====>
    const uri = process.env.LOCAL_MONGODB_URI;
    let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    
    client.connect(async err => {
        
        //db = await client.db("user-manager");
        
        /*
        db.collection('people').find( {"email": "email@me.com"} )

        .then((result) => {
            console.log("Data fetched successfully");
            res.send(result);
            client.close();
        })
       .catch((err) => {
            console.log(err);
            res.send("F");
            client.close();
        })
        
       if(err){
           console.log(err);
       }
        console.log("Connected to db");
        */
    });
     
    /// <====
    const isConnected = await client._eventsCount;
    res.status(200).json({name: "John Doe"});
    console.log(isConnected)
    
}