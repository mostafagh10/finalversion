import React from 'react'
import ShowHeader from '../adminHeader/index'
import ShowDeleteActionsBtns from '../adminDeleteBtns/index'
import ShowManageAdviceModel from '../manageAdviceModel/index'
 

const adminManageHeader = () => {

    
    return (
    <div className="adminDeletepage">
      <ShowHeader />
      <ShowDeleteActionsBtns />
    </div>
  );
}

export default adminManageHeader;
