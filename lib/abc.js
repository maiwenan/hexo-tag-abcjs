let count = 0;


module.exports = config => {
  return (args, contents) => {
    const paperId = `abcjs-paper-${count++}`;
    const audioId = `abcjs-audio-${count++}`;
    let midi = config.midi

    console.log(args);

    args.forEach((arg) => {
      switch (arg.trim()) {
        case 'autoplay': 
          autoplay = true
          break
        case 'midi': 
          midi = true
          break
      }
    })

    const opts = Object.assign({}, config, {
      paperId,
      audioId,
      midi
    })

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

          function setup() {
            console.log(ABCJS);
            if (config.midi) {
              ABCJS.renderMidi(config.audioId, abcString, config.options || {});
            }
            ABCJS.renderAbc(config.paperId, abcString, config.options || {});

          }

          if (typeof window.abcjs === 'undefined' && !document.getElementById(config.scriptId)) {
            loadcss(config.css);
            loadjs(config.scriptId, config.js, setup);
          } else {
            window.addEventListener('load', setup);
          }
        })();
      </script>
    `
  }
}