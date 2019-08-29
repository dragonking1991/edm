import $ from 'jquery';  
import "jquery-ui/ui/widgets/datepicker"

export default class Datepicker {
  constructor(el) {
    this.el = el
    this.el.handler = this.el.handler || {}
    this.el.handler.Radio = this
    this.item = $(el).find('.item-radio .rd')  
    this.init()
  }

  init() {
    console.log(this.el);
    
    $(this.el).datepicker();
  }
 
}