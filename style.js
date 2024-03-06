document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const arrow = document.querySelector('.dropdown .arrow');
    const menuTrigger = document.querySelector('.menu-trigger');
    const navbarContent = document.querySelector('.navbar-content');

    if (dropdownTrigger && dropdownContent && arrow) {
        // Function to show dropdown
        function showDropdown() {
            clearTimeout(timeoutId);
            if (window.innerWidth > 550) {
                dropdownContent.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            }
        }

        // Function to hide dropdown
        let timeoutId;
        function hideDropdown() {
            timeoutId = setTimeout(() => {
                dropdownContent.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            }, 300); // Delay for transition
        }

        dropdownTrigger.addEventListener('mouseenter', showDropdown);
        dropdownTrigger.addEventListener('mouseleave', hideDropdown);
        dropdownContent.addEventListener('mouseenter', showDropdown);
        dropdownContent.addEventListener('mouseleave', hideDropdown);
    }

    if (menuTrigger && navbarContent) {
        function toggleNavbar() {
            if (window.innerWidth <= 550) {
                navbarContent.classList.toggle('menu-active');
            }
        }

        menuTrigger.addEventListener('click', toggleNavbar);
    }
});
