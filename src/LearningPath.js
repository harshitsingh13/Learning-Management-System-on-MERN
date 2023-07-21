import React, {useEffect, useState , createContext } from "react";
import pfimg from "./img/prof.png"
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
import { addUser, deleteUser, updateAllUsers } from './Store/slices/slice'
import { addUserData, updateUserData } from './Store/slices/jsonslice'
import {Routes, Route, useNavigate} from 'react-router-dom';
import TestQuestion from './TestQuestion';
import Subscription from './Subscription';

import { BsFillTrashFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";

import Icon from "react-crud-icons";
import { BsFillPencilFill} from "react-icons/bs";
import { Outlet, Link } from "react-router-dom";
//import "react-crud-icons/dist/react-crud-icons.css";

//import store from './Store'

let editIdx=-1;
//let count=1;
var lpconfig={id:null,
 type:1,
 moduleid:1,
 topicid:null,
 complexityid:null,
 questionscount:null,
 learningpathid:1,
 duration:null,
 marks:null,
 orderno:1};

var optn={"Option-1":false,"Option-2":false}
var optnList={"Option-1":"none","Option-2":"none"}
var alltopics=[]
let btntext="save";
let jsondata={}
let getId=-1;
let compArr=["Easy","Medium","Hard"]
let topArr=["Topic-1","Topic-2"]
let optnArr=[]
let optnRespArr=[]
let topicname="";
var configList=[]
let c=1;

//window.location.reload();
export default function LearningPath() {

	//const navigate = useNavigate();
	const dispatch = useDispatch();
	const userList = useSelector(state => state.counter.userList);
	
	const navigate = useNavigate();
	
	const [searchVal,setSearchVal]=React.useState("");
	const [count, setElement] = useState(["Option-1"]);
	
	const [dum,setDum]=React.useState(["Dummy-1", "Dummy-2", "Dummy-3"]);
	
	
	function handleChangeVal(event){
		//alert('checked '+event.target.name+ event.target.value);
		let keyData=event.target.name;
		let valueData="";
		
		if(keyData=="topicid"){
			topicname=event.target.value.slice(1,event.target.value.length);
			lpconfig={...lpconfig, [event.target.name]:event.target.value.slice(0,1)};
		}
			
		else
			lpconfig={...lpconfig, [event.target.name]:event.target.value};
		
    }
	
	React.useEffect(() => {
	  fetch('http://localhost:3001/getTopic')
			  .then(response => response.json())
			  .then(data => {
				  alltopics=data;
				//alert(data);
				dispatch(updateAllUsers(data));
				console.log("Database checked for available topics: ",data);
				
			  });
			  

	}, []);
	
	console.log("all topics", userList);
	
	//fetching data from database
			// fetch('http://localhost:3001/getQuestion')
			  // .then(response => response.json())
			  // .then(data => {
				// console.log("Database checked after updating patient: ",data);
				// alluser=data;
				// dispatch(updateAllUsers(data));
				
			  // });
			  
			// dispatch(addUserData({key:"btntext", value:"Book Appointment"}));
			
	function addListItem() {
			 
		setElement(function (prevCount) {
			const newList=[...prevCount];
			newList.push("Option-"+parseInt(prevCount.length+1));
			return newList;
		});
	}

	function deleteListItem(event) {
		event.preventDefault();
		//alert("index value "+event.target.getAttribute("data-value"));
		setElement(function (prevCount) {
			const newList=[...prevCount];
			let item=String(newList[newList.length-1]);
			newList.splice(newList.length-1, 1);
			return newList;
		  
		});
	}
	
	function handleChange(event){
		setSearchVal(event.target.value);
	}
	
	function handleDeleteconfig(event){
		event.preventDefault();
		alert("index value "+event.target.getAttribute("data-value"))
	}
	
	function handleSave(event){
		event.preventDefault();
			
			//adding data to database
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(lpconfig)
			};
			
			fetch('http://localhost:3001/addModuleConfig', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log("resp", "your data is added successfully")
				editIdx=data.grab;
				lpconfig={...lpconfig, "id":editIdx};
				console.log("new id", editIdx);
				//configList.push(lpconfig)
			});
		
			//fetching data from database
			fetch('http://localhost:3001/getTopic')
			  .then(response => response.json())
			  .then(data => {
				  alltopics=data;
				//alert(data);
				dispatch(updateAllUsers(data));
				console.log("Database checked for available topics: ",data);
				
			  });
			  
			  
			configList.push(lpconfig)
			lpconfig={id:null,
				 type:1,
				 moduleid:1,
				 topicid:null,
				 complexityid:null,
				 questionscount:null,
				 learningpathid:1,
				 duration:null,
				 marks:null,
				 orderno:1}
	}
	
	
	 //console.log("new lpconfig ",lpconfig)
	
    return (
	<>
	<div class="body">
		
		
		<div class="display">
		<div class="lptext1">Learning Path</div>
		<input type="text" name="search" class="searchbarLP" value={searchVal} onChange={handleChange} placeholder="Search"></input>
		<button type="button" class="testAddbtn"  name="button"><div class="testAddbtntext"><Link to="/" class="link">Create Test</Link></div></button>
		</div>
		
		<div class="sectionRow">
		
		<div class="display">
		<label class="secHead"><b>HTML</b></label>
		<button class="addTopic" onClick={addListItem}>+ Add Topic</button>
		</div>
		
		
		
		<div>
		<table class="dataBox">
		<tr class="dataBox">
		<div class="icon"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M1.3238 10.286C1.7978 10.286 2.1808 10.669 2.1808 11.143C2.1808 11.616 1.7978 12 1.3238 12C0.850797 12 0.466797 11.616 0.466797 11.143C0.466797 10.669 0.850797 10.286 1.3238 10.286ZM5.6098 10.286C6.0828 10.286 6.4668 10.669 6.4668 11.143C6.4668 11.616 6.0828 12 5.6098 12C5.1358 12 4.7528 11.616 4.7528 11.143C4.7528 10.669 5.1358 10.286 5.6098 10.286ZM1.3238 6.857C1.7978 6.857 2.1808 7.241 2.1808 7.714C2.1808 8.188 1.7978 8.571 1.3238 8.571C0.850797 8.571 0.466797 8.188 0.466797 7.714C0.466797 7.241 0.850797 6.857 1.3238 6.857ZM5.6098 6.857C6.0828 6.857 6.4668 7.241 6.4668 7.714C6.4668 8.188 6.0828 8.571 5.6098 8.571C5.1358 8.571 4.7528 8.188 4.7528 7.714C4.7528 7.241 5.1358 6.857 5.6098 6.857ZM1.3238 3.43C1.7978 3.43 2.1808 3.813 2.1808 4.287C2.1808 4.76 1.7978 5.144 1.3238 5.144C0.850797 5.144 0.466797 4.76 0.466797 4.287C0.466797 3.813 0.850797 3.43 1.3238 3.43ZM5.6098 3.43C6.0828 3.43 6.4668 3.813 6.4668 4.287C6.4668 4.76 6.0828 5.144 5.6098 5.144C5.1358 5.144 4.7528 4.76 4.7528 4.287C4.7528 3.813 5.1358 3.43 5.6098 3.43ZM1.3238 0C1.7978 0 2.1808 0.384 2.1808 0.857C2.1808 1.331 1.7978 1.714 1.3238 1.714C0.850797 1.714 0.466797 1.331 0.466797 0.857C0.466797 0.384 0.850797 0 1.3238 0ZM5.6098 0C6.0828 0 6.4668 0.384 6.4668 0.857C6.4668 1.331 6.0828 1.714 5.6098 1.714C5.1358 1.714 4.7528 1.331 4.7528 0.857C4.7528 0.384 5.1358 0 5.6098 0Z" fill="#26344A"/>
		</svg>
		</div>
		<th class="column1">Topic</th>
		<th class="column2">Level</th>
		<th class="column3">Questions</th>
		<th class="column4">Marks</th>
		<th class="column5">Duration</th>
		<th class="column6">Save & Delete</th>
		</tr>
					
					{configList.map((item, index) => (
					<tr class="dataBox">
					
						<div class="icon"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M1.3238 10.286C1.7978 10.286 2.1808 10.669 2.1808 11.143C2.1808 11.616 1.7978 12 1.3238 12C0.850797 12 0.466797 11.616 0.466797 11.143C0.466797 10.669 0.850797 10.286 1.3238 10.286ZM5.6098 10.286C6.0828 10.286 6.4668 10.669 6.4668 11.143C6.4668 11.616 6.0828 12 5.6098 12C5.1358 12 4.7528 11.616 4.7528 11.143C4.7528 10.669 5.1358 10.286 5.6098 10.286ZM1.3238 6.857C1.7978 6.857 2.1808 7.241 2.1808 7.714C2.1808 8.188 1.7978 8.571 1.3238 8.571C0.850797 8.571 0.466797 8.188 0.466797 7.714C0.466797 7.241 0.850797 6.857 1.3238 6.857ZM5.6098 6.857C6.0828 6.857 6.4668 7.241 6.4668 7.714C6.4668 8.188 6.0828 8.571 5.6098 8.571C5.1358 8.571 4.7528 8.188 4.7528 7.714C4.7528 7.241 5.1358 6.857 5.6098 6.857ZM1.3238 3.43C1.7978 3.43 2.1808 3.813 2.1808 4.287C2.1808 4.76 1.7978 5.144 1.3238 5.144C0.850797 5.144 0.466797 4.76 0.466797 4.287C0.466797 3.813 0.850797 3.43 1.3238 3.43ZM5.6098 3.43C6.0828 3.43 6.4668 3.813 6.4668 4.287C6.4668 4.76 6.0828 5.144 5.6098 5.144C5.1358 5.144 4.7528 4.76 4.7528 4.287C4.7528 3.813 5.1358 3.43 5.6098 3.43ZM1.3238 0C1.7978 0 2.1808 0.384 2.1808 0.857C2.1808 1.331 1.7978 1.714 1.3238 1.714C0.850797 1.714 0.466797 1.331 0.466797 0.857C0.466797 0.384 0.850797 0 1.3238 0ZM5.6098 0C6.0828 0 6.4668 0.384 6.4668 0.857C6.4668 1.331 6.0828 1.714 5.6098 1.714C5.1358 1.714 4.7528 1.331 4.7528 0.857C4.7528 0.384 5.1358 0 5.6098 0Z" fill="#26344A"/>
						</svg>
						</div>
						
						
						<td>
						<label>{topicname}</label>
						</td>
						
						<td>
						<label>{compArr[item.complexityid-1]}</label>
						</td>
						
						<td>
						<label>{item.questionscount}</label>
						</td>
						
						<td>
						<label>{item.marks}</label>
						</td>
						
						<td>
						<label>{item.duration}h</label>
						</td>
						
						<td>
						<BsFillTrashFill class="LPtxt6" data-value={item.questionscount} onClick={handleDeleteconfig}/>
						</td>
					
					</tr>
					))}
					
		
					{count.map((item, index) => (
					<tr class="dataBox">
					
						<div class="icon"><svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd" d="M1.3238 10.286C1.7978 10.286 2.1808 10.669 2.1808 11.143C2.1808 11.616 1.7978 12 1.3238 12C0.850797 12 0.466797 11.616 0.466797 11.143C0.466797 10.669 0.850797 10.286 1.3238 10.286ZM5.6098 10.286C6.0828 10.286 6.4668 10.669 6.4668 11.143C6.4668 11.616 6.0828 12 5.6098 12C5.1358 12 4.7528 11.616 4.7528 11.143C4.7528 10.669 5.1358 10.286 5.6098 10.286ZM1.3238 6.857C1.7978 6.857 2.1808 7.241 2.1808 7.714C2.1808 8.188 1.7978 8.571 1.3238 8.571C0.850797 8.571 0.466797 8.188 0.466797 7.714C0.466797 7.241 0.850797 6.857 1.3238 6.857ZM5.6098 6.857C6.0828 6.857 6.4668 7.241 6.4668 7.714C6.4668 8.188 6.0828 8.571 5.6098 8.571C5.1358 8.571 4.7528 8.188 4.7528 7.714C4.7528 7.241 5.1358 6.857 5.6098 6.857ZM1.3238 3.43C1.7978 3.43 2.1808 3.813 2.1808 4.287C2.1808 4.76 1.7978 5.144 1.3238 5.144C0.850797 5.144 0.466797 4.76 0.466797 4.287C0.466797 3.813 0.850797 3.43 1.3238 3.43ZM5.6098 3.43C6.0828 3.43 6.4668 3.813 6.4668 4.287C6.4668 4.76 6.0828 5.144 5.6098 5.144C5.1358 5.144 4.7528 4.76 4.7528 4.287C4.7528 3.813 5.1358 3.43 5.6098 3.43ZM1.3238 0C1.7978 0 2.1808 0.384 2.1808 0.857C2.1808 1.331 1.7978 1.714 1.3238 1.714C0.850797 1.714 0.466797 1.331 0.466797 0.857C0.466797 0.384 0.850797 0 1.3238 0ZM5.6098 0C6.0828 0 6.4668 0.384 6.4668 0.857C6.4668 1.331 6.0828 1.714 5.6098 1.714C5.1358 1.714 4.7528 1.331 4.7528 0.857C4.7528 0.384 5.1358 0 5.6098 0Z" fill="#26344A"/>
						</svg>
						</div>
						
						
						<td>
						<select  class="LPbox1" placeholder="Select topic" name="topicid" onChange={handleChangeVal} required>
						<option><b>Select Topic</b></option>
						{alltopics.map((item, index) => (
							<option value={item.id+item.name}>{item.name}</option>
						))} 
						</select>
						</td>
						
						<td>
						<select  class="LPbox2" placeholder="Select level" name="complexityid" onChange={handleChangeVal} required>
						<option>Select Level</option>
						<option value={1}>Easy</option>
						<option value={2}>Medium</option> 
						<option value={3}>Hard</option> 
						</select>
						</td>
						
						<td>
						<input type="Number" placeholder="0" name="questionscount" value={lpconfig.questionscount} onChange={handleChangeVal} class="LPtxt3"/>
						</td>
						
						<td>
						<input type="Number" placeholder="Marks" name="marks" value={lpconfig.marks} onChange={handleChangeVal} class="LPtxt4"/>
						</td>
						
						<td>
						<input type="Number" placeholder="Duration" name="duration" value={lpconfig.duration} onChange={handleChangeVal} class="LPtxt5"/>
						</td>
						
						<td>
						<BsCheckLg class="LPtxt7" value={{"type":1, "moduleid":2}} onClick={handleSave}/>
						<BsFillTrashFill class="LPtxt6" data-value={item.id} onClick={deleteListItem}/>
						</td>
					
					</tr>
					))}
					
					
		
		
		</table>
		
		</div>
		
		
		
		
	</div>
	</div>
	<Outlet/>
	
	
</>
    )



}
