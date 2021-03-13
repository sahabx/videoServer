console.log("First");

console.log("Third")

/****************************************
 * First instance: using nested callbacks
 * Without named function or other clean 
 * methods
 ****************************************/

/*
getUser(85,(user)=>{
    getRepo(user.userName,(repo)=>{
        getCommit(repo[0],(commit)=>{
            console.log(commit)
        })
    })
});
*/


/****************************************
 * Second instances: Using named function
 * for readability
 ****************************************/
/*
getUser(85,getRepo2)


function getRepo2(user){
    getRepo(user.userName,getCommit2)
}

function getCommit2(repo){
    getCommit(repo[0],displayCommits)
}

function displayCommits(commit){
    console.log(commit)
}
*/




/****************************************
 * Retriving data function set up  by
 * following the callback method
 ****************************************/
/*
function getUser(id,callback){
    setTimeout(()=>{
        console.log("Reading database...")
        callback({id:id, userName:"Username from database"});
    },2000)
}


function getRepo(user,callback){

    setTimeout(()=>{
        console.log("Getting repos")
        callback(["repo 1","repo 2","repo 3"]);
    },2000)
}


function getCommit(repo,callback){
    setTimeout(()=>{
        console.log("Getting commits")
        callback(["commit 1","commit 2","commit 3"]);
    },2000)
}
*/
/****************************************
 * Third instances: Using promises
 ****************************************/


function getUser(id){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Reading database...")
            if(id<99){
                resolve({id:id, userName:"Username from database"});
            } else{
                reject(new Error("User was not found"))
            }
        },3000)

    })
}


function getRepo(user){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("Getting repos")
            resolve(["repo 1","repo 2","repo 3"]);
        },4000)
    })
}


function getCommit(repo){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log("Getting commits")
            resolve(["commit 1","commit 2","commit 3"]);
        },2000)
    })
}


/****************************************
 * Consuming the promises
 ****************************************/


//  getUser(110)
//  .then(user  => getRepo(user.userName))
//  .then(repo => getCommit(repo[0]))
//  .then(commit => console.log(commit))
//  .catch(err=>console.log(err.message))

 /****************************************
 * Completing multiple promises at once
 ****************************************/

 //Promise.all([getUser(22),getRepo("oldUser"),getUser(25)]).then(result=>console.log(result))
 //Promise.race([getUser(22),getRepo("oldUser"),getUser(25)]).then(result=>console.log(result))




  /****************************************
 * Async and wait approach
 ****************************************/

//  async function delayList(){
//     try{
//         const user = await getUser(22);
//         const repository = await getRepo(user.userName)
//         const commitsList = await getCommit(repository[0])
//         console.log(commitsList)
//     }catch(err){
//         console.log("What went wrong",err)
//     }

//  }
// delayList()
for(var i=0;i<15;i++){
    let randomNumber = Math.random()*500000000000;
    let randomDate = new Date(randomNumber);

    console.log(new Date((new Date()) - (new Date(Math.random()*500000000000))))
}