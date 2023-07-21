const express = require('express');
const app = express();
app.use(require('cors')());
const port = 3001;
app.use(express.json());
let arr=[]
let grabId=0; 

let mysql=require('mysql2');
let connection=mysql.createConnection({
host:'localhost',
user:'root',
password:'Harshit@123',
database:'quizapp'});

app.post('/addQuestion', (req, res) => {
		console.log("params", req.params);
		console.log("query", req.query);
		console.log("body", req.body);
		//arr.push(req.body);
	res.set( {
		"Content-Type": "", 
	"Access-Control-Allow-Origin": "*", 
	"Access-Control-Allow-Headers": "*", 
	"Access-Control-Allow-methods": "*"});
			
	//console.log("data is: ",req.body.name);		
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	let type=req.body.type;
	let description=req.body.question;
	let topicid=req.body.topicid;
	let complexityid=req.body.complexityid;
	let active=req.body.active;
	let parentqnid=req.body.parentqnid;
	let softdel=req.body.softdel;
	let impressioncount=req.body.impressioncount;
	let successcount=req.body.successcount;
	let createdby=req.body.createdby;
	let modifiedby=req.body.modifiedby;
	console.log("data",req.body.optnSelect," val ",req.body.optnVal);
	
	let nsql='INSERT INTO testquestion(type, description, topicid, complexityid, active, parentqnid, softdel, impressioncount, successcount, createdby, modifiedby, modifieddate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);';
	var values=[1, description, topicid, complexityid, active, parentqnid, softdel, impressioncount, successcount, createdby, modifiedby, null];
	connection.query(nsql, values, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
		
		let ansSql="INSERT INTO mcqansweroptions(answer, questionid, isanswer) VALUES(?,?,?);"
	
		const keys = Object.keys(req.body.optnVal);
		for (let i = 0; i < keys.length; i++) {
			var key = keys[i];
			var arr=[req.body.optnVal[key], results.insertId, req.body.optnSelect[key]];
			connection.query(ansSql, arr, function(err, results, fields){
			if(err){
				console.log(err.message);
			}
			//console.log("maybe data",results.insertId);
		});
		}
		//console.log("maybe data",results.insertId);
	});
	
	
	

});	
	  
	data={msg:"sccessfully added question"};
	res.send(JSON.stringify(data));
});

app.post('/addModuleConfig', (req, res) => {
	
	
	
		console.log("params", req.params);
		console.log("query", req.query);
		console.log("body", req.body);
		//arr.push(req.body);
	res.set( {
		"Content-Type": "", 
	"Access-Control-Allow-Origin": "*", 
	"Access-Control-Allow-Headers": "*", 
	"Access-Control-Allow-methods": "*"});
			
	//console.log("data is: ",req.body.name);		
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	//let id=req.body.id;
	let type=req.body.type;
	let moduleid=req.body.moduleid;
	let topicid=req.body.topicid;
	let complexityid=req.body.complexityid;
	let questionscount=req.body.questionscount;
	let learningpathid=req.body.learningpathid;
	let duration=req.body.duration;
	let marks=req.body.marks;
	let orderno=req.body.ordereno;
	//let published=req.body.published;
	//let softdelete=req.body.softdelete;
	
	//console.log("data",req.body.optnSelect," val ",req.body.optnVal);
	
	let nsql='INSERT INTO lpmoduletopicconfig(type, moduleid, topicid, complexityid, questionscount, learningpathid, duration, marks, orderno) VALUES(?,?,?,?,?,?,?,?,?);';
	var values=[1, moduleid, topicid, complexityid, questionscount, learningpathid, duration, marks, orderno];
	connection.query(nsql, values, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
		console.log("maybe data",results.insertId);
		grabId=results.insertId;
		console.log("grab data",results.insertId);
		res.send(JSON.stringify({"grab":results.insertId}));
	});
	
	
	

});	
	  
	//data={msg:"sccessfully added Learning path configuration", addedId:grabId};
	//res.send(JSON.stringify(data));
});


			
app.get('/getQuestion', (req, res) => {
		console.log("Loading my questions");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	
	let nsql='select * from testquestion where active=true;';
	//let nsql='select * from testquestion;';
	
	connection.query(nsql, function(err, results, fields){
		if (err) throw err;
		console.log(results);
		res.send(results);
	});
	
});
//res.send(data);
});

app.get('/getTopic', (req, res) => {
		console.log("Loading my topics");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	
	let nsql='select * from topic;';
	
	connection.query(nsql, function(err, results, fields){
		if (err) throw err;
		console.log(results);
		res.send(results);
	});
	
});
//res.send(data);
});

app.get('/getModule', (req, res) => {
		console.log("Loading my modules");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	
	let nsql='select * from module;';
	
	connection.query(nsql, function(err, results, fields){
		if (err) throw err;
		console.log(results);
		res.send(results);
	});
	
});
//res.send(data);
});

