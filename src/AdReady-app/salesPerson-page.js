import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-item/paper-item.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';
import '@fooloomanzoo/datetime-picker/time-picker.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-dialog/paper-dialog.js';

/**
* @customElement
* @polymer
*/
class SalesPersonPage extends PolymerElement {
    static get template() {
        return html`
<style>
    :host {
        display: block;
        height:100vh;

    }

    table,
    th,
    td {
        border: 1px solid black;
        border-collapse: collapse;
    }
h3{
    margin-bottom:10px;
}
    th,
    td {
        text-align: left;
        padding: 15px;
    }

    #tab1 {
        width: 100%;
    }

    #tab1 th {
        color: white;
    }
    paper-button{
    background-color:rgb(66, 135, 245);
    color:white;
}
    #tab1 th {
        background-color:rgb(66, 135, 245);
    }

    #tab1 tr:nth-child(odd) {
        background-color:whitesmoke;
    }

    h2 {
        text-align: center;
    }

   #modal{
      padding:30px; 
      width:50%;
      height:50%;
      border-radius:20px;
      border:1px solid black;
   }
    #container{
        background-color:white;
        padding:20px 47px 47px 47px;
    }
    #purchase{
        margin-left:45%;
    }
</style>
<app-location route="{{route}}">
</app-location>
<iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json"
    on-error="_handleError"></iron-ajax>
    <div id="container">
    <paper-button raised on-click="myBookings">My Bookings</paper-button>
<h2>Sales Person Portal </h2>
<table id="tab1">
    <h3>Available Plans</h3>
    <tr>
        <th>Date</th>
        <th>From</th>
        <th>TO</th>
        <th>Plan Name</th>
        <th>Total Cost</th>
        <th>Action to Buy </th>
    </tr>
    <template is="dom-repeat" items={{PlanDetails}}>
        <tr>
            <td>{{item.date}}</td>
            <td>{{item.fromTime}}</td>
            <td>{{item.toTime}}</td>
            <td>{{item.planName}}</td>
            <td>₹{{item.totalCost}}</td>
            <td> <paper-button raised id="login" on-click="signIn">Select</paper-button></td>
        </tr>
    </template>
</table>
</div>
<paper-dialog id="modal">
<h2> Purchase From This Slot</h2>
<h3>Date :  {{date}}</h3>
<h3>From Time: <time-input time="{{fromTime}}" timezone="[[timezone]]" with-timezone="{{withTimezone}}"></time-input></h3>
<h3>To Time: <time-input time="{{toTime}}" timezone="[[timezone]]" with-timezone="{{withTimezone}}"></time-input></h3>
<paper-button raised id="purchase" on-click="purchaseSlot">Purchase</paper-button>
</paper-dialog>
<paper-toast text="Enter Valid Time " id="time"></paper-toast>
<paper-toast text="Purchased" id="purchase"></paper-toast>

`;

    }
    static get properties() {
        return {
            PlanDetails: {
                type: Array,
                value: []
            },
            id: {
                type: Number,
                value: sessionStorage.getItem('id')
            },
            fromTime: {
                type: String,
                value: ''
            },
            action: {
                type: String,
                value: 'plan'
            },
            toTime: {
                type: String
            },
            date: {
                type: String
            },
            data: {
                type: Object
            }
        };
    }
    signIn(event) {
        this.$.modal.open();
        this.date = event.model.item.date;
        this.data = event.model.item;
    }

    myBookings(){
        this.set('route.path','./my-bookings');
    }
    purchaseSlot() {
      
        let fromTime = this.fromTime.slice(0, 8);
        let toTime = this.toTime.slice(0, 8);
        let slotId = this.data.slotId;
        let userId = sessionStorage.getItem('id');
        let date = this.date;
        let totalCost = this.data.totalCost;
        let obj = {
            fromTime :fromTime,
            toTime :toTime,
            slotId :slotId,
            userId :userId,
            date :date,
            totalCost :totalCost
        }
        console.log(toTime,this.data.fromTime);
        
        if(fromTime<this.data.fromTime||fromTime>this.data.toTime){
       this.$.time.open();
        }else
        if(toTime<this.data.fromTime||toTime>this.data.toTime){
            this.$.time.open();
        }else {
        this._makeAjax(`http://10.117.189.55:9090/admanagement/slots/book`, 'post', obj)
        this.action = 'purchase'
        }

    }

    // as soon as page load make ajax call method will run
    connectedCallback() {
        super.connectedCallback();
        this._makeAjax(`http://10.117.189.55:9090/admanagement/slots`, 'get', null)

    }

    _handleResponse(event) {
        switch (this.action) {
            case 'plan':
                this.PlanDetails = event.detail.response;
                break;
            case 'purchase':
                this.$.purchase.open();
                this._makeAjax(`http://10.117.189.55:9090/admanagement/slots`, 'get', null)
                this.action = 'plan'
                break;
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

window.customElements.define('salesperson-page', SalesPersonPage);
