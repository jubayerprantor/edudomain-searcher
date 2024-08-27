fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json')
  .then(response => response.json())
  .then(data => {
      window.universityData = data;
      displayResults(data);
  });

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    data.forEach(university => {
        const universityElement = document.createElement('div');
        universityElement.className = 'university';

        universityElement.innerHTML = `
            <h3>${university.name}</h3>
            <p>${university.country}</p>
            <p>${university.alpha_two_code}</p>
            <p>${university['state-province'] || ''}</p>
            <p><a href="${university.web_pages[0]}" target="_blank">${university.web_pages[0]}</a></p>
        `;
        resultsContainer.appendChild(universityElement);
    });
}

function search() {
    const query = document.getElementById('search').value.toLowerCase();
    const countryCode = document.getElementById('countryCode').value.toUpperCase();
    const stateProvince = document.getElementById('stateProvince').value.toLowerCase();
    const domainSearch = document.getElementById('domainSearch').value.toLowerCase();

    let filteredResults = window.universityData.filter(university =>
        university.country.toLowerCase().includes(query) &&
        (!countryCode || university.alpha_two_code === countryCode) &&
        (!stateProvince || (university['state-province'] || '').toLowerCase().includes(stateProvince)) &&
        (!domainSearch || university.domains.some(domain => domain.includes(domainSearch)))
    );

    displayResults(filteredResults);
}

function filter() {
    const query = document.getElementById('search').value.toLowerCase();
    const countryCode = document.getElementById('countryCode').value.toUpperCase();
    const stateProvince = document.getElementById('stateProvince').value.toLowerCase();
    const domainSearch = document.getElementById('domainSearch').value.toLowerCase();

    let filteredResults = window.universityData.filter(university =>
        university.country.toLowerCase().includes(query) &&
        (!countryCode || university.alpha_two_code === countryCode) &&
        (!stateProvince || (university['state-province'] || '').toLowerCase().includes(stateProvince)) &&
        (!domainSearch || university.domains.some(domain => domain.includes(domainSearch)))
    );

    const isUniversitiesChecked = document.getElementById('universities').checked;
    const isSchoolsChecked = document.getElementById('schools').checked;
    const isCollegesChecked = document.getElementById('colleges').checked;
    const isSeminariesChecked = document.getElementById('seminaries').checked;

    if (isUniversitiesChecked) {
        filteredResults = filteredResults.filter(university => university.name.toLowerCase().includes('university'));
    }

    if (isSchoolsChecked) {
        filteredResults = filteredResults.filter(university => university.name.toLowerCase().includes('school'));
    }

    if (isCollegesChecked) {
        filteredResults = filteredResults.filter(university => university.name.toLowerCase().includes('college'));
    }

    if (isSeminariesChecked) {
        filteredResults = filteredResults.filter(university => university.name.toLowerCase().includes('seminary'));
    }

    displayResults(filteredResults);
}
