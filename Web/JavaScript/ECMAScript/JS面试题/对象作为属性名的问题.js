var obj = {},
    a = { key: 'a' },
    b = { key: 'b' };

obj[a] = '123'; // obj[({ key: 'a' }).toString()] = '123'; => obj['[object Object]'] = '123';
obj[b] = '456'; // obj[({ key: 'b' }).toString()] = '123'; => obj['[object Object]'] = '123';

console.log(obj[a]); // obj[({ key: 'a' }).toString()] => obj['[object Object]'] => '456'

console.log(a.toString());
console.log(b.toString());
