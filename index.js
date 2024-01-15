const express=require("express")
const fetch=require("node-fetch")

const app =express()
const arguments=process.argv
let PORT=8080;
if(arguments.length>2){
    PORT=arguments[2]
}
console.log(process.argv)

const Block=require("./block")
const Blockchain=require("./blockchain")
const Transaction = require("./transaction")
const Blockchainode=require("./blockchainnode");
const block = require("./block");
const { response } = require("express");
app.use(express.json())
let transactions=[]

let nodes=[]

let alltransaction=[]
let genesisblock=new Block()
let blockchain=new Blockchain(genesisblock)

app.get("/resolve",(req,res)=>{
 nodes.forEach(node=>{
    fetch(`${node.url}/blockchain`)
    .then(response=>response.json())
    .then(otherBlockchain=>{
if(blockchain.blocks.length<otherBlockchain.blocks.length){
    alltransaction.forEach(transaction=>{
        fetch(`${node.url}\transaction`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(transaction)
        }).then(response=>response.json())
        .then(_=>{
            fetch(`${node.url}/mine`)
            .then(response=>response.json())
            .then(_=>{
                fetch(`${node.url}/blockchian`)
                .then(response=>response.json())
                .then(updatedblockchain)
            })
            .then(updatedblockchain=>{
                blockchain=updatedblockchain})
            
        })
    })
}
else{
    res.json(blockchain)
}
    })
 })
})

app.post('/nodes/register',(req,res)=>{
    const urls=req.body
    urls.forEach(url=>{
        
        const node=new Blockchainode(url)
        nodes.push(node)
    
    })
    res.send(nodes)
})


app.post('/transactions',(req,res)=>{
    const to=req.body.to
    const from=req.body.from
    const amount=req.body.amount
    let transaction=new Transaction(from,to,amount)
    transactions.push(transaction)
    res.json(transactions)
})
app.get('/mine',(req,res)=>{
    let block=blockchain.getnextblock(transactions)
    blockchain.addblock(block)
    transactions.forEach(transaction=>{
        alltransaction.push(transaction)
    })
    transactions=[]
    res.json(block)
})


app.get('/blockchain',(req,res)=>{
//    // let transaction=new Transaction("PRAMATH","UDAY",100)

// let genesisblock=new Block()
// let blockchain=new Blockchain(genesisblock)
// let block=blockchain.getnextblock([transaction])
// blockchain.addblock(block)
// //let anotherTransaction=new Transaction("steven","brain",500)
// let block1=blockchain.getnextblock([anotherTransaction,transaction])
// blockchain.addblock(block1)
// res.json(blockchain)
res.json(blockchain)
})
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})
// const Block=require("./block")
// const Blockchain=require("./blockchain")
// const Transaction = require("./transaction")
// let transaction=new Transaction("PRAMATH","UDAY",100)

// let genesisblock=new Block()
// let blockchain=new Blockchain(genesisblock)
// let block=blockchain.getnextblock([transaction])
// blockchain.addblock(block)
// let anotherTransaction=new Transaction("steven","brain",500)
// let block1=blockchain.getnextblock([anotherTransaction,transaction])
// blockchain.addblock(block1)
// console.log(blockchain)