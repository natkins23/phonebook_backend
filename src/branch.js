const {exec} = require('child_process')
const {stdout,stderr} = require('process')
let args = process.argv

let msg = args.slice(2).join(' ')

exec('git add .', cb)
exec(`git commit -m \"${msg}\"`, cb)
exec(`git push`, cb)

function test(err, stdout,stderr){
    console.log('test')
}

function cb(err, stdout,stderr){
    if (err){
        console.log(err)
        exec('git status',test)
        return
    }
}
