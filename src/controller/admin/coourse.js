const {sqlData} = require('../../utils/fetch')

class Course{
		async addCourse(req, res){
		try{	
			const {name, price} = req.body;
			await sqlData('insert into courses(name, price) values($1, $2)', name, price)
			const courses =  await sqlData('select * from courses order by id');
			
				res.status(200).json({status:200, data: courses})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async deleteCourse(req, res){
		try{	
			const {id} = req.params
			const find = await sqlData('select * from courses where id = $1', id);
			if(find.length >0){
				await sqlData('delete from courses where id = $1', id)
			}
			const courses =  await sqlData('select * from courses order by id');
			res.status(200).json({status:200, data: courses})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

	async editCourse(req, res){
		try{	
			const {id}= req.params;
			const find = await sqlData('select * from courses where id = $1', id);
			if(find.length >0){
				const {name, price} = req.body;
				await sqlData('update courses set name = $1, price = $2 where id = $3',name || find.name,price || find.price,   id)
			}
			const courses =  await sqlData('select * from courses order by id');
			res.status(200).json({status:200, data: courses})
		}
		catch{
			res.status(500).json({status:500, message: 'invalid request'})
		}
	}

}
module.exports = new Course;
