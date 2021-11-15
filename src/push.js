const {exec} = require('child_process')
let args = process.argv

let msg = args.slice(2).join(' ')
console.log(msg)
exec('git add .', addcb)

function addcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
exec(`git commit -m \"${msg}\"`, commitcb)
}

function commitcb(err, stdout,stderr){
    if (err){
        console.log('this is a test',err)
        return;
    }
    exec(`git push`, pushcb)

}
function pushcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
    console.log('successful commit')
}
