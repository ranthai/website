
window.onload = function() {
  renderGitHub();
  renderCoursework();
}

function request(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url)
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({status: this.status,
                statusText: xhr.statusText});
      }
    };
    xhr.onerror = function() {
      reject({status: this.status,
              statusText: xhr.statusText});
    };
    xhr.send()
  });
}

function renderGitHub() {
  request("GET", "https://api.github.com/users/ranthai").then(renderGitHubUser).catch(console.log);
  new GitHubCalendar(".calendar", "ranthai");
  request("GET", "https://api.github.com/users/ranthai/repos").then(renderGitHubRepos).catch(console.log);
}

function renderGitHubUser(response) {
  var user = JSON.parse(response);
  var element = document.getElementById("github-user");
  var html = []
  html.push("<div class=\"row\">");
  html.push("<div class=\"card col-sm-3\">");
  html.push("<img class=\"card-img-top avatar rounded\" src=\"", user["avatar_url"], "\" alt=\"avatar\">");
  html.push("</div>");
  html.push("<div class=\"card col-sm-9\">", "<div class=\"card-body\">");
  html.push("<h3 class=\"card-title\">", user["login"], "</h3><hr>");
  html.push("<p class=\"card-text\">");
  html.push("Name: ", user["name"], "<br>");
  html.push("Location: ", user["location"], "<br>");
  html.push("Bio: ", user["bio"], "<br>");
  html.push("Public Repos: ", user["public_repos"], "<br>");
  html.push("</p>");
  //html.push("<a href=\"", user["blog"], "\"class=\"btn btn-primary\">Blog</a> ");
  html.push("<a href=\"", user["html_url"], "\"class=\"btn btn-primary\">Profile</a> ");
  html.push("</div>", "</div>");
  html.push("</div>");
  element.innerHTML = html.join("");
}

function renderGitHubRepos(response) {
  var array = JSON.parse(response);
  var element = document.getElementById("github-repos");
  var html = []
  for (var i = 0; i < array.length; i ++) {
    if (i % 3 == 0) {
      if (i != 0) {
        html.push("</div>");
      }
      html.push("<div class=\"row\">");
    }
    repo = array[i];
    html.push("<div class=\"card col-md-4\"><div class=\"card-body\">");
    html.push("<h3 class=\"card-title\">", repo["name"], "</h3><hr>");
    html.push("<p class=\"card-text\">");
    if (repo["description"]) {
      html.push("<em>", repo["description"], "</em><br>");
    }
    html.push("</p>");
    if (repo["homepage"]) {
      html.push("<a href=\"", repo["homepage"], "\"class=\"btn btn-primary\">Homepage</a> ");
    }
    html.push("<a href=\"", repo["html_url"], "\"class=\"btn btn-primary\">Repository</a> ");
    html.push("</div></div>");
  }
  html.push("</div>");
  element.innerHTML = html.join("");
}

function renderCoursework() {
  var element = document.getElementById("coursework");
  var html = []
  for (var i = 0; i < coursedata.length; i ++) {
    semester = coursedata[i];
    if (i % 3 == 0) {
      if (i != 0) {
        html.push("</div>");
      }
      html.push("<div class=\"row\">");
    }
    html.push("<div class=\"card col-md-4\"><div class=\"card-body\">");
    html.push("<h3 class=\"card-title\">", semester["semester"], "</h3><hr>");
    html.push("<p class=\"card-text\">");
    for (var j = 0; j < semester["courses"].length; j ++) {
      course = semester["courses"][j];
      html.push("<a href=\"", course["url"], "\">", course["name"], "</a><br>");
    }
    html.push("</p>");
    html.push("</div></div>");
  }
  html.push("</div>");
  element.innerHTML = html.join("");
}