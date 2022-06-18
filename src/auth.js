export function getAuth() {
  return `
    <form class="mui-form" id="authForm">
      <div class="mui-textfield mui-textfield--float-label">
        <input type="email" style="max-width: 800px" required maxlength="75" minlength="5" id="emailInput">
          <label for="emailInput">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input type="password" style="max-width: 800px" required maxlength="75" minlength="5" id="passwordInput">
          <label for="passwordInput">Password</label>
      </div>
      <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Sign In</button>
    </form>
  `
}

export function authWithEmailAndPassword(email, password) {
  const apiKey = "YOURAPIKEY"
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    body: JSON.stringify({
      email, password,
      returnSecureToken: true
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => data.idToken)
}
