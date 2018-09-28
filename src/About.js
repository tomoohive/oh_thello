import React, { Component } from "react";
import "./About.css";

class About extends Component {
  OthelloEvent = () => {
    this.props.history.push("/othello");
  };

  ToMyGithub = () => {
    window.location.href = "https://github.com/tomoohive/oh_thello";
  };

  render() {
    return (
      <div className="about-page">
        <h1 className="caption">Oh-thelloとは?</h1>
        <div className="contents">
          要するに単なるオセロです。
          <br />
          １対１で対戦するのもよし、
          <br />
          シミュレーション形式で行うのもよし、
          <br />
          いろいろな用途で遊べます。
        </div>
        <h1 className="caption">何ができるの?</h1>
        <div className="contents">
          オセロができます。
          <br />
          historyから盤面をやり直すことができます。
          <br />
          スマートフォンで楽々対戦が行えますよ！
        </div>
        <h1 className="caption">何で作ったの?</h1>
        <div className="contents">
          React製です。
          <br />
          オンラインとCPU戦には今の所対応していません。
          <br />
          ご了承をお願いします。
        </div>
        <div className="github-icon">
          <i className="fab fa-github fa-2x" onClick={this.ToMyGithub} />
        </div>
        <div id="FooterMenu">
          <i
            id="FooterBtn"
            className="far fa-play-circle fa-4x"
            onClick={this.OthelloEvent}
          />
        </div>
      </div>
    );
  }
}

export default About;
