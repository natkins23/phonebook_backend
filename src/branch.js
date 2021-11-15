const {exec} = require('child_process')
let args = process.argv

let msg = args.slice(2).join(' ')

exec('git add .', cb)

function test(err, stdout,stderr){
    console.log('test')
}

function add_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return
    }
exec(`git commit -m \"${msg}\"`, cb)
}
function commit_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return
    }
    exec(`git push`, cb)

}
function push_cb(err, stdout,stderr){
    if (err){
        console.log(err)
        return
    }
    console.log('successful commit')
}
