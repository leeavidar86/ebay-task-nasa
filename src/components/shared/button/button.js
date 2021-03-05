
import React, { Component } from "react";
import style from './button.module.scss'
import { Link } from "react-router-dom";
export default class Button extends Component {

    render() {
        return (
            <div className={style.linkWrapper}>
                <Link to={this.props.url}>{this.props.text}</Link>
            </div>
        )
    }
}