app.get('/getMcqOptions/:id', (req, res) => {
		console.log("Loading my questions");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	let nsql='select * from mcqansweroptions where questionid=?;';
	
	connection.query(nsql, [req.params.id], function(err, results, fields){
		if (err) throw err;
		console.log(results);
		res.send(results);
	});
	
});
//res.send(data);
});


app.delete('/deleteQuestion', (req, res) => {
		console.log("Deleting my question");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	console.log('id for updating the data: ',req.body)
	let nsql='DELETE FROM testquestion WHERE id=?;';
	connection.query(nsql, req.body.id, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
	});
	
});

});

app.get('/updateQuestionStatus/:id', (req, res) => {
		console.log("Updating my question");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	// let type=req.body.type;
	// let description=req.body.description;
	// let topicid=req.body.topicid;
	// let complexityid=req.body.complexityid;
	//let active=req.body.active;
	//let id=req.body.id;
	// let parentqnid=req.body.parentqnid;
	// let softdel=req.body.softdel;
	// let impressioncount=req.body.impressioncount;
	// let successcount=req.body.successcount;
	// let createddate=req.body.createddate;
	// let createdby=req.body.createdby;
	//let modifieddate=req.body.modifieddate;
	// let modifiedby=req.body.modifiedby;
	//let fk_topicquestion=req.body.fk_topicquestion;
	//let fk_complexityquestion=req.body.fk_complexityquestion;
	
	console.log('id for updating the data: ',req.body)
	let nsql='UPDATE testquestion SET active=false WHERE id=?;';
	//var values=[id, active];
	connection.query(nsql, [req.params.id], function(err, results, fields){
		if(err){
			console.log(err.message);
		}
	});
	
});

});


/*app.put('/updateQuestion', (req, res) => {
		console.log("Updating my question");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	let type=req.body.type;
	let description=req.body.description;
	let topicid=req.body.topicid;
	let complexityid=req.body.complexityid;
	let active=req.body.active;
	let parentqnid=req.body.parentqnid;
	let softdel=req.body.softdel;
	let impressioncount=req.body.impressioncount;
	let successcount=req.body.successcount;
	let createddate=req.body.createddate;
	let createdby=req.body.createdby;
	//let modifieddate=req.body.modifieddate;
	let modifiedby=req.body.modifiedby;
	//let fk_topicquestion=req.body.fk_topicquestion;
	//let fk_complexityquestion=req.body.fk_complexityquestion;
	
	console.log('id for updating the data: ',req.body)
	let nsql='UPDATE testquestion SET type=?, description=?, topicid=?, complexityid=?, active=?, parentqnid=?, softdel=?, time=?, impressioncount=?, successcount=?, createddate=?, createdby=?, modifiedby=? WHERE id=?;';
	var values=[type, description, topicid, complexityid, active, parentqnid, softdel, time, impressioncount, successcount, createddate, createdby, modifiedby];
	connection.query(nsql, values, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
	});
	
});

});*/

app.put('/updateQuestion', (req, res) => {
		console.log("Updating my question");
	res.set({
		'Content-Type': 'application/json', 
		"Access-Control-Allow-Origin":"*", 
		"Access-Control-Allow-Headers":"*", 
		"Access-Control-Allow-methods":"*"});
	
	connection.connect(function(err){
	if(err){
		return console.error('error: '+err.message);
	}
	
	let type=req.body.type;
	let description=req.body.question;
	let topicid=req.body.topicid;
	let complexityid=req.body.complexityid;
	let active=req.body.active;
	let parentqnid=req.body.parentqnid;
	let softdel=req.body.softdel;
	let impressioncount=req.body.impressioncount;
	let successcount=req.body.successcount;
	let createdby=req.body.createdby;
	let modifiedby=req.body.modifiedby;
	console.log("data",req.body.optnSelect," val ",req.body.optnVal);
	
	let nsql='INSERT INTO testquestion(type, description, topicid, complexityid, active, parentqnid, softdel, impressioncount, successcount, createdby, modifiedby, modifieddate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);';
	var values=[1, description, topicid, complexityid, active, parentqnid, softdel, impressioncount, successcount, createdby, modifiedby, null];
	connection.query(nsql, values, function(err, results, fields){
		if(err){
			console.log(err.message);
		}
		
		let ansSql="INSERT INTO mcqansweroptions(answer, questionid, isanswer) VALUES(?,?,?);"
	
		const keys = Object.keys(req.body.optnVal);
		for (let i = 0; i < keys.length; i++) {
			var key = keys[i];
			var arr=[req.body.optnVal[key], results.insertId, req.body.optnSelect[key]];
			connection.query(ansSql, arr, function(err, results, fields){
			if(err){
				console.log(err.message);
			}
			//console.log("maybe data",results.insertId);
		});
		}
		//console.log("maybe data",results.insertId);
	});
	
	
	

});	
	  
	data={msg:"sccessfully added updated question"};
	res.send(JSON.stringify(data));

});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
