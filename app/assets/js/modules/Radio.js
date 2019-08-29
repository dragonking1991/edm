import $ from 'jquery';
export default class Radio {
  constructor(el) {
    this.el = el
    this.el.handler = this.el.handler || {}
    this.el.handler.Radio = this
    this.itemSelect = $(el).find('.item-radio .rd')
    this.inputHidden = $(el).find('.radio-hidden')
    this.init()
  }

  init() {
    this.itemSelect.click(e => {
      this.reset()
      $(e.currentTarget).addClass('selected')
      this.inputHidden.val($(e.currentTarget).attr('data-item'))
    })
  }

  reset() {
    this.itemSelect.each((i, e) => {
      $(e).removeClass('selected')
    })
  }

}