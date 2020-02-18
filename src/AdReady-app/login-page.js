import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-dialog/paper-dialog.js';



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
        font-family: Verdana, Geneva, Tahoma, sans-serif;

    }

    #toast {
        position: absolute;
        bottom: 400px;
    }

    #form {
        border: 1px solid rgb(0, 0, 0);
        border-radius: 20px;
        background-color: white;
        opacity: 0.9;
        ;
        width: 40%;
        min-width: 310px;
        align-content: center;
        padding: 1%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, 50%);
    }

    h2 {
        text-align: center;

    }

    #container {
        position: relative;
    }

    paper-button {
        text-align: center;
        background-color: black;
        color: white;
        position: relative;
        left: 39%;
    }
</style>
<app-location route="{{route}}">
</app-location>

 from date <input id="datepicker" on-blur="_checkDate" required class="datepicker-input" type="date" data-date-format="yyyy-mm-dd" >
 to date <input id="datepicker1" on-blur="_checkDate1" required class="datepicker-input" type="date" data-date-format="yyyy-mm-dd" >

<paper-button raised on-click="_modelOpen">modal dialog</paper-button>
<paper-dialog id="modal">
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit consequat.</p>
     Date : <datetime-picker date={{fromDate}} time={{fromTime}}></datetime-picker>  
    From Time: <time-input time="{{time}}" timezone="[[timezone]]" with-timezone="{{withTimezone}}"></time-input>
    To Time: <time-input time="{{time}}" timezone="[[timezone]]" with-timezone="{{withTimezone}}"></time-input>
  
  <paper-button raised on-click="_modelClose">Tap me to close</paper-button>
</paper-dialog>


<div id="container">
    <iron-form id="form">
        <form>
            <h2>Login </h2>
            <paper-input label="Phone Number" id="mobile" allowed-pattern=[0-9] type="text" value={{phone}}
                name="mobile" maxlength="10" required error-message="Please Enter Phone Number"></paper-input>
            <paper-input label="Password" id="pass" type="password" value={{password}} name="password" required
                error-message="Please Enter Password"></paper-input>
            <paper-button raised id="login" on-click="signIn">Login</paper-button>
        </form>
    </iron-form>
    <div id="toast">
    <paper-toast text="Please Enter All Details"  id="blankForm"></paper-toast>
    <paper-toast text="Wrong Credentials" id="wrongCredentials"></paper-toast>
    </div>
</div>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json"
    on-error="_handleError"></iron-ajax>
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
    // fetching the user data from josn file
    signIn() {

        if (this.$.form.validate()) {
            let phone = this.phone;
            let password = this.password;
            this.details = { mobile: phone, password: password }
            this.$.form.reset();
            this._makeAjax(`http://10.117.189.55:9090/admanagement/users/login`, "post", this.details);

        } else {
            this.$.blankForm.open();

        }
    }

    // handling error if encounter error from backend server
    _handleError() {
        this.$.wrongCredentials.open();
    }

    // getting response from server and storing user name and id in session storage
    _handleResponse(event) {
        this.users = event.detail.response
        console.log(this.users)
        if (this.users.statusCode == "404") {
            this.$.wrongCredentials.open();
        } else {
            this.dispatchEvent(new CustomEvent('refresh-login', {
                detail: { login: true, name: this.users.userName }, bubbles:
                    true, composed: true
            }))
            sessionStorage.setItem('login', true);
            sessionStorage.setItem('id', this.users.userId);

            sessionStorage.setItem('name', this.users.userName);
            console.log(this.users.role)
            if (this.users.role == "SALESPERSON") {
                this.set('route.path', './salesperson-page')
            }else{
                this.set('route.path', './admin-page')

            }
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

    _modelOpen() {
        this.$.modal.open();
    }
    _modelClose() {
        this.$.modal.close();
    }

    _checkDate() {
        var selectedText = this.$.datepicker.value;
        var selectedDate = new Date(selectedText);
        var now = new Date();
        if (selectedDate <= now) {
            alert("Date must be in the future");
        }

    }

    _checkDate1(){
        var selectedText = this.$.datepicker.value;
        var selectedText1 = this.$.datepicker1.value;
        if(selectedText1<selectedText){
            alert('date must be greater than from date');
        }


    }

}

    window.customElements.define('login-page', LoginPage);