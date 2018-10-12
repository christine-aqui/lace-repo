/* eslint-disable */
import React from 'react';
const FacebookFeed = (props) => (
    <div className={props.className} style={
        {
            height: "200px"
        }
    }>
        <iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2FFordNationDougFord&width=600&colorscheme=light&show_faces=true&border_color&stream=true&header=true&height=435"
        scrolling="yes" frameborder="0" style={{width: '100%'}}>
        </iframe>
    </div>
)
export default FacebookFeed;