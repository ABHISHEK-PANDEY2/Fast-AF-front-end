class FastAF {
  constructor() {}
  init(clientID, clientSecret, userID, devID) {
    async function sendCreds() {
      sessionStorage.setItem("clientId", clientID);
      sessionStorage.setItem("clientSecret", clientSecret);
      sessionStorage.setItem("userId", userID);
      sessionStorage.setItem("devId", devID);
      console.log("posting");
      const rawres = await fetch(
        "https://protected-crag-71641.herokuapp.com/init",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            //todo : JWT token
            clientID: clientID,
            clientSecret: clientSecret,
            userID: userID,
            devID: devID,
          }),
        }
      );
      const res = await rawres.json();
      return res;
    }
    sendCreds();
  }
  startAuth() {
    // window.location.href = "http://127.0.0.1:5500/authView/index.html";
    const devId = sessionStorage.getItem("devID");
    const appId = sessionStorage.getItem("appId");
    const userId = sessionStorage.getItem("userId");
    const div = document.createElement("div");
    const overlay = div;
    const authBox = document.createElement("div");
    const register = document.createElement("div");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");
    overlay.classList.add("overlay");
    overlay.style.cssText = `
      height:100vh;
      width:100vw;
      opacity:0.8;
      background-color:#000;
      position:absolute;
      top:0;
      display:flex;
      justify-content:center;
      align-items:center
    `;
    authBox.style.cssText = `
      width:500px;
      height:400px;
      opacity:1;
      background-color:white;
      border-radius:7px;
    `;
    register.style.cssText = `
      display:flex;
      flex-direction:column;
      align-items:center;
      font-family:sans-serif;
      gap:10px;
    `;
    img.src = `https://chart.googleapis.com/chart?cht=qr&chl=${devId}-${appId}-${userId}&chs=180x180&choe=UTF-8&chld=L|2`;
    h1.innerText = "Register";
    register.appendChild(h1);
    register.appendChild(img);
    authBox.appendChild(register);
    overlay.appendChild(authBox);
    document.body.appendChild(overlay);
    // EventSource = SSE;
    // const sse = new EventSource(`http://localhost:5000/stream`, {
    //   headers: {
    //     token: `${devId}-${appId}-${userId}`,
    //   },
    // });
    // sse.onmessage = (e) => {
    //   console.log(JSON.parse(e.data));
    //   if (e.data === true) {
    //     document.querySelector(".overlay").style.display = "none";
    //   }
    // };
    setTimeout(() => {
      document.querySelector(".overlay").style.display = "none";
      window.location.reload();
    }, 5000);
    async function requestAuth() {
      fetch("https://protected-crag-71641.herokuapp.com/requestAuth", {
        headers: {
          token: `${devId}-${appId}-${userId}`,
        },
      });
    }
    requestAuth();
    async function authTest() {
      const rawres = await fetch(
        "https://protected-crag-71641.herokuapp.com/authTest",
        {
          headers: {
            token: `${devId}-${appId}-${userId}`,
          },
        }
      );
      const res = await rawres.json();
      if (res.auth) {
        return true;
      } else {
        setTimeout(() => {
          authTest();
        }, 5000);
      }
    }
    authTest();
  }
}

const fastAF = new FastAF();

const Navbar = () => {
  return (
    <nav>
      <span className="logo">Fast AF</span>
      <button className="logout" onClick={fastAF.startAuth}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
