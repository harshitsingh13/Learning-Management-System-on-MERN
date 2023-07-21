import React, {useEffect, useState , createContext } from "react";
import pfimg from "./img/prof.png"
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
import { addUser, deleteUser, updateAllUsers } from './Store/slices/slice'
import { addUserData, updateUserData } from './Store/slices/jsonslice'
import {Routes, Route, useNavigate} from 'react-router-dom';
import TestQuestion from './TestQuestion';
import question from './question.json'
import Subscription from './Subscription';

import Icon from "react-crud-icons";
import { BsFillPencilFill} from "react-icons/bs";
import { Outlet, Link } from "react-router-dom";
//import "react-crud-icons/dist/react-crud-icons.css";

//import store from './Store'

let editIdx=-1;
//let count=1;
var dummy={type:1,
 description:"question",
 topicid:0,
 complexityid:0,
 active:true,
 parentqnid:null,
 softdel:0,
 impressioncount:null,
 successcount:null,
 createdby:"Harshit",
 question:null,
 modifiedby:null};

var optn={"Option-1":false,"Option-2":false}
var optnList={"Option-1":"none","Option-2":"none"}
var alluser={}
var topiclist={};
let btntext="save";
let jsondata={}
let getId=-1;
let compArr=["Easy","Medium","Hard"]
let topArr=["Topic-1","Topic-2"]
let optnArr=[]
let optnRespArr=[]
var editOptn=[]
var alltopics=[]
let c=1;

export default function Listpage() {
	//window.location.reload();
	//const navigate = useNavigate();
	const dispatch = useDispatch();
	const userList = useSelector(state => state.counter.userList);
	
	const navigate = useNavigate();
	
	const [searchVal,setSearchVal]=React.useState("");
	
	function handleDelete(event){
        event.preventDefault();
        
		let idx=event.target.value;
		
		//deleting data from database
		const requestOptions = {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({id:userList[idx].id})
			};
			
			fetch('http://localhost:3001/deleteQuestion', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log("resp", data)
			});
		
		fetch('http://localhost:3001/getQuestion')
		  .then(response => response.json())
		  .then(data => {
			console.log("Database checked after deletion: ",data);
			alluser=data;
			//alert(data);
			dispatch(updateAllUsers(data));
			
		  });

	}
	
	React.useEffect(() => {
		
	  fetch('http://localhost:3001/getQuestion')
			  .then(response => response.json())
			  .then(data => {
				console.log("Database checked for available questions: ",data);
				alluser=data;
				dispatch(updateAllUsers(data));
				
			  });
			  
		fetch('http://localhost:3001/getTopic')
			  .then(response => response.json())
			  .then(data => {
				  alltopics=data;
				  for(let i in data){
					  topiclist[data[i].id]=data[i].name;
				  }
				console.log("Database checked for available topics: ",data);
				console.log("new topic list ",topiclist);
			  });
			  
		
			  

	}, []);
	
	//fetching data from database
			// fetch('http://localhost:3001/getQuestion')
			  // .then(response => response.json())
			  // .then(data => {
				// console.log("Database checked for available questions: ",data);
				// alluser=data;
				// dispatch(updateAllUsers(data));
				
			  // });
			  
			
	function handleChange(event){
		setSearchVal(event.target.value);
	}
	
	
	function handleEdit(event){
        event.preventDefault();
        console.log("after edit", userList)
		//alert("id check "+event.target.getAttribute("data-value"))
		//window.location.href="/addQuestion";
		let idx=event.target.value;
		
		/*const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({id:userList[idx].id})
			};
			
			fetch('http://localhost:3001/updateQuestionStatus', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log("resp", data)
			});*/
			
			//fetching data from database
			fetch('http://localhost:3001/getQuestion')
			  .then(response => response.json())
			  .then(data => {
				console.log("Database checked after updating question status: ",data);
				alluser=data;
				//alert(data);
				dispatch(updateAllUsers(data));
				
			  });
		
			
			fetch('http://localhost:3001/getMcqOptions/'+userList[idx].id)
			.then(response => response.json())
			.then(data => {
				for(let i in data){
					optnArr.push(data[i].answer);
					optnRespArr.push(data[i].isanswer);
					editOptn.push("Option-"+c);
					c+=1;
				}
				
				//console.log("mcq options", editOptn);
				navigate('/editQuestion', { state: {oldOptn: editOptn, optionsList:optnArr, optionsResp:optnRespArr,
				edId:userList[idx].id,
				edtype:userList[idx].type,
				 eddescription:userList[idx].description,
				 edtopicid:userList[idx].topicid,
				 edcomplexityid:userList[idx].complexityid,
				 edactive:userList[idx].active,
				 edparentqnid:userList[idx].parentid,
				 edsoftdel:userList[idx].softdel,
				 edimpressioncount:userList[idx].impressioncount,
				 edsuccesscount:userList[idx].successcount,
				 edcreatedby:userList[idx].createdby,
				 edmodifiedby:userList[idx].modifiedby} });
				//console.log("mcq options", data)
			});
    }
	
	
    return (
	<>
		<div class="body">
		
		<div class="display">
		<div class="testText1">MCQ Challenges</div>
		<input type="text" name="search" class="searchbar" value={searchVal} onChange={handleChange} placeholder="Search"></input>
		<button type="button" class="testAddbtn"  name="button"><div class="testAddbtntext"><Link to="/addQuestion" class="link">Add Question</Link></div></button>
		</div>
		
		<table class="testQuestionbar1">
		<thead>
		<tr>
		<th class="testText2">question name</th>
		<th class="testText3">topic</th>
		<th class="testText4">level</th>
		<th class="testText5">Edit</th>
		</tr>
		</thead>
		<tbody>
		
		{userList.filter((qn)=>{
			console.log("ques ",qn.description);
                            return qn.description.toLowerCase().includes(searchVal.toLowerCase());
                        }).map((item, index) => (
					<tr key={index}  class="table">
					
					
						<td class="col1">
						{item.description}
						</td>
						<td class="col2">
						{topiclist[item.topicid]}
						</td>
						<td class="col3">
						{compArr[item.complexityid-1]}
						</td>
						<td><button type="button" class="btnEdit" onClick={handleEdit} value={index}>Edit</button></td>
						
					
					</tr>))}
		
		
		</tbody>
		</table>
		
		
		
	</div>
	<Outlet/>
	
	
</>
    )



}
