const {sqlData} = require('../../utils/fetch')

class Students{

        async getStudents(_, res){
            try{	
                const students =  await sqlData('select u.id, u.name,u.pass,u.phone, g.name as g_name, g.id as g_id from users u join groups g on u.groupid = g.id');
                res.status(200).json({status:200, data: students})
            }
            catch{
                res.status(500).json({status:500, message: 'invalid request'})
            }
        }

		async addStudents(req, res){
		try{	
			const {name,pass, phone, groupid} = req.body;
            const users =  await sqlData('select * from users');
            const find = users.find(a => a.pass == pass);
			if(name && phone && groupid && find == undefined){
                await sqlData('insert into users(name,pass, phone, role, groupid) values($1, $2, $3,$4, $5)', name,pass, phone, 'student', groupid)
            }
			res.status(200).json({status:200, data: users})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async deleteStudents(req, res){
		try{	
			const {id} = req.params
			const find = await sqlData('select * from users where id = $1', id);
			if(find.length >0 && find[0].role == 'student'){
				await sqlData('delete from users where id = $1', id)
			}
			const students =  await sqlData('select * from users where role = $1', 'student');
			res.status(200).json({status:200, data: students})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async editStudents(req, res){
		try{	
			const {id}= req.params;
			const find = await sqlData('select * from users where id = $1', id);
			if(find.length >0 && find[0].role == 'student'){
				const {name,pass, phone, groupid} = req.body;
				await sqlData('update users set name = $1, pass = $2, phone = $3, groupid = $4 where id = $5',name || find.name, pass || find.pass, phone || find.phone, groupid || find.groupid ,  id)
			}
			const students =  await sqlData('select * from users where role = $1', 'student');
			res.status(200).json({status:200, data: students})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

}
module.exports = new Students;
