fetch(`https://api.github.com/users/novice0106`)
  .then((response) => response.json())
  .then(console.log)
  .catch(console.error);
