import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';




/**
* @customElement
* @polymer
*/
class AdminPage extends PolymerElement {
    static get template() {
        return html`
    <style>
    :host {
      display: block;

    }
    table, th, td{
        border: 1px solid black;
        border-collapse: collapse;
        }
    th, td{
        text-align: left;
        padding: 15px;
    }
    
    #tab1{
        width: 100%;
    }
    
    #tab1 th{
        color: white;
    }
    
    #tab1 tr:nth-child(even)
    {
        background-color: white;
    }
    
    #tab1 tr:nth-child(odd)
    {
        background-color: rgb(204, 63, 87);
    }
    h2{
      text-align: center;
    }
    #tableDiv{
        margin:12px;
    }

   
    </style>

    <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json" on-error="_handleError"></iron-ajax>


    <h1>admin page </h1>
     From Date : <datetime-picker date={{fromDate}} time={{fromTime}}></datetime-picker>  
     To Date : <datetime-picker date={{toDate}} time={{toTime}}></datetime-picker>




    
<paper-dropdown-menu label="Available Plans">
<paper-listbox slot="dropdown-content" class="dropdown-content">
<template is="dom-repeat" items={{PlanDetails}}>
  <paper-item>{{item.planName}} ( ₹{{item.planCost}})</paper-item>


  </template>
</paper-listbox>
</paper-dropdown-menu>

<paper-button raised id="login" on-click="signIn">Add</paper-button>






    


                    <table id="tab1">
                        <h2>Available Plans</h2>
                        <tr>

                            <th>Plan ID</th>
                            <th>Plan Name</th>

                            <th>Plan cost</th>
                            
                            
                        </tr>
        <template is="dom-repeat" items={{PlanDetails}}>
         <tr>

          <td>{{item.planId}}</td>
          <td>{{item.planName}}</td>

          <td>{{item.planCost}}</td>

        </tr>

        </template>
    
     
     </table>
                
    
   
  `;
    }
    static get properties() {
        return {
            PlanDetails: {
                type: Array,
                value: []
            },

            fromDate:{
                type:String,
                value:''
            },

            fromTime:{
                type:String,
                value:''
            },
            toDate:{
                type:String
            },
            fromTime:{
                type:String
            }
            



        };
    }

    // as soon as page load make ajax call method will run
    connectedCallback() {
        super.connectedCallback();
        this._makeAjax('http://10.117.189.55:9090/admanagement/plans', 'get', null)

    }


    _handleResponse(event) {


        this.PlanDetails = event.detail.response;
        console.log(this.PlanDetails);


    }


    // calling main ajax call method 
    _makeAjax(url, method, postObj) {
        let ajax = this.$.ajax;
        ajax.method = method;
        ajax.url = url;
        ajax.body = postObj ? JSON.stringify(postObj) : undefined;
        ajax.generateRequest();
    }




    signIn() {
        
        console.log(this.fromDate);
        console.log(this.fromTime);
        console.log(this.toDate);
        console.log(this.toTime);
        


     
    }






}

window.customElements.define('admin-page', AdminPage);