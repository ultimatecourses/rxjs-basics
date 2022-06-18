const { Observable } = require("rxjs");


const observable = new Observable(subscriber =>{
   let count = 0;
   const id = setInterval(() =>{
    subscriber.next(count);
    // subscriber.complete();
    count += 1
   },1000)

   return () => {
    console.log('called');
    clearInterval(id)
   }

})

const observer = {
    next: value => console.log('next',value),
    error: error => console.log('error', error),
    complete: () => console.log('!complete')
}

const subscription = observable.subscribe(observer);
const subscription2 = observable.subscribe(observer);
const subscription3 = observable.subscribe(observer);

subscription2.add(subscription3)

subscription.add(subscription2)
setTimeout(() => {
    subscription.unsubscribe();
}, 3500)

// Note:
// when we call unsubscribe method before completion of observable, it cancels the observable 
// and complete method of observable doesn't called.
