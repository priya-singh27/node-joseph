module.exports = class EventEmitter{
    listeners={}//Master object

    addListener(eventName, callback){
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(callback);
        return this;
    }

    on(eventName, callback){
        return this.addListener(eventName, callback);
    }

    once(eventName, callback){
        this.listeners[eventName] = this.listeners[eventName] || []
        const onceWrapper = ()=>{
            callback();
            this.off(eventName, onceWrapper);
        }

        this.listeners[eventName.push(onceWrapper)];

        return this;
    }



}




// const EventEmitter = require('events');

// class Emitter extends EventEmitter{}

// const myE = new Emitter();

// myE.on("button touched", ()=>{
//     console.log("An Event Occurred");
// });

// myE.emit("button touched");
