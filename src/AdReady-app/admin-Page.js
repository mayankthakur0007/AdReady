import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@fooloomanzoo/datetime-picker/datetime-picker.js';



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
    </style>

    <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json" on-error="_handleError"></iron-ajax>


    <h1>admin page </h1>
    From Date :<datetime-picker value={{FromDate}}></datetime-picker><br>

    To Date :  <datetime-picker></datetime-picker>

    <paper-button raised id="login" on-click="signIn">Add</paper-button>


    
<!--
                    var date1, date2;  

                    date1 = new Date( "Jan 1, 2018 11:10:05" );
                    document.write(""+date1);

                    date2 = new Date( "Jan 1, 2018 08:15:10" );
                    document.write("<br>"+date2);

                    var res = Math.abs(date1 - date2) / 1000;
                    
                    // get total days between two dates
                    var days = Math.floor(res / 86400);
                    document.write("<br>Difference (Days): "+days);                        
                    
                    // get hours        
                    var hours = Math.floor(res / 3600) % 24;        
                    document.write("<br>Difference (Hours): "+hours);  
                    
                    // get minutes
                    var minutes = Math.floor(res / 60) % 60;
                    document.write("<br>Difference (Minutes): "+minutes);  

                    // get seconds
                    var seconds = res % 60;
                    document.write("<br>Difference (Seconds): "+seconds);  

                    -->

                    <table id="tab1">
                        <h2>gfgdf</h2>
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

        <template>
    
     
     </table>
                
    
   
  `;
    }
    static get properties() {
        return {
            PlanDetails: {
                type: Array,
                value: []
            }



        };
    }

    // as soon as page load make ajax call method will run
    connectedCallback() {
        super.connectedCallback();
        this._makeAjax('http://10.117.189.37:9090/akshayapathra/schemes/analysis', 'get', null)
    }

    signIn() {
        let a = this.FromDate;
        console.log(a);
    }



}

window.customElements.define('admin-page', AdminPage);
