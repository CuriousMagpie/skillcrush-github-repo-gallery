const overview = document.querySelector(".overview");
const username = "CuriousMagpie";
const repoList = document.querySelector(".repo-list");
const repoInfoSection = document.querySelector(".repos");
const repoDataSection = document.querySelector(".repo-data");

//function to call GitHub API for user data
const gitUser = async function() {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  console.log(data); //comment this out at some point
  showUserData(data);
};

gitUser();

//function to display user data
const showUserData = function(data) {
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-info");
  userDiv.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userDiv);
};

//function to call GitHub API for repo titles
const gitRepos = async function() {
  const repoTitles = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoTitles.json();
  console.log(repoData); //comment this out at some point
  showRepoTitles(repoData);
};

gitRepos();

//function to display repo titles
const showRepoTitles = function(repos) {
  for (const repo of repos) {
    const eachRepo = document.createElement("li");
    eachRepo.classList.add("repo");
    eachRepo.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(eachRepo);
  }
};

//function for repo click event
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    console.log(repoName); //comment this out eventually
    gitRepoInfo(repoName);
  }
});

//function to call GitHub API for repo data
const gitRepoInfo = async function(repoName) {
  const fetchRepoInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await fetchRepoInfo.json();
  console.log(repoInfo); //comment this out eventually

  //fetch languages and create an array
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData); //comment this out eventually
  const languages = [];
  for (const language in languageData) {
    languages.push(language);
  };
  console.log(languages); //comment this out eventually
  displayRepoInfo(repoInfo, languages);
};

//function to display repo info
const displayRepoInfo = function(repoInfo, languages) {
  repoDataSection.innerHTML = ``;
  repoDataSection.classList.remove("hide");
  repoInfoSection.classList.add("hide");
  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  repoDataSection.append(repoDiv);
};
