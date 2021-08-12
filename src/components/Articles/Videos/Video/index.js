import React, { Component } from 'react';
import Header from './header';
import {URL} from '../../../../config'
import axios from 'axios';
import styles from '../../articles.css';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosrelated';
class VideoArticle extends Component {

  state = {
      article:[],
      team:[],
      teams:[],
      related:[]   
  }
  componentWillMount(){
    axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
    .then( response => {
        let article = response.data[0];

        axios.get(`${URL}/teams?id=${article.team}`)
        .then( response => {
            this.setState({
                article,
                team:response.data
            });
            this.getRelated();
        })
    })
}

getRelated = () => {
  axios.get(`${URL}/teams`)
  .then(response =>{
    let teams =response.data

    axios.get(`${URL}/videos? q=${this.state.team[0].city}&_limit=5`)
    .then(response=>{
        this.setState({
          teams,
          related:response.data
        })
    })
  })
}
  
  render(){ 
    const article = this.state.article;
    const team = this.state.team;
      return(
            <div>
              <Header teamData={team[0]}/>
              <div className={styles.VideoWrapper}>
                <h1>{article.title}</h1>
                <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}
                    >
                    </iframe>
              </div>
              <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
        )
    }

}

export default VideoArticle;
