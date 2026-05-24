// AUTHENTICATION SYSTEM

function switchAuthTab(type, btn){
  document.querySelectorAll(".auth-tab").forEach(tab=>{
    tab.classList.remove("active");
  });
  btn.classList.add("active");
  if(type === "signup"){
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
  }else{
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
  }
}

  //  SIGNUP

function signupUser(){
  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  if(name === "" || email === "" || password === ""){
    alert("Please fill all signup fields.");
    return;
  }
  const userData = {
    name,
    email,
    password
  };
  localStorage.setItem( "decisionOSUser",JSON.stringify(userData));
  localStorage.setItem("decisionOSLoggedIn","true");
  loginSuccess(name);
}

  //  LOGIN

function loginUser(){
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const savedUser = JSON.parse(localStorage.getItem("decisionOSUser"));
  if(!savedUser){
    alert("No account found. Please sign up first.");
    return;
  }
  if(email === savedUser.email && password === savedUser.password){
    localStorage.setItem("decisionOSLoggedIn","true");
    loginSuccess(savedUser.name);
  }else{
    alert("Invalid email or password.");
  }
}

  //  LOGIN SUCCESS

function loginSuccess(username){
  document.getElementById("authWrapper").style.display = "none";
  document.getElementById("mainWebsite").style.display = "block";
  document.getElementById("displayUsername").innerText = username;
  document.getElementById("userAvatar").innerText = username.charAt(0).toUpperCase()
}

  //  LOGOUT

function logoutUser(){
  localStorage.removeItem("decisionOSLoggedIn");
  document.getElementById("mainWebsite").style.display = "none";
  document.getElementById("authWrapper").style.display = "grid";
}

  //  AUTO LOGIN

window.addEventListener("load", ()=>{
  const loggedIn = localStorage.getItem("decisionOSLoggedIn");
  const savedUser = JSON.parse(localStorage.getItem("decisionOSUser"));
  if(loggedIn === "true" && savedUser){
    loginSuccess(savedUser.name);
  }
});

  //  DARK / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");
function applyTheme(theme){
  if(theme === "light"){
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "☀";
  }else{
    document.body.classList.remove("light-mode");
    themeToggle.innerHTML = "🌙";
  }
}
function toggleTheme(){
  const isLight = document.body.classList.contains("light-mode");
  if(isLight){
    localStorage.setItem("decisionTheme","dark");
    applyTheme("dark");
  }else{
    localStorage.setItem( "decisionTheme","light");
    applyTheme("light");
  }
}
themeToggle.addEventListener(
  "click",
  toggleTheme
);
window.addEventListener("load", ()=>{
  const savedTheme = localStorage.getItem("decisionTheme") || "dark";
  applyTheme(savedTheme);
});

  //  NAVIGATION

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({
    behavior:"smooth"
  });
}

  //  MODULE SWITCHING

let activeModule = "startup";
function activateModule(module, card){
  activeModule = module;
  document.querySelectorAll(".module-card").forEach(c=>{
    c.classList.remove("active-module");
  });
  card.classList.add("active-module");
  if(module === "startup"){
    document.getElementById("startupForm").style.display = "block";
    document.getElementById("investmentForm").style.display = "none";
  }else{
    document.getElementById("startupForm").style.display = "none";
    document.getElementById("investmentForm").style.display = "block";
  }
}

  //  RANGE VALUES

const burnRate = document.getElementById("burnRate");
const burnValue = document.getElementById("burnValue");
if(burnRate){
  burnRate.addEventListener("input", ()=>{
    burnValue.innerText = burnRate.value;
  });
}
const runway = document.getElementById("runway");
const runwayValue = document.getElementById("runwayValue");
if(runway){
  runway.addEventListener("input", ()=>{
    runwayValue.innerText = runway.value;
  });
}
const horizon = document.getElementById("horizon");
const horizonValue = document.getElementById("horizonValue");
if(horizon){
  horizon.addEventListener("input", ()=>{
    horizonValue.innerText = horizon.value;
  });
}
function switchSimulator(type, btn){
  document.querySelectorAll(".sim-tab").forEach(tab=>{
    tab.classList.remove("active-sim-tab");
  });
  btn.classList.add("active-sim-tab");
  if(type === "startup"){
    document.getElementById("startupForm").style.display = "block";
    document.getElementById("investmentForm").style.display = "none";
    document.getElementById("activeModuleName").innerText = "Startup Risk Analysis"
  }
  else{
    document.getElementById("startupForm").style.display = "none";
    document.getElementById("investmentForm").style.display = "block";
    document.getElementById("activeModuleName").innerText = "Investment Strategy";
  }
}

  //  RUN SIMULATION

