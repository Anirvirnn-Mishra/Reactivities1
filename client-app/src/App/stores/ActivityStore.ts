import {makeObservable,observable}  from 'mobx';
export default class ActivityStore
{
    title='hello';
    constructor ()
    {
        makeObservable(this,{title:observable});    
    }
    
}