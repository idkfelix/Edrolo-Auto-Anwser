// ==UserScript==
// @name         Edrolo Auto Anwser
// @author       idkfelix
// @namespace    https://github.com/idkfelix/Edrolo-Auto-Anwser
// @version      1.0.0
// @description  Press f2 to automatically select the correct option in a multiple-choice question and click the Save & continue button
// @match        *://edrolo.com.au/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const waitForElement = (selector, callback) => {
        const observer = new MutationObserver((mutationsList, observer) => {
            const element = document.querySelector(selector);
            if (element) {
                callback(element);
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    const runScript = () => {
        waitForElement('.input-wrapper.is-correct input[type="radio"]', (correctOption) => {
            if (correctOption) {
                correctOption.click();
                waitForElement('button.btn.btn-default', (saveButton) => {
                    if (saveButton) {
                        saveButton.click();
                    }
                });
            }
        });
    };

    document.addEventListener('keydown', (event) => {
        if (event.keyCode === 113) { // F2 key
            runScript();
        }
    });
})();