function runSimulation(type){
  document.getElementById("resultPlaceholder").style.display = "none";
  document.getElementById("resultsPanel").style.display = "block";
  let score = Math.floor(Math.random() * 25) + 70;
  let label = "";
  let desc = "";
  let strengths = [];
  let risks = [];
  let recommendations = [];

    //  STARTUP SIMULATION

  if(type === "startup"){
    const burn =
    parseInt(document.getElementById("burnRate").value);
    const runwayMonths =
    parseInt(document.getElementById("runway").value);
    const industry =
    document.getElementById("startupIndustry").value;
    if(runwayMonths >= 18){
      score += 8;
    }
    if(burn > 250){
      score -= 12;
    }
    if(score > 96){
      score = 96;
    }
    if(score >= 85){
      label = "Excellent Startup Potential";
      desc =
      "Your startup shows strong scalability, healthy runway, and high investor attractiveness.";
    }
    else if(score >= 75){
      label = "Strong Opportunity";
      desc =
      "Your business model has solid growth potential with manageable risks.";
    }
    else{
      label = "Moderate Risk";
      desc =
      "The startup has potential but needs operational optimization.";
    }
    strengths = [
      `Strong demand signals detected in ${industry}.`,
      `Runway stability supports strategic growth.`,
      `Business model shows scalable expansion capability.`,
      `AI forecasting indicates strong investor interest.`
    ];
    risks = [
      `Burn rate of $${burn}K/month could pressure cash flow.`,
      `Competition in ${industry} is rapidly increasing.`,
      `Scaling operations too fast may affect efficiency.`
    ];
    recommendations = [
      "Optimize monthly operational costs.",
      "Extend runway to 18+ months.",
      "Improve customer acquisition efficiency.",
      "Strengthen partnerships and brand positioning."
    ];
  }

    //  INVESTMENT SIMULATION

  else if(type === "investment"){
    const capital =
    parseInt(document.getElementById("capital").value) || 0;
    const risk =
    document.getElementById("riskLevel").value;
    const years =
    parseInt(document.getElementById("horizon").value);
    const crypto =
    parseInt(document.getElementById("cryptoAllocation").value);
    if(years >= 10){
      score += 6;
    }
    if(risk === "Aggressive"){
      score -= 4;
    }
    if(crypto > 50){
      score -= 6;
    }
    if(score > 95){
      score = 95;
    }
    if(score >= 85){
      label = "High Growth Portfolio";
      desc =
      "Your portfolio demonstrates strong long-term wealth generation potential.";
    }
    else if(score >= 75){
      label = "Balanced Investment Strategy";
      desc =
      "Portfolio allocation appears diversified with moderate market exposure.";
    }
    else{
      label = "Volatile Portfolio";
      desc =
      "Your investment strategy may face significant market fluctuations.";
    }
    strengths = [
      `Investment horizon of ${years} years supports compounding.`,
      `Portfolio matches ${risk.toLowerCase()} investing style.`,
      `Capital allocation supports diversification.`,
      `Crypto exposure creates high upside opportunities.`
    ];
    risks = [
      "Crypto volatility may impact portfolio stability.",
      "Interest rate changes can affect equity performance.",
      "Global economic uncertainty may reduce returns."
    ];
    recommendations = [
      "Maintain portfolio diversification.",
      "Limit crypto exposure below 40% for stability.",
      "Invest consistently using long-term SIP strategies.",
      "Rebalance allocations every quarter."
    ];
  }
  renderResults(
    score,
    label,
    desc,
    strengths,
    risks,
    recommendations
  );
}

  //  RENDER RESULTS

function renderResults(
  score,
  label,
  desc,
  strengths,
  risks,
  recommendations
){
  document.getElementById("scoreNumber").innerText = score;
  document.getElementById("scoreLabel").innerText = label;
  document.getElementById("scoreDescription").innerText = desc;

  /* PROGRESS CIRCLE */

  const circle =
  document.getElementById("progressCircle");
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;
  const offset =
  circumference - (score / 100) * circumference;
  setTimeout(()=>{
    circle.style.strokeDashoffset = offset;
  },100);

  /* STRENGTHS */

  const strengthsList = document.getElementById("strengthsList");
  strengthsList.innerHTML = "";
  strengths.forEach(item=>{
    strengthsList.innerHTML += `
      <div class="result-item positive">
        ${item}
      </div>
    `;
  });

  /* RISKS */

  const riskList = document.getElementById("riskList");
  riskList.innerHTML = "";
  risks.forEach(item=>{
    riskList.innerHTML += `
      <div class="result-item negative">
        ${item}
      </div>
    `;
  });

  /* RECOMMENDATIONS */

  const recommendationList = document.getElementById("recommendationList");
  recommendationList.innerHTML = "";
  recommendations.forEach(item=>{
    recommendationList.innerHTML += `
      <div class="result-item recommend">
        ${item}
      </div>
    `;
  });
}

// ACTIVE NAV LINK

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", ()=>{
  let current = "";
  sections.forEach(section=>{
    const sectionTop =
    section.offsetTop - 150;
    if(pageYOffset >= sectionTop){
      current =
      section.getAttribute("id");
    }
  });
  navLinks.forEach(link=>{
    link.classList.remove("active-nav");
    if(
      link.getAttribute("href") === `#${current}`
    ){
      link.classList.add("active-nav");
    }
  });
});

// FADE ANIMATION

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
        entry.target.classList.add("show-element");
    }
  });
},{
  threshold:0.15
});
document.querySelectorAll(
  ".module-card, .step-card, .score-card, .result-box"
).forEach(el=>{
  el.classList.add("hidden-element");
  observer.observe(el);
});
