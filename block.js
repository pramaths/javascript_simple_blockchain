class block{
    constructor(){
        this.index=0;
        this.previoushash=""
        this.hash=""
        this.nonce=0
        this.transaction=[]
    }
    get key(){
        return JSON.stringify(this.transaction)+this.index+this.previoushash+this.nonce
    }
    addtransaction(transaction){
        this.transaction.push(transaction)
    } 
}
module.exports=block