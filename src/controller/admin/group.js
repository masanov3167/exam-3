const {sqlData} = require('../../utils/fetch')
const Token = require('../../utils/jwt');

class Group{
	async login(req, res){
		try{	
			
			const { login, pass} = req.body;
			const yuzers =  await sqlData('select * from users');
			const find = yuzers.find(a => a.pass == pass && a.name == login);
			if(find){
				res.status(200).json({status:200, message:'muvaffaqiyatli login qilindi', access_token: Token({id: find.id}), data: find})
			}
			if(!find){
				res.status(404).json({status:404, message:'login yokki password invalid', data: {login, pass}})
			}
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async getGroups(_, res){
		try{	
			const groups =  await sqlData('select g.id, g.name as g_name, c.name as c_name, u.name as t_name from groups g join courses c on g.courseid = c.id join users u on g.teacherid = u.id order by id');
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async getCourses(req, res){
		try{	
			
			const courses =  await sqlData('select * from courses order by id');
			
				res.status(200).json({status:200, data: courses})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async getTeachersById(req, res){
		try{	
			const {id} = req.params
			const courses =  await sqlData('select * from users where courseid = $1', id);
			
				res.status(200).json({status:200, data: courses})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}


	async addGroup(req, res){
		try{	
			const {name, courses,teachers} = req.body;
			await sqlData('insert into groups(name, courseid, teacherid) values($1, $2, $3)', name, courses,teachers)
			const groups =  await sqlData('select * from groups order by id');
			
				res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async deleteGroup(req, res){
		try{	
			const {id} = req.params
			const find = await sqlData('select * from groups where id = $1', id);
			if(find.length >0){
				await sqlData('delete from groups where id = $1', id)
			}
			const groups =  await sqlData('select * from groups order by id');
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async editGroup(req, res){
		try{	
			const {id}= req.params;
			const find = await sqlData('select * from groups where id = $1', id);
			if(find.length >0){
				const {name} = req.body;
				await sqlData('update groups set name = $1 where id = $2',name,  id)
			}
			const groups =  await sqlData('select * from groups order by id');
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

}
module.exports = new Group;
