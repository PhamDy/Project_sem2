document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll('.Tab-Select .nav-tab');
    const selectLine = document.querySelector('.Select-line');
    const selectedPage = document.querySelector('.selected-page');

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(tab => {
          tab.querySelector('span a').classList.remove('selected');
        });

        this.querySelector('span a').classList.add('selected');

        const selectedTabText = this.querySelector('span a').textContent;
        const selectLineClass = 'selected-' + selectedTabText.replace(/\s+/g, '');

        const selectedTabWidth = this.offsetWidth;
        const selectedTabLeft = this.offsetLeft;

        selectLine.className = 'Select-line ' + selectLineClass;
        selectLine.style.width = selectedTabWidth + 'px';
        selectLine.style.left = selectedTabLeft + 'px';

        selectedPage.querySelector('h3').textContent = selectedTabText;

      });
    });
  });

  
  document.addEventListener("DOMContentLoaded", function() {
    const tabLinks = document.querySelectorAll(".nav-link");

    tabLinks.forEach(function(tabLink) {
      tabLink.addEventListener("click", function(event) {
        event.preventDefault();
        const targetTabId = this.getAttribute("href").substring(1);
        const targetTab = document.getElementById(targetTabId);

        document.querySelectorAll(".nav-link").forEach(function(link) {
          link.classList.remove("active");
        });
        document.querySelectorAll(".tab-pane").forEach(function(tabPane) {
          tabPane.classList.remove("active");
        });

        this.classList.add("active");
        targetTab.classList.add("active");
      });
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    const logoutLink = document.querySelector(".selected-page a");

    logoutLink.addEventListener("click", function(event) {
      event.preventDefault();

      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      window.location.href = "index.html";
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("toggleNewsletter");
    const radioBox = document.querySelector(".radio-box");

    toggleButton.addEventListener("click", function() {
        const computedStyle = window.getComputedStyle(radioBox);
        if (computedStyle.display === "none") {
            radioBox.style.display = "block";
        } else {
            radioBox.style.display = "none";
        }
    });

    const radioInputs = document.querySelectorAll(".radio-box input[type='radio']");

    radioInputs.forEach(function(input) {
        input.addEventListener("change", function() {
            if (this.checked) {
                radioInputs.forEach(function(otherInput) {
                    if (otherInput !== input) {
                        otherInput.checked = false;
                    }
                });
            }
        });
    });
});


const toggleChecked = () => {
    const button = document.querySelector('.check-same-addresss');
    button.classList.toggle('checked');

    const deliveryAddress = document.querySelector('.delivery-address');
    deliveryAddress.classList.toggle('hidden');
}