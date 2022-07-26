import {makeAutoObservable,runInAction}  from 'mobx';
import agent from '../api/agent';
import {v4 as uuid}  from 'uuid';
import { IActivity } from '../models/activity';
export default class ActivityStore
{
    activityRegistery= new Map<string,IActivity>();
    selectedActivity:IActivity|undefined=undefined;
    editMode=false;
    loading=false;
    loadingInitial=true;

    constructor ()
    {
        makeAutoObservable(this);
    }

get activitiesByDate()
{
  return Array.from(this.activityRegistery.values()).sort((a,b)=>Date.parse(a.date)-Date.parse(b.date))
}

    loadActivities=async ()=>
    {
        this.SetloadingInitial(true);
        try{
            const activities= await agent.Activities.list();
                activities.forEach(activity=>
                    {
                      activity.date=activity.date.split('T')[0];
                      this.activityRegistery.set(activity.id,activity);
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
    this.selectedActivity=this.activityRegistery.get(id);
         
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
        this.activityRegistery.set(activity.id,activity);
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
      this.activityRegistery.set(activity.id,activity);
      this.selectedActivity=activity;
      this.editMode=false;
      this.loading=false;
      });
    } catch (error) {
      console.log(error);
      runInAction(()=>{this.loading=false;})

    }
  }
  deleteActivity=async (id:string)=>{
    
    this.loading=true;
    try {
      await agent.Activities.delete(id);
      runInAction(()=>{
        this.activityRegistery.delete(id);
        if(this.selectedActivity?.id===id)this.CancelSelectedActivity();
        this.loading=false;
        
      })
    } catch (error) {
      console.log(error);
      this.loading=false;
      
    }
  }
  
}