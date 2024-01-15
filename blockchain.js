// const sha256=require("./js-sha256")
var sha256 = require('js-sha256')
const Block=require("./block")
class blockchian{
    constructor(genesisblock){
        this.blocks=[]
        this.addblock(genesisblock)
    }
    addblock(block){
        if(this.blocks.length==0){
            block.previoushash="0000000000000000"
            block.hash=this.generatehash(block)
        }
        this.blocks.push(block)
    }
    getnextblock(transactions){
        let block=new Block()
        transactions.forEach((transaction)=>{block.addtransaction(transaction)})
        let previousblock=this.getpreviousblock()
        block.index=this.blocks.length
        block.previoushash=previousblock.hash
        block.hash=this.generatehash(block)
        return block
    }
    getpreviousblock(){
        return this.blocks[this.blocks.length-1]
    }
    generatehash(block){
let hash=sha256(block.key)
while(!hash.startsWith("0000")){
    block.nonce+=1
    hash=sha256(block.key)
    console.log(hash)
}
return hash
    }
}
module.exports=blockchian