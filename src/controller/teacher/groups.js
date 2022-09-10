const {sqlData} = require('../../utils/fetch')

class GroupOfTEachers{
	async getOwnGroups(req, res){
		try{	
			const groups =  await sqlData('select g.id, g.name as g_name, c.name as c_name, u.name as t_name, u.id as t_id from groups g join users u on g.teacherid = u.id join courses c on g.courseid = c.id where u.id = $1', req.userId);
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

    async getOwnGroupHomeworks(req, res){
		try{	
            const {id} = req.params;

			const homeworksAll =  await sqlData('select * from homeworks');
            const find = homeworksAll.find(a => a.groupid === id-0);
            if(find){
                const homeworks =  await sqlData('select * from homeworks where groupid = $1', id);
			    res.status(200).json({status:200, data: homeworks});
                return
            }
			res.status(200).json({status:200, data: []})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

    async addTask(req, res){
		try{	
			const {title, body, groupid} = req.body;
			let test = ''
            if(title && body && groupid){
              test =  await sqlData('insert into homeworks(title, body, groupid) values($1, $2, $3) returning *', title, body,groupid);
            }

			res.status(200).json({status:200, messages:'muvaffaqiyatli joylandi!', data: test})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}
	

}
module.exports = new GroupOfTEachers;
