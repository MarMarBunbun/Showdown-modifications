const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = 'C:/Users/Stijn/Desktop/Showdown-modifications/common/src/main/resources/data/cobblemon/moves';
const files = fs.readdirSync(root).filter(f => f.endsWith('.js'));
for (const file of files) {
  const full = path.join(root, file);
  const src = fs.readFileSync(full, 'utf8');
  try {
    const obj = vm.runInNewContext('(' + src + ')', { console, Object, Array, Math, String, Number, Boolean, RegExp, Date, Set, Map, JSON });
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'function') {
        try {
          // try a few common signatures with dummy values
          value.call({
            add() {}, debug() {}, effectState: {}, dex: { moves: { all: () => [] } },
            clampIntRange: (v) => v,
            runEvent() { return false; },
            boost() {},
            heal() {},
            damage() {},
            checkMoveMakesContact() { return false; },
            field: {},
            queue: { list: [], prioritizeAction() {} }
          }, {}, {}, {});
        } catch (e) {
          const name = e && e.name ? e.name : 'Error';
          const msg = e && e.message ? e.message : String(e);
          if (msg.includes('move is not defined')) {
            console.log('BROKEN', file, 'method', key, msg);
          }
        }
      }
    }
  } catch (e) {
    // ignore parse failures here; we only care about runtime move-undefined issues
  }
}
