import React from 'react'
import PropTypes from 'prop-types'

const PostPagePostLayot = ({id , user, time, status}) => {
  return (
    <div>
        <h2>{user.firstName} {user.lastName}</h2>
        <h5>{time}</h5>
        <h4>{status}</h4>
        <div>
            <textarea placeholder='reply'/>
        </div>
    </div>
  )
}

PostPagePostLayot.propTypes = {}

export default PostPagePostLayot