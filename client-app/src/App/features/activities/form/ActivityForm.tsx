import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../models/activity";
interface Props
{
    activity:IActivity|undefined;
    closeForm:()=>void;

}
export default function ({activity,closeForm}:Props){
    return (
        <Segment clearing>
        <Form>
            
                <Form.Input  label="title" />
                <Form.Input  label="description"  />
                <Form.Input  label="category"  />
                <Form.Input  label="date"  />
                <Form.Input  label='city'  />
                <Form.Input  label='venue'  />
                
            <Button floated="right" positive type="submit" content="Submit" />
            <Button onClick={closeForm} floated="right"  type="button" content="Cancel" />
        </Form>
        </Segment>
    );
}