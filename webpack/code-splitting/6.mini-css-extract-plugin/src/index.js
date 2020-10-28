import './index.css';

async function getComponent () {
    const element = document.createElement('div');
    const { default: _ } = await import('lodash');
    element.innerHTML = _.join(['hello', 'webpack'], ' ');
    element.classList.add('red');
    return element;
}

getComponent()
    .then(component => {
        document.body.appendChild(component);
    });
