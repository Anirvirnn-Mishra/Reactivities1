import { observer } from "mobx-react-lite";
import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const {activityStore}=useStore();

    return (
         <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} header to='/' active >
                    <img src="/assets/logo.png" alt="logo"  style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/actvities' />    
                <Menu.Item>
<Button color="green" content="Create Activity" as={NavLink} to='/createActivity' />

                </Menu.Item>    
            </Container>


         </Menu>
    )
    
})