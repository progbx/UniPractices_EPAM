export function initApplicationForm() {
    const personTitleField = document.getElementById('person-title-field');
    const personTitleDatalist = document.createElement('datalist');
    personTitleDatalist.id = 'person-title-options';
    personTitleDatalist.innerHTML = `
        <option value="Mr."></option>
        <option value="Mrs."></option>
        <option value="Miss"></option>
        <option value="Dr."></option>
        <option value="Other"></option>
    `;
    personTitleField.setAttribute('list', 'person-title-options');
    personTitleField.parentNode.appendChild(personTitleDatalist);
    const jobTitleField = document.getElementById('job-title');
    const jobTitleDatalist = document.createElement('datalist');
    jobTitleDatalist.id = 'job-title-options';
    jobTitleDatalist.innerHTML = `
        <option value="Junior Developer"></option>
        <option value="Middle Developer"></option>
        <option value="Senior Developer"></option>
        <option value="Other"></option>
    `;
    jobTitleField.setAttribute('list', 'job-title-options');
    jobTitleField.parentNode.appendChild(jobTitleDatalist);
    personTitleField.setAttribute('autocomplete', 'honorific-prefix');
    document.getElementById('firstname').setAttribute('autocomplete', 'given-name');
    document.getElementById('lastname').setAttribute('autocomplete', 'family-name');
    document.getElementById('github-account-name').setAttribute('autocomplete', 'username');
    document.getElementById('email').setAttribute('autocomplete', 'email');
    jobTitleField.setAttribute('autocomplete', 'organization-title');
    jobTitleField.addEventListener('change', function () {
        const jobTitleDescriptionWrapper = document.getElementById('job-title-description-wrapper');
        const jobTitleValue = jobTitleField.value.trim();
        if (jobTitleValue === '' || jobTitleValue === 'Other') {
            jobTitleDescriptionWrapper.classList.remove('hidden');
        } else if (['Junior Developer', 'Middle Developer', 'Senior Developer'].includes(jobTitleValue)) {
            jobTitleDescriptionWrapper.classList.add('hidden');
        } else {
            jobTitleDescriptionWrapper.classList.remove('hidden');
        }
    });
    const oneTimeCodeField = document.getElementById('one-time-code');
    const showOneTimeCodeCheckbox = document.getElementById('show-one-time-code');
    showOneTimeCodeCheckbox.addEventListener('change', function () {
        if (showOneTimeCodeCheckbox.checked) {
            oneTimeCodeField.setAttribute('type', 'text');
        } else {
            oneTimeCodeField.setAttribute('type', 'password');
        }
    });
    const validateField = (field) => {
        field.addEventListener('blur', function () {
            if (field.value.trim() === '') {
                field.classList.add('application-form__input_invalid');
            }
        });

        field.addEventListener('focus', function () {
            field.classList.remove('application-form__input_invalid');
        });
    };
    validateField(document.getElementById('firstname'));
    validateField(document.getElementById('lastname'));
    const form = document.querySelector('.application-form');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        const formData = new FormData(form);
        const jobTitleValue = formData.get('job-title');
        if (['Junior Developer', 'Middle Developer', 'Senior Developer'].includes(jobTitleValue)) {
            formData.delete('job-title-description');
        }
        try {
            const response = await fetch('https://httpbin.org/post', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            console.log('Form submitted successfully:', result);
        } catch (error) {
            console.error('Form submission failed:', error);
        }
    });
}