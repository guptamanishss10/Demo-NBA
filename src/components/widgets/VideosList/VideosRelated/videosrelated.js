import React from 'react';
import styles from '../videoslist.css';
import VideosListTemplate from '../videosListTemplates';
const videosRelated = (props) => (
    <div className={styles.relatedWrapper}>
         <VideosListTemplate
             data={props.data}
             teams={props.teams}
             />
    </div>
)

export default videosRelated;