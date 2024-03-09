const os = require("os")
const fs = require("fs")

let directoryInstance: any
let DBInstance: any
let DBFilterInstance: any
let KeysInstance: any

// const ConfigPath = `${os.homedir()}\\Documents\\sorchin_debugging_utility_configs.json`;
const ConfigPath = `${process.cwd().split("\\").join("\\")}\\configs.json`;

class SingletonDirectory {
    address: any
    constructor() {
        if (directoryInstance) {
          throw new Error("You can only create one instance!");
        }
        directoryInstance = this;
    }
    
    get() {
        return this.address;
    }

    set(newAddress: string) {
        this.address = newAddress;
        return newAddress;
    }

}

class SingletonDB {
    db: any
    constructor() {
        if (DBInstance) {
          throw new Error("You can only create one instance!");
        }
        DBInstance = this;
    }
    
    get() {
        return this.db;
    }

    set(newDB: {}) {
        this.db = newDB;
        return newDB;
    }

}

class SingletonDBFilter {
    dbFilter: any
    constructor() {
        if (DBFilterInstance) {
          throw new Error("You can only create one instance!");
        }
        DBFilterInstance = this;
    }
    
    get() {
        return this.dbFilter;
    }

    set(newDB: []) {
        this.dbFilter = newDB;
        return newDB;
    }

}

class SingletonKeys {
    keys: any
    constructor() {
        if (KeysInstance) {
          throw new Error("You can only create one instance!");
        }
        KeysInstance = this;
    }

    private updateKeysJson(data: any) {
        try {
            fs.writeFile(ConfigPath, JSON.stringify(data, null, 4), function(err: any, result: any) {
                if(err) console.error("error");
            });
        } catch (err) {
            console.log(err)
        }
    }

    set(keys: []) {
        this.keys = keys;
        return keys;
    }
    
    get() {
        return this.keys;
    }

    add(key: string) {
        const findMaxId = this.keys.length ? this.keys.reduce((a: any, b: any) => a.id > b.id ? a : b).id : 0
        const newKeys = {
            id: findMaxId + 1,
            value: key,
            act: true
        }
        this.keys.push(newKeys)
        this.updateKeysJson(this.keys)
        return this.keys;
    }
    update(id: any) {
        const findKeyIndex = this.keys.findIndex((item: any) => item.id === id)
        if (findKeyIndex === -1) return;

        const newKeys = [...this.keys]
        newKeys[findKeyIndex].act = !newKeys[findKeyIndex].act;
        this.updateKeysJson(newKeys)
        return this.keys;
    }

    updateAll(status: boolean) {
        const newConfigs = [...this.keys];
        const negativeAct = newConfigs.map(item => { return {...item, act: status}});
        this.updateKeysJson(negativeAct)
        this.keys = negativeAct;
        return this.keys;
    }

    delete(id: string) {
        const newKeys = this.keys.filter((item: any) => item.id !== id)
        this.keys = newKeys;
        this.updateKeysJson(newKeys)
        return this.keys;
    }
}



const Directory = new SingletonDirectory();
const DB = new SingletonDB();
const DBFilter = new SingletonDBFilter();
const Keys = new SingletonKeys();

export {
    Directory,
    DB,
    DBFilter,
    Keys,
    ConfigPath
}


