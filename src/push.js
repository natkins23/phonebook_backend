const {exec} = require('child_process')
const { stdout, stderr } = require('process')
let args = process.argv

let msg = args.slice(2).join(' ')

exec('git add .', cb)
exec(`git commit -m \"${msg}\"`, cb)
exec(`git push`, cb)


function cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return
    }
}
