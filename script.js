/*
 * Handle the step-based navigation UI (for mobile devices/small screens)
 */

let steps = document.querySelectorAll(".demo-step-ui__menu-item"),
    stepDotsSection = document.querySelector(".demo-step-ui__menu-navigation__dots"),
    buttonPrev = document.querySelector(".demo-step-ui__menu-navigation__button-prev"),
    buttonNext = document.querySelector(".demo-step-ui__menu-navigation__button-next"),
    currentStep = 1;

function decrementStep() {

    // Make the OLD current step's options inactive (so the div slides to the right, out of view)
    steps[currentStep - 1].classList.add("item--inactive--right");

    currentStep--;

    // Make the NEW current step's options active (so the div slides in from the left)
    steps[currentStep - 1].classList.remove("item--inactive--left");

    // Update the active/inactive classes on the bottom dots and prev/next buttons
    updateBottomDots();
    updateMenuNavButtons();
}

function incrementStep() {

    // Make the OLD current step's options inactive (so the div slides to the left, out of view)
    steps[currentStep - 1].classList.add("item--inactive--left");

    currentStep++;

    // Make the NEW current step's options active (so the div slides in from the right)
    steps[currentStep - 1].classList.remove("item--inactive--right");

    // Update the active/inactive classes on the bottom dots and prev/next buttons
    updateBottomDots();
    updateMenuNavButtons();
}

// Step dots at the bottom
function createBottomDots() {

    // Clear the dots section, just in case it ain't already clear
    stepDotsSection.innerHTML = "";

    // Add in as many new dots (<span> elements) as there are steps for the current tab
    for (let i = 0; i < steps.length; i++) {
        let newDot = document.createElement("span");

        // Give this new span the 'step-dot' class so it shows up properly
        newDot.setAttribute("class", "demo-step-ui__menu-navigation__dot");

        // Add it to the DOM, aww yeah
        stepDotsSection.appendChild(newDot);
    }

    // Add the active class to the current step's dot
    stepDotsSection.children[currentStep - 1].classList.add("dot--active");
}

// This is used for updating the dots to have the correct class when a Previous/Next button is clicked
function updateBottomDots() {

    // Remove the active class from the old, lamer dot
    for (let i = 0; i < steps.length; i++) {
        stepDotsSection.children[i].classList.remove("dot--active");
    }

    // Add the active class to the newer, cooler, current dot
    stepDotsSection.children[currentStep - 1].classList.add("dot--active");
}

function updateMenuNavButtons() {

    // Enable/disable the "prev" button depending on the current step
    if (currentStep > 1) {
        buttonPrev.classList.remove("button--disabled");
    } else {
        buttonPrev.classList.add("button--disabled");
    }

    // Enable/disable the "next" button depending on the current step
    if (currentStep < steps.length) {
        buttonNext.classList.remove("button--disabled");
    } else {
        buttonNext.classList.add("button--disabled");
    }
}

buttonPrev.addEventListener("click", function(){

    // Only go previous if the user isn't at the first step
    if (currentStep > 1) {
        decrementStep();
    }
})

buttonNext.addEventListener("click", function () {

    // Only go next if user isn't at the final step
    if (currentStep < steps.length) {
        incrementStep();
    }
})

function initDemo() {
    createBottomDots();
    
    // Disable the "prev" button if the demo starts on option/step #1
    if (currentStep == 1) {
        buttonPrev.classList.add("button--disabled");
    }

    // Disable the "next" button if the demo starts on final option/step
    if (currentStep == steps.length) {
        buttonNext.classList.add("button--disabled");
    }
}

// 
initDemo();

/*
 * Handle the show/hide feature of the customization menu
 */

let demoElement = document.querySelector(".demo-step-ui"),
    menuElement = document.querySelector(".demo-step-ui__menu"),
    menuTopBar = document.querySelector(".demo-step-ui__menu-top"),
    menuToggleButtons = document.querySelectorAll(".demo-step-ui__menu-toggle-button");

menuTopBar.addEventListener("click", function () {
    demoElement.classList.add("menu-is-active");
});

for (let i = 0; i < menuToggleButtons.length; i++) {
    menuToggleButtons[i].addEventListener("click", function (event) {
        event.stopPropagation();
        demoElement.classList.toggle("menu-is-active");
    }, true);
}

/*
 * Handle the show/hide feature of the mini menu
 */

let miniMenuItems = document.querySelectorAll(".demo-step-ui__mini-menu__item");

for (let i = 0; i < miniMenuItems.length; i++) {

    let itemButton = miniMenuItems[i].querySelector(".demo-step-ui__mini-menu__button"),
        itemCloseButton = miniMenuItems[i].querySelector(".demo-step-ui__mini-menu__popup__close");
    
    // If an item has a button, then when it's clicked...
    if (itemButton) {
        itemButton.addEventListener("click", function () {

            // Loop through all the other potentially open mini menus...
            for (let j = 0; j < miniMenuItems.length; j++) {

                // ...and if we're not on the current menu item...
                if (i != j) {

                    // ...then hide it in case it's open (i.e. remove its active class)
                    miniMenuItems[j].querySelector(".demo-step-ui__mini-menu__button").classList.remove("mini-menu-item-is-active");
                }
            }

            // Then show/hide the mini menu for the item that was clicked
            itemButton.classList.toggle("mini-menu-item-is-active");
        });
    }
    
    // If an item has a close button, then attach an event to it to remove the mini menu item's active class
    if (itemCloseButton) {
        itemCloseButton.addEventListener("click", function () {
            itemButton.classList.remove("mini-menu-item-is-active");
        });
    }
}