let input = document.getElementById("input");
// can also use on keyup
input.addEventListener("keyup", (e) => {
  e.preventDefault();
  let keywords = e.target.value;
  getInfo(keywords);
});

let getInfo = async (keywords) => {
  let client = "5d5fde6f25b7377617fb";
  let csecret = "959aeddbc885d1b389d176d7211c1114c0742078";
  let githubURL = `https://api.github.com/users/${keywords}?client_id=${client}&client_secret=${csecret}`;
  let res = await window.fetch(githubURL);
  let json = await res.json();
  let data = json;
  // OBJECT
  console.log(data);

  let output = `
          <div class="card" style="width: 19rem;">
            <img src=${data.avatar_url} class="card-img-top" alt="this is image" />
             <div class="card-body">
            
             <div class="bio">
              Username:<h5 class="card-title text-uppercase">${data.login}</h5>
              ID: <p class="badge badge-secondary">${data.id}</p><br/>
             Bio:<p class="text text-dark font-weight-bold">${data.bio}</p><br/>
             Company: <span class="badge badge-secondary">${data.company}</span><br/>
             Total Repositories:<span class="badge badge-secondary">${data.public_repos}</span><br/>
             </div>
            
           </div>
        </div>
       </div>
      `;
  document.getElementById("fetch").innerHTML = output;

  let response = await window.fetch(`${data.repos_url}`);
  let resjson = await response.json();
  // ARRAY
  console.log(resjson);
  if (resjson.length > 0) {
    document.getElementById(
      "title"
    ).innerHTML = `<h5 class="title text mt-3 mb-3">Clone or Download ${data.login}'s Repositories:</h5>`;
    let out = "";
    for (const loop of resjson) {
      out =
        out +
        `
       <div class="alert alert-dark" role="alert">
      <p class="text text-dark font-weight-bold"> ${loop.name}</p>
      <a href=${loop.clone_url} class="download">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M68.162 216.841h159.274v-64.832H407.06v64.832h163.892L319.728 461.285 68.162 216.841zM320 540.987l247.468-.709 23.658-112.017 48.875 1.607v178.939H0v-178.94l48.886-1.606 23.658 112.017 247.456.709zM227.436 31.182H407.06v24.083H227.436V31.182zm0 48.544H407.06v49.146H227.436V79.726z"/></svg>
      </a>
      </div>
       
      `;
      document.getElementById("repos").innerHTML = out;
    }
  } else {
    document.getElementById(
      "title"
    ).innerHTML = `<h5 class="title text mt-3 mb-3">${data.login} has no Repositories:</h5>`;
  }
};
