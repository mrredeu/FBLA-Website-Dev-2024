document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const jobType = params.get('job');

    const form = document.getElementById('applicationForm');
    const jobQuestionsContainer = document.getElementById('jobSpecificQuestions');

    // Define job-specific questions
    const questions = {
        "Data Analyst": [
            "How do you handle large datasets?",
            "Describe a data analysis project you're proud of.",
            "Explain a time when you used data to make a decision.",
            "How do you ensure data accuracy?",
            "Describe your experience with data visualization tools.",
            "How do you approach a new data analysis project?",
            "What's your experience with statistical analysis?",
            "Describe a challenging problem you solved with data."
        ],
        "Software Engineer": [
            "What programming languages are you proficient in?",
            "Describe a challenging software development project you've worked on.",
            "How do you stay updated with the latest in software development?",
            "Explain your approach to testing and quality assurance.",
            "Describe your experience with agile development methodologies.",
            "How do you handle technical debt?",
            "Explain a complex technical concept in simple terms.",
            "What's your approach to debugging tough issues?"
        ],
        "Product Manager": [
            "How do you prioritize product features?",
            "Describe a product you successfully brought to market.",
            "How do you gather and incorporate customer feedback?",
            "Describe a time when you had to make a tough product decision.",
            "How do you measure product success?",
            "Explain how you work with cross-functional teams.",
            "Describe your experience with market analysis.",
            "How do you stay informed about industry trends?"
        ],
        // Add more job types and questions as needed
    };

    // Load saved data from localStorage
    loadFormData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        saveFormData();
        // Add your form submission logic here
    });

    // Populate form with job-specific questions and load saved answers
    if (questions[jobType]) {
        const selectedQuestions = getRandomQuestions(questions[jobType], 8); // Adjust number of questions as needed
        selectedQuestions.forEach(question => {
            const questionElement = createQuestionElement(question);
            jobQuestionsContainer.appendChild(questionElement);
        });
    }

    // Add event listeners for input and change events to save data
    document.querySelectorAll('input, textarea, select').forEach(element => {
        element.addEventListener('input', saveFormData);
        element.addEventListener('change', saveFormData);
    });

    // Function to create question elements
    function createQuestionElement(question) {
        const div = document.createElement('div');
        div.classList.add('form-group');
        const label = document.createElement('label');
        label.textContent = question;
        const textarea = document.createElement('textarea');
        textarea.setAttribute('name', question.replace(/\s+/g, '-').toLowerCase());
        textarea.setAttribute('required', 'true');
        div.appendChild(label);
        div.appendChild(textarea);
        return div;
    }

    // Function to randomly select questions
    function getRandomQuestions(questionsList, numQuestions) {
        const shuffled = questionsList.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numQuestions);
    }

    // Save form data to localStorage
    function saveFormData() {
        const formData = new FormData(form);
        for (const [key, value] of formData.entries()) {
            localStorage.setItem(key, value);
        }
    }

    // Load form data from localStorage
    function loadFormData() {
        const elements = form.elements;
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            // Skip file input elements
            if (element.type === 'file') continue;
            if (element.name && localStorage.getItem(element.name)) {
                element.value = localStorage.getItem(element.name);
            }
        }
    }

    // Clear saved form data upon successful submission or if needed
    function clearFormData() {
        localStorage.clear();
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission to validate first

        // Validation flags
        let isValid = true;

        // Validate Full Name (should not be empty)
        const fullName = document.getElementById('fullname');
        if (!fullName.value.trim()) {
            alert('Please enter your full name.');
            isValid = false;
        }

        // Validate Email (simple regex for email structure)
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            alert('Please enter a valid email address.');
            isValid = false;
        }

        // Validate Phone Number (simple regex for phone number structure, adjust as needed)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9]{10}$/; // Adjust regex according to your phone number format
        if (phone.value && !phoneRegex.test(phone.value)) {
            alert('Please enter a valid phone number.');
            isValid = false;
        }

        // If all validations pass, proceed with form submission
        if (isValid) {
            saveFormData();
            // Add your form submission logic here, or uncomment the next line to allow the form to submit
            // form.submit();
        }
    });
});
