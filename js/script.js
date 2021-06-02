const overview = document.querySelector(".overview");
const username = "CuriousMagpie";
const repoList = document.querySelector(".repos");

//function to call GitHub API for user data
const gitUser = async function() {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  console.log(data);
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

//function to call GitHub API for repo data
const gitRepos = async function() {
  const repoInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoInfo.json();
  console.log(repoData);
  displayRepos(repoData);
};

gitRepos();

//function to display repo data
// const showRepoData = function(repos) {
//   for (const repo of repos) {
//     const eachRepo = document.createElement("li");
//     eachRepo.classList.add("repo");
//     eachRepo.innerHTML = `<h3>${repo.name}</h3>`;
//     repoList.append(eachRepo);
//   }
// };

const displayRepos = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  }
};
