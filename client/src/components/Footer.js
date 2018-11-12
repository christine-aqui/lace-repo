import React from 'react';

const footerStyle = {
  textAlign: 'center',
  position: 'sticky',
  bottom: '0',
  width: '100%',
  backgroundColor: '#064373',
  height: '40px',
  display: 'flex',
  // alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: '10px',
  paddingTop: '10px',
  color: 'white'
  // borderTopStyle: 'solid',
  // borderTopColor: 'crimson'
};
const Footer = () => <div style={footerStyle}>In Their Own Words &copy;</div>;

export default Footer;
