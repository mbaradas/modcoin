//A simple Blockchain Product
//Reference: https://youtu.be/zVqczFZr124
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
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "01/01/2020", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
modCoin.addBlock(new Block(1, "02/04/2020", { amount: 4 }));
modCoin.addBlock(new Block(1, "03/04/2020", { amount: 10 }));

//print this blockhain
console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
console.log('Is blockchain valid? ' + modCoin.isChainValid());

//modify a block in the blockchain
modCoin.chain[1].data = { amount: 100 };
console.log('Now Block 1 data has been modfied.')

//print this blockhain
console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
console.log('Is blockchain valid? ' + modCoin.isChainValid());

//modify a block in the blockchain again
modCoin.chain[1].data = { amount: 200 };
console.log('Block 1 data is modified again.')

//also re-calculate the hash
modCoin.chain[1].hash = modCoin.chain[1].calculateHash();
console.log('And Block 1 hash is re-calculated.')

//print this blockhain
console.log(JSON.stringify(modCoin, null, 4));

//test if this blockhain is valid
console.log('Is blockchain valid? ' + modCoin.isChainValid());







