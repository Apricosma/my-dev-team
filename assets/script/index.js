'use strict'

// Utility functions 
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

const form = select('form');
const button = select('.btn');

const emailRegex   = /^(?=^.{8,}$)[-_A-Za-z0-9]+([_.-][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,}$/;
const phoneRegex   = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const messageRegex = /{.*?}|\[.*?\]/gm;

function isValid(input) {
    if (Number.isInteger(input)) {
        return true;
    }  
    return false;
}

function validate() {
    let fullName = select('.name').value.trim();
    let email = select('.email').value.trim();
    let phone = select('.phone').value.trim();
    let msg = select('.message').value;

    let message = '';
    let valid = true;
    let count = 0;

    if (fullName.length === 0) {
        message += 'Name field is required\n';
        valid = false;
        count++
    }

    if (email.length === 0) {
        message += 'Email is required\n';
        valid = false;
        count++;
    } else if (!emailRegex.test(email)) {
        message += 'A valid email is required';
        valid = false;
    }

    if (phone.length === 0) {
        message += 'Phone is required\n';
        valid = false;
        count++;
    } else if (!phoneRegex.test(phone)) {
        message += 'Please enter a valid phone number\n';
        valid = false;
    }

    if (msg.length === 0) {
        message += 'A message is required\n';
        valid = false;
        count++
    } else if (messageRegex.test(msg)) {
        message += 'Do not use curly brackets \'{}\' or square \'[]\'';
        valid = false;
    }

    if (count === 4) {
        alert('Fields with * are required')
    } else if (!valid) {
        alert(message);
    } else {
        alert('Thank you! We will get back to you as soon as possible');
        form.submit();
    }
}

onEvent('click', button, function() {
    validate();
})