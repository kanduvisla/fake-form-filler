let clickedEl = null;

document.addEventListener("contextmenu", function (event) {
    clickedEl = event.target;
}, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "populateForm") {
        populateForm(clickedEl.form)
    }
});

function populateForm(form) {
    let fakeName = generateFakeName();
    let fakeSurname = generateFakeSurName();
    let fakeCompanyName = generateFakeCompanyName();
    let fakeDomain = generateDomainName(fakeCompanyName);
    let fakeEmail = `${fakeName.toLowerCase()}.${fakeSurname.toLowerCase()}@${fakeDomain}`;
    let fakeStreetName = generateFakeStreetName();
    let fakeStreetNumber = Math.floor(Math.random() * 150);
    let fakeSuffix = String.fromCharCode(65 + Math.floor(Math.random() * 25));
    let fakeCityName = generateFakeCityName();
    let fakePostCode = 10000 + Math.floor(Math.random() * 89999);
    let fakePhoneNumber = '1234567890';

    let forms = form.parentElement.querySelectorAll('form');
    for (let f = 0; f < forms.length; f += 1) {
        let form = forms[f];
        let elements = form.querySelectorAll('input');
        for (let i = 0; i < elements.length; i += 1) {
            let el = elements[i];
            switch (el.type) {
                case 'email' :
                    el.value = fakeEmail;
                    break;
                case 'text' :
                    switch (el.name) {
                        case 'firstname':
                            el.value = fakeName;
                            break;
                        case 'lastname':
                            el.value = fakeSurname;
                            break;
                        case 'company':
                            el.value = fakeCompanyName;
                            break;
                        case 'street[0]':
                            el.value = fakeStreetName;
                            break;
                        case 'street[1]':
                            el.value = fakeStreetNumber;
                            break;
                        case 'street[2]':
                            el.value = fakeSuffix;
                            break;
                        case 'city':
                            el.value = fakeCityName;
                            break;
                        case 'postcode':
                            el.value = fakePostCode;
                            break;
                        case 'telephone' :
                            el.value = fakePhoneNumber;
                            break;
                    }
                    break;
            }
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            el.dispatchEvent(evt);
        }
        elements = form.querySelectorAll('select');
        for (let i = 0; i < elements.length; i += 1) {
            let el = elements[i];
            switch (el.name) {
                case 'country_id':
                    // Lock to the Netherlands:
                    el.value = 'NL';
                    el.querySelector('option[value="NL"]').selected = true;
                    break;
            }
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            el.dispatchEvent(evt);
        }
    }
}

function getRandomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateFakeName() {
    return getRandomFromArray(['James', 'John', 'Jimmy', 'Foo', 'Joey', 'Joozle', 'Boaty', 'Jazzy']);
}

function generateFakeSurName() {
    return getRandomFromArray(['Doe', 'Dimble', 'Dumble', 'Doo', 'Dumpfer', 'Dash', 'Doozy', 'Danoya']);
}

function generateDomainName(companyName) {
    return companyName.trim().split(' ')[0].toLowerCase().replace(/\./g, '') + '.com';
}

function generateFakeCompanyName() {
    return getRandomFromArray(['Example Inc.', 'Bar LTD.', 'A.C.M.E.'])
}

function generateFakeStreetName() {
    return getRandomFromArray(['Chipmunk', 'Koala', 'Horse', 'Staple', 'Battery', 'Nostradamus']) +
        getRandomFromArray(['Street', 'Avenue', 'Plaza']);
}

function generateFakeCityName() {
    return generateFakeSurName() + getRandomFromArray(['Town', 'City', 'Ham', 'Port', 'View', 'Ville', 'Burgh', 'Dale']);
}