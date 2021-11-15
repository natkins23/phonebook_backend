const {exec} = require('child_process')
let args = process.argv

let msg = args.slice(2).join(' ')

exec('git add .', add_cb)

function add_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
exec(`git commit -m \"${msg}\"`, commit_cb)
}
function commit_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
    exec(`git push`, push_cb)

}
function push_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
    console.log('successful commit')
}
