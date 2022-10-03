import {
    stringToColor,
    adjust,
    colorTextFromBg,
    getFontSize,
    random,
    hexToHSL,
    getInitials
} from './functions.js'

const titles = [
    'Learn Python Programming Masterclass',
    'React Native - The Practical Guide [2022 Edition]',
    'Unreal Engine C++ Developer: Learn C++ and Make Video Games',
    'Docker and Kubernetes: The Complete Guide',
    'SQL - MySQL for Data Analytics and Business Intelligence',
    'The Complete Cryptocurrency Course',
    'Microsoft Power BI - A Complete Introduction',
    'Modern JavaScript (Complete guide, from Novice to Ninja)',
    'Learn JavaScript: Full-Stack from Scratch',
    'The Complete Copywriting Course : Write to Sell Like a Pro',
    'Music Production in Logic Pro X',
    'Game Music Composition',
    'Adobe Premiere Pro CC Masterclass: Video Editing',
    'Video Editing in DaVinci Resolve 17: Beginner to Advanced',
    'Affinity Photo: Solid Foundations',
    'Complete C# Unity Game Developer 2D',
    'Deep Learning A-Z: Hands-On Artificial Neural Networks'
];

const _title = document.getElementById('h1');

const btn = document.getElementById('capture-btn');
btn.addEventListener('click', () => {
    capture();
});
const fab = document.querySelector('.fab button');

function getUser() {
    return new Promise((resolve) => {
        fetch('https://randomuser.me/api/?results=1')
        .then(response => response.json())
        .then(data => {
            const user = data.results[0];
            const initials = getInitials(user.name.first + ' ' + user.name.last);
            const name = user.name.first + ' ' + user.name.last;
//             name00.innerText = name;
//             avatar00.innerText = initials;
//             const rn = stringToColor(name) || colors[name?.length % colors?.length];
//             const clt = adjust(rn, 30);
//             const clo = adjust(rn, -60);
//             const clc = colorTextFromBg(clo, '#fff', '#000');
//             const clr = clc === '#fff' ? `rgba(255,255,255, .1)` : `rgba(0,0,0, .1)`;
//             avatar00.style = `background-image: linear-gradient(150deg, ${clt} 00%, ${clo} 100%); color: ${clc}; --color: ${clr}`;

            resolve();
        })
    }) 
}

fab.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
    document.querySelector('.modal00').style = `opacity: 1; pointer-events: all;` 
});


async function capture() {
    
    const temp = document.getElementById("template");
    const radio_value = document.querySelector('input[name="theme"]:checked')?.value || 'light';
    radio_value === 'dark' ? temp.content.children[0].classList.add('WrapperDark') : temp.content.children[0].classList.remove('WrapperDark') 
    const clon = temp.content.cloneNode(true);
    document.querySelector('.Container').innerHTML = '';
    document.querySelector('.Container').appendChild(clon);
    const node = document.getElementById('capture');
    const nd = document.getElementById('image-rendered');

    // if (nd.children.length) { return }
    _aig(document.querySelector('input[type="text"]').value);


    getUser().then(() => {
        document.body.style.overflow = 'auto';
        domtoimage.toPng(node, {style: {left: 0}})
        .then(function (dataUrl) {
            const img = new Image();
            img.src = dataUrl;
            nd.innerHTML = '';
            nd.appendChild(img);
            const container = document.querySelector('.Container'); 
            container.innerHTML = '';
            document.querySelector('.modal00').style = `opacity: 0; pointer-events: none;`
            fab.parentNode.style = `visibility: visible; opacity: 1; z-index: 12;`
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
    })
}

document.querySelector('#random-btn').addEventListener('click', () => {
    document.getElementById('thumbnail').value = random(titles);
});

const _serializeToString = XMLSerializer.prototype.serializeToString;
XMLSerializer.prototype.serializeToString = function (node) {
  return _serializeToString
    .call(this, node)
    .replace(
      /background-image:/g,
      '-webkit-background-clip: text; background-image:',  // Add the -webkit-background-clip
    );
};

async function _aig(title) {
    
    const box = document.querySelector('h1');
    const text = title.trim().replace(/[^\w ]/g, '').toLowerCase();
    const input_color = document.querySelector('input[type="color"').value;
    const gradient = `background-image: linear-gradient(${input_color}, ${adjust(input_color, -10)})`
    
    // Regex to replace symbol with span for highlight
    const tt = title.replace(/\*([^\s][^\*]+?[^\s])\*/g, `<span style="${gradient}">$1</span>`);
    
    // Regex to replace all html tags except span
    box.innerHTML = tt.replace(/(<\/?(?:span)[^>]*>)|<[^>]+>/ig, '$1').trim();
    
    const _color = stringToColor(text);
    const firstc = document.getElementById('first-color');
    const secondc = document.getElementById('second-color');
 
    firstc.setAttribute('stop-color', colorTextFromBg(_color, '#fff', '#000'));
    secondc.setAttribute('stop-color', _color);
}
