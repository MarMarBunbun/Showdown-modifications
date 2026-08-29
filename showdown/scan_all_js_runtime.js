const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = 'C:/Users/Stijn/Desktop/Showdown-modifications/common/src/main/resources/data/cobblemon';
function walk(dir){
  let out=[]; for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p = path.join(dir,e.name);
    if (e.isDirectory()) out.push(...walk(p)); else if (e.name.endsWith('.js')) out.push(p);
  }
  return out;
}
for (const file of walk(root)) {
  try {
    const src = fs.readFileSync(file,'utf8');
    vm.runInNewContext('(' + src + ')', {console, Object, Array, Math, String, Number, Boolean, RegExp, Date, Set, Map, JSON});
  } catch (e) {
    if (String(e).includes('move is not defined') || String(e).includes('ReferenceError')) {
      console.log('BROKEN', file, String(e));
    }
  }
}
