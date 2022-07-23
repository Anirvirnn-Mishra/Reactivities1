import React from "react";
import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props{
    activities:IActivity[];
    selectedActivity:IActivity |undefined;
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    editMode:boolean;
    openForm:(id:string)=>void;
    closeForm:()=>void;
    CreateOrEdit:(activity:IActivity)=>void;
    DeleteActivity:(id:string)=>void;
    submitting:boolean
}
export default function ActivityDashboard({activities,selectActivity,selectedActivity,cancelSelectActivity,editMode,openForm,closeForm,CreateOrEdit,DeleteActivity, submitting
}:Props )

{
    return (
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activities={activities} selectActivity={selectActivity} DeleteActivity={DeleteActivity} />
                
            </Grid.Column>
            <Grid.Column width={6}>
                {selectedActivity  && !editMode &&
                <ActivityDetails 
                    activity={selectedActivity} 
                    cancelSelectActivity={cancelSelectActivity}
                    openForm={openForm}
                     />}       
                 {editMode
                 &&
                    <ActivityForm closeForm={closeForm} activity={selectedActivity} 
                CreateOrEdit={CreateOrEdit} 
                submitting={submitting}
                    />}

            </Grid.Column>
        </Grid>
    );

}