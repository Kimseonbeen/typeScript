// class Human {
//     public name: string;
//     public age : number;
//     public gender : string;
//     // constructor 메소드이고, 클래스가 시작할 때마다 호출된다.
//     // 클래스로부터 객체를 만들 때 마다
//     constructor(name: string, age:number, gender:string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
//     }
// }

// const lynn = new Human("Lynn", 18, "female");


// // interface는 js로 컨파일이 되지 않아, 대체 할수있는것이 class이다
// // interface Human {
// //     name : string,
// //     age : number,
// //     gender : string
// // }

// // const person = {
// //     name : "seobin",
// //     age : 240,
// //     gender : "male"
// // };

// // interface 적용 전
// // const sayHi = (name:string, age:number, gender:string): string => {
// //     return `Hello ${name}, you are ${age}, you are a ${gender}!`;
// // };

// // interface 적용 후
// // class 적용 후
// const sayHi = (person: Human): string => {
//     return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
// };

// console.log(sayHi(lynn));

import * as CryptoJS from "crypto-js";

class Block {
    static calculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    
    static validateStructure = (aBlock: Block) : boolean => 
    typeof aBlock.index === "number" && 
    typeof aBlock.hash === "string"  && 
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
    
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp
    }
}



const genesisBlock: Block = new Block(0, "2020220202", "","Hello", 12345);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string):Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
}

//console.log(createNewBlock("hello"), createNewBlock("bye bye"));

const getHashforBlock = (aBlock: Block) :string => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);

const isBlockValid = (candidateBlock: Block, previousBlock: Block) : boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false
    } else if(getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("second block")
createNewBlock("third block")
createNewBlock("fourth block")


console.log(blockchain);


export {};