import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import { useStore } from "../../../stores/store";
interface Props
{
    CreateOrEdit:(activity:IActivity)=>void;
    submitting:boolean

}
export default function ActivityForm({CreateOrEdit,submitting}:Props){
     const {activityStore}=useStore();
     const {selectedActivity,closeForm}=activityStore;
    const initialState= selectedActivity?? { 
        id:'',
        title:'',
        date:'',
        description:'',
        category:'',
        city:'',
         
        venue:''
     }
     const [activity,setActivity]=useState(initialState);

     function handleSubmit()
     {CreateOrEdit(activity);
     }
     function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
     {
        const{name,value}=event.target;
        setActivity({...activity,[name]:value});

     }
    return (
        <Segment clearing>
        <Form onSubmit={handleSubmit} autoComplete='off'>
            
                <input  name="title" value={activity.title} onChange={handleInputChange} placeholder="title"  />
                <textarea  placeholder="description" name="description" value={activity.description}  onChange={handleInputChange} />
                <input type='text' placeholder="category" name="category" value={activity.category}  onChange={handleInputChange} />
                <input   type='date'  placeholder="date"  name="date" value={activity.date} onChange={handleInputChange} />
                <input   type='text' placeholder='city'   name='city' value={activity.city}   onChange={handleInputChange}/>
                <input   type='text' placeholder='venue'  name='venue' value={activity.venue}  onChange={handleInputChange} />
                
            <Button  loading={submitting} floated="right" positive type="submit" content="Submit" />
            <Button onClick={closeForm} floated="right"  type="button" content="Cancel" />
        </Form>
        </Segment>
    );
}