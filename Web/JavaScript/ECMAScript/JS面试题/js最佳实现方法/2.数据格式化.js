// '100000000' => '100,000,000'

const str = '100000000';
const res = str.replace(/(?=\B(\d{3})+$)/g, ',');
console.info(res);
