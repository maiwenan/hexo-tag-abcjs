const _ = require('lodash');
const abc = require('./lib/abc');

const config = hexo.config.abcjs = _.merge({
  js: '/js/abcjs_midi_5.9.1-min.js',
  css: '/css/abcjs-midi.css',
  scriptId: 'hexo-tag-abcjs',
  midi: true,
  animation: true,
  animationColors: ['#000000', '#3d9afc'],
  options: {
    // for visual
    startingTune: 0,
    print: false,
    visualTranspose: 0,
    scale: 1,
    responsive: 'resize',
    // for audio
    inlineControls: {
      loopToggle: true,
      standard: true,
      tooltipLoop: 'Click to toggle play once/repeat.',
      tooltipReset: 'Click to go to beginning.',
      tooltipPlay: 'Click to play/pause.',
      tooltipProgress: 'Click to change the playback position.'
    }
  }
}, hexo.config.abcjs);

hexo.extend.tag.register('abcjs', abc(config), {
  ends: true
});
