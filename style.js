document.addEventListener('DOMContentLoaded', function() {
    const dropdownTrigger = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const arrow = document.querySelector('.dropdown .arrow');

    let timeoutId;

    // Function to show dropdown
    function showDropdown() {
        clearTimeout(timeoutId);
        dropdownContent.style.display = 'block';
        dropdownContent.style.backgroundColor = '#ffffff';
        arrow.style.transform = 'rotate(180deg)';
    }

    // Function to hide dropdown
    function hideDropdown() {
        timeoutId = setTimeout(() => {
            dropdownContent.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)';
        }, 300); // Delay to allow for transition to the margin area
    }

    dropdownTrigger.addEventListener('mouseenter', showDropdown);
    dropdownTrigger.addEventListener('mouseleave', hideDropdown);
    dropdownContent.addEventListener('mouseenter', showDropdown);
    dropdownContent.addEventListener('mouseleave', hideDropdown);
});
