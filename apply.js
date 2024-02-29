document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const jobType = params.get('job');

    const form = document.getElementById('applicationForm');
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
        console.log(storedQuestions);
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
    if (educationHistoryDiv) {
        const newSection = document.createElement('div');
        newSection.className = 'education-section';
        newSection.innerHTML = `
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
            <button type="button" class="delete-education">Delete</button>
        `;
        newSection.querySelector('.delete-education').addEventListener('click', () => newSection.remove());
        educationHistoryDiv.appendChild(newSection);
        updateEducationSections();
    }
}

function updateEducationSections() {
    const educationHistoryDiv = document.getElementById('educationHistory');
    const educationSections = educationHistoryDiv.querySelectorAll('.education-section');
    educationSections.forEach((section, index) => {
        const deleteButton = section.querySelector('.delete-education');
        deleteButton.style.display = index > 0 ? 'block' : 'none';
    });
}
