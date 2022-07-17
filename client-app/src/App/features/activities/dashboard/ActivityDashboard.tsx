import React from "react";
import { Grid, List } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";

interface Props{
    activities:IActivity[];
}
export default function ActivityDashboard({activities}:Props )

{
    return (
        <Grid>
            <Grid.Column width='10'>
            <List >{activities.map(
          (data:IActivity)=>(<List.Item  key={data.id}>{data.title} </List.Item>)
                )}</List>       
            </Grid.Column>
        </Grid>
    );

}