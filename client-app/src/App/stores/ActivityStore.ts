import {makeObservable,observable,action}  from 'mobx';
export default class ActivityStore
{
    title='hello';
    constructor ()
    {
        makeObservable(this,
            {
                title:observable,
                setTitle:action

        });
    }
    setTitle=()=>
    {
        this.title=this.title+'!';
    }
    
}