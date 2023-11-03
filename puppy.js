const axios = require('axios');
const cheerio = require('cheerio');

// Function to check URL accessibility
function checkURLAccessibility(url) {
    axios.get(url, { maxRedirects: 0 }) // Set maxRedirects to 0 to prevent automatic redirection
        .then(response => {
            console.log(`URL is accessible and accessed successfully.`);
        })
        .catch(error => {
            if (error.response && error.response.status === 302) {
                const redirectedURL = error.response.headers.location;
                console.log(`URL was redirected to: ${redirectedURL}`);
                findElementInRedirectedURL(redirectedURL);
            } else {
                console.error('Error:', error);
                console.log(`URL is not accessible.`);
            }
        });
}

// Function to find an element with specific text in the redirected URL
function findElementInRedirectedURL(redirectedURL) {
    axios.get(redirectedURL)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const elementWithText = $('*:contains("Try another way")');

            if (elementWithText.length > 0) {
                console.log('Element with "Try another way" text found.');
            } else {
                console.log('Element with "Try another way" text not found.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            console.log('Error accessing redirected URL.');
        });
}



// Function to scrape data from the URL
function scrapeDataFromURL(url) {
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);

            // Use Cheerio to select and extract the data you need
            const compromisedPasswordsCount = $('.your-class-for-compromised-passwords').text();
            const reusedPasswordsCount = $('.your-class-for-reused-passwords').text();
            const weakPasswordsCount = $('.your-class-for-weak-passwords').text();

            console.log(`Compromised Passwords: ${compromisedPasswordsCount}`);
            console.log(`Reused Passwords: ${reusedPasswordsCount}`);
            console.log(`Weak Passwords: ${weakPasswordsCount}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Call the initial function with your URL
// const url = 'https:\/\/passwords.google.com/checkup/results?ep=2&f.sid=739465143&rvt=4sE76JlaFxk4bYA3g86EoVntnAI:1698953781178&pli=1&rapt=AEjHL4NT3neanU2g7olhgp0B8RYBIi7ocSr0McMHldI_Ipw4-O5AEC4Zsvost0fzWsuJzfPeai2YKRIPCSCBy6eoPLcXRkwr00n0E9Ue5PWz8bB6tYltY1I';
const url = 'https:\/\/accounts.google.com/signin/v2/challenge/pk/presend?TL=AIBe4_KDTrQxBL2T5wobtVK8v2MuQojHL6d6QcTUjC4q5ahiOvRDlRS4qKbK1xGd&cid=1&continue=https%3A%2F%2Fpasswords.google.com%2Fcheckup%2Fresults%3Fpr%3Dpwm%26ep%3D1%26f.sid%3D1850419690%26rvt%3DPwJdlUHIdIAoZdywcgwWnj69e-Q%253A1698956594541%26rapt%3D%26hl%3Den_GB&hl=en-GB&ifkv=AVQVeyzUtFDLOd-7an2OV6gKKrbnmPyh9xC-hI3z4GgfgyR93PGVaxRhvFgQikw_8NlSLnv1avKX&rart=ANgoxceJjMsY36nNH7RGQ0Er113jrbRG0rX8aR9xkesthiMoiJAACCgCHO1e4JXbhg0dKaHp6niQdG5mZ-ehaht7HDfBePIGvZfhOGSiNDlbLo71BHSWhuA&sarp=1&scc=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin'
checkURLAccessibility(url);
