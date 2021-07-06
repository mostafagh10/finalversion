import React, { useState , useEffect } from "react";
import adminManageHeader from '../adminDashboard2/index'
import {useDispatch} from 'react-redux'
import {GET_ADVICES , DELETE_ADVICE} from '../../redux/actions/categoryAction'
import ShowAddAdviceModel from '../addAdviceModel'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {getadvicesprocess} from '../APIs/adviceapi'

const ShowManageAdviceModel = () => {

  const dispatch = useDispatch();

  /*
  useEffect(() => {
    dispatch(GET_ADVICES())
  },[dispatch])

  const { advices } = useSelector(state => state.advices)
  */

  const [advices , setadvices] = useState(null)

      const loadadvices = async () => {
          await getadvicesprocess().then((response) => {
              setadvices(response.data)
          }).catch((err) => {
              console.log(err)
          });
      }
      useEffect(() => {
          loadadvices();
      },[])

      const filterContent = (advices , searchterm) => {
        const result = advices.filter((advice) => advice.title.includes(searchterm))
        setadvices(result)
      }
      const handletextsearch = async e => {
        const searchterm = e.currentTarget.value
        await getadvicesprocess().then((response) => {
          filterContent(response.data , searchterm)
      }).catch((err) => {
          console.log(err)
      });
    
      }

  const showTheItems = () => (
    <div>
    <div>
    <input className="form-control filteradmin" style={{float:'left'}} placeholder="Filter The Advices" onChange={handletextsearch} />
    <button className="btn btn-warning" data-toggle="modal" data-target="#AddAdviceModel" style={{float:'right'}}><i className="fas fa-plus"></i> add advice</button>
    </div><br /><br />
    <table>
        <thead>
            <th>title</th>
            <th>body</th>
            <th>image</th>
            <th>Delete</th>
            <th>Update</th>
        </thead>
        <tbody>
        {advices && advices.map(advice => (
              <tr key={advice._id}>
              <td data-label="advice title">{advice.title}</td>
              <td data-label="advice body">{advice.body}</td>
              <td data-label="advice image">{advice.image && <img src={advice.image} width="100" height="100" />}</td>
              <td data-label="Delete">
              <form>
                <button className="btn btn-warning text-white" onClick={() => dispatch(DELETE_ADVICE(advice._id))}><i className="fas fa-trash-alt"></i></button>  
              </form>          
              </td>
              <td data-label="Update">
                <a href={`/admin/manage/editadvice/${advice._id}`}>
                <button className="btn btn-warning text-white" ><i className="fas fa-edit"></i></button> 
                </a> 
              </td>
              </tr>
           ))}
        </tbody> 
        </table>
        </div>
  );

  return(
   <div>
     {adminManageHeader()}
     <div className="container">
       {showTheItems()}
       </div>
       <ShowAddAdviceModel />
    </div>
  )
};

export default ShowManageAdviceModel;
