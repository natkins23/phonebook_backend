const {exec} = require('child_process')
let args = process.argv

let msg = args.slice(2).join(' ')
if (!msg){
    msg =`default update`
}
console.log(`Adding, committing, and pushing changes... (${msg})`)

exec('git add .', addcb)

function addcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`changes added`)
exec(`git commit -m \"${msg}\"`, commitcb)
}

function commitcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`changes committed`)
exec(`git push`, pushcb)
}
function pushcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`changes pushed`)
}
