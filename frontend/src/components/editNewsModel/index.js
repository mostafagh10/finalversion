import React , {useState , useEffect} from 'react'
import ShowHeader from '../adminHeader/index'
import {GET_NEWS} from '../../redux/actions/newsAction'
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import {storage} from '../firebaseload/index'
import { editnewsprocess } from '../APIs/newsapi'
import {useHistory} from 'react-router-dom'


const EditNews = ({ match }) => {
  let history = useHistory();

    //match.params.adviceId => this adviceId which i wrote it in app.js 
    const newsId = match.params.newsId;

    
    const dispatch = useDispatch();
    const { singlenews } = useSelector(state => state.news)

    const [formdata, setformdata] = useState({
        title:"",
        body:"",
        imagefile:null,
        image:'',
        URL:'',
        date:''
      });

      useEffect(() => {
        if(!singlenews){
          dispatch(GET_NEWS(newsId))
        }
          else if(singlenews){
            setformdata({
                ...formdata,
                title : singlenews.title,
                body:singlenews.body,
                image:singlenews.image,
                URL:singlenews.URL,
                date:singlenews.date
            })
        }
   },[dispatch,newsId,singlenews])

  //destructure component state
  const {
    title,
    body,
    imagefile,
    image,
    URL,
    date
  } = formdata;

  //event handlers

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.name] : e.target.value
    })
  }

  const handlechange2 = (e) => {
    if(e.target.files[0]){
      const imagefile = e.target.files[0];
      setformdata({
        ...formdata,
        imagefile:imagefile
      })
    }
  }

  const handleupload = (e) => {
    e.preventDefault();
    const imagefile = formdata.imagefile;
    const uploadtask = storage.ref(`images/${imagefile.name}`).put(imagefile)
    uploadtask.on('state_changed',
    (snapshot) => {

    }, 
    (error) => {
      console.log(error)
    } , 
    () => {
      storage.ref('images').child(imagefile.name).getDownloadURL().then(url => {
        console.log(url);
        setformdata({
          ...formdata,
          image : url
        })
      })
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    const {title , body , image , URL , date} = formdata;
      const data = {title , body , image , URL , date}
      setformdata({
        ...formdata
      })

      editnewsprocess(data,newsId).then((response) => {
        console.log('axios news success' , response)   
        history.push('/admin/manage/managenews')
    }).catch((err) => {
        console.log(err)
    })
  }

    const Showtheform = () => (
        <div className="container my-3">
        <div className="row">
        <div className="col-md-8 mx-auto">
            <a href="/admin/manage/managenews">
                <span className="fas fa-arrow-left">GO BACK</span>
            </a>
        </div>
        <br />
        <div className="col-md-8 mx-auto">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Edit News</h5>
          </div>
          <form onSubmit={handlesubmit}>
          <div className="modal-body my-2">
            
              <div className="custom-file mb-2">
              <input type="file" className="custom-file-input" onChange={handlechange2} />
              <label className="custom-file-label">choose image</label>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                    <button className="btn btn-info text-white" onClick={handleupload}>Upload The image</button>
                         </div>
                            {image && 
                            <div className="form-group col-md-6">
                            <img src={image} height="200" width="200" />
                        </div>
                    }
              </div>
              <div className="form-group">
                <label className="text-secondary">Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={handlechange} />
              </div>
              <div className="form-group">
                <label className="text-secondary">Body</label>
                <textarea className="form-control" rows="3" name="body" value={body} onChange={handlechange} ></textarea>
              </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                    <label className="text-secondary">Date</label>
                    <input type="date" className="form-control" name="date" value={date} onChange={handlechange} />
            </div>
            <div className="form-group col-md-6">
                            <label className="text-secondary">URL</label>
                            <input type="text" className="form-control" name="URL" value={URL} onChange={handlechange} />
            </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-info text-white">Save</button>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
    )

    return(
    <div>
        {ShowHeader()}
        {Showtheform()}
    </div>
    )
}

export default EditNews;