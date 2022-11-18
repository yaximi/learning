import { observe } from "./observer/observe";
import { Watcher } from "./observer/Watcher";

const obj = {
    a: [1]
};
observe(obj);

new Watcher(obj, 'a', function (val) {
    console.log(val);
})
obj.a.push(2);
