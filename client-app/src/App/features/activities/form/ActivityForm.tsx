import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface Props
{
    activity:IActivity;
}
export default function ({activity}:Props){
    return (
        <Segment clearing>
        <Form>
            
                <Form.Input  label={activity.title} />
                <Form.Input  label={activity.description}  />
                <Form.Input  label={activity.category}  />
                <Form.Input  label={activity.date}  />
                <Form.Input  label={activity.city}  />
                <Form.Input  label={activity.venue}  />
                
            <Button floated="right" positive type="submit" content="Submit" />
            <Button floated="right"  type="button" content="Cancel" />
        </Form>
        </Segment>
    );
}