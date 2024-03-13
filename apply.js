// Event listener for DOM content loaded to handle job title and error messages display
document.addEventListener("DOMContentLoaded", function() {
    // Parsing URL parameters to retrieve job title and error message
    const params = new URLSearchParams(window.location.search);
    const jobTitle = params.get('job');
    const error = params.get('error');

    // Display job title at the top of the form if it exists
    if (jobTitle) {
        const titleElement = document.createElement('h1');
        titleElement.textContent = `${decodeURIComponent(jobTitle)}`;
        titleElement.className = 'job-title';
        document.querySelector('.container').insertBefore(titleElement, document.querySelector('.container').firstChild);
    }

    // Display error message if the error parameter is 'email'
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

// Another DOM content loaded event listener for job-specific question handling and form data persistence
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const jobType = params.get('job');

    const form = document.getElementById('applicationForm');
    const elements = form.elements;
    const jobQuestionsContainer = document.getElementById('jobSpecificQuestions');

    // Load saved data or populate it for the first time
    const questions = getJobQuestions(jobType);
    populateJobQuestions(questions, jobQuestionsContainer);

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

    // Populate job-specific questions dynamically
    function populateJobQuestions(questions, container) {
        container.innerHTML = '';
        questions.forEach((question, index) => {
            const questionElement = createQuestionElement(question, index);
            container.appendChild(questionElement);
        });
    }

    // Create individual job question form element
    function createQuestionElement(question, index) {
        const div = document.createElement('div');
        div.classList.add('form-group');
    
        const label = document.createElement('label');
        label.textContent = question;
    
        // Create a hidden input to store the question label
        const hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', `questionLabel${index}`);
        hiddenInput.setAttribute('value', question);
    
        const asterisk = document.createElement('span');
        asterisk.classList.add('asterisk');
        asterisk.textContent = '*';
        label.appendChild(asterisk);
    
        const textarea = document.createElement('textarea');
        textarea.setAttribute('name', `question${index}`);
        textarea.setAttribute('required', 'true');
        textarea.classList.add('form-control');
    
        div.appendChild(hiddenInput);
        div.appendChild(label);
        div.appendChild(textarea);
        return div;
    }    

    // Save form data to local storage
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

    // Add interaction for dynamically adding education history sections
    function handleEducationHistory() {
        const addEducationButton = document.getElementById('addEducation');
        if (addEducationButton) {
            addEducationButton.addEventListener('click', addEducationSection);
            updateEducationSections();
        }
    }

    // Add individual education history section
    function addEducationSection() {
        const educationHistoryDiv = document.getElementById('educationHistory');
        const newEducationSection = document.createElement('div');
        newEducationSection.className = 'education-section';
        newEducationSection.innerHTML = `
            <div class="form-group">
                <label>Highest Level of Education<span class="asterisk">*</span></label>
                <select name="educationLevel[]" class="form-control" required="true">
                    <option value="">Select One</option>
                    <option value="highSchool">High School</option>
                    <option value="bachelor">Bachelor's Degree</option>
                    <option value="master">Master's Degree</option>
                    <option value="doctorate">Doctorate or Higher</option>
                </select>
            </div>
            <div class="form-group">
                <label>Field of Study<span class="asterisk">*</span></label>
                <input type="text" name="fieldOfStudy[]" class="form-control" required="true">
            </div>
            <button type="button" class="delete-education">Remove Education</button>
        `;
    
        newEducationSection.querySelector('.delete-education').addEventListener('click', function() {
            this.parentNode.remove();
        });
    
        educationHistoryDiv.insertBefore(newEducationSection, educationHistoryDiv.lastElementChild);
    }
    
    document.getElementById('addEducation').addEventListener('click', addEducationSection);
    
    // Update display for education history sections
    function updateEducationSections() {
        const educationHistoryDiv = document.getElementById('educationHistory');
        const educationSections = educationHistoryDiv.querySelectorAll('.education-section');
        educationSections.forEach((section, index) => {
            const deleteButton = section.querySelector('.delete-education');
            deleteButton.style.display = index > -1 ? 'block' : 'none';
        });
    }    
});

// Validation and submission handling for the application form
document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    let isValid = true;
    let requiredFields = document.querySelectorAll('.form-control[required]');

    // Validation logic to ensure all required fields are filled
    requiredFields.forEach(function(field) {
        if (field.value.trim() === '') {
            isValid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });

    // If validation passes, wait for 5 seconds, then submit the form
    if (isValid) {
        document.getElementById('applicationForm').submit();
    } else {
        alert('Please fill out the required field(s) highlighted in red.');
    }
});