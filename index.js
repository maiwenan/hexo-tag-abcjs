const abc = require('./lib/abc')

let config = hexo.config.abcjs || {}
let options = Object.assign({

}, config.options)

config = Object.assign({
  js: '/js/abcjs_midi_5.9.1-min.js',
  css: '/css/abcjs-midi.css',
  scriptId: 'hexo-tag-abcjs',
  midi: true
}, hexo.config.abcjs, { options })

hexo.config.abcjs = config

hexo.extend.tag.register('abcjs', abc(config), {
  ends: true
})
