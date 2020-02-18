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
            id: {
                type: Number,
                value: sessionStorage.getItem('id')
            },
                fromDate: {
                type: String,
                value: ''
            },

            fromTime: {
                type: String,
                value: ''
            },
            toDate: {
                type: String
            },
            fromTime: {
                type: String
            }




        };
    }

    // as soon as page load make ajax call method will run
    connectedCallback() {
        super.connectedCallback();
        this.id= sessionStorage.getItem('id')
        // this._makeAjax(`http://10.117.189.55:9090/admanagement/slots/${this.id}`, 'get', null)

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




  





}
window.customElements.define('salesperson-page', SalesPerson);
