import $ from 'jquery'; 
import 'jquery-validation';
export default class SubmitForm {
    constructor(el) {
      this.el = el
      this.el.handler = this.el.handler || {}
      this.el.handler.SubmitForm = this
      this.init()

    }

    init(){
      $(this.el).find('#submit-form').validate();
    }
   
}