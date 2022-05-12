import React, { useState } from 'react'

function ReadMore(props) {

  const { children, ...rest } = props;

  const text = children;

  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
      setIsReadMore(!isReadMore)
  }

  return (
    <div>
        { isReadMore ? text?.slice(0,150) : text}
        <span onClick={toggleReadMore} {...rest}>
            {isReadMore ? "...read more" : " show Less"}
        </span>
    </div>
  )
}

export default ReadMore