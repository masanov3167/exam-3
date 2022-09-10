const {sqlData} = require('../../utils/fetch');

const getTime = () =>{
    const date = new Date();
    const day = date.getDay().toString().padStart(2,0);
    const oy = Number(1+ date.getMonth()).toString().padStart(2,0);
    const year = date.getFullYear();

    const hour = date.getHours().toString().padStart(2,0)
    const minute = date.getMinutes().toString().padStart(2,0)

    return `${day}.${oy}.${year} - ${hour}:${minute}`;
}


class StudentItem{
	async getOwnGroupsData(req, res){
		try{	
			const groups =  await sqlData('select g.id, g.name as g_name, c.name as c_name, t.name as t_name from users u join groups g on g.id = u.groupid join courses c on g.courseid = c.id join users t on g.teacherid = t.id where u.id = $1', req.userId);
			res.status(200).json({status:200, data: groups})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}


    async getOwnGroupsTask(req, res){
        try{
            const {id} = req.params;
            const tasks = await sqlData('select * from homeworks where groupid = $1 order by id', id);
            const total =[]
            for(let i of tasks){
                const found = i.students.find(a => a.id == req.userId);
                if(!found){
                    total.push(i)
                }
            }
            res.status(200).json({status:200, data: total})
        }
        catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
    }

    async postOwnGroupsTask(req, res){
        try{
            const {id} = req.params;
            const {groupid}  = req.body;
            const tasks = await sqlData('select * from homeworks where id = $1', id);
            const user = await sqlData('select * from users where id = $1', req.userId);
            const test = tasks[0].students;
            const find = test.find(a => a.id == req.userId);

            if(!find){
                test.push({id: req.userId, name: user[0].name, iat: getTime() }); 
                await sqlData('update homeworks set students = $1 where id = $2', JSON.stringify(test), id);
            }

            const result = await sqlData('select * from homeworks where groupid = $1 order by id', groupid);
            const total =[]
            for(let i of result){
                const found = i.students.find(a => a.id == req.userId);
                if(!found){
                    total.push(i)
                }
            }

            res.status(200).json({status:200, data: total})
        }
        catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
    }

}
module.exports = new StudentItem;