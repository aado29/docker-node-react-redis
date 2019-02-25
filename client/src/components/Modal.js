import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './../styles/Modal.css';

class Modal extends Component {
  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionEnterTimeout={0}
        transitionLeaveTimeout={0}
        transitionName="modal">
        {this.props.show && (
        <div className="modal">
          <button className="modal__close" onClick={this.props.onClose}>+</button>
          <div className="modal__wrap">
            <div className="modal__inner">
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
        </div>)}
        {!this.props.show && null}
      </ReactCSSTransitionGroup>
    )
  }
};

export default Modal;