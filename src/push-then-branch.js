const {exec} = require('child_process')
let args = process.argv
let msg = args.slice(2).join(' ')
let exercise = args.slice(2,3).join(' ')

if (msg === exercise){
    msg = `Exercise ${exercise} completed ` 
}
else{
    msg = `Exercise ${exercise} completed: ${msg}` 
     
}

//pushing changes
console.log(`Nice job completing exercise ${exercise} saving your changes...`)

console.log(`Adding, committing, and pushing changes... (${exercise})`)

exec('git add .', addcb)

function addcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`Changes added`)
exec(`git commit -m \"${msg}\"`, commitcb)
}

function commitcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`Changes committed`)
exec(`git push`, pushcb)
}
function pushcb(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`Changes pushed`)
}

//createing new branch
let newBranch = exercise;


setTimeout(() => exec(`git branch \"${newBranch}\"`,makeBranch), 3000)

function makeBranch(err, stdout,stderr){
    if (err){
        console.log(err)
        return;
    }
console.log(`Creating new branch... (${newBranch})`)
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