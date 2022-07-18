import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
export default function (){
    return (
        <Segment clearing>
        <Form>
            
                <Form.Input  label="Title"  />
                <Form.Input  label="Description"  />
                <Form.Input  label="Category"  />
                <Form.Input  label="Date"  />
                <Form.Input  label="City"  />
                <Form.Input  label="Venue"  />
                
            <Button floated="right" positive type="submit" content="Submit" />
            <Button floated="right"  type="button" content="Cancel" />
        </Form>
        </Segment>
    );
}