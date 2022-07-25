import {makeAutoObservable,runInAction}  from 'mobx';
import agent from '../api/agent';
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

}