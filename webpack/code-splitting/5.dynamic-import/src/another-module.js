async function print () {
    const { default: _ } = await import('lodash');

    console.log(_.join(['Another', 'module', 'loaded!'], ' '));
}

print();
