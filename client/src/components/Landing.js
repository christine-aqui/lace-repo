/* eslint-disable */
import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Footer from './Footer';
import TwitterFeed from './TwitterFeed';
import FacebookFeed from './FacebookFeed';
import './Landing.css';
import BillsFeed from './dashComponents/billsFeed';

window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));

const style = {
    panelLayout: {
        width: '50%',
        border: "solid gray 2px"
        // backgroundColor: 'orange'
    }
}

class Landing extends Component {

    state = {
        TwitterClass: '',
        FacebookClass: 'notShown',
        value: '',
        // recentBill: [],
        // speech: []       

    };
    // componentDidMount() {
    //   this.loadRecentBills;
    // }
    // loadRecentBills = () => {
    //     API.getRecentBills()
    //         .then(res =>
    //             this.setState({ recentBill: res.data}))
    //             console.log(res)
    //         .catch(err => console.log(err));
    // };

    FacebookButton = (e) => {
        e.preventDefault();
        console.log("facebook buttonnnnnnn")
        this.setState({
            TwitterClass: 'notShown',
            FacebookClass: ''
        })

    }
    TwitterButton = (e) => {
        e.preventDefault();
        console.log("twitter buttonnnnnnn")
        this.setState({
            TwitterClass: '',
            FacebookClass: 'notShown'
        })
    }

    render() {
        return (
            <div>
                <div
                    className="feeds"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        justifyItems: 'center',
                        padding: '0px',
                        width: '100%',
                    }}>
                    <div style={{ width: "100%" }}>
                        <TwitterFeed className={this.state.TwitterClass} />
                        <FacebookFeed className={this.state.FacebookClass} />
                        <div className="btn-group" style={{ width: "100%", borderStyle: "solid" }}>
                            <button style={{ width: "50%" }} onClick={this.TwitterButton}>Twitter</button>
                            <button style={{ width: "50%" }} onClick={this.FacebookButton}>Facebook</button>
                        </div>
                    </div>
                </div>
                <div className="postalCodeSearch" style={{marginTop: "0px", marginBottom: "0px", height: "auto", backgroundColor: 'lightblue'}}>
                    <h3>Not Sure who your MPP is?</h3>
                    <a href='https://voterinformationservice.elections.on.ca/en/election/search?mode=postalCode' target='blank'>
                        Click here to search by postal code
                    </a>
                </div>
                <Footer/>
            </div>
        )
    }
}


export default Landing;
