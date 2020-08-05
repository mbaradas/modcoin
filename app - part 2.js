//A simple Blockchain Product
//Reference: Creating a blockchain with Javascript (Blockchain, part 1)
//  https://youtu.be/zVqczFZr124
//Reference: Implementing Proof-of-Work in Javascript (Blockchain, part 2)
//  https://youtu.be/HneatE69814
//Pre-requisites: install crypto-js in Terminal
//  npm install --save crypto-js

const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data + this.nonce)).toString();
    }

    mineBlock(difficulty){
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;

    }
}

let modCoin = new Blockchain();

console.log('Mining block 1...');
modCoin.addBlock(new Block(1, "02/04/2020", { amount: 4 }));

console.log('Mining block 2...');
modCoin.addBlock(new Block(2, "03/04/2020", { amount: 10 }));

//print this blockhain
//console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
//console.log('Is blockchain valid? ' + modCoin.isChainValid());

//modify a block in the blockchain
//modCoin.chain[1].data = { amount: 100 };
//console.log('Now Block 1 data has been modfied.')

//print this blockhain
//console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
//console.log('Is blockchain valid? ' + modCoin.isChainValid());

//modify a block in the blockchain again
//modCoin.chain[1].data = { amount: 200 };
//console.log('Block 1 data is modified again.')

//also re-calculate the hash
//modCoin.chain[1].hash = modCoin.chain[1].calculateHash();
//console.log('And Block 1 hash is re-calculated.')

//print this blockhain
//console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
//console.log('Is blockchain valid? ' + modCoin.isChainValid());







