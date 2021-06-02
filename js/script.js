const overview = document.querySelector(".overview");
const username = "CuriousMagpie";

//function to call GitHub API
const gitUser = async function() {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  console.log(data);
};

gitUser();
