import $ from 'jquery';
export default class Select {
  constructor(el) {
    this.el = el
    this.el.handler = this.el.handler || {}
    this.el.handler.Select = this 
    this.boxSelected = $(el).find('.selected-item')  
    this.itemSelected = $(el).find('.selected-item .label') 
    this.itemSelect = $(el).find('.box-select-item .item-select') 
    this.detectMobile = $('#detect-number-mobile')
    this.init() 
  }

  init() {
    this.itemSelected.click( e => {
      if ($(this.el).hasClass('active')) {
        $(this.el).removeClass('active')
      } else {
        $(this.el).addClass('active')
      }
    })

    this.itemSelect.click( e => {
      const code = $(e.currentTarget).attr('data-code')
      const postal = $(e.currentTarget).attr('data-postal')
      const text = $(e.currentTarget).find('.label').text()
      const img = $(e.currentTarget).find('.icon img').attr('src')
     
      $(this.boxSelected).find('.icon img').attr('src', img)
      $(this.boxSelected).find('.label').text(text)
      $(this.el).removeClass('active')

      $(this.detectMobile).find('.selected-item .icon img').attr('src', img)
      $(this.detectMobile).find('.selected-item .label').text(postal)


    })

  }

}