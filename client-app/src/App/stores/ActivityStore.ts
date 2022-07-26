import {makeAutoObservable,runInAction}  from 'mobx';
import agent from '../api/agent';
import {v4 as uuid}  from 'uuid';
import { IActivity } from '../models/activity';
export default class ActivityStore
{
    activities:IActivity[]=[];
    selectedActivity:IActivity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=false;

    constructor ()
    {
        makeAutoObservable(this);
    }
    loadActivities=async ()=>
    {
        this.SetloadingInitial(true);
        try{
            const activities= await agent.Activities.list();

                activities.forEach(activity=>
                    {
                      activity.date=activity.date.split('T')[0];
                      this.activities.push(activity);
                    }
      
                    );
                    this.SetloadingInitial(false);
            


        }
        catch(error){
            console.error(error);
    this.SetloadingInitial(false);
            
        }
    }



    
     SetloadingInitial=(state:boolean)=>{
        this.loadingInitial=state;
    }

    SelectActivity=(id:string)=>
    {
    this.selectedActivity=this.activities.find(c=>c.id===id);
         
    }
    
  CancelSelectedActivity=()=>{ 
    
  this.selectedActivity=undefined;

  };
  openForm=(id?:string )=>{
    id?this.SelectActivity(id):this.CancelSelectedActivity();
    this.editMode=true;
  }
  closeForm=()=>{
    this.editMode=false;
  }
  createActivity=async (activity:IActivity)=>

  {
    this.loading=true;
    activity.id=uuid();
    try {
      await agent.Activities.create(activity);
      runInAction(()=>{
        this.activities.push(activity);
        this.selectedActivity=activity;
        this.editMode=false;
        this.loading=false;
      })
    } catch (error) {
      console.log(error);
      runInAction(()=>{this.loading=false;
      });
    }

  }
  updateActivity= async(activity:IActivity)=>
  {
    this.loading=true;
    try {
      await agent.Activities.update(activity);
      runInAction(()=>{
      this.activities=[...this.activities.filter(x=>x.id!==activity.id),activity];
      this.selectedActivity=activity;
      this.editMode=false;
      this.loading=false;
      });
    } catch (error) {
      console.log(error);
      runInAction(()=>{this.loading=false;})

    }
  }
  
}