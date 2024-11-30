import React from 'react'

const Loader = () => {
    return (
        <div className="outer-spinner">
            <div className="rotate-spinner">
                <div className="rotating"></div>
                <div></div>
                <div></div>
                <div></div>
                <div className="inner-circle"></div>
            </div>
        </div>
    )
}

export default Loader