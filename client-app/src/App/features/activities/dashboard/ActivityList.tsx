import React from "react";
import { act } from "react-dom/test-utils";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface Props{
    activities:IActivity[];
    selectActivity:(id:string)=>void;
    DeleteActivity:(id:string)=>void;
}
export default function ActivityList({activities,selectActivity,DeleteActivity}:Props)
{
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(
                    activity=>
                    (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">{activity.title}</Item.Header>
                                <Item.Meta>{activity.date}</Item.Meta>
                                <Item.Description>
                                    <div>{activity.description}</div>
                                    <div>{activity.venue}, {activity.city}</div>
                                    </Item.Description>
                                    <Item.Extra>
                                        <Button onClick={()=>selectActivity(activity.id)} floated="right" content='View' color='blue'/>
                                        <Button onClick={()=>DeleteActivity(activity.id)} floated="right" content='Delete' color='red'/>
                                        <Label basic content={activity.category} />
                                    </Item.Extra>

                            </Item.Content>
                        </Item>
                    )
                )}
            </Item.Group>

        </Segment>
    );
}