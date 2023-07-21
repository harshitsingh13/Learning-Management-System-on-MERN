import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import pfimg from "./img/prof.png"
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux'
import {Routes, Route, useNavigate} from 'react-router-dom';
import { addUser, deleteUser, updateAllUsers } from './Store/slices/slice'
import { addUserData, updateUserData } from './Store/slices/jsonslice'
import { useQuill } from 'react-quilljs';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css';
import { Outlet, Link } from "react-router-dom";
 
//import store from './Store'
let flag=true;

let editIdx=-1;

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

//var optn={"Option-1":false,"Option-2":false}
//var optnList={"Option-1":"none","Option-2":"none"}
var optn={}
var optnList={}
let alltopics=[]
var alluser={}
let btntext="save";
let jsondata={}
let getId=-1;
const modules = {
        toolbar: [
        ['bold', 'italic', 'underline','list'],
        [{ list: 'ordered'}, { list: 'bullet' }]
        ],
    };


export default function TestQuestion() {

	const { register, handlesubmit, formState: { errors } } = useForm();
	const {state} = useLocation();
	const navigate = useNavigate();
	
	const { oldOptn, optionsList, optionsResp, edId, edtype, eddescription, edtopicid,
 edcomplexityid,
 edactive,
 edparentqnid,
 edsoftdel,
 edimpressioncount,
 edsuccesscount,
 edcreatedby,
 edmodifiedby } = state;
//console.log("my state ",oldOptn)

dummy={type:edtype,
 description:eddescription,
 topicid:edtopicid,
 complexityid:edcomplexityid,
 active:edactive,
 parentqnid:edId,
 softdel:edsoftdel,
 impressioncount:edimpressioncount,
 successcount:edsuccesscount,
 createdby:edcreatedby,
 question:eddescription,
 modifiedby:"Harshit"};
 
if(flag){
	let c=1;
	for(let i in optionsList){
		optnList = { ...optnList, ["Option-"+c]: optionsList[i]};
		// var addItem="Option-"+c
		// editOptn.push(addItem);
		c+=1;
	}
	
	c=1;
	for(let i in optionsResp){
		if(optionsResp[i]==1)
			optn = { ...optn, ["Option-"+c]: true};
		else
			optn = { ...optn, ["Option-"+c]: false};
		c+=1;
	}
	flag=false;
}

	//redux components and defined states
	const dispatch = useDispatch();
	const userList = useSelector(state => state.counter.userList);
	
	//const subscription = useSelector(state => state.getEmptySubscription);
	const [subscription, setSub] = useState(getEmptySubscription());
	
	console.log("new data",subscription)
    //const [count, setElement] = useState(["Option-1","Option-2"]);
	const [count, setElement] = useState(oldOptn);
	

    const { quill, quillRef } = useQuill({modules});
	
	const { title, titleRef } = useQuill();
	
    const [val,setVal]=React.useState("");
	
	//const [titleval,setTitleVal]=React.useState();
	
	//const [descValue, setDescValue] = useState(subscription.description);
	

    React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        console.log('Text change for description!');
        console.log(quill.getText()); // Get text only
        setVal(quill.getText());
		//quill.clipboard.dangerouslyPasteHTML("harshit");
		//dispatch(addUserData({key:"description", value:quill.getText().slice(0,quill.getText().length-1)}));	
      });
    }
	}, [quill]);
	
	function addListItem() {
		setElement(function (prevCount) {
			const newList=[...prevCount];
			newList.push("Option-"+parseInt(prevCount.length+1));
			optn = { ...optn, ["Option-"+parseInt(prevCount.length+1)]: false};
			optnList = { ...optnList, ["Option-"+parseInt(prevCount.length+1)]: "none"};
			
			console.log("myoptions",optnList)
			return newList;
		});
	}

	function deleteListItem() {
		setElement(function (prevCount) {
			const newList=[...prevCount];
			let item=String(newList[newList.length-1]);
			//delete optn.item;
			optn= Object.fromEntries(Object.entries(optn).slice(0,  Object.keys(optn).length-1))
			optnList= Object.fromEntries(Object.entries(optnList).slice(0,  Object.keys(optnList).length-1))
			
			newList.splice(newList.length-1, 1);
			console.log("myoptions-delete",optnList,"key ",item)
			return newList;
		  
		});
	}
	  
    function handleChange(event){
		
		//event.preventDefault();
		console.log('checked '+event.target.name+" "+event.target.value);
		let keyData=event.target.name;
		let valueData="";
		
		if(event.target.type=="checkbox"){
			if (event.currentTarget.checked) {
				//alert('checked');
				optn = { ...optn, [event.target.value]: true};
				//alert(typeof(event.target.value))
			} else {
				//alert('not checked');
				optn = { ...optn, [event.target.value]: false};
				//alert(typeof(event.target.value))
			}
		}
		
		else if(event.target.id=="optionValue"){
			let str=event.target.name;
			//if(str!="Option"
			optnList[str]=event.target.value;
			
			//alert(typeof(event.target.value))
			console.log("value in options",optnList,"key",event.target.name)
			
		}
		
		else if(keyData=="description")
			valueData=val;
		else{
			//alert("hit");
			valueData=event.target.value;
			
		}
			
		//dispatch(addUserData({key:keyData, value:valueData}));
		setSub(function (prevCount) {
			let newitem=prevCount;
			newitem[keyData]=valueData;
			return newitem;
		  
		});
		//dummy[event.target.name]=valueData;
		console.log("updated", subscription)
		//dispatch(addUserData({key:keyData, value:valueData}));
		
    }
    function getEmptySubscription() {
        return dummy;
    }
	
    function handleSubmit(event){
        event.preventDefault();
		//alert("len "+userList.length)
        console.log("data after clicking submit/update button", subscription)
		
		if(btntext=="update"){
			
			
		}
		else{	
		
			console.log("final options",count)
			console.log("final options list",optnList)
			console.log("final options resp",optn)
			
			//adding data to database
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({...subscription, "optnSelect":optn,"optnVal":optnList, "parentQtId":edId})
			};
			
			fetch('http://localhost:3001/addQuestion', requestOptions)
			.then(response => response.json())
			.then(data => {
				console.log("resp", data)
			});
		
			//fetching data from database
			// fetch('http://localhost:3001/getQuestion')
			  // .then(response => response.json())
			  // .then(data => {
				// console.log("Database checked after adding patient: ",data);
				// alluser=data;
				// dispatch(updateAllUsers(data));
				
			  // });
			  
			//making current user data empty
			// dispatch(updateUserData(getEmptySubscription()));
			
			/*requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({"id":edId})
			};*/
			
			fetch('http://localhost:3001/updateQuestionStatus/'+subscription.parentqnid)
			.then(response => response.json())
			.then(data => {
				console.log("resp updated", data)
			});
			
			//fetching data from database
			fetch('http://localhost:3001/getQuestion')
			  .then(response => response.json())
			  .then(data => {
				console.log("Database checked after updating question status: ",data);
				alluser=data;
				//alert(data);
				dispatch(updateAllUsers(data));
				
			  });
		
			console.log("subscription ", subscription)
			navigate('/tests');
			//dispatch(updateUserData(getEmptySubscription()));
		}
	}
	
	
	//updated topic list
	React.useEffect(() => {
	  //fetching data from database
			fetch('http://localhost:3001/getTopic')
			  .then(response => response.json())
			  .then(data => {
				  alltopics=data;
				//alert(data);
				dispatch(updateAllUsers(data));
				console.log("Database checked for available topics: ",data);
				
			  });
	 }, []);
	
    return (
		<div class="body">
		
		<div class="text2">Add Question</div>
		<table>
		<tr>
		<th>
		<label for="topicid" class="lb1">Topic</label>
		<select  class="box1" placeholder="Select topic" name="topicid" value={subscription.topicid} onChange={handleChange} required>
		<option>Select topic</option>
		{alltopics.map((item, index) => (
			<option value={item.id}>{item.name}</option>
		))}
        </select>
		</th>
		
		<th>
		<label for="complexityid" class="lb2">Level</label>
		<select class="box2" placeholder="Select level" name="complexityid" value={subscription.complexityid} onChange={handleChange} required>
		<option>Select</option>
		<option value={1}>Easy</option>
        <option value={2}>Medium</option> 
		<option value={3}>Hard</option> 
        </select>
		</th>
		</tr>
		
		<tr>
		<th>
		<label for="active" class="lb11">Status</label>
		<select  class="box1" placeholder="Select status" name="active" value={subscription.active} onChange={handleChange} required>
        <option value={true}>Published</option>
		<option value={false}>Un-published</option> 
        </select>
		</th>
		
		<th>
		<label for="mcqtype" class="lb22">Type</label>
		<select  class="box2" placeholder="Select level" name="mcqtype" required>
        <option value={1}>Single Select</option>
        <option value={2}>Multi-Select</option> 
        </select>
		</th>
		</tr>
		</table>
		
		<label for="question" class="lb11"><b>Question</b></label>
		<div>
			<input type="text" defaultValue={subscription.question} onChange={handleChange} class="desc2" name="question"/>
		</div>
		
		
		<label for="description" class="lb11"><b>Description</b></label>
		<div class="desc1">
		   <div ref={quillRef} name="description"/>
		</div>
		
		<label for="myfile" class="lb4"><b>Attachment</b></label><br/>
		<input type="file" class="box4" id="myfile" name="myfile"/>
		
		<label for="option" class="lb3"><b>Options</b></label>
			<div className="list-container">
			{count.map((item, index) => (
			<div key={index}>
			<table>
			<tr>
			<th><input value={item} id={"checkbox-"+item} type="checkbox" defaultChecked={optn[item]} class="checkbox" onChange={handleChange}/></th>
			<th><input type="text" class="box3" placeholder={item} defaultValue={optnList[item]} id="optionValue" name={item} onChange={handleChange} required/></th>
			</tr>
			</table>
			</div>
			))}
			</div>
			<br/><button class='btn1' onClick={addListItem}>Add options</button>
			<button class='btn1' onClick={deleteListItem}>Delete options</button><br/>
		
		<button type="button" class="save" onClick={handleSubmit} name="button">Update</button>
		
	<Outlet/>
	</div>

    )



}