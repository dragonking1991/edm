import $ from 'jquery';
export default class TrimOff {
  constructor(el) {
    this.el = el
    this.el.handler = this.el.handler || {}
    this.el.handler.TrimOff = this  
    this.init() 
  }

  init() {
   

  }

}