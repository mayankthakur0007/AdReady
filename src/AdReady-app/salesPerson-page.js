import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-ajax/iron-ajax.js';




/**
* @customElement
* @polymer
*/
class SalesPerson extends PolymerElement {
    static get template() {
        return html`
    <style>
    :host {
      display: block;

    }
    </style>

    <iron-ajax id="ajax" handle-as="json" on-response="_handleResponse" content-type="application/json" on-error="_handleError"></iron-ajax>


    <h1>Sales Person page </h1>

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
        // this._makeAjax('http://10.117.189.37:9090/akshayapathra/schemes/analysis', 'get', null)
    }

    signIn() {
        let a = this.FromDate;
        console.log(a);
    }



}

window.customElements.define('salesperson-page', SalesPerson);
