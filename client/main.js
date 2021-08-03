
// Templates
// ----------------------------------------------------------------------------

const templates = {};

Array.from(document.getElementsByTagName('template')).forEach(template => {
    templates[template.id] = template.innerHTML;
});

function createTemplate(templateName, data) {
    let element = document.createElement('div');
    let content = templates[templateName];

    // Basic templating
    for (var key in data) {
        content = content.replace(`{{ ${key} }}`, data[key]);
    }

    // Set element content
    element.innerHTML = content;

    return element;
}


// Form
// ----------------------------------------------------------------------------

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    // Search with query
    searchApi(data.q);
});


// Searching
// ----------------------------------------------------------------------------

function searchApi(query) {
    const page = '1';
    const endpoint = `http://localhost:3030/search?q=${query}&amp;page=${page}`;

    fetch(endpoint)
        .then(response => response.json())
        .then(json => Handle_OnApiSuccess(json));
}


function Handle_OnApiSuccess(json) {
    console.log(json.data);

    const results = document.querySelector('#Results');
    results.innerHTML = '';

    json.data.forEach(item => {
        const data = flattenObj(item);
        const template = createTemplate('TemplateBook', data);

        results.appendChild(template);
    });
}





function flattenObj(obj, parent, res = {}){
    for(let key in obj){
        let propName = parent ? parent + '_' + key : key;
        if(typeof obj[key] == 'object'){
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }

    return res;
}