document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const jobType = params.get('job');

    const form = document.getElementById('applicationForm');
    const elements = form.elements;
    const jobQuestionsContainer = document.getElementById('jobSpecificQuestions');

    // Load saved data or populate it for the first time
    const questions = getJobQuestions(jobType);
    populateJobQuestions(questions, jobQuestionsContainer);

    // Event listener for form submission
    form.addEventListener('submit', handleFormSubmission);

    // Event listener for adding education history sections
    handleEducationHistory();

    // Get job questions either from local storage or the initial set
    function getJobQuestions(jobType) {
        // Check if the questions for the specific job type are already stored
        let storedQuestions = localStorage.getItem(jobType + 'Questions');
        if (!storedQuestions) {
            // Retrieve from the predefined questions object if not stored
            const allQuestions = {
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
                "Cloud Solutions Architect": [
                    "Describe your experience in designing cloud architectures.",
                    "How do you ensure cloud security and compliance?",
                    "Can you explain your process for evaluating and implementing new cloud technologies?",
                    "How do you balance cost, efficiency, and scalability in your cloud solutions?",
                    "Describe a successful cloud migration project you led.",
                    "How do you approach disaster recovery and business continuity planning in the cloud?",
                    "What are your strategies for cloud resource optimization?",
                    "Can you discuss a challenging cloud integration issue you resolved?"
                ],
                "Digital Marketing Specialist": [
                    "How do you measure the success of your digital marketing campaigns?",
                    "Describe an integrated marketing campaign you have worked on.",
                    "What strategies do you use to increase web traffic?",
                    "How do you stay updated with the latest digital marketing trends?",
                    "Describe your experience with SEO and analytics tools.",
                    "How do you approach target audience analysis?",
                    "What is your experience with social media marketing?",
                    "Describe a time when you had to pivot your digital marketing strategy."
                ],
                "Customer Support Agent": [
                    "How do you handle difficult customers?",
                    "Describe a time when you went above and beyond for a customer.",
                    "How do you manage multiple customer inquiries simultaneously?",
                    "What strategies do you use to ensure customer satisfaction?",
                    "How do you handle receiving negative feedback from a customer?",
                    "Describe your familiarity with customer support software.",
                    "How do you stay informed about the products and services you support?",
                    "Describe a time when you identified a potential improvement in the support process."
                ]
            };            

            const selectedQuestions = allQuestions[jobType].length > 5
                                    ? allQuestions[jobType].sort(() => 0.5 - Math.random()).slice(0, 5)
                                    : allQuestions[jobType];

            localStorage.setItem(jobType + 'Questions', JSON.stringify(selectedQuestions));
            return selectedQuestions;
        }
        return JSON.parse(storedQuestions);
    }

    function populateJobQuestions(questions, container) {
        container.innerHTML = '';
        questions.forEach(question => {
            const questionElement = createQuestionElement(question);
            container.appendChild(questionElement);
        });
    }

    function createQuestionElement(question) {
        const div = document.createElement('div');
        div.classList.add('form-group');
        
        const label = document.createElement('label');
        label.textContent = question;
        
        const asterisk = document.createElement('span');
        asterisk.classList.add('asterisk');
        asterisk.textContent = '*';
        label.appendChild(asterisk);

        const textarea = document.createElement('textarea');
        textarea.setAttribute('name', question.replace(/\s+/g, '-').toLowerCase());
        textarea.setAttribute('required', 'true');
        
        div.appendChild(label);
        div.appendChild(textarea);
        return div;
    }

    function handleFormSubmission(event) {
        if (!validateForm()) {
            event.preventDefault();
        } else {
            saveFormData();
        }
    }

    function validateForm() {
        let isValid = true;
        ['firstName', 'lastName', 'email', 'phone'].forEach(id => {
            const input = document.getElementById(id);
            if (!input.value.trim()) {
                alert(`Please enter your ${id}.`);
                isValid = false;
            }
        });

        const email = document.getElementById('email');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            alert('Please enter a valid email address.');
            isValid = false;
        }

        return isValid;
    }

    function saveFormData() {
        const formData = new FormData(form);
        formData.forEach((value, key) => localStorage.setItem(key, value));
    }

    // Load any previously saved data from local storage when the page loads
    loadFormData();

    // Add event listeners to each form field to save data to local storage when it changes
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        element.addEventListener('change', function() {
            saveFormData();
        });
    }

    // Function to save form data to local storage
    function saveFormData() {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.name && element.type !== 'file') { // Don't save file inputs
                localStorage.setItem(element.name, element.value);
            }
        }
    }

    // Function to load form data from local storage
    function loadFormData() {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            if (element.name && localStorage.getItem(element.name) && element.type !== 'file') {
                element.value = localStorage.getItem(element.name);
            }
        }
    }
});

function handleEducationHistory() {
    const addEducationButton = document.getElementById('addEducation');
    if (addEducationButton) {
        addEducationButton.addEventListener('click', addEducationSection);
        updateEducationSections();
    }
}

function addEducationSection() {
    const educationHistoryDiv = document.getElementById('educationHistory');
    const addEducationBtn = document.getElementById('addEducation');

    addEducationBtn.addEventListener('click', function() {
        const newEducationSection = document.createElement('div');
        newEducationSection.className = 'education-section';
        newEducationSection.innerHTML = `
            <div class="form-group">
                <label>Highest Level of Education<span class="asterisk">*</span></label>
                <select name="educationLevel[]" class="form-control" required>
                    <option value="">Select One</option>
                    <option value="highSchool">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate or Higher</option>
                </select>
            </div>
            <div class="form-group">
                <label>Field of Study<span class="asterisk">*</span></label>
                <input type="text" name="fieldOfStudy[]" class="form-control" required>
            </div>
            <button type="button" class="delete-education">Remove</button>
        `;

        // This button will remove the specific education section it belongs to.
        newEducationSection.querySelector('.delete-education').addEventListener('click', function() {
            this.parentNode.remove();
        });

        // Insert the new education section right before the add button
        educationHistoryDiv.insertBefore(newEducationSection, addEducationBtn);
    });
};

function updateEducationSections() {
    const educationHistoryDiv = document.getElementById('educationHistory');
    const educationSections = educationHistoryDiv.querySelectorAll('.education-section');
    educationSections.forEach((section, index) => {
        const deleteButton = section.querySelector('.delete-education');
        deleteButton.style.display = index > -1 ? 'block' : 'none';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const jobTitle = params.get('job');
    const error = params.get('error');

    if (jobTitle) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = `${decodeURIComponent(jobTitle)}`;
        titleElement.className = 'job-title';
        document.querySelector('.container').insertBefore(titleElement, document.querySelector('.container').firstChild);
    }

    if (error === 'email') {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'There was an error submitting your application. Please try again.';
        errorMessage.style.color = 'red';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.marginTop = '20px';
        document.querySelector('.application-form').prepend(errorMessage);
    }
});