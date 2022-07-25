import React from "react";
import { Button, Card,  Image } from "semantic-ui-react";
import LoadingComponent from "../../../layout/LoadingComponents";
import { IActivity } from "../../../models/activity";
import { useStore } from "../../../stores/store";


export default function ActivityDetails() {
    const {activityStore}= useStore();
    const {selectedActivity:activity,openForm,CancelSelectedActivity}=activityStore;
    if(!activity)return <LoadingComponent />;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>Matthew</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={()=>openForm(activity.id)} basic color="blue" content="Edit" />
                    <Button onClick={CancelSelectedActivity} basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    );
}