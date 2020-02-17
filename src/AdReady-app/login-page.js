import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';

/**
* @customElement
* @polymer
*/
class LoginPage extends PolymerElement {
    static get template() {
        return html`
    <style>
    :host {
      display: block;
      font-family:Verdana, Geneva, Tahoma, sans-serif;
    }
  
    
    #form{
        border: 1px solid rgb(0, 0, 0);
    border-radius: 20px;
    background-color: white;
    opacity: 0.9;;
    width: 40%;
    min-width: 310px;
    align-content: center;
    padding: 1%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  
    }
    h2{
      text-align: center;
      
    }
    paper-button {
        text-align: center;
    background-color: black;
    color: white;
    position: relative;
    left: 39%;
    }  
    skeleton-page{
        margin-top:30px;
    }
  </style>

  <iron-form id="form">
    <form>
      <h2>Login </h2>
      <paper-input label="SAP ID" id="sapID" allowed-pattern=[0-9] type="text" value={{phone}} name="sapId"  maxlength="8" required error-message="enter phone number" ></paper-input>
      <paper-input label="Password" id="pass" type="password" value={{password}} name="password" required error-message="enter user name" ></paper-input>
      <paper-button raised id="login" on-click="signIn">Login</paper-button>
    </form>
  </iron-form>
  <paper-toast text="Please Enter All Details"  class="fit-bottom" id="blankForm"></paper-toast>
  <paper-toast text="Wrong Credentials"  class="fit-bottom" id="wrongCredentials"></paper-toast>
  <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" 
  content-type="application/json" on-error="_handleError"></iron-ajax>
  `;
    }
    static get properties() {
        return {
            users: Object,
            details: {
                type: Object
            },
            baseUrl: String,

        };
    }
    // fetching the  user data from josn file 
    signIn() {

        if (this.$.form.validate()) {
            let employeeId = this.phone;
            let password = this.password;
            this.details = { employeeId: employeeId, password: password }
            this.$.form.reset();
            this._makeAjax(`http://10.117.189.55:9090/employeemanagement/employees/login`, "post", this.details);

        } else {

        }
    }
    // ready(){
    //     super.ready();
    //     if(sessionStorage.getItem('login')==null){
    //       this.set('route.path','./donation-option')
    //     }
    // }
    // handling error if encounter error from backend server
    _handleError() {
        this.$.wrongCredentials.open();
    }

    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response
        console.log(this.users)
        if(this.users.statusCode=="404"){
            this.$.wrongCredentials.open();
        }else{
        this.dispatchEvent(new CustomEvent('refresh-login', { detail: { login: true ,name:this.users.employeeName}, bubbles: true, composed: true }))
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('id', this.users.employeeId);
        sessionStorage.setItem('name1', this.users.employeeName);
        this.set('route.path', './dashboard-page')//admin-pgae2
        }
    }
    // calling main ajax call method 
    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }

}

window.customElements.define('login-page', LoginPage);
