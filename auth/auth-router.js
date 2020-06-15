const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require("../database/dbConfig.js");



router.post('/register', async (req, res) => {
  // implement registration
  try{
  	let user = req.body
	const hash = bcrypt.hashSync(user.password, 12)
	user.password = hash

	
		const saved = await add(user)
		res.status(201).json(saved)

	} catch(err){
		console.log(err);
		// res.status(500).json(err)
	}

});






router.post('/login', async(req, res) => {
  // implement logi
		
	try{
		let username = req.body.username 
  		let password = req.body.password
  		  // let {username, password} = await req.body

		 const userSearch = await findBy({username})
		 const user =userSearch[0]
		if( user &&  bcrypt.compareSync(password, user.password )){
			req.session.user = user 

			res.status(200).json({messsage: 'welcome'})
		}
		else{
			res.status(401).json({message: "credentials invalid "})
		}

	}catch(err){
		console.log(err)

	}


});


// router.post('/login', (req, res) => {
//   // implement logi
		
	
// 		 let username = req.body.username 
//   let password = req.body.password
//   		  // let {username, password} = await req.body

// 		 const userSearch = findBy({username})
// 		 const user =userSearch[0]

// 		if( user &&  bcrypt.compareSync(password, user.password )){
// 			req.session.user = user 

// 			res.status(200).json({messsage: 'welcome'})
// 		}
// 		else{
// 			res.status(401).json({message: "credentials invalid "})
// 		}

// 	}


// });


async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
async function findById(id) {
  return db("users").where({ id }).first();
}

async function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}

module.exports = router;
