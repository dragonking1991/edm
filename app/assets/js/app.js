import 'babel-polyfill'
import 'normalize-css'
import 'modernizr'
import '../css/app.scss'
// import '../../_data/app.json'
const FastClick = require('fastclick')
const moduleElements = [...document.querySelectorAll('[data-module]')]
const dynamicModule = (elements) => {
  elements.forEach(el => {
    const modules = el.getAttribute('data-module').split(/(\s|,)/g).filter(s => s.trim().length && !s.includes(','))
    modules.forEach(m => {
      new (require(`./modules/${m}`).default)(el)
    })
  });
}


document.addEventListener('DOMContentLoaded', () => {
  FastClick.attach(document.body)
  dynamicModule(moduleElements)
  //
  let observer = new MutationObserver(mutations => {
    mutations.forEach(m => {
      const rawElements = [m.target, ...m.addedNodes]
      let modifyElements = []
      rawElements.forEach(e => {
        if (e.querySelectorAll) {
          modifyElements = [...modifyElements, ...e.querySelectorAll('[data-module]')]
        }
      })
      const elements = [...rawElements, ...modifyElements].filter(e => e.getAttribute && e.getAttribute('data-module') && !e.handler)
      dynamicModule(elements)
    })
  })
  observer.observe(document, {
    subtree: true,
    childList: true
  });
})
