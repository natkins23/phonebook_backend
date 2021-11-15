const {exec} = require('child_process')
let args = process.argv

let newBranch = args.slice(2).join(' ')

console.log(`Creating new branch... (${newBranch})`)
exec(`git branch \"${newBranch}\"`,makeBranch)

function makeBranch(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
exec(`git checkout \"${newBranch}\"`,checkoutNewBranch)
console.log(`Branch made`)
}

function checkoutNewBranch(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
exec(`git push --set -u origin \"${newBranch}\"`,pushToRemote)
console.log(`Remote branch created`)
}

function pushToRemote(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
exec(`git checkout main"`,checkoutMain)
}
function checkoutMain(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`Changes pushed to remote branch`)

}
