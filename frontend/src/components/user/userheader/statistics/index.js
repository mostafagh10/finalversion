import React , {useContext} from 'react'
import {  UserContext } from '../../../../ContextAPI/User'
const ShowUserStatisticsHeader = () => {
    const { isUser , userType , userLogout , user } = useContext(UserContext)
    const x = JSON.stringify(user)
    const y = JSON.parse(x)

    return(
    <div className="bg-info text-white py-4">
        <div className="container">
        <div className="row">
            {user?.user ? (
            <div className="col-md-12" style={{textAlign:'center',paddingTop:'5px'}}>
                <h2><i className="fas fa-viruses"></i> statistics</h2>
            </div>
            )
            :
            (
                <div className="col-md-12" style={{textAlign:'center',paddingTop:'5px'}}>
                    <h2><i className="fas fa-viruses"></i> statistics</h2>
                </div>
            )
            }
            </div>
        </div>
  </div>
    )
}

export default ShowUserStatisticsHeader;