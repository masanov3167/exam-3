const {sqlData} = require('../../utils/fetch')

class Teachers{

        async getTeachers(req, res){
            try{	
                const teachers =  await sqlData('select * from users where role = $1', 'teacher');
                res.status(200).json({status:200, data: teachers})
            }
            catch{
                res.status(500).json({status:500, message: 'invalid request'})
            }
        }

		async addTeachers(req, res){
		try{	
			const {name,pass, phone, courseid} = req.body;
            const users =  await sqlData('select * from users');
            const find = users.find(a => a.pass == pass);
			if(name && phone && courseid && find == undefined){
                await sqlData('insert into users(name,pass, phone, role, courseid) values($1, $2, $3,$4, $5)', name,pass, phone, 'teacher', courseid)
            }
			res.status(200).json({status:200, data: users})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async deleteTeachers(req, res){
		try{	
			const {id} = req.params
			const find = await sqlData('select * from users where id = $1', id);
			if(find.length >0 && find[0].role == 'teacher'){
				await sqlData('delete from users where id = $1', id)
			}
			const teachers =  await sqlData('select * from users where role = $1', 'teacher');
			res.status(200).json({status:200, data: teachers})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async editTeachers(req, res){
		try{	
			const {id}= req.params;
			const find = await sqlData('select * from users where id = $1', id);
			if(find.length >0 && find[0].role == 'teacher'){
				const {name, pass, phone, courseid} = req.body;
				await sqlData('update users set name = $1, pass = $2, phone = $3, courseid = $4 where id = $5',name || find.name, pass || find.pass, phone || find.phone, courseid || find.courseid ,  id)
			}
			const teachers =  await sqlData('select * from users where role = $1', 'teacher');
			res.status(200).json({status:200, data: teachers})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

}
module.exports = new Teachers;
