import './directory-item.scss'

import { Link } from 'react-router-dom'

const DirectoryItem = ({category}) => {
    const {imageUrl, title} = category
    return (
        <div className="directory-item-container">
        <div  className="background-image " alt="" style={{backgroundImage: `url(${imageUrl})`}}/>
        <Link to={`shop/${title.toLowerCase()}`} className="directory-item-body">
          <h2>
            {title}</h2>
          <p>Shop Now</p>
        </Link>
      </div>
    )
}

export default DirectoryItem;