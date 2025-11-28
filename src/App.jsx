import React, { Component } from 'react';
import './App.css';
import { callApi } from './Api';
import Dashboard from './dashboard.jsx';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    };

    // Bind all methods
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.closeSignin = this.closeSignin.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.forgotPasswordResponse = this.forgotPasswordResponse.bind(this);
  }

  // Show Signin modal
  showSignin = () => {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('signin').style.display = 'block';
    document.getElementById('signup').style.display = 'none';
    document.getElementById('popupheader').innerHTML = 'Login';
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('responseDiv').innerHTML = "";
  };

  // Show Signup modal
  showSignup = () => {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signup').style.display = 'block';
    document.getElementById('popupheader').innerHTML = 'Create a new account';
    document.getElementById("fullname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("role").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  };

  // Close modal if clicking outside
  closeSignin(event) {
    if (event.target.id === 'popup') {
      document.getElementById('popup').style.display = 'none';
    }
  }

  // Handle login
  handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
      alert("Enter username and password");
      return;
    }

    // Replace with actual API call if needed
    this.setState({ loggedIn: true });
  }

  // User registration
  userRegistration() {
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const role = document.getElementById("role");
    const signupPassword = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    [fullname, email, role, signupPassword, confirmPassword].forEach(el => el.style.border = "");

    if (!fullname.value) { fullname.style.border = "1px solid red"; fullname.focus(); return; }
    if (!email.value) { email.style.border = "1px solid red"; email.focus(); return; }
    if (!role.value) { role.style.border = "1px solid red"; role.focus(); return; }
    if (!signupPassword.value) { signupPassword.style.border = "1px solid red"; signupPassword.focus(); return; }
    if (!confirmPassword.value) { confirmPassword.style.border = "1px solid red"; confirmPassword.focus(); return; }
    if (signupPassword.value !== confirmPassword.value) { signupPassword.style.border = "1px solid red"; signupPassword.focus(); return; }

    const data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signupPassword.value,
      passwordConfirm: confirmPassword.value
    });

    callApi("POST", "http://localhost:9090/Users/signup", data, this.getResponse);
  }

  getResponse(res) {
    const resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      document.getElementById("signup").style.display = "none";
      document.getElementById("signin").style.display = "block";
    }
  }

  forgotPassword() {
    const username = document.getElementById("username");
    username.style.border = "";
    if (!username.value) { username.style.border = "1px solid red"; username.focus(); return; }

    const url = "http://localhost:9090/Users/forgotpassword?email=" + username.value;
    callApi("GET", url, " ", this.forgotPasswordResponse);
  }

  forgotPasswordResponse(res) {
    const data = res.split('::');
    const responseDiv = document.getElementById('responseDiv');
    responseDiv.innerHTML = `<br/><br/><label style='color:${data[0] === "200" ? "green" : "red"}'>${data[1]}</label>`;
  }

  render() {
    if (this.state.loggedIn) return <Dashboard />;

    return (
      <div id="container">
        {/* Header */}
        <div id="header">
          <div className="logoText">
            <span>Eventify</span> <small>Event Management System</small>
          </div>
          <div className="menu">
            <a href="#">Dashboard</a>
            <a href="#">Events</a>
            <a href="#">Attendees</a>
            <a href="#">Venues</a>
            <a href="#">Tickets</a>
            <a href="#">Reports</a>
          </div>
          <div className="auth">
            <button className="login" onClick={this.showSignin}>Log in</button>
          </div>
        </div>

        {/* Hero Section */}
        <div id="content">
          <div className="content-left">
            <h1>Manage your events, attendees, and venues seamlessly</h1>
            <p>Join leading organizers in planning, tracking, and executing events efficiently.</p>
          </div>
            <div className="content-right image-layout">
  <img 
    src="image.jpg" 
    alt="Event Planning" 
    className="hero-image" 
  />
  <img 
    src="image2.jpg" 
    alt="Conference Venue" 
    className="hero-image" 
  />
</div>

        </div>

        {/* Signin/Signup Modal */}
        <div id="popup" onClick={this.closeSignin}>
          <div id="popupwindow">
            <div id="popupheader">Login</div>

            {/* Sign In */}
            <div id="signin">
              <label>Username</label>
              <input type="text" id="username" />
              <label>Password</label>
              <input type="password" id="password" />
              <div className="forgotPassword">
                <label onClick={this.forgotPassword}>Forgot Password?</label>
              </div>
              <button className="signinButton" onClick={this.handleLogin}>Sign In</button>
              <div className='div1' id='responseDiv'></div>
              <div className="div2">Don't have an account? <label onClick={this.showSignup}>SIGN UP NOW</label></div>
            </div>

            {/* Sign Up */}
            <div id="signup">
              <label>Full Name</label>
              <input type="text" id="fullname" />
              <label>Email</label>
              <input type="email" id="email" />
              <label>Select Role</label>
              <select id="role">
                <option value="1">Organizer</option>
                <option value="2">Staff</option>
                <option value="3">Admin</option>
              </select>
              <label>Password</label>
              <input type="password" id="signupPassword" />
              <label>Confirm Password</label>
              <input type="password" id="confirmPassword"/>
              <button onClick={this.userRegistration}>Register</button>
              <div>Already have an account? <span onClick={this.showSignin}>SIGN IN</span></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div id="footer">
          <label className="copyrightText">© 2025 Eventify</label>
          <img className="socialmediaIcon" src="/linkedin.logo.webp" alt="LinkedIn" />
          <img className="socialmediaIcon" src="/tweetlogo.jpg" alt="Twitter" />
          <img className="socialmediaIcon" src="/facebook.logo.jpg" alt="Facebook" />
        </div>
      </div>
    );
  }
}
