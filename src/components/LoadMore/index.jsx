import React from 'react'

import './style.less'
class LoadMore extends React.PureComponent {
    constructor(props, context) {
        super(props, context);

    }
    render() {
        const data=this.props.data;
        return (
            <div className="load-more" ref="wrapper">
                {this.props.isLoadingMore
                    ?<span>������</span>
                    :<span onClick={this.loadMoreHandle.bind(this)}>���ظ���</span>}
            </div>
        )
    }
    loadMoreHandle(){
        this.props.loadMoreFn()
    }
    componentDidMount() {
        const loadMoreFn=this.props.loadMoreFn
        const wrapper=this.refs.wrapper
        let timeoutId
        function callback() {
            const top=wrapper.getBoundingClientRect().top
            const windowHeight=window.screen.height
            if (top&&top<windowHeight) {
                loadMoreFn()
            }
        }
        window.addEventListener('scroll',function() {
            if (this.props.isLoadingMore) {
                return
            }
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId=setTimeout(callback,50)
        }.bind(this),false)
    }
}

export default LoadMore