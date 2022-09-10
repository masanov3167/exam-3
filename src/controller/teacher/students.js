const {sqlData} = require('../../utils/fetch')

class StudentOfTEachers{
	async getOwnGroupsStudents(req, res){
		try{	
			const groups =  await sqlData('select g.id, g.name as g_name, c.name as c_name, st.name as s_name, st.phone as s_phone from groups g join courses c on g.courseid = c.id join users st on st.groupid = g.id where g.teacherid = $1', req.userId);
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}
}
module.exports = new StudentOfTEachers;
