const {exec} = require('child_process')
const {stdout,stderr} = require('process')
let args = process.argv

let msg = args.slice(2).join(' ')

exec('git add .', cb)
try{
    exec(`git commit -m \"${msg}\"`, cb)
}
    catch (error){
        console.log('this is a test',error)
    }
exec(`git push`, cb)

function test(err, stdout,stderr){
    console.log('test')
}

function cb(err, stdout,stderr){
    if (err){
        // console.log('this is a test',err)
        // exec('git status',test)
        return
    }
}
