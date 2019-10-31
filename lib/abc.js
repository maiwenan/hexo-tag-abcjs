const _ = require('lodash');
let count = 0;

module.exports = config => {
  return (args, contents) => {
    const paperId = `abcjs-paper-${count++}`;
    const audioId = `abcjs-audio-${count++}`;
    let autoplay = false;
    let midi = config.midi;
    let animation = config.animation;

    config = _.cloneDeep(config);
    console.log(args);

    args.forEach((arg) => {
      switch (arg.trim()) {
        case 'autoplay': 
          autoplay = true;
          break;
        case 'no-midi': 
          midi = false;
          break;
        case 'no-animation':
          animation = false;
          break;
      }
    });

    const opts = _.merge(config, {
      paperId,
      audioId,
      midi,
      animation,
      options: {
        inlineControls: {
          startPlaying: autoplay
        }
      }
    });

    return `
      <div id="${audioId}" class="abcjs-audio-container"></div>
      <div id="${paperId}" class="abcjs-paper-container"></div>
      <script>
        (function () {
          var config = ${JSON.stringify(opts)};
          var abcString = ${JSON.stringify(contents)};

          function loadjs(id, url, cb) {
            var js = document.createElement('script');

            js.src = url;
            if (id) {
              js.id = id;
            }
            js.addEventListener('load', cb);
            document.body.appendChild(js);
            return js;
          }
          function loadcss(url) {
            var css = document.createElement('link');

            css.href = url;
            css.rel = 'stylesheet';
            css.type = 'text/css';
            document.head.appendChild(css);
          }
          function colorRange(range, color) {
            if (range && range.elements) {
              range.elements.forEach(function (set) {
                set.forEach(function (item) {
                  item.setAttribute('fill', color);
                });
              });
            }
          }

          function setup() {
            var tunes = ABCJS.renderAbc(config.paperId, abcString, config.options || {});
            var options = config.options || {};
            var animationColors = config.animationColors;

            if (config.animation) {
              options.animate = Object.assign({
                target: tunes[0],
                qpm: 120,
                listener: function (lastRange, currentRange, context) {
                  colorRange(lastRange, animationColors[0]);
                  colorRange(currentRange, animationColors[1]);
                }
              }, options.animate || {});
            }
            console.log(options);
            if (config.midi) {
              ABCJS.renderMidi(config.audioId, abcString, options);
            }
          }

          if (typeof window.abcjs === 'undefined' && !document.getElementById(config.scriptId)) {
            loadcss(config.css);
            loadjs(config.scriptId, config.js, setup);
          } else {
            window.addEventListener('load', setup);
          }
        })();
      </script>
    `;
  };
};